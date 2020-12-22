import express from 'express';
import { insertLink } from '../clients/linkClient';
import { Link } from '../types';

const router = express.Router();

router.post('/shorten.json', async (req: express.Request, res: express.Response) => {
    if (!req.body?.link) {
        return res.status(400).json({ message: 'missing link body field.' });
    }

    const slug = uniq(6);
    const link = new Link(slug, req.body?.link.toString());

    // TODO: error handling, duplicate slug
    // TODO: error handling 
    await insertLink(link);

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