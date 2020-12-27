import { Link } from "./types";

type ApiLink = {
    id: string
    link: string
    created_at: string
}

export class LinkPresenter {
    static present(link: Link): ApiLink {
        return {
            id: link.id,
            link: link.link,
            created_at: link.createdAt.toISOString(),
        }
    }
}
