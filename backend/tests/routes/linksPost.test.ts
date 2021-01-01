import { afterAll, afterEach, beforeAll, expect, test } from '@jest/globals';
import http from 'http';
import request from 'supertest';
import { app } from '../../src/app';
import { httpStatus } from '../../src/http/status';
import { linkDb } from '../../src/storage/linkDb';

let server: http.Server;
const spyLinkDbInsert = jest.spyOn(linkDb, 'create');
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

test.skip('missing link json body field returns 400', async () => {
    const resp = await request(server)
        .post('/shorten.json');

    expect(spyLinkDbInsert.mock.calls).toEqual([]);
    expect(spyHttpStatusGet.mock.calls).toEqual([]);
    expect(resp.status).toBe(400);
    expect(resp.body?.kind).toBe('error');
});

// test.skip('existing id returns 200', async () => {
//     const link = new Link('link', 'http://link.com', new Date());
//     spyLinkDbInsert.mockResolvedValue(link);
//     spyHttpStatusGet.mockResolvedValue(200);

//     const resp = await request(server)
//         .post('/shorten.json')
//         .send({ 'link': link.link });

//     expect(spyLinkDbInsert.mock.calls).toEqual([[link.link]]);
//     expect(spyHttpStatusGet.mock.calls).toEqual([[link.link]]);

//     expect(resp.status).toBe(200);
//     expect(resp.body).toStrictEqual({
//         kind: 'link',
//         data: {
//             id: link.id,
//             link: link.link,
//             created_at: link.createdAt.toISOString(),
//         }
//     });
// });

test.skip('link fails validation returns 400', async () => {
    const link = 'http://example.com';

    // mock http status returns 404/NotFound
    spyHttpStatusGet.mockResolvedValue(404);

    const resp = await request(server)
        .post('/shorten.json')
        .send({ 'link': link });

    expect(spyLinkDbInsert.mock.calls).toEqual([]);
    expect(spyHttpStatusGet.mock.calls).toEqual([[link]]);

    expect(resp.status).toBe(400);
    expect(resp.body).toEqual({
        kind: 'error',
        message: `link "${link}" failed validation, link returned 404 HTTP status code.`,
    });
});


test.skip('error when validating link returns 500', async () => {
    const link = 'http://example.com';
    const errorMessage = 'this is a test error';
    spyHttpStatusGet.mockRejectedValue(Error(errorMessage));

    const resp = await request(server)
        .post('/shorten.json')
        .send({ 'link': link });

    expect(spyLinkDbInsert.mock.calls).toEqual([]);
    expect(spyHttpStatusGet.mock.calls).toEqual([[link]]);

    expect(resp.status).toBe(500);
    expect(resp.body).toEqual({
        kind: 'error',
        message: `failed to resolve "${link}" for validation: ${errorMessage}.`,
    });
});

test.skip('failed to create link returns 503', async () => {
    const link = 'http://example.com';
    const errorMessage = 'this is a test error';
    spyLinkDbInsert.mockRejectedValue(Error(errorMessage));
    spyHttpStatusGet.mockResolvedValue(200);

    const resp = await request(server)
        .post('/shorten.json')
        .send({ 'link': link });

    expect(spyLinkDbInsert.mock.calls).toEqual([[link]]);
    expect(spyHttpStatusGet.mock.calls).toEqual([[link]]);

    expect(resp.status).toBe(503);
    expect(resp.body).toStrictEqual({
        kind: 'error',
        message: `failed to create link: ${errorMessage}.`,
    });
});