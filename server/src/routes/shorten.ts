import express from 'express';

const router = express.Router();

router.post('/shorten', (req: express.Request, res: express.Response) => {
    if (!req.query.link) {
        res.json({ success: false, message: 'missing link parameter' });
    }

    const link = req.query.link;
    console.log(`shortening ${link} link`);
    res.json({ success: true });
});

module.exports = router;