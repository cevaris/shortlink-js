import express from 'express';
import { respond } from '../http/responses';
import { ApiKind, presentLink } from '../presenter';
import { linkDb, StorageNotFoundError } from '../storage/linkDb';

const router = express.Router();

router.get('/expand/:id.json', async (req: express.Request, res: express.Response) => {
    const id: string = req.params.id.toString();

    try {
        const link = await linkDb.get(id);
        return respond(res, {
            data: {
                kind: ApiKind.Link,
                items: [presentLink(link)],
            }
        })
    } catch (error) {
        if (error instanceof StorageNotFoundError) {
            return respond(res, {
                error: { code: 404, message: error.message, }
            })
        }

        // return apiError(res, 503, error.message);
        return respond(res, {
            error: { code: 503, message: error.message, }
        })
    }
});

module.exports = router;