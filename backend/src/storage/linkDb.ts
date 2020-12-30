import { DocumentReference, GrpcStatus, Timestamp, Transaction } from "@google-cloud/firestore";
import { firebaseDb } from '../clients/firebaseClient';
import { Link } from '../types';
import { newId } from './id';

type SideEffect<T> = (t: T) => Promise<void>

export interface LinkDb {
    create(linkUrl: string, sideEffect: SideEffect<Link>): Promise<Link>
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

    /**
     * @see {Link}
     * This is a complex function:
     * - Constructs Link.
     * - Persists Link.
     * - Executes side effects function on Link.
     * - Handles duplicate document id.
     * - If creating or side effect logic throws, create is rolled back.
     * 
     * @param linkUrl URL to create Link for.
     * @param sideEffect Function containing side effects to execute after link is persisted.
     */
    async create(linkUrl: string, sideEffect: SideEffect<Link>): Promise<Link> {
        try {
            return await firebaseDb.runTransaction<Link>(
                async (transaction: Transaction) => {
                    const id: string = newId(6);
                    const doc: DocumentReference = firebaseDb.collection('links').doc(id);
                    const now: Date = new Date();

                    const record: RecordLink = {
                        id: id,
                        link: linkUrl,
                        created_at: Timestamp.fromDate(now),
                    };

                    transaction.create(doc, record);

                    const link: Link = toLink(record);

                    // If sideEffect throw, transaction is rolled back
                    await sideEffect(link);

                    return link;
                });
        } catch (error) {
            if (error.code === GrpcStatus.ALREADY_EXISTS) {
                // Duplicate document id found, retry with different id
                return await this.create(linkUrl, sideEffect);
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