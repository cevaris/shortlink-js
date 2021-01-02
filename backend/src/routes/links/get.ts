import express from 'express';
import { ApiKind, ApiLink, ApiLocation, ApiLocationType, ApiReason, toApiLink } from '../../api';
import { respond } from '../../http/responses';
import { linkDb } from '../../storage/linkDb';
import { Link } from '../../../tests/types';

const router = express.Router();

router.get('/links.json', async (req: express.Request, res: express.Response) => {
    if (!req.query?.token) {
        const message = `missing token parameter.`;
        return respond(res, {
            error: {
                code: 400,
                message: message,
                errors: [{
                    reason: ApiReason.Invalid,
                    location_type: ApiLocationType.Parameter,
                    location: ApiLocation.Token,
                    message: message,
                }]
            }
        });
    }

    const token: Date = new Date(Date.parse(req.query?.token?.toString()));
    if (token.toString() === 'Invalid Date') {
        const message = `token "${req.query.token}" is invalid. Please use an ISO-8601 format (ex. 2019-10-11T18:56:08.984Z).`;
        return respond(res, {
            error: {
                code: 400,
                message: message,
                errors: [{
                    reason: ApiReason.Invalid,
                    location_type: ApiLocationType.Parameter,
                    location: ApiLocation.Token,
                    message: message,
                }]
            }
        });
    }

    if (!req.query?.limit) {
        const message = `missing limit parameter.`;
        return respond(res, {
            error: {
                code: 400,
                message: message,
                errors: [{
                    reason: ApiReason.Invalid,
                    location_type: ApiLocationType.Parameter,
                    location: ApiLocation.Limit,
                    message: message,
                }]
            }
        });
    }

    const maxLimit = 20;
    const limit = parseInt(req.query?.limit?.toString());
    if (isNaN(limit) || limit < 1 || limit > maxLimit) {
        const message = `invalid "limit" value ${req.query.limit}. "limit" value must be > 0 and <= ${maxLimit}.`;
        return respond(res, {
            error: {
                code: 400,
                message: message,
                errors: [{
                    reason: ApiReason.Invalid,
                    location_type: ApiLocationType.Parameter,
                    location: ApiLocation.Limit,
                    message: message,
                }]
            }
        });
    }

    try {
        const links: Link[] = await linkDb.scan(token, limit);
        // extract last Link.createdAt value to find nextToken
        const nextToken: string | null = links.length === limit ?
            links.slice(-1)[0]?.createdAt?.toISOString() : null;
        const apiLinks: ApiLink[] = links.map(toApiLink);

        respond<ApiLink>(res, {
            data: {
                kind: ApiKind.Link,
                next_page_token: nextToken,
                items: apiLinks
            }
        });
    } catch (error) {
        return respond(res, {
            error: {
                code: 503,
                message: error.message,
                errors: [{
                    reason: ApiReason.Error,
                    message: error.message,
                }]
            }
        });
    }
});


module.exports = router;