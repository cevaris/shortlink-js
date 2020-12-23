import { Link } from '../types';
import { firebaseDb } from '../clients/firebaseClient';

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


// https://stackoverflow.com/a/1349426/3538289
const SlugChars: string = '0123456789abcdefghijklmnopqrstuvwxyz';
function newSlug(len: number) {
    var result = '';
    for (var i = 0; i < len; i++) {
        result += SlugChars.charAt(Math.floor(Math.random() * SlugChars.length));
    }

    return result;
    // if (Math.random() < 0.75) {
    //     return "duplug";
    // } else {
    //     return result;
    // }
}

export const linkDb = new LinkFirestore();