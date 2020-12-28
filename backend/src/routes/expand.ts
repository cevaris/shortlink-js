import express from 'express';
import { apiError, apiErrors } from '../http/responses';
import { LinkPresenter } from '../presenter';
import { linkDb, StorageNotFoundError } from '../storage/linkDb';

const router = express.Router();

router.get('/expand.json', async (req: express.Request, res: express.Response) => {
    if (!req.query.id) {
        return apiErrors(res, 400, 'id', `missing "id" query parameter.`);
    }

    const id: string = req.query.id.toString();

    try {
        const link = await linkDb.get(id);
        return res.status(200)
            .json({ kind: 'link', data: LinkPresenter.present(link) });
    } catch (error) {
        if (error instanceof StorageNotFoundError) {
            return apiErrors(res, 404, 'id', error.message);
        }

        return apiError(res, 503, error.message);
    }
});

module.exports = router;