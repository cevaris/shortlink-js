import { afterEach, expect, test } from '@jest/globals';
import axios from 'axios';
import { httpStatus } from '../../src/http/status';

const spyAxios = jest.spyOn(axios, 'get');

afterEach(() => {
    jest.clearAllMocks();
})

test('link returns 200 status', async () => {
    const link = 'http://example.com';
    spyAxios.mockResolvedValue({ status: 200 });

    const status = await httpStatus.get(link);

    expect(spyAxios.mock.calls).toEqual([[link, { timeout: 10 * 1000 }]]);
    expect(status).toBe(200);
});

test('link returns unsuccessful http status', async () => {
    const link = 'http://example.com';
    spyAxios.mockRejectedValue({ response: { status: 404 } });

    const status = await httpStatus.get(link);

    expect(spyAxios.mock.calls).toEqual([[link, { timeout: 10 * 1000 }]]);
    expect(status).toBe(404);
});

test('link returns unsuccessful http status', async () => {
    const link = 'http://example.com';
    const error = Error('test error');
    spyAxios.mockRejectedValue(error);

    try {
        await httpStatus.get(link);
    } catch (error) {
        expect(error).toEqual(error);
    }

    expect(spyAxios.mock.calls).toEqual([[link, { timeout: 10 * 1000 }]]);
});