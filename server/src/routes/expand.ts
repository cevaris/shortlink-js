import express from 'express';
import { LinkPresenter } from '../presenter';
import { linkDb } from '../storage/linkDb';

const router = express.Router();

router.get('/expand.json', async (req: express.Request, res: express.Response) => {
    if (!req.query.slug) {
        return res.status(400).json({ message: 'missing slug query parameter.' });
    }

    const slug: string = req.query.slug.toString();

    try {
        const link = await linkDb.get(slug);
        res.json({ kind: 'link', data: LinkPresenter.present(link) });
    } catch (error) {
        res.status(404).json({ kind: 'error', message: error.message });
    }
});

module.exports = router;