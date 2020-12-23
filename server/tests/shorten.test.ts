import { afterAll, beforeAll, expect, test } from '@jest/globals';
import http from 'http';
import request from 'supertest';
import { app } from '../src/app';
import { httpStatus } from '../src/http/status';
import { linkDb } from '../src/storage/linkDb';
import { Link } from '../src/types';

let server: http.Server;
const spyLinkDbInsert = jest.spyOn(linkDb, 'insert');
const spyHttpStatusGet = jest.spyOn(httpStatus, 'get');

beforeAll((done) => {
    server = app.listen(done);
})

afterAll(async (done) => {
    server.close(done);
});

beforeEach(() => {
    spyLinkDbInsert.mockClear();
})

test.skip('missing link json body field returns 400', async () => {
    const resp = await request(server)
        .post('/shorten.json')
        .set({ 'Content-Type': 'application/json' });

    expect(spyLinkDbInsert.mock.calls).toEqual([]);
    expect(spyHttpStatusGet.mock.calls).toEqual([]);
    expect(resp.status).toBe(400);
    expect(resp.body?.kind).toBe('error');
});

test('existing slug returns 200', async () => {
    const link = new Link('link', 'http://link.com', new Date());
    spyLinkDbInsert.mockResolvedValue(link);
    spyHttpStatusGet.mockResolvedValue(200);

    const resp = await request(server)
        .post('/shorten.json')
        .send({ 'link': link.link });

    expect(spyLinkDbInsert.mock.calls).toEqual([[link.link]]);
    expect(spyHttpStatusGet.mock.calls).toEqual([[link.link]]);

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
