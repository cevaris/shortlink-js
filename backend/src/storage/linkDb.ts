import { Link } from '../types';
import { firebaseDb } from '../clients/firebaseClient';
import { newId } from './id';

export interface LinkDb {
    insert(link: string): Promise<Link>
    get(id: string): Promise<Link>
}

export class StorageNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, StorageNotFoundError.prototype);
    }
}

class LinkFirestore implements LinkDb {
    async insert(link: string): Promise<Link> {
        const id = newId(6);
        const doc = firebaseDb.collection('links').doc(id);
        const now = new Date();

        try {
            await doc.create({
                id: id,
                link: link,
                created_at: now,
            });

            return new Link(id, link, now);
        } catch (error) {
            if (error.code === 6) {
                // Duplicate document, retry with different link
                return await this.insert(link);
            }
            throw error;
        }

    }

    async get(id: string): Promise<Link> {
        const query = firebaseDb.collection('links').doc(id)
        const doc = await query.get();

        const data = doc?.data();
        if (!doc.exists || !data) {
            throw new StorageNotFoundError(`id "${id}" not found`);
        }

        if (data.id && data.link && data.created_at) {
            return new Link(data.id, data.link, data.created_at.toDate());
        }

        throw Error(`link is missing data ${data}`);
    }
}

export const linkDb: LinkDb = new LinkFirestore();