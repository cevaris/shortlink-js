import { Message } from "@google-cloud/pubsub";
import { proto } from "../proto";
import { Link } from "../../tests/types";

/**
 * Verifies and decodes Message bytes into LinkEvent.
 * 
 * @param {Message} message message to be converted.
 * @returns {LinkEvent} decoded from Message.
 */
export function decodeLinkEvent(message: Message): proto.LinkEvent {
    const errMessage = proto.LinkEvent.verify(message);
    if (errMessage) throw Error(errMessage);

    return proto.LinkEvent.decode(message.data);
}

/**
 * @param {proto.LinkEvent} event event to be converted.
 * @returns {Buffer} bytes of event.
 */
export function encodeLikeEvent(event: proto.LinkEvent): Buffer {
    const bytes = proto.LinkEvent.encode(event).finish();
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
 * @returns {proto.LinkCreateEvent} converted from Link.
 */
export function toLinkCreateEvent(link: Link): proto.LinkCreateEvent {
    return proto.LinkCreateEvent.create({
        link: proto.Link.create({
            id: link.id,
            link: link.link,
            createdAtMs: link.createdAt.getTime(),
        }),
    });
}

/**
 * @param {proto.LinkCreateEvent} event event to be converted.
 * @returns {Link} converted from LinkCreateEvent.
 */
export function toLink(event: proto.LinkCreateEvent): Link {
    // https://github.com/dcodeIO/long.js/blob/master/tests/index.js
    return {
        id: event.link.id,
        link: event.link.link,
        createdAt: new Date(longToNumber(event.link.createdAtMs)),
    }
}
