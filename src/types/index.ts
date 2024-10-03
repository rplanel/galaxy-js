export interface GalaxyVersion {
  version_major: string
  version_minor: string
}

export interface ErrorWithMessage {
  message: string
}

export interface ErrorWithStatus {
  statusCode: number
}

export type Datamap = Record<`${number}`, { id: string, name: string, storage_object_id?: string }>

export * from './dataset'
export * from './history'
export * from './invocation'
export * from './job'
export * from './tool'
export * from './workflow'
