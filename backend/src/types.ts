export class Link {
    id: string;
    link: string;
    createdAt: Date;

    constructor(id: string, link: string, createdAt: Date) {
        this.id = id;
        this.link = link;
        this.createdAt = createdAt;
    }
}