import express from 'express';

// TODO: add ApiError type, update tests
export function apiError(res: express.Response, code: number, message: string) {
    res
        .status(code)
        .json({
            error: { code: code, message: message },
        });
}

export function apiErrors(res: express.Response, code: number, field: string, message: string) {
    res
        .status(code)
        .json({
            error: { code: code, errors: [{ [field]: message }] },
        });
}