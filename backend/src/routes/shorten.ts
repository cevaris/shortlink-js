import express from 'express';
import { respond } from '../http/responses';
import { httpStatus } from '../http/status';
import { isValidLink } from '../http/valid';
import { ApiKind, presentLink } from '../presenter';
import { linkDb } from '../storage/linkDb';

const router = express.Router();

router.post('/shorten.json', async (req: express.Request, res: express.Response) => {
    const linkURL = req.body?.link?.toString();
    if (!linkURL) {
        // return apiErrors(res, 400, 'link', 'missing "link" json body field.');
        return respond(res, {
            error: {
                code: 400,
                errors: { link: 'missing "link" json body field.', }
            }
        });
    }

    // TODO: add tests
    if (!isValidLink(linkURL)) {
        return respond(res, {
            error: {
                code: 400,
                errors: { link: `link "${linkURL}" is a malformed URL.`, }
            }
        });
    }

    try {
        // verify that link resolves
        await httpStatus.get(linkURL);
        // if does not throw, the link resolved.
    } catch (error) {
        return respond(res, {
            error: {
                code: 500,
                errors: { link: `link "${linkURL}" failed validation: ${error.message}.`, }
            }
        });
    }

    try {
        const link = await linkDb.insert(linkURL);
        return respond(res, {
            data: { kind: ApiKind.Link, items: [presentLink(link)], }
        })
    } catch (error) {
        return respond(res, {
            error: {
                code: 503,
                errors: { link: `failed to create link: ${error.message}.`, }
            }
        });
    }
});

module.exports = router;