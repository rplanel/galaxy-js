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

export const GalaxyStates = [
  'new',
  'upload',
  'queued',
  'running',
  'ok',
  'empty',
  'error',
  'paused',
  'setting_metadata',
  'failed_metadata',
  'deferred',
  'discarded',
  'cancelled',
  'failed',
  'scheduled',
  'ready',
  'cancelling',
  'deleted',
  'deleting',
  'resubmitted',
  'waiting',
  'stop',
  'stopped',
  'skipped',
] as const

// export const GalaxyStates = a as const

export type GalaxyState = typeof GalaxyStates[number]

export * from './dataset'
export * from './history'
export * from './invocation'
export * from './job'
export * from './tool'
export * from './workflow'
