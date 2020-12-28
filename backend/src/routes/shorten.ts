import express from 'express';
import { apiErrors } from '../http/responses';
import { httpStatus } from '../http/status';
import { isValidLink } from '../http/valid';
import { LinkPresenter } from '../presenter';
import { linkDb } from '../storage/linkDb';

const router = express.Router();

router.post('/shorten.json', async (req: express.Request, res: express.Response) => {
    const linkURL = req.body?.link?.toString();
    if (!linkURL) {
        return apiErrors(res, 400, 'link', 'missing "link" json body field.');
    }

    // TODO: add tests
    if (!isValidLink(linkURL)) {
        return apiErrors(res, 400, 'link', `link "${linkURL}" is a malformed URL.`);
    }

    try {
        // verify that link resolves
        await httpStatus.get(linkURL);
        // if does not throw, the link resolved.
    } catch (error) {
        return apiErrors(res, 500, 'link', `link "${linkURL}" failed validation: ${error.message}.`);
    }

    try {
        const link = await linkDb.insert(linkURL);
        return res
            .status(200)
            .json({
                data: {
                    kind: 'link',
                    items: [LinkPresenter.present(link)]
                }
            });
    } catch (error) {
        return apiErrors(res, 503, 'link', `failed to create link: ${error.message}.`);
    }
});

module.exports = router;