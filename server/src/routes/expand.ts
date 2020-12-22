import express from 'express';
import { LinkClient } from '../clients/linkClient';

const router = express.Router();

router.get('/expand.json', async (req: express.Request, res: express.Response) => {
    if (!req.query.slug) {
        return res.status(400).json({ message: 'missing slug query parameter.' });
    }

    const slug: string = req.query.slug.toString();

    try {
        const link = await LinkClient.get(slug);
        res.json({ slug: slug, data: link });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});

module.exports = router;