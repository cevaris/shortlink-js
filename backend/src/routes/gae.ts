import express from 'express';

const router = express.Router();

// Routes starting with /_ah/* are intentionally ignored express.
// See https://stackoverflow.com/a/53606500/3538289
router.get('/^(?!.*_ah).*$/', (req: express.Request, res: express.Response) => { });

module.exports = router;