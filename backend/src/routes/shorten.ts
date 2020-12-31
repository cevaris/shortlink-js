import express from 'express';
import { ApiKind, ApiLocation, ApiLocationType, ApiReason, toApiLink } from '../api';
import { linkPublisher } from '../events/linksPublisher';
import { respond } from '../http/responses';
import { httpStatus } from '../http/status';
import { isValidLink } from '../http/valid';
import { toLinkCreateEvent } from '../proto/conv';
import { linkDb } from '../storage/linkDb';
import { Link } from '../types';

const router = express.Router();

router.post('/shorten.json', async (req: express.Request, res: express.Response) => {
    const linkURL = req.body?.link?.toString();
    if (!linkURL) {
        const message = 'missing "link" json body field.';
        return respond(res, {
            error: {
                code: 400,
                message: message,
                errors: [{
                    reason: ApiReason.Invalid,
                    locationType: ApiLocationType.Parameter,
                    location: ApiLocation.Link,
                    message: message,
                }]
            }
        });
    }

    // TODO: add tests
    if (!isValidLink(linkURL)) {
        const message = `link "${linkURL}" is not a valid URL. (Please include protocol; ex. https://)`;
        return respond(res, {
            error: {
                code: 400,
                message: message,
                errors: [{
                    reason: ApiReason.Invalid,
                    locationType: ApiLocationType.Parameter,
                    location: ApiLocation.Link,
                    message: message,
                }]
            }
        });
    }

    try {
        // verify that link resolves
        await httpStatus.get(linkURL);
        // if does not throw, the link resolved.
    } catch (error) {
        const message = `server failed to validate "${linkURL} link": ${error.message}.`;
        return respond(res, {
            error: {
                code: 500,
                message: message,
                errors: [{
                    reason: ApiReason.Error,
                    message: message,
                }]
            }
        });
    }

    try {
        const sideEffect = (l: Link) =>
            linkPublisher.publishCreateEvent(toLinkCreateEvent(l));
        const link = await linkDb.create(linkURL, sideEffect);
        respond(res, {
            data: { kind: ApiKind.Link, items: [toApiLink(link)], }
        })
    } catch (error) {
        const message = `failed to create link: ${error.message}.`;
        return respond(res, {
            error: {
                code: 503,
                message: message,
                errors: [{
                    reason: ApiReason.Error,
                    message: message,
                }]
            }
        });
    }
});

module.exports = router;