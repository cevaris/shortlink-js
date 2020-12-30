import { Message } from "@google-cloud/pubsub";
import { LinkCreateEvent } from ".";
import { Link as LinkProto } from "../proto";
import { Link } from "../types";
import { com } from "./gen";

export function decodeLinkEvent(message: Message): com.company.links.LinkEvent {
    const errMessage = com.company.links.LinkEvent.verify(message);
    if (errMessage) throw Error(errMessage);

    return com.company.links.LinkEvent.decode(message.data);
}

export function encodeLikeEvent(linkEvent: com.company.links.LinkEvent): Buffer {
    const bytes = com.company.links.LinkEvent.encode(linkEvent).finish();
    return Buffer.from(bytes);
}

export function longToNumber(value: number | Long.Long): number {
    if (typeof value === 'number') {
        return value;
    } else {
        return (<Long>value).toNumber();
    }
}

/**
 * Typescript Link -> Proto LinkCreateEvent
 */
export function toLinkCreateEvent(link: Link): LinkCreateEvent {
    return LinkCreateEvent.create({
        link: LinkProto.create({
            id: link.id,
            link: link.link,
            createdAtMs: link.createdAt.getTime(),
        }),
    });
}

/**
 * Proto LinkCreateEvent -> Typescript Link
 */
export function toLink(event: LinkCreateEvent): Link {
    // https://github.com/dcodeIO/long.js/blob/master/tests/index.js
    return {
        id: event.link.id,
        link: event.link.link,
        createdAt: new Date(longToNumber(event.link.createdAtMs)),
    }
}
