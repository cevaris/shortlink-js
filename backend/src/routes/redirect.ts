import express from 'express';
import { config } from '../config';
import { linkDb, StorageNotFoundError } from '../storage/linkDb';

const router = express.Router();

router.get('/:id', async (req: express.Request, res: express.Response) => {
    const id: string = req.params.id.toString();

    try {
        const link = await linkDb.get(id);
        return res.redirect(link.link);
    } catch (error) {
        if (error instanceof StorageNotFoundError) {
            const message = `link "${id}" not found`;
            return res.redirect(`${config.frontendDomain}?flash=${message}`);
        }

        return res.redirect(`${config.frontendDomain}?flash=${error.message}`);
    }
});
module.exports = router;