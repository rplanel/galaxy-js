interface DisplayApp {
    /**
     * Label
     * @description The label or title of the Display Application.
     */
    label: string;
    /**
     * Links
     * @description The collection of link details for this Display Application.
     */
    links: Hyperlink[];
}

declare const JobTerminalStates: readonly ["deleted", "deleting", "error", "ok"];
declare const JobStates: readonly ["deleted", "deleting", "error", "ok", "new", "resubmitted", "upload", "waiting", "queued", "running", "failed", "paused", "stop", "stopped", "skipped"];
type JobState = typeof JobStates[number];
type JobTerminalState = typeof JobTerminalStates[number];
/**
 * JobSourceType
 * @description Available types of job sources (model classes) that produce dataset collections.
 * @enum {string}
 */
type JobSourceType = 'Job' | 'ImplicitCollectionJobs' | 'WorkflowInvocation';
interface JobMetric {
    /**
     * Name
     * @description The name of the metric variable.
     */
    name: string;
    /**
     * Plugin
     * @description The instrumenter plugin that generated this metric.
     */
    plugin: string;
    /**
     * Raw Value
     * @description The raw value of the metric as a string.
     */
    raw_value: string;
    /**
     * Title
     * @description A descriptive title for this metric.
     */
    title: string;
    /**
     * Value
     * @description The textual representation of the metric value.
     */
    value: string;
}
interface EncodedDatasetJobInfo {
    /**
     * Id
     * @example 0123456789ABCDEF
     */
    id: string;
    /**
     * Source
     * @description The source of this dataset, either `hda`, `ldda`, `hdca`, `dce` or `dc` depending of its origin.
     */
    src: DataItemSourceType;
    /**
     * UUID
     * @deprecated
     * @description Universal unique identifier for this dataset.
     */
    uuid?: string | null;
}
interface ShowFullJobResponse {
    /**
     * Command Line
     * @description The command line produced by the job. Users can see this value if allowed in the configuration, administrator can always see this value.
     */
    command_line?: string | null;
    /**
     * Command Version
     * @description Tool version indicated during job execution.
     */
    command_version?: string | null;
    /**
     * Copied from Job-ID
     * @description Reference to cached job if job execution was cached.
     */
    copied_from_job_id?: string | null;
    /**
     * Create Time
     * Format: date-time
     * @description The time and date this item was created.
     */
    create_time: string;
    /**
     * Job dependencies
     * @description The dependencies of the job.
     */
    dependencies?: Record<string, never>[] | null;
    /**
     * Exit Code
     * @description The exit code returned by the tool. Can be unset if the job is not completed yet.
     */
    exit_code?: number | null;
    /**
     * External ID
     * @description The job id used by the external job runner (Condor, Pulsar, etc.). Only administrator can see this value.
     */
    external_id?: string | null;
    /**
     * Galaxy Version
     * @description The (major) version of Galaxy used to create this job.
     */
    galaxy_version?: string | null;
    /**
     * Job Handler
     * @description The job handler process assigned to handle this job. Only administrator can see this value.
     */
    handler?: string | null;
    /**
     * History ID
     * @description The encoded ID of the history associated with this item.
     */
    history_id?: string | null;
    /**
     * Job ID
     * @example 0123456789ABCDEF
     */
    id: string;
    /**
     * Inputs
     * @description Dictionary mapping all the tool inputs (by name) to the corresponding data references.
     * @default {}
     */
    inputs?: {
        [key: string]: EncodedDatasetJobInfo | undefined;
    };
    /**
     * Job Messages
     * @description List with additional information and possible reasons for a failed job.
     */
    job_messages?: Record<string, never>[] | null;
    /**
     * Job Metrics
     * @description Collections of metrics provided by `JobInstrumenter` plugins on a particular job. Only administrators can see these metrics.
     */
    job_metrics?: JobMetric[] | null;
    /**
     * Job Runner Name
     * @description Name of the job runner plugin that handles this job. Only administrator can see this value.
     */
    job_runner_name?: string | null;
    /**
     * Job Standard Error
     * @description The captured standard error of the job execution.
     */
    job_stderr?: string | null;
    /**
     * Job Standard Output
     * @description The captured standard output of the job execution.
     */
    job_stdout?: string | null;
    /**
     * Model class
     * @description The name of the database model class.
     * @constant
     * @enum {string}
     */
    model_class: 'Job';
    /**
     * Output collections
     * @default {}
     */
    output_collections?: {
        [key: string]: EncodedHdcaSourceId | undefined;
    };
    /**
     * Outputs
     * @description Dictionary mapping all the tool outputs (by name) to the corresponding data references.
     * @default {}
     */
    outputs?: {
        [key: string]: EncodedDatasetJobInfo | undefined;
    };
    /**
     * Parameters
     * @description Object containing all the parameters of the tool associated with this job. The specific parameters depend on the tool itself.
     */
    params: Record<string, never>;
    /**
     * State
     * @description Current state of the job.
     */
    state: JobState;
    /**
     * Standard Error
     * @description Combined tool and job standard error streams.
     */
    stderr?: string | null;
    /**
     * Standard Output
     * @description Combined tool and job standard output streams.
     */
    stdout?: string | null;
    /**
     * Tool ID
     * @description Identifier of the tool that generated this job.
     */
    tool_id: string;
    /**
     * Tool Standard Error
     * @description The captured standard error of the tool executed by the job.
     */
    tool_stderr?: string | null;
    /**
     * Tool Standard Output
     * @description The captured standard output of the tool executed by the job.
     */
    tool_stdout?: string | null;
    /**
     * Update Time
     * Format: date-time
     * @description The last time and date this item was updated.
     */
    update_time: string;
    /**
     * User Email
     * @description The email of the user that owns this job. Only the owner of the job and administrators can see this value.
     */
    user_email?: string | null;
}

/**
 * TagCollection
 * @description Represents the collection of tags associated with an item.
 */
type TagCollection = string[];

/**
 * HashFunctionNames
 * @description Hash function names that can be used to generate checksums for datasets.
 * @enum {string}
 */
type HashFunctionNames = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512';

type Visualization = Record<string, never>;

declare const DatasetsTerminalStates: readonly ["ok", "empty", "error", "discarded", "failed_metadata"];
declare const DatasetStates: readonly ["ok", "empty", "error", "discarded", "failed_metadata", "new", "upload", "queued", "running", "paused", "setting_metadata", "deferred"];
/**
 * DatasetValidatedState
 * @enum {string}
 */
type DatasetValidatedState = 'unknown' | 'invalid' | 'ok';
type DataItemSourceType = 'hda' | 'ldda' | 'hdca' | 'dce' | 'dc';
type DatasetSourceType = 'hda' | 'ldda';
type DatasetState = typeof DatasetStates[number];
type DatasetTerminalState = typeof DatasetsTerminalStates[number];
type HistoryContentsResult = HDACustom | HDADetailed | HDASummary | HDAInaccessible | HDCACustom | HDCADetailed | HDCASummary;
/**
 * HDASummary
 * @description History Dataset Association summary information.
 */
interface HDASummary {
    /** Copied From Ldda Id */
    copied_from_ldda_id?: string | null;
    /**
     * Create Time
     * @description The time and date this item was created.
     */
    create_time: string | null;
    /**
     * Dataset ID
     * @description The encoded ID of the dataset associated with this item.
     * @example 0123456789ABCDEF
     */
    dataset_id: string;
    /**
     * Deleted
     * @description Whether this item is marked as deleted.
     */
    deleted: boolean;
    /**
     * Extension
     * @description The extension of the dataset.
     */
    extension: string | null;
    /**
     * Genome Build
     * @description TODO
     * @default ?
     */
    genome_build?: string | null;
    /**
     * HID
     * @description The index position of this item in the History.
     */
    hid: number;
    /**
     * History Content Type
     * @description This is always `dataset` for datasets.
     * @constant
     * @enum {string}
     */
    history_content_type: 'dataset';
    /**
     * History ID
     * @example 0123456789ABCDEF
     */
    history_id: string;
    /**
     * Id
     * @example 0123456789ABCDEF
     */
    id: string;
    /**
     * Name
     * @description The name of the item.
     */
    name: string | null;
    /**
     * Purged
     * @description Whether this dataset has been removed from disk.
     */
    purged: boolean;
    /**
     * State
     * @description The current state of this dataset.
     */
    state: DatasetState;
    tags: TagCollection;
    /**
     * Type
     * @description The type of this item.
     */
    type: string;
    /**
     * Type - ID
     * @description The type and the encoded ID of this item. Used for caching.
     */
    type_id?: string | null;
    /**
     * Update Time
     * @description The last time and date this item was updated.
     */
    update_time: string | null;
    /**
     * URL
     * @deprecated
     * @description The relative URL to access this item.
     */
    url: string;
    /**
     * Visible
     * @description Whether this item is visible or hidden to the user by default.
     */
    visible: boolean;
}
interface HDACustom {
    /**
     * Accessible
     * @description Whether this item is accessible to the current user due to permissions.
     */
    accessible?: boolean | null;
    /**
     * Annotation
     * @description An annotation to provide details or to help understand the purpose and usage of this item.
     */
    annotation?: string | null;
    /**
     * API Type
     * @deprecated
     * @description TODO
     */
    api_type?: 'file' | null;
    /**
     * Copied From History Dataset Association Id
     * @description ID of HDA this HDA was copied from.
     */
    copied_from_history_dataset_association_id?: string | null;
    /** Copied From Ldda Id */
    copied_from_ldda_id?: string | null;
    /**
     * Create Time
     * @description The time and date this item was created.
     */
    create_time?: string | null;
    /**
     * Created from basename
     * @description The basename of the output that produced this dataset.
     */
    created_from_basename?: string | null;
    /**
     * Creating Job ID
     * @description The encoded ID of the job that created this dataset.
     */
    creating_job?: string | null;
    /**
     * Data Type
     * @description The fully qualified name of the class implementing the data type of this dataset.
     */
    data_type?: string | null;
    /**
     * Dataset ID
     * @description The encoded ID of the dataset associated with this item.
     * @example 0123456789ABCDEF
     */
    dataset_id?: string;
    /**
     * Deleted
     * @description Whether this item is marked as deleted.
     */
    deleted?: boolean | null;
    /**
     * Display Applications
     * @description Contains new-style display app urls.
     */
    display_apps?: DisplayApp[] | null;
    /**
     * Legacy Display Applications
     * @description Contains old-style display app urls.
     */
    display_types?: DisplayApp[] | null;
    /**
     * Download URL
     * @description The URL to download this item from the server.
     */
    download_url?: string | null;
    /**
     * DRS ID
     * @description The DRS ID of the dataset.
     */
    drs_id?: string | null;
    /**
     * Extension
     * @description The extension of the dataset.
     */
    extension?: string | null;
    /**
     * File extension
     * @description The extension of the file.
     */
    file_ext?: string | null;
    /**
     * File Name
     * @description The full path to the dataset file.
     */
    file_name?: string | null;
    /**
     * File Size
     * @description The file size in bytes.
     */
    file_size?: number | null;
    /**
     * Genome Build
     * @description TODO
     */
    genome_build?: string | null;
    /**
     * Hashes
     * @description The list of hashes associated with this dataset.
     */
    hashes?: DatasetHash[] | null;
    /**
     * HDA or LDDA
     * @description Whether this dataset belongs to a history (HDA) or a library (LDDA).
     */
    hda_ldda?: DatasetSourceType | null;
    /**
     * HID
     * @description The index position of this item in the History.
     */
    hid?: number | null;
    /**
     * History Content Type
     * @description This is always `dataset` for datasets.
     */
    history_content_type?: 'dataset' | null;
    /**
     * History ID
     * @example 0123456789ABCDEF
     */
    history_id?: string;
    /**
     * Id
     * @example 0123456789ABCDEF
     */
    id?: string;
    /**
     * Metadata Files
     * @description Collection of metadata files associated with this dataset.
     */
    meta_files?: MetadataFile[] | null;
    /**
     * Metadata
     * @description The metadata associated with this dataset.
     */
    metadata?: Record<string, never> | null;
    /**
     * Miscellaneous Blurb
     * @description TODO
     */
    misc_blurb?: string | null;
    /**
     * Miscellaneous Information
     * @description TODO
     */
    misc_info?: string | null;
    /**
     * Model class
     * @description The name of the database model class.
     * @constant
     */
    model_class?: 'HistoryDatasetAssociation';
    /**
     * Name
     * @description The name of the item.
     */
    name?: string | null;
    /**
     * Peek
     * @description A few lines of contents from the start of the file.
     */
    peek?: string | null;
    /**
     * Permissions
     * @description Role-based access and manage control permissions for the dataset.
     */
    permissions?: DatasetPermissions | null;
    /**
     * Purged
     * @description Whether this dataset has been removed from disk.
     */
    purged?: boolean | null;
    /**
     * Rerunnable
     * @description Whether the job creating this dataset can be run again.
     */
    rerunnable?: boolean | null;
    /**
     * Resubmitted
     * @description Whether the job creating this dataset has been resubmitted.
     */
    resubmitted?: boolean | null;
    /**
     * Sources
     * @description The list of sources associated with this dataset.
     */
    sources?: DatasetSource[] | null;
    /**
     * State
     * @description The current state of this dataset.
     */
    state?: DatasetState | null;
    tags?: TagCollection | null;
    /**
     * Type
     * @description This is always `file` for datasets.
     */
    type?: 'file' | null;
    /**
     * Type - ID
     * @description The type and the encoded ID of this item. Used for caching.
     */
    type_id?: string | null;
    /**
     * Update Time
     * @description The last time and date this item was updated.
     */
    update_time?: string | null;
    /**
     * URL
     * @deprecated
     * @description The relative URL to access this item.
     */
    url?: string | null;
    /** Uuid */
    uuid?: string | null;
    /**
     * Validated State
     * @description The state of the datatype validation for this dataset.
     */
    validated_state?: DatasetValidatedState | null;
    /**
     * Validated State Message
     * @description The message with details about the datatype validation result for this dataset.
     */
    validated_state_message?: string | null;
    /**
     * Visible
     * @description Whether this item is visible or hidden to the user by default.
     */
    visible?: boolean | null;
    /**
     * Visualizations
     * @description The collection of visualizations that can be applied to this dataset.
     */
    visualizations?: Visualization[] | null;
    [key: string]: unknown | undefined;
}
/**
 * HDADetailed
 * @description History Dataset Association detailed information.
 */
interface HDADetailed {
    /**
     * Accessible
     * @description Whether this item is accessible to the current user due to permissions.
     */
    accessible: boolean;
    /**
     * Annotation
     * @description An annotation to provide details or to help understand the purpose and usage of this item.
     */
    annotation: string | null;
    /**
     * API Type
     * @deprecated
     * @description TODO
     * @default file
     * @constant
     * @enum {string}
     */
    api_type?: 'file';
    /**
     * Copied From History Dataset Association Id
     * @description ID of HDA this HDA was copied from.
     */
    copied_from_history_dataset_association_id?: string | null;
    /** Copied From Ldda Id */
    copied_from_ldda_id?: string | null;
    /**
     * Create Time
     * @description The time and date this item was created.
     */
    create_time: string | null;
    /**
     * Created from basename
     * @description The basename of the output that produced this dataset.
     */
    created_from_basename?: string | null;
    /**
     * Creating Job ID
     * @description The encoded ID of the job that created this dataset.
     */
    creating_job: string;
    /**
     * Data Type
     * @description The fully qualified name of the class implementing the data type of this dataset.
     */
    data_type: string;
    /**
     * Dataset ID
     * @description The encoded ID of the dataset associated with this item.
     * @example 0123456789ABCDEF
     */
    dataset_id: string;
    /**
     * Deleted
     * @description Whether this item is marked as deleted.
     */
    deleted: boolean;
    /**
     * Display Applications
     * @description Contains new-style display app urls.
     */
    display_apps: DisplayApp;
    /**
     * Legacy Display Applications
     * @description Contains old-style display app urls.
     */
    display_types: DisplayApp[];
    /**
     * Download URL
     * @description The URL to download this item from the server.
     */
    download_url: string;
    /**
     * DRS ID
     * @description The DRS ID of the dataset.
     */
    drs_id: string;
    /**
     * Extension
     * @description The extension of the dataset.
     */
    extension: string | null;
    /**
     * File extension
     * @description The extension of the file.
     */
    file_ext: string;
    /**
     * File Name
     * @description The full path to the dataset file.
     */
    file_name?: string | null;
    /**
     * File Size
     * @description The file size in bytes.
     */
    file_size: number;
    /**
     * Genome Build
     * @description TODO
     * @default ?
     */
    genome_build?: string | null;
    /**
     * Hashes
     * @description The list of hashes associated with this dataset.
     */
    hashes: DatasetHash[];
    /**
     * HDA or LDDA
     * @description Whether this dataset belongs to a history (HDA) or a library (LDDA).
     * @default hda
     */
    hda_ldda?: DatasetSourceType;
    /**
     * HID
     * @description The index position of this item in the History.
     */
    hid: number;
    /**
     * History Content Type
     * @description This is always `dataset` for datasets.
     * @constant
     * @enum {string}
     */
    history_content_type: 'dataset';
    /**
     * History ID
     * @example 0123456789ABCDEF
     */
    history_id: string;
    /**
     * Id
     * @example 0123456789ABCDEF
     */
    id: string;
    /**
     * Metadata Files
     * @description Collection of metadata files associated with this dataset.
     */
    meta_files: MetadataFile[];
    /**
     * Metadata
     * @description The metadata associated with this dataset.
     */
    metadata?: Record<string, never> | null;
    /**
     * Miscellaneous Blurb
     * @description TODO
     */
    misc_blurb?: string | null;
    /**
     * Miscellaneous Information
     * @description TODO
     */
    misc_info?: string | null;
    /**
     * Model class
     * @description The name of the database model class.
     * @constant
     * @enum {string}
     */
    model_class: 'HistoryDatasetAssociation';
    /**
     * Name
     * @description The name of the item.
     */
    name: string | null;
    /**
     * Peek
     * @description A few lines of contents from the start of the file.
     */
    peek?: string | null;
    /**
     * Permissions
     * @description Role-based access and manage control permissions for the dataset.
     */
    permissions: DatasetPermissions;
    /**
     * Purged
     * @description Whether this dataset has been removed from disk.
     */
    purged: boolean;
    /**
     * Rerunnable
     * @description Whether the job creating this dataset can be run again.
     */
    rerunnable: boolean;
    /**
     * Resubmitted
     * @description Whether the job creating this dataset has been resubmitted.
     */
    resubmitted: boolean;
    /**
     * Sources
     * @description The list of sources associated with this dataset.
     */
    sources: DatasetSource[];
    /**
     * State
     * @description The current state of this dataset.
     */
    state: DatasetState;
    tags: TagCollection;
    /**
     * Type
     * @description This is always `file` for datasets.
     * @default file
     * @constant
     * @enum {string}
     */
    type?: 'file';
    /**
     * Type - ID
     * @description The type and the encoded ID of this item. Used for caching.
     */
    type_id?: string | null;
    /**
     * Update Time
     * @description The last time and date this item was updated.
     */
    update_time: string | null;
    /**
     * URL
     * @deprecated
     * @description The relative URL to access this item.
     */
    url: string;
    /**
     * UUID
     * Format: uuid4
     * @description Universal unique identifier for this dataset.
     */
    uuid: string;
    /**
     * Validated State
     * @description The state of the datatype validation for this dataset.
     */
    validated_state: DatasetValidatedState;
    /**
     * Validated State Message
     * @description The message with details about the datatype validation result for this dataset.
     */
    validated_state_message?: string | null;
    /**
     * Visible
     * @description Whether this item is visible or hidden to the user by default.
     */
    visible: boolean;
}
/**
 * HDAInaccessible
 * @description History Dataset Association information when the user can not access it.
 */
interface HDAInaccessible {
    /**
     * Accessible
     * @constant
     * @enum {boolean}
     */
    accessible: false;
    /** Copied From Ldda Id */
    copied_from_ldda_id?: string | null;
    /**
     * Create Time
     * @description The time and date this item was created.
     */
    create_time: string | null;
    /**
     * Deleted
     * @description Whether this item is marked as deleted.
     */
    deleted: boolean;
    /**
     * HID
     * @description The index position of this item in the History.
     */
    hid: number;
    /**
     * History Content Type
     * @description This is always `dataset` for datasets.
     * @constant
     * @enum {string}
     */
    history_content_type: 'dataset';
    /**
     * History ID
     * @example 0123456789ABCDEF
     */
    history_id: string;
    /**
     * Id
     * @example 0123456789ABCDEF
     */
    id: string;
    /**
     * Name
     * @description The name of the item.
     */
    name: string | null;
    /**
     * State
     * @description The current state of this dataset.
     */
    state: DatasetState;
    tags: TagCollection;
    /**
     * Type
     * @description The type of this item.
     */
    type: string;
    /**
     * Type - ID
     * @description The type and the encoded ID of this item. Used for caching.
     */
    type_id?: string | null;
    /**
     * Update Time
     * @description The last time and date this item was updated.
     */
    update_time: string | null;
    /**
     * URL
     * @deprecated
     * @description The relative URL to access this item.
     */
    url: string;
    /**
     * Visible
     * @description Whether this item is visible or hidden to the user by default.
     */
    visible: boolean;
}
interface HDCACustom {
    /**
     * Dataset Collection ID
     * @example 0123456789ABCDEF
     */
    collection_id?: string;
    /**
     * Collection Type
     * @description The type of the collection, can be `list`, `paired`, or define subcollections using `:` as separator like `list:paired` or `list:list`.
     */
    collection_type?: string | null;
    /**
     * Contents URL
     * @description The relative URL to access the contents of this History.
     */
    contents_url?: string | null;
    /**
     * Create Time
     * @description The time and date this item was created.
     */
    create_time?: string | null;
    /**
     * Deleted
     * @description Whether this item is marked as deleted.
     */
    deleted?: boolean | null;
    /**
     * Element Count
     * @description The number of elements contained in the dataset collection. It may be None or undefined if the collection could not be populated.
     */
    element_count?: number | null;
    /**
     * Elements
     * @description The summary information of each of the elements inside the dataset collection.
     */
    elements?: DCESummary[] | null;
    /**
     * Elements Datatypes
     * @description A set containing all the different element datatypes in the collection.
     */
    elements_datatypes?: string[] | null;
    /**
     * HID
     * @description The index position of this item in the History.
     */
    hid?: number | null;
    /**
     * History Content Type
     * @description This is always `dataset_collection` for dataset collections.
     */
    history_content_type?: 'dataset_collection' | null;
    /**
     * History ID
     * @example 0123456789ABCDEF
     */
    history_id?: string;
    /**
     * Id
     * @example 0123456789ABCDEF
     */
    id?: string;
    /**
     * Implicit Collection Jobs Id
     * @description Encoded ID for the ICJ object describing the collection of jobs corresponding to this collection
     */
    implicit_collection_jobs_id?: string | null;
    /**
     * Job Source ID
     * @description The encoded ID of the Job that produced this dataset collection. Used to track the state of the job.
     */
    job_source_id?: string | null;
    /**
     * Job Source Type
     * @description The type of job (model class) that produced this dataset collection. Used to track the state of the job.
     */
    job_source_type?: JobSourceType | null;
    /**
     * Job State Summary
     * @description Overview of the job states working inside the dataset collection.
     */
    job_state_summary?: HDCJobStateSummary | null;
    /**
     * Model class
     * @description The name of the database model class.
     * @constant
     */
    model_class?: 'HistoryDatasetCollectionAssociation';
    /**
     * Name
     * @description The name of the item.
     */
    name?: string | null;
    /**
     * Populated
     * @description Whether the dataset collection elements (and any subcollections elements) were successfully populated.
     */
    populated?: boolean | null;
    /**
     * Populated State
     * @description Indicates the general state of the elements in the dataset collection:- 'new': new dataset collection, unpopulated elements.- 'ok': collection elements populated (HDAs may or may not have errors).- 'failed': some problem populating, won't be populated.
     */
    populated_state?: DatasetCollectionPopulatedState | null;
    /**
     * Populated State Message
     * @description Optional message with further information in case the population of the dataset collection failed.
     */
    populated_state_message?: string | null;
    tags?: TagCollection | null;
    /**
     * Type
     * @description This is always `collection` for dataset collections.
     */
    type?: 'collection' | null;
    /**
     * Type - ID
     * @description The type and the encoded ID of this item. Used for caching.
     */
    type_id?: string | null;
    /**
     * Update Time
     * @description The last time and date this item was updated.
     */
    update_time?: string | null;
    /**
     * URL
     * @deprecated
     * @description The relative URL to access this item.
     */
    url?: string | null;
    /**
     * Visible
     * @description Whether this item is visible or hidden to the user by default.
     */
    visible?: boolean | null;
}
/**
 * HDCADetailed
 * @description History Dataset Collection Association detailed information.
 */
interface HDCADetailed {
    /**
     * Dataset Collection ID
     * @example 0123456789ABCDEF
     */
    collection_id: string;
    /**
     * Collection Type
     * @description The type of the collection, can be `list`, `paired`, or define subcollections using `:` as separator like `list:paired` or `list:list`.
     */
    collection_type: string;
    /**
     * Contents URL
     * @description The relative URL to access the contents of this History.
     */
    contents_url: string;
    /**
     * Create Time
     * @description The time and date this item was created.
     */
    create_time: string | null;
    /**
     * Deleted
     * @description Whether this item is marked as deleted.
     */
    deleted: boolean;
    /**
     * Element Count
     * @description The number of elements contained in the dataset collection. It may be None or undefined if the collection could not be populated.
     */
    element_count?: number | null;
    /**
     * Elements
     * @description The summary information of each of the elements inside the dataset collection.
     * @default []
     */
    elements?: DCESummary[];
    /**
     * Elements Datatypes
     * @description A set containing all the different element datatypes in the collection.
     */
    elements_datatypes: string[];
    /**
     * HID
     * @description The index position of this item in the History.
     */
    hid: number;
    /**
     * History Content Type
     * @description This is always `dataset_collection` for dataset collections.
     * @constant
     * @enum {string}
     */
    history_content_type: 'dataset_collection';
    /**
     * History ID
     * @example 0123456789ABCDEF
     */
    history_id: string;
    /**
     * Id
     * @example 0123456789ABCDEF
     */
    id: string;
    /**
     * Implicit Collection Jobs Id
     * @description Encoded ID for the ICJ object describing the collection of jobs corresponding to this collection
     */
    implicit_collection_jobs_id?: string | null;
    /**
     * Job Source ID
     * @description The encoded ID of the Job that produced this dataset collection. Used to track the state of the job.
     */
    job_source_id?: string | null;
    /**
     * Job Source Type
     * @description The type of job (model class) that produced this dataset collection. Used to track the state of the job.
     */
    job_source_type?: JobSourceType | null;
    /**
     * Job State Summary
     * @description Overview of the job states working inside the dataset collection.
     */
    job_state_summary?: HDCJobStateSummary | null;
    /**
     * Model class
     * @description The name of the database model class.
     * @constant
     * @enum {string}
     */
    model_class: 'HistoryDatasetCollectionAssociation';
    /**
     * Name
     * @description The name of the item.
     */
    name: string | null;
    /**
     * Populated
     * @description Whether the dataset collection elements (and any subcollections elements) were successfully populated.
     */
    populated?: boolean;
    /**
     * Populated State
     * @description Indicates the general state of the elements in the dataset collection:- 'new': new dataset collection, unpopulated elements.- 'ok': collection elements populated (HDAs may or may not have errors).- 'failed': some problem populating, won't be populated.
     */
    populated_state: DatasetCollectionPopulatedState;
    /**
     * Populated State Message
     * @description Optional message with further information in case the population of the dataset collection failed.
     */
    populated_state_message?: string | null;
    tags: TagCollection;
    /**
     * Type
     * @description This is always `collection` for dataset collections.
     * @default collection
     * @constant
     * @enum {string}
     */
    type?: 'collection';
    /**
     * Type - ID
     * @description The type and the encoded ID of this item. Used for caching.
     */
    type_id?: string | null;
    /**
     * Update Time
     * @description The last time and date this item was updated.
     */
    update_time: string | null;
    /**
     * URL
     * @deprecated
     * @description The relative URL to access this item.
     */
    url: string;
    /**
     * Visible
     * @description Whether this item is visible or hidden to the user by default.
     */
    visible: boolean;
}
/**
 * HDCASummary
 * @description History Dataset Collection Association summary information.
 */
interface HDCASummary {
    /**
     * Dataset Collection ID
     * @example 0123456789ABCDEF
     */
    collection_id: string;
    /**
     * Collection Type
     * @description The type of the collection, can be `list`, `paired`, or define subcollections using `:` as separator like `list:paired` or `list:list`.
     */
    collection_type: string;
    /**
     * Contents URL
     * @description The relative URL to access the contents of this History.
     */
    contents_url: string;
    /**
     * Create Time
     * @description The time and date this item was created.
     */
    create_time: string | null;
    /**
     * Deleted
     * @description Whether this item is marked as deleted.
     */
    deleted: boolean;
    /**
     * Element Count
     * @description The number of elements contained in the dataset collection. It may be None or undefined if the collection could not be populated.
     */
    element_count?: number | null;
    /**
     * Elements Datatypes
     * @description A set containing all the different element datatypes in the collection.
     */
    elements_datatypes: string[];
    /**
     * HID
     * @description The index position of this item in the History.
     */
    hid: number;
    /**
     * History Content Type
     * @description This is always `dataset_collection` for dataset collections.
     * @constant
     * @enum {string}
     */
    history_content_type: 'dataset_collection';
    /**
     * History ID
     * @example 0123456789ABCDEF
     */
    history_id: string;
    /**
     * Id
     * @example 0123456789ABCDEF
     */
    id: string;
    /**
     * Job Source ID
     * @description The encoded ID of the Job that produced this dataset collection. Used to track the state of the job.
     */
    job_source_id?: string | null;
    /**
     * Job Source Type
     * @description The type of job (model class) that produced this dataset collection. Used to track the state of the job.
     */
    job_source_type?: JobSourceType | null;
    /**
     * Job State Summary
     * @description Overview of the job states working inside the dataset collection.
     */
    job_state_summary?: HDCJobStateSummary | null;
    /**
     * Model class
     * @description The name of the database model class.
     * @constant
     * @enum {string}
     */
    model_class: 'HistoryDatasetCollectionAssociation';
    /**
     * Name
     * @description The name of the item.
     */
    name: string | null;
    /**
     * Populated State
     * @description Indicates the general state of the elements in the dataset collection:- 'new': new dataset collection, unpopulated elements.- 'ok': collection elements populated (HDAs may or may not have errors).- 'failed': some problem populating, won't be populated.
     */
    populated_state: DatasetCollectionPopulatedState;
    /**
     * Populated State Message
     * @description Optional message with further information in case the population of the dataset collection failed.
     */
    populated_state_message?: string | null;
    tags: TagCollection;
    /**
     * Type
     * @description This is always `collection` for dataset collections.
     * @default collection
     * @constant
     * @enum {string}
     */
    type?: 'collection';
    /**
     * Type - ID
     * @description The type and the encoded ID of this item. Used for caching.
     */
    type_id?: string | null;
    /**
     * Update Time
     * @description The last time and date this item was updated.
     */
    update_time: string | null;
    /**
     * URL
     * @deprecated
     * @description The relative URL to access this item.
     */
    url: string;
    /**
     * Visible
     * @description Whether this item is visible or hidden to the user by default.
     */
    visible: boolean;
}
interface DatasetHash {
    /**
     * Extra Files Path
     * @description The path to the extra files used to generate the hash.
     */
    extra_files_path?: string | null;
    /**
     * Hash Function
     * @description The hash function used to generate the hash.
     */
    hash_function: HashFunctionNames;
    /**
     * Hash Value
     * @description The hash value.
     */
    hash_value: string;
    /**
     * ID
     * @description Encoded ID of the dataset hash.
     * @example 0123456789ABCDEF
     */
    id: string;
    /**
     * Model class
     * @description The name of the database model class.
     * @constant
     * @enum {string}
     */
    model_class: 'DatasetHash';
}
interface EncodedHdcaSourceId {
    /**
     * Id
     * @example 0123456789ABCDEF
     */
    id: string;
    /**
     * Source
     * @description The source of this dataset, which in the case of the model can only be `hdca`.
     * @constant
     * @enum {string}
     */
    src: 'hdca';
}
interface GalaxyDataset {
    dataset_id: string;
    type: string;
    extension: string;
    purged: boolean;
    deleted: boolean;
    name: string;
    file_size: number;
    tags: string[];
    resubmitted: boolean;
    create_time: string;
    state: DatasetState;
    creating_job: string;
    visible: boolean;
    history_id: string;
    accessible: boolean;
    uuid: string;
    metadata_comment_lines: number;
}
interface GalaxyUploadedDataset {
    outputs: {
        id: string;
        uuid: string;
        hid: number;
        file_ext: string;
        model_class: 'HistoryDatasetAssociation';
        name: string;
        deleted: boolean;
        purged: boolean;
        visible: boolean;
        state: DatasetState;
        file_size: number;
        create_time: string;
        update_time: string;
        history_id: string;
    }[];
    jobs: {
        model_class: 'Job';
        id: string;
        state: JobState;
        exit_code: number | null;
        update_time: string;
        create_time: string;
        galaxy_version: string;
        tool_id: '__DATA_FETCH__';
        history_id: string;
    }[];
}
interface DatasetPermissions {
    /**
     * Access
     * @description The set of roles (encoded IDs) that can access this dataset.
     * @default []
     */
    access?: string[];
    /**
     * Management
     * @description The set of roles (encoded IDs) that can manage this dataset.
     * @default []
     */
    manage?: string[];
}
interface DatasetSource {
    /**
     * Extra Files Path
     * @description The path to the extra files.
     */
    extra_files_path?: string | null;
    /**
     * ID
     * @description Encoded ID of the dataset source.
     * @example 0123456789ABCDEF
     */
    id: string;
    /**
     * Source URI
     * @description The URI of the dataset source.
     */
    source_uri: string;
    /**
     * Transform
     * @description The transformations applied to the dataset source.
     */
    transform?: Record<string, never>[] | null;
}
/**
 * DCEType
 * @description Available types of dataset collection elements.
 * @enum {string}
 */
type DCEType = 'hda' | 'dataset_collection';
/**
 * DCESummary
 * @description Dataset Collection Element summary information.
 */
interface DCESummary {
    /**
     * Element Identifier
     * @description The actual name of this element.
     */
    element_identifier: string;
    /**
     * Element Index
     * @description The position index of this element inside the collection.
     */
    element_index: number;
    /**
     * Element Type
     * @description The type of the element. Used to interpret the `object` field.
     */
    element_type?: DCEType | null;
    /**
     * Dataset Collection Element ID
     * @example 0123456789ABCDEF
     */
    id: string;
    /**
     * Model class
     * @description The name of the database model class.
     * @constant
     * @enum {string}
     */
    model_class: 'DatasetCollectionElement';
    /**
     * Object
     * @description The element's specific data depending on the value of `element_type`.
     */
    object?: HDAObject | HDADetailed | DCObject | null;
}
/**
 * HDCJobStateSummary
 * @description Overview of the job states working inside a dataset collection.
 */
interface HDCJobStateSummary {
    /**
     * All jobs
     * @description Total number of jobs associated with a dataset collection.
     * @default 0
     */
    all_jobs?: number;
    /**
     * Deleted jobs
     * @description Number of jobs in the `deleted` state.
     * @default 0
     */
    deleted?: number;
    /**
     * Deleted new jobs
     * @description Number of jobs in the `deleted_new` state.
     * @default 0
     */
    deleted_new?: number;
    /**
     * Jobs with errors
     * @description Number of jobs in the `error` state.
     * @default 0
     */
    error?: number;
    /**
     * Failed jobs
     * @description Number of jobs in the `failed` state.
     * @default 0
     */
    failed?: number;
    /**
     * New jobs
     * @description Number of jobs in the `new` state.
     * @default 0
     */
    new?: number;
    /**
     * OK jobs
     * @description Number of jobs in the `ok` state.
     * @default 0
     */
    ok?: number;
    /**
     * Paused jobs
     * @description Number of jobs in the `paused` state.
     * @default 0
     */
    paused?: number;
    /**
     * Queued jobs
     * @description Number of jobs in the `queued` state.
     * @default 0
     */
    queued?: number;
    /**
     * Resubmitted jobs
     * @description Number of jobs in the `resubmitted` state.
     * @default 0
     */
    resubmitted?: number;
    /**
     * Running jobs
     * @description Number of jobs in the `running` state.
     * @default 0
     */
    running?: number;
    /**
     * Skipped jobs
     * @description Number of jobs that were skipped due to conditional workflow step execution.
     * @default 0
     */
    skipped?: number;
    /**
     * Upload jobs
     * @description Number of jobs in the `upload` state.
     * @default 0
     */
    upload?: number;
    /**
     * Waiting jobs
     * @description Number of jobs in the `waiting` state.
     * @default 0
     */
    waiting?: number;
}
/**
 * DatasetCollectionPopulatedState
 * @enum {string}
 */
type DatasetCollectionPopulatedState = 'new' | 'ok' | 'failed';
/**
 * HDAObject
 * @description History Dataset Association Object
 */
interface HDAObject {
    /** Accessible */
    accessible?: boolean | null;
    /** Copied From Ldda Id */
    copied_from_ldda_id?: string | null;
    /**
     * HDA or LDDA
     * @description Whether this dataset belongs to a history (HDA) or a library (LDDA).
     * @default hda
     */
    hda_ldda?: DatasetSourceType;
    /**
     * History ID
     * @example 0123456789ABCDEF
     */
    history_id: string;
    /**
     * History Dataset Association ID
     * @example 0123456789ABCDEF
     */
    id: string;
    /**
     * Model class
     * @description The name of the database model class.
     * @constant
     * @enum {string}
     */
    model_class: 'HistoryDatasetAssociation';
    /** Purged */
    purged: boolean;
    /**
     * State
     * @description The current state of this dataset.
     */
    state: DatasetState;
    /** Tags */
    tags: string[];
    [key: string]: unknown | undefined;
}
/**
 * DCObject
 * @description Dataset Collection Object
 */
interface DCObject {
    /**
     * Collection Type
     * @description The type of the collection, can be `list`, `paired`, or define subcollections using `:` as separator like `list:paired` or `list:list`.
     */
    collection_type: string;
    /** Contents Url */
    contents_url?: string | null;
    /**
     * Element Count
     * @description The number of elements contained in the dataset collection. It may be None or undefined if the collection could not be populated.
     */
    element_count?: number | null;
    /**
     * Elements
     * @description The summary information of each of the elements inside the dataset collection.
     * @default []
     */
    elements?: DCESummary[];
    /**
     * Dataset Collection ID
     * @example 0123456789ABCDEF
     */
    id: string;
    /**
     * Model class
     * @description The name of the database model class.
     * @constant
     * @enum {string}
     */
    model_class: 'DatasetCollection';
    /**
     * Populated
     * @description Whether the dataset collection elements (and any subcollections elements) were successfully populated.
     */
    populated?: boolean;
}

declare const HistoryStates: readonly ["new", "upload", "queued", "running", "ok", "empty", "error", "paused", "setting_metadata", "failed_metadata", "deferred", "discarded"];
type HistoryState = typeof HistoryStates[number];
type HistoryStateIds = {
    [K in typeof HistoryStates[number]]: string[];
};
type HistoryStateDetails = {
    [K in typeof HistoryStates[number]]: number;
};
interface GalaxyHistoryDetailed {
    model_class: 'History';
    id: string;
    name: string;
    deleted: boolean;
    purged: boolean;
    published: boolean;
    annotation: string;
    tags: string[];
    contents_url: string;
    size: number;
    user_id: string;
    create_time: string;
    update_time: string;
    importable: boolean;
    slug: string | null;
    username_and_slug: string | null;
    genome_build: string | null;
    state: HistoryState;
    state_ids: HistoryStateIds;
    state_details: HistoryStateDetails;
    hid_counter: number;
    empty: boolean;
}

declare const InvocationTerminalStates: readonly ["cancelled", "failed", "scheduled"];
declare const InvocationStates: readonly ["cancelled", "failed", "scheduled", "new", "ready", "cancelling"];
type InvocationState = typeof InvocationStates[number];
type InvocationTerminalState = typeof InvocationTerminalStates[number];
interface GalaxyInvocationStep {
    model_class: 'WorkflowInvocationStep';
    id: string;
    update_time: string;
    job_id: null | string;
    workflow_step_id: string;
    state: JobState;
    order_index: number;
    workflow_step_label: string;
    workflow_step_uuid: string;
}
interface GalaxyInvocationIO {
    id: string;
    src: string;
    label: string;
    workflow_step_id: string;
}
interface GalaxyInvocationOuput {
}
interface GalaxyInvoke {
    model_class: 'WorkflowInvocation';
    id: string;
    state: InvocationState;
    update_time: string;
    create_time: string;
    workflow_id: string;
    history_id: string;
    uuid: string;
}
interface GalaxyInvocation extends GalaxyInvoke {
    steps: GalaxyInvocationStep[];
    inputs?: Record<string, GalaxyInvocationIO>;
    outputs?: Record<string, GalaxyInvocationIO>;
}

type GalaxyToolParameters = GalaxySelectToolParameter | GalaxyBooleanToolParameter | GalaxyDataToolParameter | GalaxyConditionalParameter | GalaxyIntegerToolParameter | GalaxyFloatToolParameter;
interface GalaxyDataToolValue {
    values: {
        id: string;
        src: string;
    }[];
}
type GalaxyToolParameterValue = string | string[] | GalaxyDataToolValue;
type GalaxyToolParameterType = 'select' | 'boolean' | 'data' | 'float' | 'conditional' | 'integer';
interface BaseToolParameter {
    name: string;
    label: string;
    argument: string | null;
    help: string;
    refresh_on_change: boolean;
    optional: boolean;
    hidden: boolean;
    is_dynamic: boolean;
    component?: {
        props: GalaxyToolParameters;
        instance: any;
    } | undefined;
}
interface GalaxyBaseSelectToolParameter extends BaseToolParameter {
    model_class: 'SelectToolParameter';
    type: Extract<GalaxyToolParameterType, 'select'>;
    value: Exclude<GalaxyToolParameterValue, GalaxyDataToolValue>;
    options: Array<[string, string, boolean]>;
    display: string | null;
    multiple: boolean;
    textable: boolean;
}
interface GalaxySingleSelectToolParameter extends GalaxyBaseSelectToolParameter {
    multiple: false;
    value: Extract<GalaxyToolParameterValue, string>;
}
interface GalaxyMultipleSelectToolParameter extends GalaxyBaseSelectToolParameter {
    multiple: true;
    value: Extract<GalaxyToolParameterValue, string[]>;
}
type GalaxySelectToolParameter = GalaxySingleSelectToolParameter | GalaxyMultipleSelectToolParameter;
interface GalaxyBooleanToolParameter extends BaseToolParameter {
    model_class: 'BooleanToolParameter';
    type: Extract<GalaxyToolParameterType, 'boolean'>;
    value: Extract<GalaxyToolParameterValue, string>;
    truevalue: string;
    falsevalue: string;
}
interface GalaxyDataToolParameter extends BaseToolParameter {
    model_class: 'DataToolParameter';
    type: Extract<GalaxyToolParameterType, 'data'>;
    value: Extract<GalaxyToolParameterValue, GalaxyDataToolValue>;
    extensions: string[];
    edam: {
        edam_formats: string[];
        edam_data: string[];
    };
    multiple: boolean;
    options: {
        hda: {
            id: string;
            hid: number;
            name: string;
            src: 'hda';
            keep: boolean;
        }[];
        hdca: {
            id: string;
            hid: number;
            name: string;
            src: 'hdca';
            keep: boolean;
        }[];
    };
}
interface GalaxyFloatToolParameter extends BaseToolParameter {
    model_class: 'FloatToolParameter';
    type: Extract<GalaxyToolParameterType, 'float'>;
    min: number;
    max: number;
    value: Extract<GalaxyToolParameterValue, string>;
    area: boolean;
}
interface GalaxyIntegerToolParameter extends BaseToolParameter {
    model_class: 'IntegerToolParameter';
    type: Extract<GalaxyToolParameterType, 'integer'>;
    min: number;
    max: number;
    value: string;
    area: boolean;
}
interface GalaxyConditionalCase {
    model_class: string;
    value: Extract<GalaxyToolParameterValue, string>;
    inputs: GalaxyToolParameters[];
}
interface GalaxyConditionalParameter {
    cases: GalaxyConditionalCase[];
    model_class: 'Conditional';
    name: string;
    test_param: Extract<GalaxyToolParameters, Extract<GalaxySelectToolParameter, GalaxySingleSelectToolParameter> | GalaxyBooleanToolParameter>;
    type: Extract<GalaxyToolParameterType, 'conditional'>;
    component?: {
        props: GalaxyToolParameters;
        instance: any;
    } | undefined;
}
interface GalaxyToolOutput {
    model_class: 'ToolOutput';
    name: string;
    format: string;
    label: string;
    hidden: boolean;
    output_type: string;
    count: number;
}
interface GalaxyTool {
    model_class: 'Tool';
    id: string;
    version: string;
    description: string;
    edam_operations: string[];
    edam_topics: string[];
    tool_shed_repository: {
        name: string;
        owner: string;
        changeset_revision: string;
        tool_shed: string;
    };
    inputs: GalaxyToolParameters[];
    outputs: GalaxyToolOutput[];
}

type SrcInput = 'hda' | 'ldda' | 'ld' | 'hdca';
type GalaxyWorkflowInput = Record<string, {
    id: string;
    src: SrcInput;
    uuid?: string;
    dbid?: number;
}>;
type WorkflowStepType = 'data_input' | 'parameter_input' | 'data_collection_input' | 'tool';
interface WorkflowInput {
    label: string;
    value: string;
    uuid: string;
}
type GalaxyWorkflowParameters = Record<string, string | boolean>;
interface WorkflowInputStep {
    source_step: number;
    step_output: string;
}
interface WorkflowStep {
    id: number;
    type: WorkflowStepType;
    tool_id: null | string;
    tool_version: null | string;
    annotation: null | string;
    tool_inputs: Record<string, any>;
    input_steps: Record<string, WorkflowInputStep>;
}
interface GalaxyWorkflowsItem {
    model_class: string;
    id: string;
    name: string;
    create_time: Date;
    update_time: Date;
    published: boolean;
    importable: boolean;
    deleted: boolean;
    hidden: boolean;
    tags: TagCollection;
    latest_workflow_uuid: string;
    annotation: string | null;
    url: string;
    owner: string;
    source_metadata: string | null;
    number_of_steps: number;
    show_in_tool_panel: boolean;
}
interface GalaxyWorkflow {
    model_class: string;
    id: string;
    name: string;
    create_time: Date;
    update_time: Date;
    published: boolean;
    importable: boolean;
    deleted: boolean;
    hidden: boolean;
    tags: any[];
    latest_workflow_uuid: string;
    url: string;
    owner: string;
    inputs: {
        [key: string]: WorkflowInput;
    };
    annotation: string | null;
    license: string | null;
    creator: string | null;
    source_metadata: string | null;
    steps: {
        [key: string]: WorkflowStep;
    };
    version: number;
}
interface WorkflowStepExport {
    annotation?: string;
    step_index: number;
    step_label: string;
    step_name: string;
    step_version: string;
    step_type: WorkflowStepType;
}
interface WorkflowStepDataExport extends WorkflowStepExport {
    step_type: Extract<WorkflowStepType, 'data_input'>;
}
interface WorkflowStepParameterExport extends WorkflowStepExport {
    step_type: Extract<WorkflowStepType, 'parameter_input'>;
}
interface WorkflowStepDataCollectionExport extends WorkflowStepExport {
    step_type: Extract<WorkflowStepType, 'data_collection_input'>;
}
interface WorkflowStepToolExport extends WorkflowStepExport {
    id: string;
    step_type: Extract<WorkflowStepType, 'tool'>;
    action: string;
    citation: boolean;
    creator: null | string;
    display: boolean;
    description: string;
    edam_operations: string[];
    edam_topics: string[];
    enctype: string;
    help: string;
    history_id: string;
    is_workflow_compatible: boolean;
    license: string | null;
    model_class: string;
    label: null | string;
    name: string;
    requirements: {
        name: string;
        version: string | null;
    }[];
    sharable_url: string;
    tool_shed_repository: {
        changeset_revision: string;
        name: string;
        owner: string;
        tool_shed: string;
    };
    version: string;
    versions: string[];
    inputs: GalaxyToolParameters[];
    state_inputs: Record<string, Record<string, GalaxyToolParameterValue>>;
}
interface GalaxyWorkflowExport {
    'a_galaxy_workflow': boolean;
    'format-version': string;
    'id': string;
    'name': string;
    'tags': any[];
    'annotation': string;
    'steps': {
        [key: string]: WorkflowStepExport;
    };
    'version': number;
}

/**
 * The vast majority of the type are from
 * https://github.com/galaxyproject/galaxy/tree/dev/client/src/api/schema
 */
interface GalaxyVersion {
    version_major: string;
    version_minor: string;
}
interface ErrorWithMessage {
    message: string;
}
interface ErrorWithStatus {
    statusCode: number;
}
type Datamap = Record<`${number}`, {
    id: string;
    name: string;
    storage_object_id?: string;
}>;
declare const GalaxyStates: readonly ["new", "upload", "queued", "running", "ok", "empty", "error", "paused", "setting_metadata", "failed_metadata", "deferred", "discarded", "cancelled", "failed", "scheduled", "ready", "cancelling", "deleted", "deleting", "resubmitted", "waiting", "stop", "stopped", "skipped"];
type GalaxyState = typeof GalaxyStates[number];
interface Hyperlink {
    /**
     * Href
     * @description The URL of the linked document.
     */
    href: string;
    /**
     * Target
     * @description Specifies where to open the linked document.
     */
    target: string;
    /**
     * Text
     * @description The text placeholder for the link.
     */
    text: string;
}
interface MetadataFile {
    /**
     * Download URL
     * @description The URL to download this item from the server.
     */
    download_url: string;
    /**
     * File Type
     * @description TODO
     */
    file_type: string;
}

declare function isErrorWithMessage(error: unknown): error is ErrorWithMessage;
declare function toErrorWithMessage(maybeError: unknown): ErrorWithMessage;
declare function getErrorMessage(error: unknown): string;
declare function isErrorWithStatus(error: unknown): error is ErrorWithStatus;
declare function toErrorWithStatus(maybeError: unknown, fallback: number): ErrorWithStatus;
declare function getStatusCode(error: unknown, fallback?: number): number;

interface $Fetch {
    <T = any, R extends ResponseType = "json">(request: FetchRequest, options?: FetchOptions<R>): Promise<MappedResponseType<R, T>>;
    raw<T = any, R extends ResponseType = "json">(request: FetchRequest, options?: FetchOptions<R>): Promise<FetchResponse<MappedResponseType<R, T>>>;
    native: Fetch;
    create(defaults: FetchOptions): $Fetch;
}
interface FetchContext<T = any, R extends ResponseType = ResponseType> {
    request: FetchRequest;
    options: FetchOptions<R>;
    response?: FetchResponse<T>;
    error?: Error;
}
interface FetchOptions<R extends ResponseType = ResponseType> extends Omit<RequestInit, "body"> {
    baseURL?: string;
    body?: RequestInit["body"] | Record<string, any>;
    ignoreResponseError?: boolean;
    params?: Record<string, any>;
    query?: Record<string, any>;
    parseResponse?: (responseText: string) => any;
    responseType?: R;
    /**
     * @experimental Set to "half" to enable duplex streaming.
     * Will be automatically set to "half" when using a ReadableStream as body.
     * https://fetch.spec.whatwg.org/#enumdef-requestduplex
     */
    duplex?: "half" | undefined;
    /** timeout in milliseconds */
    timeout?: number;
    retry?: number | false;
    /** Delay between retries in milliseconds. */
    retryDelay?: number;
    /** Default is [408, 409, 425, 429, 500, 502, 503, 504] */
    retryStatusCodes?: number[];
    onRequest?(context: FetchContext): Promise<void> | void;
    onRequestError?(context: FetchContext & {
        error: Error;
    }): Promise<void> | void;
    onResponse?(context: FetchContext & {
        response: FetchResponse<R>;
    }): Promise<void> | void;
    onResponseError?(context: FetchContext & {
        response: FetchResponse<R>;
    }): Promise<void> | void;
}
interface ResponseMap {
    blob: Blob;
    text: string;
    arrayBuffer: ArrayBuffer;
    stream: ReadableStream<Uint8Array>;
}
type ResponseType = keyof ResponseMap | "json";
type MappedResponseType<R extends ResponseType, JsonType = any> = R extends keyof ResponseMap ? ResponseMap[R] : JsonType;
interface FetchResponse<T> extends Response {
    _data?: T;
}
type Fetch = typeof globalThis.fetch;
type FetchRequest = RequestInfo;

declare class Datasets {
    #private;
    private static instance;
    private constructor();
    static getInstance(client: GalaxyClient): Datasets;
    getDataset(datasetId: string, historyId: string): Promise<GalaxyDataset>;
}

declare class Histories {
    #private;
    private static instance;
    private constructor();
    static getInstance(client: GalaxyClient): Histories;
    createHistory(name: string): Promise<GalaxyHistoryDetailed>;
    deleteHistory(historyId: string): Promise<GalaxyHistoryDetailed>;
    getHistories(): Promise<GalaxyHistoryDetailed[]>;
    getHistory(historyId: string): Promise<GalaxyHistoryDetailed>;
    uploadFile(historyId: string, srcUrl: string): Promise<GalaxyUploadedDataset>;
    getListDatasets(historyId: string): Promise<HDASummary[] | undefined>;
    downloadDataset(historyId: string, datasetId: string): Promise<Blob | undefined>;
}

declare class Invocations {
    #private;
    private static instance;
    private constructor();
    static getInstance(client: GalaxyClient): Invocations;
    getInvocation(invocationId: string): Promise<GalaxyInvocation>;
}

declare class Jobs {
    #private;
    private static instance;
    private constructor();
    static getInstance(client: GalaxyClient): Jobs;
    getJob(jobId: string): Promise<ShowFullJobResponse>;
}

declare class Tools {
    #private;
    private static instance;
    private constructor();
    static getInstance(client: GalaxyClient): Tools;
    getTool(toolId: string, version: string): Promise<GalaxyTool>;
}

declare class Workflows {
    #private;
    private static instance;
    private constructor();
    static getInstance(client: GalaxyClient): Workflows;
    getWorkflow(workflowId: string): Promise<GalaxyWorkflow>;
    exportWorkflow(workflowId: string, style?: 'export' | 'run' | 'editor' | 'instance'): Promise<GalaxyWorkflowExport>;
    getWorkflows(): Promise<GalaxyWorkflowsItem[]>;
    invokeWorkflow(historyGalaxyId: string, workflowId: string, inputs: GalaxyWorkflowInput, parameters: GalaxyWorkflowParameters): Promise<GalaxyInvoke>;
}

declare class GalaxyClient {
    #private;
    private static instance;
    url: string;
    api: $Fetch;
    private constructor();
    static getInstance(apiKey: string, url: string): GalaxyClient;
    getVersion(): Promise<GalaxyVersion>;
    histories(): Histories;
    workflows(): Workflows;
    tools(): Tools;
    invocations(): Invocations;
    jobs(): Jobs;
    datasets(): Datasets;
}

export { type DCESummary, type DCEType, type DCObject, type DataItemSourceType, type Datamap, type DatasetCollectionPopulatedState, type DatasetHash, type DatasetPermissions, type DatasetSource, type DatasetSourceType, type DatasetState, DatasetStates, type DatasetTerminalState, type DatasetValidatedState, DatasetsTerminalStates, type DisplayApp, type EncodedDatasetJobInfo, type EncodedHdcaSourceId, type ErrorWithMessage, type ErrorWithStatus, type GalaxyBaseSelectToolParameter, type GalaxyBooleanToolParameter, GalaxyClient, type GalaxyConditionalCase, type GalaxyConditionalParameter, type GalaxyDataToolParameter, type GalaxyDataToolValue, type GalaxyDataset, type GalaxyFloatToolParameter, type GalaxyHistoryDetailed, type GalaxyIntegerToolParameter, type GalaxyInvocation, type GalaxyInvocationIO, type GalaxyInvocationOuput, type GalaxyInvocationStep, type GalaxyInvoke, type GalaxyMultipleSelectToolParameter, type GalaxySelectToolParameter, type GalaxySingleSelectToolParameter, type GalaxyState, GalaxyStates, type GalaxyTool, type GalaxyToolOutput, type GalaxyToolParameterType, type GalaxyToolParameterValue, type GalaxyToolParameters, type GalaxyUploadedDataset, type GalaxyVersion, type GalaxyWorkflow, type GalaxyWorkflowExport, type GalaxyWorkflowInput, type GalaxyWorkflowParameters, type GalaxyWorkflowsItem, type HDACustom, type HDADetailed, type HDAInaccessible, type HDAObject, type HDASummary, type HDCACustom, type HDCADetailed, type HDCASummary, type HDCJobStateSummary, type HashFunctionNames, type HistoryContentsResult, type HistoryState, type HistoryStateDetails, type HistoryStateIds, HistoryStates, type Hyperlink, type InvocationState, InvocationStates, type InvocationTerminalState, InvocationTerminalStates, type JobMetric, type JobSourceType, type JobState, JobStates, type JobTerminalState, JobTerminalStates, type MetadataFile, type ShowFullJobResponse, type SrcInput, type TagCollection, type Visualization, type WorkflowInput, type WorkflowInputStep, type WorkflowStep, type WorkflowStepDataCollectionExport, type WorkflowStepDataExport, type WorkflowStepExport, type WorkflowStepParameterExport, type WorkflowStepToolExport, type WorkflowStepType, getErrorMessage, getStatusCode, isErrorWithMessage, isErrorWithStatus, toErrorWithMessage, toErrorWithStatus };
