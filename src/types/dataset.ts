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
  outputs: { id: string }[]
  jobs: { id: string, state: DatasetState[] }
}
