import express from 'express';
import { getLink } from '../clients/linkClient';

const router = express.Router();

router.get('/:slug', async (req: express.Request, res: express.Response) => {
    const slug: string = req.params.slug;
    console.log(`expanding ${slug}`);


    const link = await getLink(slug);
    // TODO: query db for shortlink
    // TODO: return expanded shortLink data in JSON

    console.log(link);

    res.json({
        success: true,
        data: link,
    });
});

module.exports = router;