import express from 'express';

const router = express.Router();

router.post('/shorten', (req: express.Request, res: express.Response) => {
    if (!req.query.link) {
        res.json({ success: false, message: 'missing link parameter' });
    }

    const link = req.query.link;
    console.log(`shortening ${link} link`);

    // TODO: choose random slug
    // TODO: persist slug in some DB
    // TODO: return slug in JSON

    res.json({ success: true });
});

module.exports = router;