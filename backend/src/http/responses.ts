import express from 'express';
import { ApiLink, ApiResponse } from '../api';

// TODO: add ApiError type, update tests
// export function apiError(res: express.Response, code: number, message: string) {
//     res
//         .status(code)
//         .json({
//             error: { code: code, message: message },
//         });
// }

// export function apiErrors(res: express.Response, code: number, field: string, message: string) {
//     res
//         .status(code)
//         .json({
//             error: { code: code, errors: [{ [field]: message }] },
//         });
// }

export function respond(res: express.Response, apiResponse: ApiResponse<ApiLink>) {
    if (apiResponse.error) {
        return res
            .status(apiResponse.error.code)
            .json(apiResponse);
    }

    return res.json(apiResponse);
}