import express from 'express';
import { ApiKind, ApiLink, ApiReason, toApiLink } from '../../api';
import { respond } from '../../http/responses';
import { linkDb } from '../../storage/linkDb';

const router = express.Router();

router.get('/links.json', async (req: express.Request, res: express.Response) => {
    const token: Date = req.query?.token ?
        new Date(Date.parse(req.query?.token?.toString())) : new Date();


    const defaultLimit = 10;
    // const limit: number = req.query?.limit && !Number.isNaN(req.query?.limit) ?
    //     parseInt(req.query?.limit?.toString()) : 10;
    // const limit = req.query?.limit ? parseInt(req.query?.limit?.toString()) : NaN;
    // if (isNaN(limit) || limit < 1 || limit > 10) {
    //     const message = `invalid "limit" value ${req.query.limit}. "limit" value must be > 0 and <= 10.`;
    //     return respond(res, {
    //         error: {
    //             code: 400,
    //             message: message,
    //             errors: [{
    //                 reason: ApiReason.Invalid,
    //                 locationType: ApiLocationType.Parameter,
    //                 location: ApiLocation.Limit,
    //                 message: message,
    //             }]
    //         }
    //     });
    // }

    try {
        const links = await linkDb.scan(token, defaultLimit);
        // extract last Link.createdAt value
        const nextToken = links.slice(-1)[0]?.createdAt?.toISOString() || null;
        const apiLinks = links.map(toApiLink);

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