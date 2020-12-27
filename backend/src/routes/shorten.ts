import express from 'express';
import { httpStatus } from '../http/status';
import { isValidLink } from '../http/valid';
import { LinkPresenter } from '../presenter';
import { linkDb } from '../storage/linkDb';

const router = express.Router();

router.post('/shorten.json', async (req: express.Request, res: express.Response) => {
    const linkURL = req.body?.link?.toString();
    if (!linkURL) {
        return res
            .status(400)
            .json({
                kind: 'error',
                message: 'missing "link" json body field.'
            });
    }

    // TODO add tests
    if (!isValidLink(linkURL)) {
        return res
            .status(400)
            .json({
                kind: 'error',
                message: `link "${linkURL}" is a malformed URL.`
            });
    }

    try {
        const status = await httpStatus.get(linkURL);
        if (status >= 400) {
            const message =
                `link "${linkURL}" failed validation, link returned ${status} HTTP status code.`
            return res
                .status(400)
                .json({ kind: 'error', message: message });
        }
        // link is valid
    } catch (error) {
        return res
            .status(500)
            .json({
                kind: 'error',
                message: `failed to resolve "${linkURL}" for validation: ${error.message}.`
            });
    }

    try {
        const link = await linkDb.insert(linkURL);
        return res
            .status(200)
            .json({ kind: 'link', data: LinkPresenter.present(link) });
    } catch (error) {
        return res
            .status(503)
            .json({
                kind: 'error',
                message: `failed to create link: ${error.message}.`,
            });
    }
});

module.exports = router;