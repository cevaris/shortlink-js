import { Link } from '../types';
import { dynamoDb } from './dynamoDb';

export interface LinkClient {
    insert(link: Link): Promise<any>
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

export const LinkClient = new LinkDynamoDb();



// export async function insertLink(link: Link) {
//     const params = {
//         TableName: 'shortlink',
//         Item: {
//             'key': { S: link.slug },
//             'link': { S: link.link }
//         }
//     };

//     const response = await dynamoDb.putItem(params).promise();
//     return response;
// }

// export async function getLink(slug: string) {
//     const params = {
//         TableName: 'shortlink',
//         Key: {
//             'key': { S: slug },
//         }
//     };

//     const response = await dynamoDb.getItem(params).promise();

//     const item = response.Item;

//     if (item && item.key.S && item.link.S) {
//         return new Link(item.key.S, item.link.S);
//     } else {
//         return Promise.reject(Error('failed to hydrate Link fields'));
//     }
// }