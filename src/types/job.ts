import type { DataItemSourceType, EncodedHdcaSourceId } from './dataset'

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

/**
 * JobSourceType
 * @description Available types of job sources (model classes) that produce dataset collections.
 * @enum {string}
 */
export type JobSourceType = 'Job' | 'ImplicitCollectionJobs' | 'WorkflowInvocation'
export interface JobMetric {
  /**
   * Name
   * @description The name of the metric variable.
   */
  name: string
  /**
   * Plugin
   * @description The instrumenter plugin that generated this metric.
   */
  plugin: string
  /**
   * Raw Value
   * @description The raw value of the metric as a string.
   */
  raw_value: string
  /**
   * Title
   * @description A descriptive title for this metric.
   */
  title: string
  /**
   * Value
   * @description The textual representation of the metric value.
   */
  value: string
};

export interface EncodedDatasetJobInfo {
  /**
   * Id
   * @example 0123456789ABCDEF
   */
  id: string
  /**
   * Source
   * @description The source of this dataset, either `hda`, `ldda`, `hdca`, `dce` or `dc` depending of its origin.
   */
  src: DataItemSourceType
  /**
   * UUID
   * @deprecated
   * @description Universal unique identifier for this dataset.
   */
  uuid?: string | null
};

export interface ShowFullJobResponse {
  /**
   * Command Line
   * @description The command line produced by the job. Users can see this value if allowed in the configuration, administrator can always see this value.
   */
  command_line?: string | null
  /**
   * Command Version
   * @description Tool version indicated during job execution.
   */
  command_version?: string | null
  /**
   * Copied from Job-ID
   * @description Reference to cached job if job execution was cached.
   */
  copied_from_job_id?: string | null
  /**
   * Create Time
   * Format: date-time
   * @description The time and date this item was created.
   */
  create_time: string
  /**
   * Job dependencies
   * @description The dependencies of the job.
   */
  dependencies?: Record<string, never>[] | null
  /**
   * Exit Code
   * @description The exit code returned by the tool. Can be unset if the job is not completed yet.
   */
  exit_code?: number | null
  /**
   * External ID
   * @description The job id used by the external job runner (Condor, Pulsar, etc.). Only administrator can see this value.
   */
  external_id?: string | null
  /**
   * Galaxy Version
   * @description The (major) version of Galaxy used to create this job.
   */
  galaxy_version?: string | null
  /**
   * Job Handler
   * @description The job handler process assigned to handle this job. Only administrator can see this value.
   */
  handler?: string | null
  /**
   * History ID
   * @description The encoded ID of the history associated with this item.
   */
  history_id?: string | null
  /**
   * Job ID
   * @example 0123456789ABCDEF
   */
  id: string
  /**
   * Inputs
   * @description Dictionary mapping all the tool inputs (by name) to the corresponding data references.
   * @default {}
   */
  inputs?: {
    [key: string]: EncodedDatasetJobInfo | undefined
  }
  /**
   * Job Messages
   * @description List with additional information and possible reasons for a failed job.
   */
  job_messages?: Record<string, never>[] | null
  /**
   * Job Metrics
   * @description Collections of metrics provided by `JobInstrumenter` plugins on a particular job. Only administrators can see these metrics.
   */
  job_metrics?: JobMetric[] | null
  /**
   * Job Runner Name
   * @description Name of the job runner plugin that handles this job. Only administrator can see this value.
   */
  job_runner_name?: string | null
  /**
   * Job Standard Error
   * @description The captured standard error of the job execution.
   */
  job_stderr?: string | null
  /**
   * Job Standard Output
   * @description The captured standard output of the job execution.
   */
  job_stdout?: string | null
  /**
   * Model class
   * @description The name of the database model class.
   * @constant
   * @enum {string}
   */
  model_class: 'Job'
  /**
   * Output collections
   * @default {}
   */
  output_collections?: {
    [key: string]: EncodedHdcaSourceId | undefined
  }
  /**
   * Outputs
   * @description Dictionary mapping all the tool outputs (by name) to the corresponding data references.
   * @default {}
   */
  outputs?: {
    [key: string]: EncodedDatasetJobInfo | undefined
  }
  /**
   * Parameters
   * @description Object containing all the parameters of the tool associated with this job. The specific parameters depend on the tool itself.
   */
  params: Record<string, never>
  /**
   * State
   * @description Current state of the job.
   */
  state: JobState
  /**
   * Standard Error
   * @description Combined tool and job standard error streams.
   */
  stderr?: string | null
  /**
   * Standard Output
   * @description Combined tool and job standard output streams.
   */
  stdout?: string | null
  /**
   * Tool ID
   * @description Identifier of the tool that generated this job.
   */
  tool_id: string
  /**
   * Tool Standard Error
   * @description The captured standard error of the tool executed by the job.
   */
  tool_stderr?: string | null
  /**
   * Tool Standard Output
   * @description The captured standard output of the tool executed by the job.
   */
  tool_stdout?: string | null
  /**
   * Update Time
   * Format: date-time
   * @description The last time and date this item was updated.
   */
  update_time: string
  /**
   * User Email
   * @description The email of the user that owns this job. Only the owner of the job and administrators can see this value.
   */
  user_email?: string | null
}
