export type GalaxyToolParameters = GalaxySelectToolParameter
  | GalaxyBooleanToolParameter
  | GalaxyDataToolParameter
  | GalaxyConditionalParameter

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
  test_param: GalaxyToolParameters
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
