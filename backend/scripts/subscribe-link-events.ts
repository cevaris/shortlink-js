#!/usr/bin/env ts-node

import { Message, PubSub } from '@google-cloud/pubsub';
import { logger } from '../src/logger';
import { decodeLinkEvent } from '../src/proto/conv';

function handler(message: Message): void {
    try {
        const linkEvent = decodeLinkEvent(message);

        logger.info('found', linkEvent.toJSON());

        // execute some additional logic, ex. crawl the web link and save HTML.
        // write to large scale offline datastore, ex. "Big Query" or "Hadoop".

        message.ack();
    } catch (error) {
        logger.error('could not decode message', message.id);
    }
}

const subscriberName = 'subscription_link_events_prod';
const pubSubClient = new PubSub();
const subscriber = pubSubClient
    .subscription(subscriberName);

subscriber.on('message', handler);
logger.info(`subscribed to ${subscriberName} ...`);