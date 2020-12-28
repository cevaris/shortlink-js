import express from 'express';
import { apiError } from '../http/responses';
import { LinkPresenter } from '../presenter';
import { linkDb, StorageNotFoundError } from '../storage/linkDb';

const router = express.Router();

router.get('/expand/:id.json', async (req: express.Request, res: express.Response) => {
    const id: string = req.params.id.toString();

    try {
        const link = await linkDb.get(id);
        return res.status(200)
            .json({
                data: {
                    kind: 'link',
                    items: [LinkPresenter.present(link)],
                }
            });
    } catch (error) {
        if (error instanceof StorageNotFoundError) {
            return apiError(res, 404, error.message);
        }

        return apiError(res, 503, error.message);
    }
});

module.exports = router;