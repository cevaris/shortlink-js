import express from 'express';
import { insertLink } from '../clients/linkClient';
import { Link } from '../types';

const router = express.Router();

router.post('/shorten', async (req: express.Request, res: express.Response) => {
    if (!req.query.link) {
        return res.json({ success: false, message: 'missing link parameter' });
    }

    const slug = uniq(6);
    const link = new Link(slug, req.query.link.toString());

    // TODO: error handling, duplicate slug
    // TODO: error handling 
    await insertLink(link);

    res.json({
        success: true,
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