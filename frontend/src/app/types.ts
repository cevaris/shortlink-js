// export enum ApiKind {
//     Link = 'link',
//     Error = 'error',
// }

// export interface ApiLink {
//     id: string
//     createdAt: Date
//     link: string
// }

// export interface ApiResponse<T> {
//     data: T
//     kind: 'error' | 'link'
//     message?: string
// }

export interface ApiLink {
    id: string
    link: string
    created_at: string
}

export enum ApiLocationType {
    Parameter = 'parameter',
}

export interface ApiError {
    reason: string
    message: string
    locationType: ApiLocationType,
    location: string
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
        errors?: [ApiError]
    }
}