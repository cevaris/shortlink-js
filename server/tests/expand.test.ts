import { afterAll, beforeAll, expect, test } from '@jest/globals';
import http from 'http';
import request from 'supertest';
import { app } from '../src/app';
import { linkDb } from '../src/storage/linkDb';
import { Link } from '../src/types';

let server: http.Server;

beforeAll((done) => {
    server = app.listen(done);
})

afterAll(async (done) => {
    server.close(done);
});

test('existing /expand.json returns 200', async () => {
    const now = new Date();
    const link = new Link('TEST', 'http://link.com', now);
    const spy = jest.spyOn(linkDb, 'get');
    spy.mockReturnValue(Promise.resolve(link));

    const resp = await request(server)
        .get('/expand.json?slug=TEST');

    expect(resp.status).toBe(200);
    expect(resp.body).toStrictEqual({
        kind: 'link',
        data: {
            slug: 'TEST',
            link: 'http://link.com',
            created_at: now.toISOString(),
        }
    })
});