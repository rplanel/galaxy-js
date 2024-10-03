/* eslint-disable unused-imports/no-unused-vars */
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

const InvocationStates = [
  'new',
  'ready',
  'scheduled',
  'cancelled',
  'cancelling',
  'failed',
] as const

export type InvocationState = typeof InvocationStates[number]

const HistoryStates = [
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

export type Datamap = Record<`${number}`, { id: string, name: string, storage_object_id?: string }>

export type SrcInput = 'hda' | 'ldda' | 'ld' | 'hdca'

export type GalaxyWorkflowInput = Record<
  string,
  {
    id: string
    src: SrcInput
    uuid?: string
    dbid?: number
  }
>

export type GalaxyWorkflowParameters = Record<string, string | boolean>

// histories

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

// export interface GalaxyWorkflow {
//     id: string
//     steps: Record<`${number}`, {
//         id: string; type: string,
//         tool_id: string | null,
//         tool_version: string | null,
//         tool_inputs: Record<string, string>
//     }>;
// }

// invocations
export interface GalaxyInvocation {
  id: string
  state: InvocationState
}

export interface GalaxyWorkflow {
  model_class: string
  id: string
  name: string
  create_time: Date
  update_time: Date
  published: boolean
  importable: boolean
  deleted: boolean
  hidden: boolean
  tags: any[]
  latest_workflow_uuid: string
  url: string
  owner: string
  inputs: { [key: string]: WorkflowInput }
  annotation: string
  license: string | null
  creator: string | null
  source_metadata: string | null
  steps: { [key: string]: WorkflowStep }
  version: number
}

export interface WorkflowInput {
  label: string
  value: string
  uuid: string
}

export interface WorkflowStep {
  id: number
  type: string
  tool_id: null | string
  tool_version: null | string
  annotation: null | string
  tool_inputs: Record<string, any>
  input_steps: Record<string, WorkflowInputStep>
}

export interface WorkflowInputStep {
  source_step: number
  step_output: string
}

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

export type GalaxyToolParameters = GalaxySelectToolParameter | GalaxyBooleanToolParameter | GalaxyDataToolParameter

interface BaseToolParameter {
  name: string
  label: string
  argument: string | null
  help: string
  refresh_on_change: boolean
  optional: boolean
  hidden: boolean
  is_dynamic: boolean
}

export interface GalaxySelectToolParameter extends BaseToolParameter {
  model_class: 'SelectToolParameter'
  type: 'select'
  value: string
  options: Array<[string, string, boolean]>
  display: string | null
  multiple: boolean
  textable: boolean
}

export interface GalaxyBooleanToolParameter extends BaseToolParameter {
  model_class: 'BooleanToolParameter'
  type: 'boolean'
  value: string
  truevalue: string
  falsevalue: string
}

export interface GalaxyDataToolParameter extends BaseToolParameter {
  model_class: 'DataToolParameter'
  type: 'data'
  value: { values: { id: string, src: string }[] }
  extensions: string[]
  edam: {
    edam_formats: string[]
    edam_data: string[]
  }
  multiple: boolean
  options: {
    hda: {
      id: string
      hid: number
      name: string
      src: 'hda'
      keep: boolean
    }[]
    hdca: {
      id: string
      hid: number
      name: string
      src: 'hdca'
      keep: boolean

    }[]
  }
}

export interface GalaxyFloatToolParameter extends BaseToolParameter {
  model_class: 'FloatToolParameter'
  type: 'float'
  min: number
  max: number
  value: string
  area: boolean

}

export interface GalaxyConditionalCase {
  model_class: string
  value: string
  inputs: GalaxyToolParameters[]

}

export interface GalaxyConditionalParameter {
  cases: GalaxyConditionalCase[]
  model_class: 'Conditional'
  name: string
  test_param: any
  type: 'conditional'
}

export interface GalaxyToolOutput {
  model_class: 'ToolOutput'
  name: string
  format: string
  label: string
  hidden: boolean
  output_type: string
  count: number
}

export interface GalaxyTool {
  model_class: 'Tool'
  id: string
  version: string
  description: string
  edam_operations: string[]
  edam_topics: string[]
  tool_shed_repository: {
    name: string
    owner: string
    changeset_revision: string
    tool_shed: string
  }
  inputs: GalaxyToolParameters[]
  outputs: GalaxyToolOutput[]

}
