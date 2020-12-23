import { Link } from '../types';
import { dynamoDb } from './dynamoDb';
import { firebaseDb } from './firebase';

export interface LinkClient {
    insert(link: Link): Promise<void>
    get(slug: string): Promise<Link>
}

class LinkDynamoDb implements LinkClient {
    private TableName = 'shortlink';

    async insert(link: Link): Promise<void> {
        const params = {
            TableName: this.TableName,
            Item: {
                'key': { S: link.slug },
                'link': { S: link.link }
            }
        };

        const result = await dynamoDb.putItem(params).promise();
        if (result.$response.error) {
            throw result.$response.error;
        }
    }

    async get(slug: string): Promise<Link> {
        const params = {
            TableName: this.TableName,
            Key: {
                'key': { S: slug },
            }
        };

        const response = await dynamoDb.getItem(params).promise();
        const item = response.Item;

        if (!item) {
            return Promise.reject(Error(`link not found for slug=${slug}`));
        }

        if (item.key.S && item.link.S) {
            return new Link(item.key.S, item.link.S);
        }

        return Promise.reject(Error(`link is missing data ${item}`));
    }

}

class LinkFirestore implements LinkClient {
    async insert(link: Link): Promise<void> {
        const doc = firebaseDb.collection('links').doc(link.slug);
        await doc.set({
            slug: link.slug,
            link: link.link,
        });
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

export const linkClient = new LinkFirestore();