import { DatasetStates } from './dataset.js'
import { HistoryStates } from './history'
import { InvocationStates } from './invocation'
import { JobStates } from './job'

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
  ...DatasetStates,
  ...HistoryStates,
  ...InvocationStates,
  ...JobStates,
] as const

export type GalaxyState = typeof GalaxyStates[number]

export * from './dataset'
export * from './history'
export * from './invocation'
export * from './job'
export * from './tool'
export * from './workflow'
