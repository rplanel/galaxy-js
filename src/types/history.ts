export const HistoryStates = [
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
] as const

export type HistoryState = typeof HistoryStates[number]

export type HistoryStateIds = {
  [K in typeof HistoryStates[number]]: string[]
}

export type HistoryStateDetails = {
  [K in typeof HistoryStates[number]]: number
}

export interface GalaxyHistoryDetailed {
  model_class: 'History'
  id: string
  name: string
  deleted: boolean
  purged: boolean
  published: boolean
  annotation: string
  tags: string[]
  contents_url: string
  size: number
  user_id: string
  create_time: string
  update_time: string
  importable: boolean
  slug: string | null
  username_and_slug: string | null
  genome_build: string | null
  state: HistoryState
  state_ids: HistoryStateIds
  state_details: HistoryStateDetails
  hid_counter: number
  empty: boolean
}
