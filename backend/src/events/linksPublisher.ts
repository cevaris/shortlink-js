import { Topic } from "@google-cloud/pubsub";
import { Long as LongJS } from 'long';
import { pubSubClient } from "../clients/pubsubClient";
import { com } from "../proto/gen";
import { Link } from "../types";

export interface LinkPublisher {
    publishCreateEvent(event: com.company.links.LinkCreateEvent): Promise<void>
}

export function toLinkCreateEvent(link: Link): com.company.links.LinkCreateEvent {
    return com.company.links.LinkCreateEvent.create({
        link: com.company.links.Link.create({
            id: link.id,
            link: link.link,
            createdAtMs: link.createdAt.getTime(),
        }),
    });
}

export function toLink(event: com.company.links.LinkCreateEvent): Link {
    // https://github.com/dcodeIO/long.js/blob/master/tests/index.js
    const createdAtMs: number = typeof event.link.createdAtMs === 'number' ?
        event.link.createdAtMs :
        (<LongJS>event.link.createdAtMs).toNumber();

    return {
        id: event.link.id,
        link: event.link.link,
        createdAt: new Date(createdAtMs),
    }
}

class GooglePubSubLinkPublisher implements LinkPublisher {
    private publisher: Topic;

    constructor() {
        this.publisher = pubSubClient.topic('link_events_prod');
    }

    async publishCreateEvent(event: com.company.links.LinkCreateEvent): Promise<void> {
        const linkEvent = com.company.links.LinkEvent.create({
            linkCreateEvent: event
        });
        return this.publishLinkEvent(linkEvent);
    }

    async publishLinkEvent(event: com.company.links.LinkEvent): Promise<void> {
        const buffer = com.company.links.LinkEvent.encode(event).finish();
        const messageId = await this.publisher.publish(Buffer.from(buffer));
        console.log('published', messageId);
        // return Promise.resolve();
    }
}

export const linkPublisher: LinkPublisher =
    new GooglePubSubLinkPublisher();