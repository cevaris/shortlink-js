import { afterAll, afterEach, beforeAll, expect, test } from '@jest/globals';
import http from 'http';
import request from 'supertest';
import { app } from '../../../src/app';
import { httpStatus } from '../../../src/http/status';
import { linkDb } from '../../../src/storage/linkDb';
import { Link } from '../../../src/types';

let server: http.Server;
const spyLinkDbCreate = jest.spyOn(linkDb, 'create');
const spyHttpStatusGet = jest.spyOn(httpStatus, 'get');

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

test('existing id returns 200', async () => {
    const link: Link = { id: 'TEST', link: 'http://link.com', createdAt: new Date() };
    spyLinkDbCreate.mockResolvedValue(link);
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

    expect(spyLinkDbCreate).toBeCalledWith(link.link, expect.any(Function));
    expect(spyHttpStatusGet).toBeCalledWith(link.link);
});

// test('link fails validation returns 400', async () => {
//     const link = 'http://example.com';

//     // mock http status returns 404/NotFound
//     spyHttpStatusGet.mockResolvedValue(404);

//     const resp = await request(server)
//         .post('/links.json')
//         .send({ 'link': link });

//     expect(spyLinkDbCreate.mock.calls).toEqual([]);
//     expect(spyHttpStatusGet.mock.calls).toEqual([[link]]);

//     expect(resp.status).toBe(400);
//     expect(resp.body).toEqual({
//         kind: 'error',
//         message: `link "${link}" failed validation, link returned 404 HTTP status code.`,
//     });
// });


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

test('failed to create link returns 503', async () => {
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