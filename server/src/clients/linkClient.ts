import { Link } from '../types';
import { dynamoDb } from './dynamoDb';

export async function insertLink(link: Link) {
    const params = {
        TableName: 'shortlink',
        Item: {
            'key': { S: link.slug },
            'link': { S: link.link }
        }
    };

    const response = await dynamoDb.putItem(params).promise();
    return response;
}

export async function getLink(slug: string) {
    const params = {
        TableName: 'shortlink',
        Key: {
            'key': { S: slug },
        }
    };

    const response = await dynamoDb.getItem(params).promise();

    const item = response.Item;

    if (item && item.key.S && item.link.S) {
        return new Link(item.key.S, item.link.S);
    } else {
        return Promise.reject(Error('failed to hydrate Link fields'));
    }
}