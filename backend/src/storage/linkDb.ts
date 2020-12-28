import { firebaseDb } from '../clients/firebaseClient';
import { Timestamp } from "@google-cloud/firestore";
import { Link } from '../types';
import { newId } from './id';

export interface LinkDb {
    create(link: string): Promise<Link>
    get(id: string): Promise<Link>
}

export class StorageNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, StorageNotFoundError.prototype);
    }
}

// internal firestore representation of Link 
interface RecordLink {
    id: string
    link: string
    created_at: Timestamp
}

class LinkFirestore implements LinkDb {
    async create(link: string): Promise<Link> {
        const id = newId(6);
        const doc = firebaseDb.collection('links').doc(id);
        const now = new Date();

        try {
            const record: RecordLink = {
                id: id,
                link: link,
                created_at: Timestamp.fromDate(now),
            };
            // throw Error('intentionally breaking database create.')
            await doc.create(record);

            return toLink(record);
        } catch (error) {
            if (error.code === 6) {
                // Duplicate document, retry with different link
                return await this.create(link);
            }
            throw error;
        }

    }

    async get(id: string): Promise<Link> {
        const query = firebaseDb.collection('links').doc(id)
        const doc = await query.get();

        if (!doc.exists || !doc.data()) {
            throw new StorageNotFoundError(`link id "${id}" not found`);
        }

        const record = doc.data() as RecordLink;

        if (record.id && record.link && record.created_at) {
            return toLink(record);
        }

        throw Error(`link is missing data ${record}`);
    }
}

function toLink(record: RecordLink): Link {
    return {
        id: record.id,
        link: record.link,
        createdAt: record.created_at.toDate(),
    }
}

export const linkDb: LinkDb = new LinkFirestore();