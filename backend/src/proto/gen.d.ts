import * as $protobuf from "protobufjs";
/** Namespace com. */
export namespace com {

    /** Namespace company. */
    namespace company {

        /** Namespace links. */
        namespace links {

            /** Properties of a Link. */
            interface ILink {

                /** Link id */
                id?: (string|null);

                /** Link link */
                link?: (string|null);

                /** Link createdAtMs */
                createdAtMs?: (number|Long|null);
            }

            /** Represents a Link. */
            class Link implements ILink {

                /**
                 * Constructs a new Link.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: com.company.links.ILink);

                /** Link id. */
                public id: string;

                /** Link link. */
                public link: string;

                /** Link createdAtMs. */
                public createdAtMs: (number|Long);

                /**
                 * Creates a new Link instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Link instance
                 */
                public static create(properties?: com.company.links.ILink): com.company.links.Link;

                /**
                 * Encodes the specified Link message. Does not implicitly {@link com.company.links.Link.verify|verify} messages.
                 * @param message Link message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: com.company.links.ILink, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Link message, length delimited. Does not implicitly {@link com.company.links.Link.verify|verify} messages.
                 * @param message Link message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: com.company.links.ILink, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Link message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Link
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.company.links.Link;

                /**
                 * Decodes a Link message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Link
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.company.links.Link;

                /**
                 * Verifies a Link message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Link message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Link
                 */
                public static fromObject(object: { [k: string]: any }): com.company.links.Link;

                /**
                 * Creates a plain object from a Link message. Also converts values to other types if specified.
                 * @param message Link
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: com.company.links.Link, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Link to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a LinkCreateEvent. */
            interface ILinkCreateEvent {

                /** LinkCreateEvent link */
                link?: (com.company.links.ILink|null);
            }

            /** Represents a LinkCreateEvent. */
            class LinkCreateEvent implements ILinkCreateEvent {

                /**
                 * Constructs a new LinkCreateEvent.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: com.company.links.ILinkCreateEvent);

                /** LinkCreateEvent link. */
                public link?: (com.company.links.ILink|null);

                /**
                 * Creates a new LinkCreateEvent instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LinkCreateEvent instance
                 */
                public static create(properties?: com.company.links.ILinkCreateEvent): com.company.links.LinkCreateEvent;

                /**
                 * Encodes the specified LinkCreateEvent message. Does not implicitly {@link com.company.links.LinkCreateEvent.verify|verify} messages.
                 * @param message LinkCreateEvent message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: com.company.links.ILinkCreateEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified LinkCreateEvent message, length delimited. Does not implicitly {@link com.company.links.LinkCreateEvent.verify|verify} messages.
                 * @param message LinkCreateEvent message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: com.company.links.ILinkCreateEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LinkCreateEvent message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LinkCreateEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.company.links.LinkCreateEvent;

                /**
                 * Decodes a LinkCreateEvent message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LinkCreateEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.company.links.LinkCreateEvent;

                /**
                 * Verifies a LinkCreateEvent message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a LinkCreateEvent message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns LinkCreateEvent
                 */
                public static fromObject(object: { [k: string]: any }): com.company.links.LinkCreateEvent;

                /**
                 * Creates a plain object from a LinkCreateEvent message. Also converts values to other types if specified.
                 * @param message LinkCreateEvent
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: com.company.links.LinkCreateEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this LinkCreateEvent to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a LinkEvent. */
            interface ILinkEvent {

                /** LinkEvent linkCreateEvent */
                linkCreateEvent?: (com.company.links.ILinkCreateEvent|null);
            }

            /** Represents a LinkEvent. */
            class LinkEvent implements ILinkEvent {

                /**
                 * Constructs a new LinkEvent.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: com.company.links.ILinkEvent);

                /** LinkEvent linkCreateEvent. */
                public linkCreateEvent?: (com.company.links.ILinkCreateEvent|null);

                /** LinkEvent event. */
                public event?: "linkCreateEvent";

                /**
                 * Creates a new LinkEvent instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LinkEvent instance
                 */
                public static create(properties?: com.company.links.ILinkEvent): com.company.links.LinkEvent;

                /**
                 * Encodes the specified LinkEvent message. Does not implicitly {@link com.company.links.LinkEvent.verify|verify} messages.
                 * @param message LinkEvent message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: com.company.links.ILinkEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified LinkEvent message, length delimited. Does not implicitly {@link com.company.links.LinkEvent.verify|verify} messages.
                 * @param message LinkEvent message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: com.company.links.ILinkEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LinkEvent message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LinkEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.company.links.LinkEvent;

                /**
                 * Decodes a LinkEvent message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LinkEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.company.links.LinkEvent;

                /**
                 * Verifies a LinkEvent message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a LinkEvent message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns LinkEvent
                 */
                public static fromObject(object: { [k: string]: any }): com.company.links.LinkEvent;

                /**
                 * Creates a plain object from a LinkEvent message. Also converts values to other types if specified.
                 * @param message LinkEvent
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: com.company.links.LinkEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this LinkEvent to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }
}
