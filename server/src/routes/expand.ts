import express from 'express';
import { linkClient } from '../clients/linkClient';

const router = express.Router();

router.get('/expand.json', async (req: express.Request, res: express.Response) => {
    if (!req.query.slug) {
        return res.status(400).json({ message: 'missing slug query parameter.' });
    }

    const slug: string = req.query.slug.toString();

    try {
        const link = await linkClient.get(slug);
        res.json({ type: 'link', success: true, slug: link.slug, link: link.link });
    } catch (error) {
        res.status(404).json({ type: 'error', success: false, message: error.message });
    }

});

module.exports = router;