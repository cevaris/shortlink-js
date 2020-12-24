import { afterAll, beforeAll, expect, test } from '@jest/globals';
import http from 'http';
import request from 'supertest';
import { app } from '../../src/app';
import { linkDb, StorageNotFoundError } from '../../src/storage/linkDb';
import { Link } from '../../src/types';

let server: http.Server;
let spyLinkDbGet = jest.spyOn(linkDb, 'get');

beforeAll((done) => {
    server = app.listen(done);
})

afterAll(async (done) => {
    server.close(done);
});

beforeEach(() => {
    spyLinkDbGet.mockClear();
})

test('existing slug returns 200', async () => {
    const link = new Link('TEST', 'http://link.com', new Date());
    spyLinkDbGet.mockResolvedValue(link);

    const resp = await request(server)
        .get(`/expand.json?slug=${link.slug}`);

    expect(spyLinkDbGet.mock.calls).toEqual([[link.slug]]);
    expect(resp.status).toBe(200);
    expect(resp.body).toStrictEqual({
        kind: 'link',
        data: {
            slug: link.slug,
            link: link.link,
            created_at: link.createdAt.toISOString(),
        }
    });
});

test('missing slug param returns 400', async () => {
    const resp = await request(server)
        .get('/expand.json');

    expect(spyLinkDbGet.mock.calls).toEqual([]);
    expect(resp.status).toBe(400);
    expect(resp.body?.kind).toBe('error');
});

test('if link does not exist returns 404', async () => {
    const slug = 'TEST'
    const testMessage = 'this is a test.';
    const storageNotFound = new StorageNotFoundError(testMessage);
    spyLinkDbGet.mockRejectedValue(storageNotFound);

    const resp = await request(server)
        .get(`/expand.json?slug=${slug}`);

    expect(spyLinkDbGet.mock.calls).toEqual([['TEST']]);
    expect(resp.status).toBe(404);
    expect(resp.body).toStrictEqual({
        kind: 'error',
        message: testMessage,
    });
});

test('unexpected error returns 503', async () => {
    const testMessage = 'this is a test.';
    spyLinkDbGet.mockRejectedValue(Error(testMessage));

    const resp = await request(server)
        .get('/expand.json?slug=TEST');

    expect(resp.status).toBe(503);
    expect(resp.body).toStrictEqual({
        kind: 'error',
        message: testMessage,
    });
});