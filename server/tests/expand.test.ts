import { afterAll, beforeAll, expect, test } from '@jest/globals';
import http from 'http';
import request from 'supertest';
import { app } from '../src/app';
import { linkDb, LinkDb } from '../src/storage/linkDb';
import { Link } from '../src/types';

jest.mock('../src/storage/linkDb');
const mockedLinkDb = linkDb as jest.Mocked<LinkDb>;

let server: http.Server;

beforeAll((done) => {
    server = app.listen(done);
})

afterAll(async (done) => {
    server.close(done);
});

test('existing /expand.json returns 200', async () => {
    // const spy = jest.spyOn(linkDb, 'get');
    // spy.mockReturnValue(Promise.resolve(link));

    const now = new Date();
    mockedLinkDb.get.mockImplementation((slug) => {
        const link = new Link(slug, 'http://link.com', now);
        return Promise.resolve(link)
    });

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