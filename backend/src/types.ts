export class Link {
    slug: string;
    link: string;
    createdAt: Date;

    constructor(slug: string, link: string, createdAt: Date) {
        this.slug = slug;
        this.link = link;
        this.createdAt = createdAt;
    }
}