import { Topic } from "@google-cloud/pubsub";
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

class GooglePubSubLinkPublisher implements LinkPublisher {
    private publisher: Topic;

    constructor() {
        this.publisher = pubSubClient.topic('link_events_prod');
    }

    async publishCreateEvent(event: com.company.links.LinkCreateEvent): Promise<void> {
        const messageId = await this.publisher.publishJSON(event.toJSON());
        console.log('published', messageId);
    }
}

export const linkPublisher: LinkPublisher =
    new GooglePubSubLinkPublisher();