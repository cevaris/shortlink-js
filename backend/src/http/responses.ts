import express from 'express';
import { ApiLink, ApiResponse } from '../api';

export function respond<T>(res: express.Response, apiResponse: ApiResponse<T>) {
    if (apiResponse.error) {
        return res
            .status(apiResponse.error.code)
            .json(apiResponse);
    }

    return res.json(apiResponse);
}