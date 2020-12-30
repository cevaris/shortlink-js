import { Message } from "@google-cloud/pubsub";
import { LinkCreateEvent, LinkEvent } from ".";
import { Link as LinkProto } from "../proto";
import { Link } from "../types";

/**
 * Verifies and decodes Message bytes into LinkEvent.
 * 
 * @param {Message} message message to be converted.
 * @returns {LinkEvent} decoded from Message.
 */
export function decodeLinkEvent(message: Message): LinkEvent {
    const errMessage = LinkEvent.verify(message);
    if (errMessage) throw Error(errMessage);

    return LinkEvent.decode(message.data);
}

/**
 * @param {LinkEvent} event event to be converted.
 * @returns {Buffer} bytes of event.
 */
export function encodeLikeEvent(event: LinkEvent): Buffer {
    const bytes = LinkEvent.encode(event).finish();
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
 * @param {Link} event event to be converted.
 * @returns {LinkCreateEvent} converted from Link.
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
 * @param {LinkCreateEvent} event event to be converted.
 * @returns {Link} converted from LinkCreateEvent.
 */
export function toLink(event: LinkCreateEvent): Link {
    // https://github.com/dcodeIO/long.js/blob/master/tests/index.js
    return {
        id: event.link.id,
        link: event.link.link,
        createdAt: new Date(longToNumber(event.link.createdAtMs)),
    }
}
