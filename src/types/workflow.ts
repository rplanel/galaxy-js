import type { GalaxyToolParameters, GalaxyToolParameterValue } from './tool'

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

export type WorkflowStepType = 'data_input' | 'parameter_input' | 'data_collection_input' | 'tool'

export interface WorkflowInput {
  label: string
  value: string
  uuid: string
}

export type GalaxyWorkflowParameters = Record<string, string | boolean>

export interface WorkflowInputStep {
  source_step: number
  step_output: string
}

export interface WorkflowStep {
  id: number
  type: WorkflowStepType
  tool_id: null | string
  tool_version: null | string
  annotation: null | string
  tool_inputs: Record<string, any>
  input_steps: Record<string, WorkflowInputStep>
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

export interface WorkflowStepExport {
  annotation?: string
  step_index: number
  step_label: string
  step_name: string
  step_version: string
  step_type: WorkflowStepType
}

export interface WorkflowStepDataExport extends WorkflowStepExport {
  step_type: Extract<WorkflowStepType, 'data_input'>
}
// parameter_input
export interface WorkflowStepParameterExport extends WorkflowStepExport {
  step_type: Extract<WorkflowStepType, 'parameter_input'>
}
export interface WorkflowStepDataCollectionExport extends WorkflowStepExport {
  step_type: Extract<WorkflowStepType, 'data_collection_input'>
}

export interface WorkflowStepToolExport extends WorkflowStepExport {
  id: string
  step_type: Extract<WorkflowStepType, 'tool'>
  action: string
  citation: boolean
  creator: null | string
  display: boolean
  description: string
  edam_operations: string[]
  edam_topics: string[]
  enctype: string
  help: string
  history_id: string
  is_workflow_compatible: boolean
  license: string | null
  model_class: string
  label: null | string
  name: string
  requirements: { name: string, version: string | null }[]
  sharable_url: string
  tool_shed_repository: {
    changeset_revision: string
    name: string
    owner: string
    tool_shed: string
  }
  version: string
  versions: string[]
  inputs: GalaxyToolParameters[]
  state_inputs: Record<
    string,
    Record<
      string,
      GalaxyToolParameterValue
    >
  >

}

export interface GalaxyWorkflowExport {
  'a_galaxy_workflow': boolean
  'format-version': string
  'id': string
  'name': string
  'tags': any[]
  'annotation': string
  'steps': { [key: string]: WorkflowStepExport }
  'version': number

}
