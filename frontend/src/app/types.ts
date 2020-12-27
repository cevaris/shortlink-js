export enum ApiKind {
    Link = 'link',
    Error = 'error',
}

export interface ApiLink {
    createdAt: Date
    link: string
    slug: string
}

export interface ApiResponse<T> {
    data: T
    kind: 'error' | 'link'
    message?: string
}