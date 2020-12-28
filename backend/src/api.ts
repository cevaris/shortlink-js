import { Link } from "./types";

export interface ApiLink {
    id: string
    link: string
    created_at: string
}

export enum ApiKind {
    Link = 'link',
}

export interface ApiResponse<T> {
    data?: {
        kind: string
        items: [T]
    }
    error?: {
        code: number
        message?: string
        errors?: {}
    }
}

export function toApiLink(link: Link): ApiLink {
    return {
        id: link.id,
        link: link.link,
        created_at: link.createdAt.toISOString(),
    }
}

