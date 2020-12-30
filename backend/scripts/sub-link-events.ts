#!/usr/bin/env ts-node

import { Message } from '@google-cloud/pubsub';
import { decodeLinkEvent, linkSubscriber } from '../src/events/linksSubscriber';

function handler(message: Message): void {
    try {
        const linkEvent = decodeLinkEvent(message);
        console.log('found', linkEvent.toJSON());

        // write to "Big Query" or some other large scale offline datastore

        message.ack();
    } catch (error) {
        console.error('could not decode message', message.id);
    }
}

linkSubscriber.subscribe(handler);
console.log('subscribed...');