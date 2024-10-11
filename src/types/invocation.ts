import type { JobState } from './job'

export const InvocationTerminalStates = [
  'cancelled',
  'failed',
  'scheduled',
]

export const InvocationStates = [
  ...InvocationTerminalStates,
  'new',
  'ready',
  'cancelling',
] as const

export type InvocationState = typeof InvocationStates[number]
export type InvocationTerminalState = typeof InvocationTerminalStates[number]

export interface GalaxyInvocationStep {
  model_class: 'WorkflowInvocationStep'
  id: string
  update_time: string
  job_id: null | string
  workflow_step_id: string
  state: JobState
  order_index: number
  workflow_step_label: string
  workflow_step_uuid: string

}

export interface GalaxyInvocationIO {
  id: string
  src: string
  label: string
  workflow_step_id: string

}

export interface GalaxyInvocationOuput {

}
export interface GalaxyInvocation {
  model_class: 'WorkflowInvocation'
  id: string
  state: InvocationState
  update_time: string
  create_time: string
  workflow_id: string
  history_id: string
  uuid: string
  steps: GalaxyInvocationStep[]
  inputs: Record<string, GalaxyInvocationIO>
  outputs: Record<string, GalaxyInvocationIO>

}
