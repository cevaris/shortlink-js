export enum ApiKind {
    Link = 'link',
    Error = 'error',
}

export interface ApiLink {
    id: string
    createdAt: Date
    link: string
}

export interface ApiResponse<T> {
    data: T
    kind: 'error' | 'link'
    message?: string
}