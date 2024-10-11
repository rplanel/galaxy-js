export const JobTerminalStates = [
  'deleted',
  'deleting',
  'error',
  'ok',
] as const

export const JobStates = [
  ...JobTerminalStates,
  'new',
  'resubmitted',
  'upload',
  'waiting',
  'queued',
  'running',
  'failed',
  'paused',
  'stop',
  'stopped',
  'skipped',
] as const

export type JobState = typeof JobStates[number]
export type JobTerminalState = typeof JobTerminalStates[number]

export interface GalaxyJob {
  model_class: 'Job'
  id: string
  history_id: string
  tool_id: string
  exit_code: number
  state: JobState
  create_time: string
  update_time: string
  params: Record<string, any>
  stdout: string
  stderr: string

}
