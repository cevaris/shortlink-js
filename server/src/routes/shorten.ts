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

    console.log(`shortening ${link.link} link -> ${link.slug}`);

    await insertLink(link);

    console.log(`shortend ${link.link}`);

    res.json({
        success: true,
        data: {
            slug: link.slug,
            link: link.link,
        }
    });
});

const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
function uniq(len: number) {
    var result = '';
    for (var i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

module.exports = router;