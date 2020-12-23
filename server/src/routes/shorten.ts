import axios from 'axios';
import express from 'express';
import { linkClient } from '../clients/linkClient';
import { Link } from '../types';

const router = express.Router();

router.post('/shorten.json', async (req: express.Request, res: express.Response) => {
    const linkURL = req.body?.link;
    if (!linkURL) {
        return res.status(400).json({
            type: 'error',
            success: false,
            message: 'missing link json body field.'
        });
    }

    if (!isURL(linkURL)) {
        return res.status(400).json({
            type: 'error',
            success: false,
            message: `link "${linkURL}" is not a valid URL.`
        });
    }

    try {
        const status = await httpStatus(linkURL);
        if (status >= 400) {
            return res.status(400).json({
                type: 'error',
                success: false,
                message: `link "${linkURL}" failed validation, link returned ${status} HTTP status code.`
            });
        }
    } catch (error) {
        return res.status(503).json({
            type: 'error',
            success: false,
            message: `failed to resolve "${linkURL} for validation: ${error.message}".`
        });
    }

    const slug = uniq(6);
    const link = new Link(slug, linkURL.toString());

    // TODO: error handling, duplicate slug
    try {
        await linkClient.insert(link);
    } catch (error) {
        return res.status(503).json({
            type: 'error',
            success: false,
            message: `failed to persist link: ${error.message}.`,
        });
    }

    res
        .status(200)
        .json({ type: 'link', success: true, slug: link.slug, link: link.link });
});

// https://stackoverflow.com/a/1349426/3538289
const slugChars = '0123456789abcdefghijklmnopqrstuvwxyz';
function uniq(len: number) {
    var result = '';
    for (var i = 0; i < len; i++) {
        result += slugChars.charAt(Math.floor(Math.random() * slugChars.length));
    }
    return result;
}

// https://stackoverflow.com/a/3809435/3538289
const RegexURL = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);
function isURL(link: string): boolean {
    return Boolean(link.match(RegexURL));
}

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