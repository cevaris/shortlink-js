import { com } from "./gen";

// export type proto = com.company.links;
export const proto = com.company.links;

export module proto {
    export type LinkCreateEvent = com.company.links.LinkCreateEvent;
    export type LinkEvent = com.company.links.LinkEvent;
    export type Link = com.company.links.Link;
}

// export type LinkCreateEvent = com.company.links.LinkCreateEvent;
// export type LinkEvent = com.company.links.LinkEvent;
// export type Link = com.company.links.Link;

// export const LinkCreateEvent = com.company.links.LinkCreateEvent;
// export const LinkEvent = com.company.links.LinkEvent;
// export const Link = com.company.links.Link;