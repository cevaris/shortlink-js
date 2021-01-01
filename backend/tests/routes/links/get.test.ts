import { afterAll, beforeAll, expect, test } from '@jest/globals';
import http from 'http';
import request from 'supertest';
import { app } from '../../../src/app';
import { linkDb, StorageNotFoundError } from '../../../src/storage/linkDb';
import { Link } from '../../../src/types';

let server: http.Server;
const spyLinkDbScan = jest.spyOn(linkDb, 'scan');
const FrozenDate = new Date(Date.parse('2000-01-02T03:04:05.006Z'));

beforeAll((done) => {
    server = app.listen(done);
})

afterAll(async (done) => {
    server.close(done);
});

beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers('modern');
    jest.setSystemTime(FrozenDate);
})

afterEach(() => {
    jest.useRealTimers();
})

test('existing id returns 200', async () => {
    const link: Link = { id: 'TEST', link: 'http://link.com', createdAt: new Date() };
    spyLinkDbScan.mockResolvedValue([link]);

    const resp = await request(server)
        .get(`/links.json`);

    expect(spyLinkDbScan).toBeCalledWith(FrozenDate, 10);
    expect(resp.status).toBe(200);
    expect(resp.body).toStrictEqual({
        data: {
            kind: 'link',
            next_page_token: FrozenDate.toISOString(),
            items: [{
                id: link.id,
                link: link.link,
                created_at: link.createdAt.toISOString(),
            }],
        }
    });
});

test.skip('if link does not exist returns 404', async () => {
    const id = 'TEST'
    const testMessage = `link "${id}" not found`;
    const storageNotFound = new StorageNotFoundError(testMessage);
    spyLinkDbScan.mockRejectedValue(storageNotFound);

    const resp = await request(server)
        .get(`/links/${id}.json`);

    expect(spyLinkDbScan).toBeCalledWith('TEST');
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

test.skip('unexpected error returns 503', async () => {
    const testMessage = 'this is a test.';
    spyLinkDbScan.mockRejectedValue(Error(testMessage));

    const resp = await request(server)
        .get('/links/TEST.json');

    expect(spyLinkDbScan).toBeCalledWith('TEST');
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