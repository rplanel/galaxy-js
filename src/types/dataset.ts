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
  outputs: { id: string, uuid: string }[]
  jobs: { id: string, state: DatasetState[] }
}

/*

{
  "dataset_id": "3ce3e2281e4506fb809a84c2644d582d",
  "misc_blurb": "0 lines",
  "hda_ldda": "hda",
  "type": "file",
  "extension": "macsyfinder",
  "tags": [],
  "purged": false,
  "type_id": "dataset-3ce3e2281e4506fbd55b250ab26b303b",
  "validated_state": "unknown",
  "validated_state_message": null,
  "resubmitted": false,
  "file_ext": "macsyfinder",
  "deleted": false,
  "name": "summary output,CapsuleFinder on data 602",
  "file_size": 0,
  "uuid": "13b6f98b-ddc1-4bcd-9a18-baf18fed67bd",
  "meta_files": [],
  "history_content_type": "dataset",
  "created_from_basename": "macsyfinder.json",
  "peek": null,
  "url": "/api/histories/ad45c8439c784fe1/contents/3ce3e2281e4506fbd55b250ab26b303b",
  "copied_from_ldda_id": null,
  "annotation": null,
  "download_url": "/api/histories/ad45c8439c784fe1/contents/3ce3e2281e4506fbd55b250ab26b303b/display",
  "misc_info": "MacSyFinder's results will be stored in capsules_output_dir\nAnalysis launched on /pasteur/zeus/projets/p00/galaxy-prod/galaxy-dist/database/files/011/374/dataset_11374311.dat for system(s):\n\t- ABC\n\n************************************\n Analyzing clusters",
  "sources": [],
  "genome_build": "?",
  "api_type": "file",
  "display_types": [],
  "display_apps": [],
  "id": "3ce3e2281e4506fbd55b250ab26b303b",
  "create_time": "2024-09-16T09:10:31.764324",
  "hid": 4040,
  "state": "ok",
  "creating_job": "29302d0be122f591",
  "visible": false,
  "data_type": "abc.Text",
  "hashes": [],
  "update_time": "2024-09-16T09:15:16.066147",
  "rerunnable": true,
  "history_id": "ad45c8439c784fe1",
  "model_class": "HistoryDatasetAssociation",
  "accessible": true,
  "metadata_dbkey": "?",
  "metadata_data_lines": 0
}

*/
