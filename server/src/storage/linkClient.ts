import { Link } from '../types';
import { firebaseDb } from '../clients/firebase';

export interface LinkClient {
    insert(link: string): Promise<Link>
    get(slug: string): Promise<Link>
}

class LinkFirestore implements LinkClient {
    async insert(link: string): Promise<Link> {
        const slug = newSlug(6);
        const doc = firebaseDb.collection('links').doc(slug);

        try {
            await doc.create({
                slug: slug,
                link: link,
            });

            return new Link(slug, link);
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
        if (!data) {
            return Promise.reject(Error(`link not found for slug=${slug}`));
        }

        if (data.slug && data.link) {
            return new Link(data.slug, data.link);
        }

        return Promise.reject(Error(`link is missing data ${data}`));
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

export const linkClient = new LinkFirestore();