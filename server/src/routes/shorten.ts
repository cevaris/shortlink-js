import axios from 'axios';
import express from 'express';
import { linkDb } from '../storage/linkDb';

const router = express.Router();

router.post('/shorten.json', async (req: express.Request, res: express.Response) => {
    const linkURL = req.body?.link.toString();
    if (!linkURL) {
        return res
            .status(400)
            .json({
                kind: 'error',
                message: 'missing "link" json body field.'
            });
    }

    try {
        const status = await httpStatus(linkURL);
        if (status >= 400) {
            const message =
                `link "${linkURL}" failed validation, link returned ${status} HTTP status code.`
            return res
                .status(400)
                .json({ kind: 'error', message: message });
        }
    } catch (error) {
        return res
            .status(503)
            .json({
                kind: 'error',
                message: `failed to resolve "${linkURL} for validation: ${error.message}".`
            });
    }

    try {
        const link = await linkDb.insert(linkURL);
        res
            .status(200)
            .json({ kind: 'link', data: { link: link.link, slug: link.slug } });
    } catch (error) {
        return res
            .status(503)
            .json({
                kind: 'error',
                message: `failed to persist link: ${error.message}.`,
            });
    }
});

// https://stackoverflow.com/questions/49967779/axios-handling-errors
async function httpStatus(link: string): Promise<number> {
    try {
        const response = await axios.get(link);
        return response.status;
    } catch (error) {
        if (error.response) {
            // response returned failing HTTP status code
            return error.response.status as number;
        } else if (error.request) {
            // no response
            return 500;
        } else {
            // failed to make request
            throw error
        }
    }
}

module.exports = router;