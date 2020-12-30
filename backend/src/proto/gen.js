/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.com = (function() {
    
        /**
         * Namespace com.
         * @exports com
         * @namespace
         */
        var com = {};
    
        com.company = (function() {
    
            /**
             * Namespace company.
             * @memberof com
             * @namespace
             */
            var company = {};
    
            company.links = (function() {
    
                /**
                 * Namespace links.
                 * @memberof com.company
                 * @namespace
                 */
                var links = {};
    
                links.Link = (function() {
    
                    /**
                     * Properties of a Link.
                     * @memberof com.company.links
                     * @interface ILink
                     * @property {string} id Link id
                     * @property {string} link Link link
                     * @property {number|Long} createdAtMs Link createdAtMs
                     */
    
                    /**
                     * Constructs a new Link.
                     * @memberof com.company.links
                     * @classdesc Represents a Link.
                     * @implements ILink
                     * @constructor
                     * @param {com.company.links.ILink=} [properties] Properties to set
                     */
                    function Link(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * Link id.
                     * @member {string} id
                     * @memberof com.company.links.Link
                     * @instance
                     */
                    Link.prototype.id = "";
    
                    /**
                     * Link link.
                     * @member {string} link
                     * @memberof com.company.links.Link
                     * @instance
                     */
                    Link.prototype.link = "";
    
                    /**
                     * Link createdAtMs.
                     * @member {number|Long} createdAtMs
                     * @memberof com.company.links.Link
                     * @instance
                     */
                    Link.prototype.createdAtMs = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                    /**
                     * Creates a new Link instance using the specified properties.
                     * @function create
                     * @memberof com.company.links.Link
                     * @static
                     * @param {com.company.links.ILink=} [properties] Properties to set
                     * @returns {com.company.links.Link} Link instance
                     */
                    Link.create = function create(properties) {
                        return new Link(properties);
                    };
    
                    /**
                     * Encodes the specified Link message. Does not implicitly {@link com.company.links.Link.verify|verify} messages.
                     * @function encode
                     * @memberof com.company.links.Link
                     * @static
                     * @param {com.company.links.ILink} message Link message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Link.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.link);
                        writer.uint32(/* id 3, wireType 0 =*/24).int64(message.createdAtMs);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified Link message, length delimited. Does not implicitly {@link com.company.links.Link.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.company.links.Link
                     * @static
                     * @param {com.company.links.ILink} message Link message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Link.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a Link message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.company.links.Link
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.company.links.Link} Link
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Link.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.company.links.Link();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.id = reader.string();
                                break;
                            case 2:
                                message.link = reader.string();
                                break;
                            case 3:
                                message.createdAtMs = reader.int64();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        if (!message.hasOwnProperty("id"))
                            throw $util.ProtocolError("missing required 'id'", { instance: message });
                        if (!message.hasOwnProperty("link"))
                            throw $util.ProtocolError("missing required 'link'", { instance: message });
                        if (!message.hasOwnProperty("createdAtMs"))
                            throw $util.ProtocolError("missing required 'createdAtMs'", { instance: message });
                        return message;
                    };
    
                    /**
                     * Decodes a Link message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.company.links.Link
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.company.links.Link} Link
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Link.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a Link message.
                     * @function verify
                     * @memberof com.company.links.Link
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Link.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (!$util.isString(message.id))
                            return "id: string expected";
                        if (!$util.isString(message.link))
                            return "link: string expected";
                        if (!$util.isInteger(message.createdAtMs) && !(message.createdAtMs && $util.isInteger(message.createdAtMs.low) && $util.isInteger(message.createdAtMs.high)))
                            return "createdAtMs: integer|Long expected";
                        return null;
                    };
    
                    /**
                     * Creates a Link message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.company.links.Link
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.company.links.Link} Link
                     */
                    Link.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.company.links.Link)
                            return object;
                        var message = new $root.com.company.links.Link();
                        if (object.id != null)
                            message.id = String(object.id);
                        if (object.link != null)
                            message.link = String(object.link);
                        if (object.createdAtMs != null)
                            if ($util.Long)
                                (message.createdAtMs = $util.Long.fromValue(object.createdAtMs)).unsigned = false;
                            else if (typeof object.createdAtMs === "string")
                                message.createdAtMs = parseInt(object.createdAtMs, 10);
                            else if (typeof object.createdAtMs === "number")
                                message.createdAtMs = object.createdAtMs;
                            else if (typeof object.createdAtMs === "object")
                                message.createdAtMs = new $util.LongBits(object.createdAtMs.low >>> 0, object.createdAtMs.high >>> 0).toNumber();
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a Link message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.company.links.Link
                     * @static
                     * @param {com.company.links.Link} message Link
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Link.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.id = "";
                            object.link = "";
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, false);
                                object.createdAtMs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.createdAtMs = options.longs === String ? "0" : 0;
                        }
                        if (message.id != null && message.hasOwnProperty("id"))
                            object.id = message.id;
                        if (message.link != null && message.hasOwnProperty("link"))
                            object.link = message.link;
                        if (message.createdAtMs != null && message.hasOwnProperty("createdAtMs"))
                            if (typeof message.createdAtMs === "number")
                                object.createdAtMs = options.longs === String ? String(message.createdAtMs) : message.createdAtMs;
                            else
                                object.createdAtMs = options.longs === String ? $util.Long.prototype.toString.call(message.createdAtMs) : options.longs === Number ? new $util.LongBits(message.createdAtMs.low >>> 0, message.createdAtMs.high >>> 0).toNumber() : message.createdAtMs;
                        return object;
                    };
    
                    /**
                     * Converts this Link to JSON.
                     * @function toJSON
                     * @memberof com.company.links.Link
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Link.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return Link;
                })();
    
                links.LinkCreateEvent = (function() {
    
                    /**
                     * Properties of a LinkCreateEvent.
                     * @memberof com.company.links
                     * @interface ILinkCreateEvent
                     * @property {com.company.links.ILink} link LinkCreateEvent link
                     */
    
                    /**
                     * Constructs a new LinkCreateEvent.
                     * @memberof com.company.links
                     * @classdesc Represents a LinkCreateEvent.
                     * @implements ILinkCreateEvent
                     * @constructor
                     * @param {com.company.links.ILinkCreateEvent=} [properties] Properties to set
                     */
                    function LinkCreateEvent(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * LinkCreateEvent link.
                     * @member {com.company.links.ILink} link
                     * @memberof com.company.links.LinkCreateEvent
                     * @instance
                     */
                    LinkCreateEvent.prototype.link = null;
    
                    /**
                     * Creates a new LinkCreateEvent instance using the specified properties.
                     * @function create
                     * @memberof com.company.links.LinkCreateEvent
                     * @static
                     * @param {com.company.links.ILinkCreateEvent=} [properties] Properties to set
                     * @returns {com.company.links.LinkCreateEvent} LinkCreateEvent instance
                     */
                    LinkCreateEvent.create = function create(properties) {
                        return new LinkCreateEvent(properties);
                    };
    
                    /**
                     * Encodes the specified LinkCreateEvent message. Does not implicitly {@link com.company.links.LinkCreateEvent.verify|verify} messages.
                     * @function encode
                     * @memberof com.company.links.LinkCreateEvent
                     * @static
                     * @param {com.company.links.ILinkCreateEvent} message LinkCreateEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    LinkCreateEvent.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        $root.com.company.links.Link.encode(message.link, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified LinkCreateEvent message, length delimited. Does not implicitly {@link com.company.links.LinkCreateEvent.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.company.links.LinkCreateEvent
                     * @static
                     * @param {com.company.links.ILinkCreateEvent} message LinkCreateEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    LinkCreateEvent.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a LinkCreateEvent message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.company.links.LinkCreateEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.company.links.LinkCreateEvent} LinkCreateEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    LinkCreateEvent.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.company.links.LinkCreateEvent();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.link = $root.com.company.links.Link.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        if (!message.hasOwnProperty("link"))
                            throw $util.ProtocolError("missing required 'link'", { instance: message });
                        return message;
                    };
    
                    /**
                     * Decodes a LinkCreateEvent message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.company.links.LinkCreateEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.company.links.LinkCreateEvent} LinkCreateEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    LinkCreateEvent.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a LinkCreateEvent message.
                     * @function verify
                     * @memberof com.company.links.LinkCreateEvent
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    LinkCreateEvent.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        {
                            var error = $root.com.company.links.Link.verify(message.link);
                            if (error)
                                return "link." + error;
                        }
                        return null;
                    };
    
                    /**
                     * Creates a LinkCreateEvent message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.company.links.LinkCreateEvent
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.company.links.LinkCreateEvent} LinkCreateEvent
                     */
                    LinkCreateEvent.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.company.links.LinkCreateEvent)
                            return object;
                        var message = new $root.com.company.links.LinkCreateEvent();
                        if (object.link != null) {
                            if (typeof object.link !== "object")
                                throw TypeError(".com.company.links.LinkCreateEvent.link: object expected");
                            message.link = $root.com.company.links.Link.fromObject(object.link);
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a LinkCreateEvent message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.company.links.LinkCreateEvent
                     * @static
                     * @param {com.company.links.LinkCreateEvent} message LinkCreateEvent
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    LinkCreateEvent.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.link = null;
                        if (message.link != null && message.hasOwnProperty("link"))
                            object.link = $root.com.company.links.Link.toObject(message.link, options);
                        return object;
                    };
    
                    /**
                     * Converts this LinkCreateEvent to JSON.
                     * @function toJSON
                     * @memberof com.company.links.LinkCreateEvent
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    LinkCreateEvent.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return LinkCreateEvent;
                })();
    
                links.LinkEvent = (function() {
    
                    /**
                     * Properties of a LinkEvent.
                     * @memberof com.company.links
                     * @interface ILinkEvent
                     * @property {com.company.links.ILinkCreateEvent|null} [linkCreateEvent] LinkEvent linkCreateEvent
                     */
    
                    /**
                     * Constructs a new LinkEvent.
                     * @memberof com.company.links
                     * @classdesc Represents a LinkEvent.
                     * @implements ILinkEvent
                     * @constructor
                     * @param {com.company.links.ILinkEvent=} [properties] Properties to set
                     */
                    function LinkEvent(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * LinkEvent linkCreateEvent.
                     * @member {com.company.links.ILinkCreateEvent|null|undefined} linkCreateEvent
                     * @memberof com.company.links.LinkEvent
                     * @instance
                     */
                    LinkEvent.prototype.linkCreateEvent = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * LinkEvent event.
                     * @member {"linkCreateEvent"|undefined} event
                     * @memberof com.company.links.LinkEvent
                     * @instance
                     */
                    Object.defineProperty(LinkEvent.prototype, "event", {
                        get: $util.oneOfGetter($oneOfFields = ["linkCreateEvent"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new LinkEvent instance using the specified properties.
                     * @function create
                     * @memberof com.company.links.LinkEvent
                     * @static
                     * @param {com.company.links.ILinkEvent=} [properties] Properties to set
                     * @returns {com.company.links.LinkEvent} LinkEvent instance
                     */
                    LinkEvent.create = function create(properties) {
                        return new LinkEvent(properties);
                    };
    
                    /**
                     * Encodes the specified LinkEvent message. Does not implicitly {@link com.company.links.LinkEvent.verify|verify} messages.
                     * @function encode
                     * @memberof com.company.links.LinkEvent
                     * @static
                     * @param {com.company.links.ILinkEvent} message LinkEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    LinkEvent.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.linkCreateEvent != null && Object.hasOwnProperty.call(message, "linkCreateEvent"))
                            $root.com.company.links.LinkCreateEvent.encode(message.linkCreateEvent, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified LinkEvent message, length delimited. Does not implicitly {@link com.company.links.LinkEvent.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof com.company.links.LinkEvent
                     * @static
                     * @param {com.company.links.ILinkEvent} message LinkEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    LinkEvent.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a LinkEvent message from the specified reader or buffer.
                     * @function decode
                     * @memberof com.company.links.LinkEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {com.company.links.LinkEvent} LinkEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    LinkEvent.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.company.links.LinkEvent();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.linkCreateEvent = $root.com.company.links.LinkCreateEvent.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a LinkEvent message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof com.company.links.LinkEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {com.company.links.LinkEvent} LinkEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    LinkEvent.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a LinkEvent message.
                     * @function verify
                     * @memberof com.company.links.LinkEvent
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    LinkEvent.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.linkCreateEvent != null && message.hasOwnProperty("linkCreateEvent")) {
                            properties.event = 1;
                            {
                                var error = $root.com.company.links.LinkCreateEvent.verify(message.linkCreateEvent);
                                if (error)
                                    return "linkCreateEvent." + error;
                            }
                        }
                        return null;
                    };
    
                    /**
                     * Creates a LinkEvent message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof com.company.links.LinkEvent
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {com.company.links.LinkEvent} LinkEvent
                     */
                    LinkEvent.fromObject = function fromObject(object) {
                        if (object instanceof $root.com.company.links.LinkEvent)
                            return object;
                        var message = new $root.com.company.links.LinkEvent();
                        if (object.linkCreateEvent != null) {
                            if (typeof object.linkCreateEvent !== "object")
                                throw TypeError(".com.company.links.LinkEvent.linkCreateEvent: object expected");
                            message.linkCreateEvent = $root.com.company.links.LinkCreateEvent.fromObject(object.linkCreateEvent);
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a LinkEvent message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof com.company.links.LinkEvent
                     * @static
                     * @param {com.company.links.LinkEvent} message LinkEvent
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    LinkEvent.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (message.linkCreateEvent != null && message.hasOwnProperty("linkCreateEvent")) {
                            object.linkCreateEvent = $root.com.company.links.LinkCreateEvent.toObject(message.linkCreateEvent, options);
                            if (options.oneofs)
                                object.event = "linkCreateEvent";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this LinkEvent to JSON.
                     * @function toJSON
                     * @memberof com.company.links.LinkEvent
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    LinkEvent.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return LinkEvent;
                })();
    
                return links;
            })();
    
            return company;
        })();
    
        return com;
    })();

    return $root;
});
