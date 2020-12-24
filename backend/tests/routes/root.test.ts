import { afterAll, beforeAll, expect, test } from '@jest/globals';
import http from 'http';
import request from 'supertest';
import { app } from '../../src/app';

let server: http.Server;

beforeAll((done) => {
    // server does not get shutdown properly
    // https://github.com/facebook/jest/issues/6907
    server = app.listen(done);
})

afterAll(async (done) => {
    // after all test are executed, shutdown server
    server.close(done);
});

test('root returns 200', async () => {
    const resp = await request(server)
        .get('/');

    expect(resp.status).toBe(200);
});