export class Link {
    slug: string;
    link: string;
    shortLink: string;

    constructor(slug: string, link: string) {
        this.slug = slug;
        this.link = link;
    }
}