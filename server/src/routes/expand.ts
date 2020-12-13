import express from 'express';
import { getLink } from '../clients/linkClient';

const router = express.Router();

router.get('/:slug', async (req: express.Request, res: express.Response) => {
    const slug: string = req.params.slug;
    
    // TODO: error handling
    const link = await getLink(slug);

    res.json({
        success: true,
        data: link,
    });
});

module.exports = router;