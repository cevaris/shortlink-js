import { Topic } from "@google-cloud/pubsub";
import { pubSubClient } from "../clients/pubsubClient";
import { proto } from "../proto";
import { encodeLikeEvent } from "../proto/conv";

export interface LinkPublisher {
    publishCreateEvent(event: proto.LinkCreateEvent): Promise<void>
}

class GooglePubSubLinkPublisher implements LinkPublisher {
    private publisher: Topic;

    constructor() {
        this.publisher = pubSubClient.topic('link_events_prod');
    }

    async publishCreateEvent(event: proto.LinkCreateEvent): Promise<void> {
        const linkEvent: proto.LinkEvent = proto.LinkEvent.create({
            linkCreateEvent: event
        });
        return this.publishLinkEvent(linkEvent);
    }

    async publishLinkEvent(event: proto.LinkEvent): Promise<void> {
        const buffer: Buffer = encodeLikeEvent(event);
        const messageId: string = await this.publisher.publish(buffer);
        console.log('published', messageId);
    }
}

export const linkPublisher: LinkPublisher =
    new GooglePubSubLinkPublisher();