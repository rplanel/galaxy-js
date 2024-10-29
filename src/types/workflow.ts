import type { GalaxyToolParameters } from './tool'

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
  type: string
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
  id: number
  type: 'tool' | 'data_input' | 'parameter_input' | 'data_collection_input'
  tool_id: null | string
  tool_version: null | string
  annotation: null | string
  label: null | string
  name: string
  input_connections: Record<string, { id: number, output_name: string } | object>
  inputs: Array<GalaxyToolParameters>
  outputs: Array<{ name: string, type: string }>
  tool_shed_repository: {
    changeset_revision: string
    name: string
    owner: string
    tool_shed: string
  }
  uuid: string
  workflow_outputs: Array<{ label: string | null, output_name: string, uuid: string }>
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
