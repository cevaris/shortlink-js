import { Topic } from "@google-cloud/pubsub";
import { pubSubClient } from "../clients/pubsubClient";
import { EventLink, EventMessage, EventType, Link } from "../types";

export interface LinkPublisher {
    publishCreateEvent(event: EventLink): Promise<void>
}

export function toEvent(link: Link): EventMessage<EventLink> {
    return {
        type: EventType.Create,
        data: {
            id: link.id,
            link: link.link,
            created_at_ms: link.createdAt.getTime(),
        }
    }
}

class GooglePubSubLinkPublisher implements LinkPublisher {
    private publisher: Topic;

    constructor() {
        this.publisher = pubSubClient.topic('link_events_prod');
    }

    async publishCreateEvent(event: EventLink): Promise<void> {
        const messageId = await this.publisher.publishJSON(event);
        console.log('published', messageId);
    }
}

export const linkPublisher: LinkPublisher =
    new GooglePubSubLinkPublisher();