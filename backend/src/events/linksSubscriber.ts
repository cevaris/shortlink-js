import { Message, Subscription } from "@google-cloud/pubsub";
import { pubSubClient } from "../clients/pubsubClient";
import { com } from "../proto/gen";

export interface LinkSubscriber {
    subscribe(handler: (message: Message) => void): void
}

class GoogleSubscriberLink implements LinkSubscriber {
    private subscriber: Subscription;

    constructor() {
        this.subscriber = pubSubClient.subscription(
            'subscription_link_events_prod'
        );
    }

    subscribe(handler: (message: Message) => void): void {
        this.subscriber.on('message', handler);
    }
}

export function decodeLinkEvent(message: Message): com.company.links.LinkEvent {
    const errMessage = com.company.links.LinkEvent.verify(message);
    if (errMessage) throw Error(errMessage);

    return com.company.links.LinkEvent.decode(message.data);
}

export const linkSubscriber: LinkSubscriber =
    new GoogleSubscriberLink();