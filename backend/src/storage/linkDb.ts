import { Link } from '../types';
import { firebaseDb } from '../clients/firebaseClient';
import { newSlug } from './slug';

export interface LinkDb {
    insert(link: string): Promise<Link>
    get(slug: string): Promise<Link>
}

export class StorageNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, StorageNotFoundError.prototype);
    }
}

class LinkFirestore implements LinkDb {
    async insert(link: string): Promise<Link> {
        const slug = newSlug(6);
        const doc = firebaseDb.collection('links').doc(slug);
        const now = new Date();

        try {
            await doc.create({
                slug: slug,
                link: link,
                created_at: now,
            });

            return new Link(slug, link, now);
        } catch (error) {
            if (error.code === 6) {
                // Duplicate document, retry with different link
                return await this.insert(link);
            }
            throw error;
        }

    }

    async get(slug: string): Promise<Link> {
        const query = firebaseDb.collection('links').doc(slug)
        const doc = await query.get();

        const data = doc?.data();
        if (!doc.exists || !data) {
            throw new StorageNotFoundError(`slug "${slug}" not found`);
        }

        if (data.slug && data.link && data.created_at) {
            return new Link(data.slug, data.link, data.created_at.toDate());
        }

        throw Error(`link is missing data ${data}`);
    }
}

export const linkDb: LinkDb = new LinkFirestore();