import { afterAll, beforeAll, expect, test } from '@jest/globals';
import http from 'http';
import request from 'supertest';
import { app } from '../../../src/app';
import { linkDb } from '../../../src/storage/linkDb';

let server: http.Server;
const spyLinkDbScan = jest.spyOn(linkDb, 'scan');

const TestDateStr = '2000-01-02T03:04:05.006Z';
const TestDate = new Date(Date.parse(TestDateStr));
const AfterTestDate = new Date(Date.parse('2001-01-01T00:00:00.00Z'));

beforeAll((done) => {
    server = app.listen(done);
})

afterAll(async (done) => {
    server.close(done);
});

beforeEach(() => {
    jest.clearAllMocks();
})

test('when links present returns 200', async () => {
    const links = [
        { id: 'one', link: 'http://example.com', createdAt: AfterTestDate },
        { id: 'two', link: 'http://link.com', createdAt: TestDate },
    ];
    spyLinkDbScan.mockResolvedValue(links);

    const resp = await request(server)
        .get(`/links.json?token=${TestDateStr}&limit=2`);

    expect(spyLinkDbScan).toBeCalledWith(TestDate, 2);
    expect(resp.body).toStrictEqual({
        data: {
            kind: 'link',
            next_page_token: TestDate.toISOString(),
            items: [
                { id: 'one', link: 'http://example.com', created_at: AfterTestDate.toISOString() },
                { id: 'two', link: 'http://link.com', created_at: TestDate.toISOString() },
            ],
        }
    });
    expect(resp.status).toBe(200);
});

test('invalid token value', async () => {
    await request(server).get(`/links.json?&limit=10`).expect(400);
    await request(server).get(`/links.json?token=invalid-date&limit=10`).expect(400);
    await request(server).get(`/links.json?token=invalid-date&limit=10`).expect(400);
});

test('invalid limit value', async () => {
    await request(server).get(`/links.json?token=${TestDateStr}`).expect(400);
    await request(server).get(`/links.json?token=${TestDateStr}&limit=-1`).expect(400);
    await request(server).get(`/links.json?token=${TestDateStr}&limit=21`).expect(400);
    await request(server).get(`/links.json?token=${TestDateStr}&limit=invalid-number`).expect(400);
});

test('no links return 200', async () => {
    spyLinkDbScan.mockResolvedValue([]);

    const resp = await request(server)
        .get(`/links.json?token=${TestDateStr}&limit=10`);

    expect(resp.body).toStrictEqual({
        data: {
            kind: 'link',
            next_page_token: null,
            items: [],
        }
    });
    expect(spyLinkDbScan).toBeCalledWith(TestDate, 10);
    expect(resp.status).toBe(200);
});

test('unexpected error returns 503', async () => {
    const testMessage = 'this is a test.';
    spyLinkDbScan.mockRejectedValue(Error(testMessage));

    const resp = await request(server)
        .get(`/links.json?token=${TestDateStr}&limit=10`);

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
    expect(spyLinkDbScan).toBeCalledWith(TestDate, 10);
    expect(resp.status).toBe(503);
});