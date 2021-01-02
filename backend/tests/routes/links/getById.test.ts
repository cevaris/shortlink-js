import { afterAll, beforeAll, expect, test } from '@jest/globals';
import http from 'http';
import request from 'supertest';
import { app } from '../../../src/app';
import { linkDb, StorageNotFoundError } from '../../../src/storage/linkDb';
import { Link } from '../../types';

let server: http.Server;
const spyLinkDbGet = jest.spyOn(linkDb, 'get');

beforeAll((done) => {
    server = app.listen(done);
})

afterAll(async (done) => {
    server.close(done);
});

beforeEach(() => {
    spyLinkDbGet.mockClear();
})

test('existing id returns 200', async () => {
    const link: Link = { id: 'TEST', link: 'http://link.com', createdAt: new Date() };
    spyLinkDbGet.mockResolvedValue(link);

    const resp = await request(server)
        .get(`/links/${link.id}.json`);

    expect(spyLinkDbGet).toBeCalledWith(link.id);
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
});

test('if link does not exist returns 404', async () => {
    const id = 'TEST'
    const testMessage = `link "${id}" not found`;
    const storageNotFound = new StorageNotFoundError(testMessage);
    spyLinkDbGet.mockRejectedValue(storageNotFound);

    const resp = await request(server)
        .get(`/links/${id}.json`);

    expect(spyLinkDbGet).toBeCalledWith('TEST');
    expect(resp.status).toBe(404);
    expect(resp.body).toStrictEqual({
        error: {
            code: 404,
            message: testMessage,
            errors: [{
                reason: 'notFound',
                message: testMessage,
            }]
        }
    });
});

test('unexpected error returns 503', async () => {
    const testMessage = 'this is a test.';
    spyLinkDbGet.mockRejectedValue(Error(testMessage));

    const resp = await request(server)
        .get('/links/TEST.json');

    expect(spyLinkDbGet).toBeCalledWith('TEST');
    expect(resp.status).toBe(503);
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
});