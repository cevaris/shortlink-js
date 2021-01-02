import { afterAll, afterEach, beforeAll, expect, test } from '@jest/globals';
import http from 'http';
import request from 'supertest';
import { app } from '../../../src/app';
import { linkPublisher } from '../../../src/events/linksPublisher';
import { httpStatus } from '../../../src/http/status';
import { toLinkCreateEvent } from '../../../src/proto/conv';
import { linkDb, SideEffect } from '../../../src/storage/linkDb';
import { Link } from '../../types';

let server: http.Server;
const spyLinkDbCreate = jest.spyOn(linkDb, 'create');
const spyHttpStatusGet = jest.spyOn(httpStatus, 'get');
const spyPublishCreateEvent = jest.spyOn(linkPublisher, 'publishCreateEvent');

beforeAll((done) => {
    server = app.listen(done);
})

afterAll(async (done) => {
    server.close(done);
});

afterEach(() => {
    jest.clearAllMocks();
})

test('missing link json body field returns 400', async () => {
    const resp = await request(server)
        .post('/links.json');

    const testMessage = `missing "link" json body field.`;
    expect(resp.body).toStrictEqual({
        error: {
            code: 400,
            message: testMessage,
            errors: [{
                reason: 'invalid',
                location: 'link',
                location_type: 'parameter',
                message: testMessage,
            }]
        }
    });
    expect(spyLinkDbCreate).not.toBeCalled();
    expect(spyHttpStatusGet).not.toBeCalled();
    expect(resp.status).toBe(400);
});

test('create new link returns 200', async () => {
    const link: Link = { id: 'TEST', link: 'http://link.com', createdAt: new Date() };

    spyLinkDbCreate.mockImplementation(
        async (linkUrl: string, sideEffect: SideEffect<Link>) => {
            await sideEffect(link);
            return Promise.resolve(link);
        });
    spyHttpStatusGet.mockResolvedValue(200);

    const resp = await request(server)
        .post('/links.json')
        .send({ 'link': link.link });

    expect(resp.status).toBe(200);
    expect(resp.body).toStrictEqual({
        data: {
            kind: 'link',
            items: [{
                id: link.id,
                link: link.link,
                created_at: link.createdAt.toISOString(),
            }],
        }
    });

    expect(spyPublishCreateEvent).toBeCalledWith(toLinkCreateEvent(link));
    expect(spyLinkDbCreate).toBeCalledWith(link.link, expect.any(Function));
    expect(spyHttpStatusGet).toBeCalledWith(link.link);
});

test('failed to create link due to publish or database failure returns 503', async () => {
    const link = 'http://example.com';
    const errorMessage = 'this is a test error';
    spyLinkDbCreate.mockRejectedValue(Error(errorMessage));
    spyHttpStatusGet.mockResolvedValue(200);

    const resp = await request(server)
        .post('/links.json')
        .send({ 'link': link });

    const testMessage = `failed to create link: ${errorMessage}.`;
    expect(resp.body).toStrictEqual({
        error: {
            code: 503,
            message: testMessage,
            errors: [{
                reason: 'error',
                message: testMessage,
            }]
        }
    });
    expect(spyLinkDbCreate).toBeCalledWith(link, expect.any(Function));
    expect(spyHttpStatusGet).toBeCalledWith(link);
    expect(resp.status).toBe(503);
});

test('error when validating link returns 503', async () => {
    const link = 'http://example.com';
    const errorMessage = 'this is a test error';
    spyHttpStatusGet.mockRejectedValue(Error(errorMessage));

    const resp = await request(server)
        .post('/links.json')
        .send({ 'link': link });

    const testMessage = `failed to validate "${link} link": ${errorMessage}.`;
    expect(resp.body).toStrictEqual({
        error: {
            code: 503,
            message: testMessage,
            errors: [{
                reason: 'error',
                message: testMessage,
            }]
        }
    });
    expect(spyLinkDbCreate).not.toBeCalled()
    expect(spyHttpStatusGet).toBeCalledWith(link);
    expect(resp.status).toBe(503);
});

test('regex invalid link returns 400', async () => {
    const link = 'malformed link url';

    const resp = await request(server)
        .post('/links.json')
        .send({ 'link': link });

    const testMessage = `link "${link}" is not a valid URL. (Please include protocol; ex. https://).`;
    expect(resp.body).toStrictEqual({
        error: {
            code: 400,
            message: testMessage,
            errors: [{
                reason: 'invalid',
                location: 'link',
                location_type: 'parameter',
                message: testMessage,
            }]
        }
    });
    expect(spyLinkDbCreate).not.toBeCalled()
    expect(spyHttpStatusGet).not.toBeCalled();
    expect(resp.status).toBe(400);
});