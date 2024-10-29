declare const JobTerminalStates: readonly ["deleted", "deleting", "error", "ok"];
declare const JobStates: readonly ["deleted", "deleting", "error", "ok", "new", "resubmitted", "upload", "waiting", "queued", "running", "failed", "paused", "stop", "stopped", "skipped"];
type JobState = typeof JobStates[number];
type JobTerminalState = typeof JobTerminalStates[number];
interface GalaxyJob {
    model_class: 'Job';
    id: string;
    history_id: string;
    tool_id: string;
    exit_code: number;
    state: JobState;
    create_time: string;
    update_time: string;
    params: Record<string, any>;
    stdout: string;
    stderr: string;
}

declare const DatasetsTerminalStates: readonly ["ok", "empty", "error", "discarded", "failed_metadata"];
declare const DatasetStates: readonly ["ok", "empty", "error", "discarded", "failed_metadata", "new", "upload", "queued", "running", "paused", "setting_metadata", "deferred"];
type DatasetState = typeof DatasetStates[number];
type DatasetTerminalState = typeof DatasetsTerminalStates[number];
interface HDASummary {
    id: string;
    name: string;
    history_id: string;
    hid: number;
    history_content_type: 'dataset' | 'dataset_collection';
    deleted: boolean;
    visible: boolean;
    type_id: string;
    type: string;
    create_time: string;
    update_time: string;
    tags: string[];
    dataset_id: string;
    state: DatasetState;
    extension: string;
    purged: boolean;
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

type GalaxyToolParameters = GalaxySelectToolParameter | GalaxyBooleanToolParameter | GalaxyDataToolParameter | GalaxyConditionalParameter;
interface GalaxyDataToolValue {
    values: {
        id: string;
        src: string;
    }[];
}
type GalaxyToolParameterValue = string | string[] | GalaxyDataToolValue;
type GalaxyToolParameterType = 'select' | 'boolean' | 'data' | 'float' | 'conditional';
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
interface GalaxyUniqueSelectToolParameter extends GalaxyBaseSelectToolParameter {
    multiple: false;
    value: Extract<GalaxyToolParameterValue, string>;
}
interface GalaxyMultipleSelectToolParameter extends GalaxyBaseSelectToolParameter {
    multiple: true;
    value: Extract<GalaxyToolParameterValue, string[]>;
}
type GalaxySelectToolParameter = GalaxyUniqueSelectToolParameter | GalaxyMultipleSelectToolParameter;
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
interface GalaxyConditionalCase {
    model_class: string;
    value: Extract<GalaxyToolParameterValue, string>;
    inputs: GalaxyToolParameters[];
}
interface GalaxyConditionalParameter {
    cases: GalaxyConditionalCase[];
    model_class: 'Conditional';
    name: string;
    test_param: Extract<GalaxySelectToolParameter, GalaxyUniqueSelectToolParameter | GalaxyBooleanToolParameter>;
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
    type: string;
    tool_id: null | string;
    tool_version: null | string;
    annotation: null | string;
    tool_inputs: Record<string, any>;
    input_steps: Record<string, WorkflowInputStep>;
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
    annotation: string;
    license: string | null;
    creator: string | null;
    source_metadata: string | null;
    steps: {
        [key: string]: WorkflowStep;
    };
    version: number;
}
interface WorkflowStepExport {
    id: number;
    type: 'tool' | 'data_input' | 'parameter_input' | 'data_collection_input';
    tool_id: null | string;
    tool_version: null | string;
    annotation: null | string;
    label: null | string;
    name: string;
    input_connections: Record<string, {
        id: number;
        output_name: string;
    } | object>;
    inputs: Array<{
        description: string;
        name: string;
    }>;
    outputs: Array<{
        name: string;
        type: string;
    }>;
    tool_shed_repository: {
        changeset_revision: string;
        name: string;
        owner: string;
        tool_shed: string;
    };
    uuid: string;
    workflow_outputs: Array<{
        label: string | null;
        output_name: string;
        uuid: string;
    }>;
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
    getJob(jobId: string): Promise<GalaxyJob>;
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
    exportWorkflow(workflowId: string): Promise<GalaxyWorkflowExport>;
    getWorkflows(): Promise<GalaxyWorkflow[]>;
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

export { type Datamap, type DatasetState, DatasetStates, type DatasetTerminalState, DatasetsTerminalStates, type ErrorWithMessage, type ErrorWithStatus, type GalaxyBaseSelectToolParameter, type GalaxyBooleanToolParameter, GalaxyClient, type GalaxyConditionalCase, type GalaxyConditionalParameter, type GalaxyDataToolParameter, type GalaxyDataToolValue, type GalaxyDataset, type GalaxyFloatToolParameter, type GalaxyHistoryDetailed, type GalaxyInvocation, type GalaxyInvocationIO, type GalaxyInvocationOuput, type GalaxyInvocationStep, type GalaxyInvoke, type GalaxyJob, type GalaxyMultipleSelectToolParameter, type GalaxySelectToolParameter, type GalaxyState, GalaxyStates, type GalaxyTool, type GalaxyToolOutput, type GalaxyToolParameterType, type GalaxyToolParameterValue, type GalaxyToolParameters, type GalaxyUniqueSelectToolParameter, type GalaxyUploadedDataset, type GalaxyVersion, type GalaxyWorkflow, type GalaxyWorkflowExport, type GalaxyWorkflowInput, type GalaxyWorkflowParameters, type HDASummary, type HistoryState, type HistoryStateDetails, type HistoryStateIds, HistoryStates, type InvocationState, InvocationStates, type InvocationTerminalState, InvocationTerminalStates, type JobState, JobStates, type JobTerminalState, JobTerminalStates, type SrcInput, type WorkflowInput, type WorkflowInputStep, type WorkflowStep, type WorkflowStepExport, getErrorMessage, getStatusCode, isErrorWithMessage, isErrorWithStatus, toErrorWithMessage, toErrorWithStatus };
