import { afterAll, beforeAll, beforeEach, expect, jest, test } from '@jest/globals';
import http from 'http';
import request from 'supertest';
import { app } from '../../src/app';
import { linkDb, StorageNotFoundError } from '../../src/storage/linkDb';
import { Link } from '../types';

let server: http.Server;
const spyLinkDbGet = jest.spyOn(linkDb, 'get');

beforeAll((done) => {
    server = app.listen(done);
})

afterAll(async (done) => {
    server.close(done);
});

beforeEach(() => {
    jest.clearAllMocks();
})

test('existing id redirects to that link', async () => {
    const link: Link = { id: 'TEST', link: 'http://link.com', createdAt: new Date() };
    spyLinkDbGet.mockResolvedValue(link);

    const resp = await request(server)
        .get(`/${link.id}`);

    expect(spyLinkDbGet).toBeCalledWith(link.id);
    expect(resp.status).toBe(302); // redirect
    expect(resp.redirect).toBe(true);
    expect(resp.text).toBe(`Found. Redirecting to ${link.link}`);
});

test('if link does not exist redirects to app home page with error message', async () => {
    const linkId = 'TEST'
    const testMessage = `link "${linkId}" not found`;
    const storageNotFound = new StorageNotFoundError(testMessage);
    spyLinkDbGet.mockRejectedValue(storageNotFound);

    const resp = await request(server)
        .get(`/${linkId}`);

    expect(spyLinkDbGet).toBeCalledWith('TEST');
    expect(resp.status).toBe(302); // redirect
    expect(resp.redirect).toBe(true);
    expect(resp.text).toBe(`Found. Redirecting to http://localhost:4200?flash=link%20%22TEST%22%20not%20found`);
});

test('if error hydrating link redirects to app home page with error message', async () => {
    const linkId = 'TEST'
    const errorMessage = `something bad happened`;
    spyLinkDbGet.mockRejectedValue(Error(errorMessage));

    const resp = await request(server)
        .get(`/${linkId}`);

    expect(spyLinkDbGet).toBeCalledWith('TEST');
    expect(resp.status).toBe(302); // redirect
    expect(resp.redirect).toBe(true);
    expect(resp.text).toBe(`Found. Redirecting to http://localhost:4200?flash=${encodeURI(errorMessage)}`);
});