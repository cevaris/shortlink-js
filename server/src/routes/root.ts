import express from 'express';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.send('ShortLink is up!');
});

module.exports = router;