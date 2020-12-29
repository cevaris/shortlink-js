import protobuf from "protobufjs";


export interface Link {
    id: string
    link: string
    createdAt: Date
}

export enum EventType {
    Create = 'create',
}

export interface EventLink {
    id: string
    link: string
    created_at_ms: number
}

export interface EventMessage<T> {
    type: EventType
    data: T
}