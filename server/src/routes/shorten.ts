import express from 'express';
import { linkClient } from '../clients/linkClient';
import { Link } from '../types';

const router = express.Router();

router.post('/shorten.json', async (req: express.Request, res: express.Response) => {
    if (!req.body?.link) {
        return res.status(400).json({ message: 'missing link json body field.' });
    }

    const slug = uniq(6);
    const link = new Link(slug, req.body?.link.toString());

    // TODO: error handling, duplicate slug
    // TODO: error handling 
    await linkClient.insert(link);

    res
        .status(200)
        .json({
            data: {
                slug: link.slug,
                link: link.link,
            }
        });
});

const slugChars = '0123456789abcdefghijklmnopqrstuvwxyz';
function uniq(len: number) {
    var result = '';
    for (var i = 0; i < len; i++) {
        result += slugChars.charAt(Math.floor(Math.random() * slugChars.length));
    }
    return result;
}

module.exports = router;