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
declare const DatasetsTerminalStates: readonly ["ok", "empty", "error", "discarded", "failed_metadata"];
declare const DatasetStates: readonly ["ok", "empty", "error", "discarded", "failed_metadata", "new", "upload", "queued", "running", "paused", "setting_metadata", "deferred"];
type DatasetState = typeof DatasetStates[number];
declare const InvocationStates: readonly ["new", "ready", "scheduled", "cancelled", "cancelling", "failed"];
type InvocationState = typeof InvocationStates[number];
declare const HistoryStates: readonly ["new", "upload", "queued", "running", "ok", "empty", "error", "paused", "setting_metadata", "failed_metadata", "deferred", "discarded"];
type HistoryState = typeof HistoryStates[number];
type HistoryStateIds = {
    [K in typeof HistoryStates[number]]: string[];
};
type HistoryStateDetails = {
    [K in typeof HistoryStates[number]]: number;
};
type Datamap = Record<`${number}`, {
    id: string;
    name: string;
    storage_object_id?: string;
}>;
type SrcInput = 'hda' | 'ldda' | 'ld' | 'hdca';
type GalaxyWorkflowInput = Record<string, {
    id: string;
    src: SrcInput;
    uuid?: string;
    dbid?: number;
}>;
type GalaxyWorkflowParameters = Record<string, string | boolean>;
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
interface GalaxyInvocation {
    id: string;
    state: InvocationState;
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
interface WorkflowInput {
    label: string;
    value: string;
    uuid: string;
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
interface WorkflowInputStep {
    source_step: number;
    step_output: string;
}
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
    outputs: {
        id: string;
    }[];
    jobs: {
        id: string;
        state: DatasetState[];
    };
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
    uploadFile(historyId: string, srcUrl: string): Promise<GalaxyDataset>;
    getListDatasets(historyId: string): Promise<HDASummary[] | undefined>;
    downloadDataset(historyId: string, datasetId: string): Promise<unknown>;
}

declare class Invocations {
    #private;
    private static instance;
    private constructor();
    static getInstance(client: GalaxyClient): Invocations;
    getInvocation(invocationId: string): Promise<GalaxyInvocation>;
}

declare class Tools {
    #private;
    private static instance;
    private constructor();
    static getInstance(client: GalaxyClient): Tools;
    getTool(toolId: string, version: string): Promise<GalaxyHistoryDetailed>;
}

declare class Workflows {
    #private;
    private static instance;
    private constructor();
    static getInstance(client: GalaxyClient): Workflows;
    getWorkflow(workflowId: string): Promise<GalaxyWorkflow>;
    getWorkflows(): Promise<GalaxyWorkflow[]>;
    invokeWorkflow(historyGalaxyId: string, workflowId: string, inputs: GalaxyWorkflowInput, parameters: GalaxyWorkflowParameters): Promise<GalaxyInvocation>;
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
}

export { type Datamap, type DatasetState, DatasetStates, DatasetsTerminalStates, type ErrorWithMessage, type ErrorWithStatus, GalaxyClient, type GalaxyDataset, type GalaxyHistoryDetailed, type GalaxyInvocation, type GalaxyVersion, type GalaxyWorkflow, type GalaxyWorkflowInput, type GalaxyWorkflowParameters, type HDASummary, type HistoryState, type HistoryStateDetails, type HistoryStateIds, type InvocationState, type SrcInput, type WorkflowInput, type WorkflowInputStep, type WorkflowStep };
