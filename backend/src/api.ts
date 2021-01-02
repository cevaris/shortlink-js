import { Link } from "../tests/types";

export interface ApiLink {
    id: string
    link: string
    created_at: string
}

export enum ApiKind {
    Link = 'link',
}

export enum ApiLocation {
    Link = 'link',
    Limit = 'limit',
    Token = 'token',
}

export enum ApiLocationType {
    Parameter = 'parameter',
}

export enum ApiReason {
    Error = 'error',
    Invalid = 'invalid',
    NotFound = 'notFound',
    Required = 'required',
}

export interface ApiError {
    reason: ApiReason
    message: string
    location_type?: ApiLocationType,
    location?: ApiLocation
}

export interface ApiResponse<T> {
    data?: {
        kind: ApiKind
        next_page_token?: string | null
        items: Array<T>
    }
    error?: {
        code: number
        message: string
        errors: [ApiError]
    }
}

export function toApiLink(link: Link): ApiLink {
    return {
        id: link.id,
        link: link.link,
        created_at: link.createdAt.toISOString(),
    }
}