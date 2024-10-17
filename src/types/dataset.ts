import type { JobState } from './job'

export const DatasetsTerminalStates = [
  'ok',
  'empty',
  'error',
  'discarded',
  'failed_metadata',
] as const

export const DatasetStates = [
  ...DatasetsTerminalStates,
  'new',
  'upload',
  'queued',
  'running',
  'paused',
  'setting_metadata',
  'deferred',
] as const

export type DatasetState = typeof DatasetStates[number]
export type DatasetTerminalState = typeof DatasetsTerminalStates[number]

export interface HDASummary {
  id: string
  name: string
  history_id: string
  hid: number
  history_content_type: 'dataset' | 'dataset_collection'
  deleted: boolean
  visible: boolean
  type_id: string
  type: string
  create_time: string
  update_time: string
  tags: string[]
  dataset_id: string
  state: DatasetState
  extension: string
  purged: boolean
}

export interface GalaxyDataset {
  dataset_id: string
  type: string
  extension: string
  purged: boolean
  deleted: boolean
  name: string
  file_size: number
  tags: string[]
  resubmitted: boolean
  create_time: string
  state: DatasetState
  creating_job: string
  visible: boolean
  history_id: string
  accessible: boolean
  uuid: string

}

export interface GalaxyUploadedDataset {
  outputs: {
    id: string
    uuid: string
    hid: number
    file_ext: string
    model_class: 'HistoryDatasetAssociation'
    name: string
    deleted: boolean
    purged: boolean
    visible: boolean
    state: DatasetState
    file_size: number
    create_time: string
    update_time: string
    history_id: string
  }[]
  jobs: {
    model_class: 'Job'
    id: string
    state: JobState
    exit_code: number | null
    update_time: string
    create_time: string
    galaxy_version: string
    tool_id: '__DATA_FETCH__'
    history_id: string
  }[]
}
