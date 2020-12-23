import { Link } from "./types";

type ApiLink = {
    slug: string
    link: string
    created_at: string
}

export class LinkPresenter {
    static present(link: Link): ApiLink {
        return {
            slug: link.slug,
            link: link.link,
            created_at: link.createdAt.toISOString(),
        }
    }
}
