import express from 'express';
import { ApiReason } from '../api';
import { respond } from '../http/responses';
import { linkDb, StorageNotFoundError } from '../storage/linkDb';

const router = express.Router();

router.get('/redirect/:id.json', async (req: express.Request, res: express.Response) => {
    const id: string = req.params.id.toString();
    try {
        const link = await linkDb.get(id);
        // TODO: log redirect somewhere
        return res.redirect(link.link);
    } catch (error) {
        if (error instanceof StorageNotFoundError) {
            const message = `link "${id}" not found`;
            return respond(res, {
                error: {
                    code: 404,
                    message: message,
                    errors: [{
                        reason: ApiReason.NotFound,
                        message: message,
                    }]
                }
            });
        }

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