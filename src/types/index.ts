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
// Job

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

/*

{
  "model_class": "Job",
  "id": "fd95348bc1e381f8",
  "state": "error",
  "exit_code": 1,
  "update_time": "2024-10-03T09:13:12.386949",
  "create_time": "2024-10-03T09:11:28.818087",
  "galaxy_version": "22.05",
  "command_version": "",
  "tool_id": "toolshed.g2.bx.psu.edu/repos/rplanel/defense_finder/defense_finder/1.2.2+galaxy1",
  "history_id": "3e25ab37485f3bac",
  "params": {
    "coverage": "\"0.4\"",
    "db_type": "\"unordered\"",
    "models": "\"defense-finder-models_1.3.0\"",
    "no_cut_ga": "\"true\"",
    "preserve_raw": "\"true\"",
    "__workflow_invocation_uuid__": "\"789aee7e816711ef8d27005056b57508\"",
    "chromInfo": "\"/pasteur/zeus/projets/p00/galaxy-prod/galaxy-dist/tool-data/shared/ucsc/chrom/?.len\"",
    "dbkey": "\"?\"",
    "__input_ext": "\"input\""
  },
  "inputs": {
    "genome": {
      "id": "3ce3e2281e4506fb272a9be119dc4497",
      "src": "hda",
      "uuid": "bd687e8f-7fb5-443a-9ca5-f7c182c2718f"
    }
  },
  "outputs": {
    "genes": {
      "id": "3ce3e2281e4506fb3261cfb8780441ff",
      "src": "hda",
      "uuid": "aa848931-3884-4372-8997-f5acc2d7384f"
    },
    "hmmer": {
      "id": "3ce3e2281e4506fb734d6e7c14574e0e",
      "src": "hda",
      "uuid": "8acdb854-d52d-4a2b-89d4-897cc9a19040"
    },
    "systems": {
      "id": "3ce3e2281e4506fbb5eb79387e1ce0ea",
      "src": "hda",
      "uuid": "558f6ceb-14bc-4343-ab5b-87c53b3307d4"
    },
    "proteins": {
      "id": "3ce3e2281e4506fb74735bc6c9557021",
      "src": "hda",
      "uuid": "1e6fc9c5-0d94-4e0a-94a0-354638bcaac2"
    }
  },
  "output_collections": {},
  "tool_stdout": "",
  "tool_stderr": " 2024-10-03 11:12:00 | \u001b[32mINFO    \u001b[0m | \u001b[32mReceived file defense-finder-prot-sequences-input.fasta\u001b[0m\n 2024-10-03 11:12:00 | \u001b[32mINFO    \u001b[0m | \u001b[32mRunning DefenseFinder\u001b[0m\n 2024-10-03 11:12:23 | \u001b[32mINFO    \u001b[0m | \u001b[32mPost-treatment of the data\u001b[0m\nTraceback (most recent call last):\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/bin/defense-finder\", line 33, in <module>\n    sys.exit(load_entry_point('mdmparis-defense-finder==1.2.2', 'console_scripts', 'defense-finder')())\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/click/core.py\", line 1128, in __call__\n    return self.main(*args, **kwargs)\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/click/core.py\", line 1053, in main\n    rv = self.invoke(ctx)\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/click/core.py\", line 1659, in invoke\n    return _process_result(sub_ctx.command.invoke(sub_ctx))\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/click/core.py\", line 1395, in invoke\n    return ctx.invoke(self.callback, **ctx.params)\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/click/core.py\", line 754, in invoke\n    return __callback(*args, **kwargs)\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/mdmparis_defense_finder-1.2.2-py3.8.egg/defense_finder_cli/main.py\", line 149, in run\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/mdmparis_defense_finder-1.2.2-py3.8.egg/defense_finder_posttreat/__init__.py\", line 11, in run\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/mdmparis_defense_finder-1.2.2-py3.8.egg/defense_finder_posttreat/best_solution.py\", line 13, in get\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/mdmparis_defense_finder-1.2.2-py3.8.egg/defense_finder_posttreat/best_solution.py\", line 36, in parse_best_solution\nFileNotFoundError: [Errno 2] No such file or directory: '/pasteur/zeus/projets/p00/galaxy-prod/galaxy-dist/database/job_working_directory/005/239/5239741/working/out/defense-finder-tmp/DF_2/best_solution.tsv'\n",
  "job_stdout": "",
  "job_stderr": "/usr/share/misc/magic, 21623: Warning: `name\tpgpkey' entries can only be declared at top level\n/usr/share/misc/magic, 27403: Warning: using regular magic file `/usr/share/misc/bioinfo'\n/usr/share/misc/magic, 21623: Warning: `name\tpgpkey' entries can only be declared at top level\n/usr/share/misc/magic, 27403: Warning: using regular magic file `/usr/share/misc/bioinfo'\n",
  "stderr": " 2024-10-03 11:12:00 | \u001b[32mINFO    \u001b[0m | \u001b[32mReceived file defense-finder-prot-sequences-input.fasta\u001b[0m\n 2024-10-03 11:12:00 | \u001b[32mINFO    \u001b[0m | \u001b[32mRunning DefenseFinder\u001b[0m\n 2024-10-03 11:12:23 | \u001b[32mINFO    \u001b[0m | \u001b[32mPost-treatment of the data\u001b[0m\nTraceback (most recent call last):\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/bin/defense-finder\", line 33, in <module>\n    sys.exit(load_entry_point('mdmparis-defense-finder==1.2.2', 'console_scripts', 'defense-finder')())\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/click/core.py\", line 1128, in __call__\n    return self.main(*args, **kwargs)\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/click/core.py\", line 1053, in main\n    rv = self.invoke(ctx)\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/click/core.py\", line 1659, in invoke\n    return _process_result(sub_ctx.command.invoke(sub_ctx))\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/click/core.py\", line 1395, in invoke\n    return ctx.invoke(self.callback, **ctx.params)\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/click/core.py\", line 754, in invoke\n    return __callback(*args, **kwargs)\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/mdmparis_defense_finder-1.2.2-py3.8.egg/defense_finder_cli/main.py\", line 149, in run\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/mdmparis_defense_finder-1.2.2-py3.8.egg/defense_finder_posttreat/__init__.py\", line 11, in run\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/mdmparis_defense_finder-1.2.2-py3.8.egg/defense_finder_posttreat/best_solution.py\", line 13, in get\n  File \"/opt/gensoft/exe/defense-finder/1.2.2/venv/lib/python3.8/site-packages/mdmparis_defense_finder-1.2.2-py3.8.egg/defense_finder_posttreat/best_solution.py\", line 36, in parse_best_solution\nFileNotFoundError: [Errno 2] No such file or directory: '/pasteur/zeus/projets/p00/galaxy-prod/galaxy-dist/database/job_working_directory/005/239/5239741/working/out/defense-finder-tmp/DF_2/best_solution.tsv'\n\n/usr/share/misc/magic, 21623: Warning: `name\tpgpkey' entries can only be declared at top level\n/usr/share/misc/magic, 27403: Warning: using regular magic file `/usr/share/misc/bioinfo'\n/usr/share/misc/magic, 21623: Warning: `name\tpgpkey' entries can only be declared at top level\n/usr/share/misc/magic, 27403: Warning: using regular magic file `/usr/share/misc/bioinfo'\n",
  "stdout": "",
  "job_messages": [
    {
      "code_desc": "",
      "desc": "Fatal error: Exit code 1 ()",
      "error_level": 3,
      "exit_code": 1,
      "type": "exit_code"
    }
  ],
  "dependencies": []
}

*/
