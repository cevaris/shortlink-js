import express from 'express';

const router = express.Router();

router.get('/:shortLink', (req: express.Request, res: express.Response) => {
    const shortLink: string = req.params.shortLink;
    console.log(`expanding ${shortLink} link`);

    // TODO: query db for shortlink
    // TODO: return expanded shortLink data in JSON

    res.json({
        success: true,
        data: { short_link: shortLink, link: 'http://TODO.com' }
    });
});

module.exports = router;