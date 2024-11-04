function isErrorWithMessage(error) {
  return typeof error === "object" && error !== null && "message" in error && typeof error.message === "string";
}
function toErrorWithMessage(maybeError) {
  if (isErrorWithMessage(maybeError))
    return maybeError;
  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}
function getErrorMessage(error) {
  return toErrorWithMessage(error).message;
}
function isErrorWithStatus(error) {
  return typeof error === "object" && error !== null && "statusCode" in error && typeof error.statusCode === "number";
}
function toErrorWithStatus(maybeError, fallback) {
  if (isErrorWithStatus(maybeError)) {
    return maybeError;
  }
  return { statusCode: fallback };
}
function getStatusCode(error, fallback = 500) {
  return toErrorWithStatus(error, fallback).statusCode;
}

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function mergeFetchOptions(input, defaults, Headers = globalThis.Headers) {
  const merged = {
    ...defaults,
    ...input
  };
  if (defaults?.params && input?.params) {
    merged.params = {
      ...defaults?.params,
      ...input?.params
    };
  }
  if (defaults?.query && input?.query) {
    merged.query = {
      ...defaults?.query,
      ...input?.query
    };
  }
  if (defaults?.headers && input?.headers) {
    merged.headers = new Headers(defaults?.headers || {});
    for (const [key, value] of new Headers(input?.headers || {})) {
      merged.headers.set(key, value);
    }
  }
  return merged;
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: mergeFetchOptions(_options, globalOptions.defaults, Headers),
      response: void 0,
      error: void 0
    };
    context.options.method = context.options.method?.toUpperCase();
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(
        () => controller.abort(),
        context.options.timeout
      );
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = context.response.body && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}) => createFetch({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

const _globalThis = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("unable to locate global object");
}();
const fetch = _globalThis.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!")));
const Headers = _globalThis.Headers;
const AbortController = _globalThis.AbortController;
const ofetch = createFetch({ fetch, Headers, AbortController });
const $fetch = ofetch;

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2$1 = Object.defineProperty;
var __defNormalProp$2$1 = (obj, key, value) => key in obj ? __defProp$2$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2$1 = (obj, key, value) => {
  __defNormalProp$2$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2$1(this, "statusCode", 500);
    __publicField$2$1(this, "fatal", false);
    __publicField$2$1(this, "unhandled", false);
    __publicField$2$1(this, "statusMessage");
    __publicField$2$1(this, "data");
    __publicField$2$1(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2$1(H3Error, "__h3_error__", true);
function createError(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;

var __defProp$6 = Object.defineProperty;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$6 = (obj, key, value) => {
  __defNormalProp$6(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck$6 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$5 = (obj, member, getter) => {
  __accessCheck$6(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$6 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$6 = (obj, member, value, setter) => {
  __accessCheck$6(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client$5;
const _Datasets = class _Datasets {
  constructor(client) {
    __privateAdd$6(this, _client$5, void 0);
    __privateSet$6(this, _client$5, client);
  }
  static getInstance(client) {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new _Datasets(client);
    return this.instance;
  }
  async getDataset(datasetId, historyId) {
    try {
      const galaxyDataset = await __privateGet$5(this, _client$5).api(
        `api/histories/${historyId}/contents/${datasetId}`,
        {
          method: "GET"
        }
      );
      return galaxyDataset;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error)
      });
    }
  }
};
_client$5 = new WeakMap();
__publicField$6(_Datasets, "instance");
let Datasets = _Datasets;

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

const DatasetsTerminalStates = [
  "ok",
  "empty",
  "error",
  "discarded",
  "failed_metadata"
];
const DatasetStates = [
  ...DatasetsTerminalStates,
  "new",
  "upload",
  "queued",
  "running",
  "paused",
  "setting_metadata",
  "deferred"
];

const HistoryStates = [
  "new",
  "upload",
  "queued",
  "running",
  "ok",
  "empty",
  "error",
  "paused",
  "setting_metadata",
  "failed_metadata",
  "deferred",
  "discarded"
];

const InvocationTerminalStates = [
  "cancelled",
  "failed",
  "scheduled"
];
const InvocationStates = [
  ...InvocationTerminalStates,
  "new",
  "ready",
  "cancelling"
];

const JobTerminalStates = [
  "deleted",
  "deleting",
  "error",
  "ok"
];
const JobStates = [
  ...JobTerminalStates,
  "new",
  "resubmitted",
  "upload",
  "waiting",
  "queued",
  "running",
  "failed",
  "paused",
  "stop",
  "stopped",
  "skipped"
];

const GalaxyStates = [
  "new",
  "upload",
  "queued",
  "running",
  "ok",
  "empty",
  "error",
  "paused",
  "setting_metadata",
  "failed_metadata",
  "deferred",
  "discarded",
  "cancelled",
  "failed",
  "scheduled",
  "ready",
  "cancelling",
  "deleted",
  "deleting",
  "resubmitted",
  "waiting",
  "stop",
  "stopped",
  "skipped"
];

var __defProp$5 = Object.defineProperty;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$5 = (obj, key, value) => {
  __defNormalProp$5(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck$5 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$4 = (obj, member, getter) => {
  __accessCheck$5(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$5 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$5 = (obj, member, value, setter) => {
  __accessCheck$5(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client$4;
const _Histories = class _Histories {
  constructor(client) {
    __privateAdd$5(this, _client$4, void 0);
    __privateSet$5(this, _client$4, client);
  }
  static getInstance(client) {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new _Histories(client);
    return this.instance;
  }
  async createHistory(name) {
    try {
      return await __privateGet$4(this, _client$4).api(
        "api/histories",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `name=${name}`
        }
      );
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error)
      });
    }
  }
  async deleteHistory(historyId) {
    try {
      const galaxyHistory = await __privateGet$4(this, _client$4).api(`api/histories/${historyId}`, {
        method: "DELETE",
        body: { purge: true }
      });
      return galaxyHistory;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error)
      });
    }
  }
  async getHistories() {
    try {
      const galaxyHistories = await __privateGet$4(this, _client$4).api("api/histories", {
        method: "GET"
      });
      return galaxyHistories;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error)
      });
    }
  }
  async getHistory(historyId) {
    try {
      const galaxyHistory = await __privateGet$4(this, _client$4).api(`api/histories/${historyId}`, {
        method: "GET"
      });
      return galaxyHistory;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error)
      });
    }
  }
  async uploadFile(historyId, srcUrl) {
    const payload = {
      history_id: historyId,
      targets: [{
        destination: { type: "hdas" },
        elements: [{
          src: "url",
          url: srcUrl,
          name: null,
          dbkey: "?",
          ext: "auto",
          space_to_tab: false,
          to_posix_lines: true
        }]
      }],
      auto_decompress: true,
      files: []
    };
    try {
      const galaxyDataset = await __privateGet$4(this, _client$4).api(
        "api/tools/fetch",
        {
          method: "POST",
          body: payload
        }
      );
      return galaxyDataset;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error)
      });
    }
  }
  async getListDatasets(historyId) {
    const terminalStatesSet = new Set(DatasetsTerminalStates);
    let terminalState = false;
    while (!terminalState) {
      try {
        const datasets = await __privateGet$4(this, _client$4).api(
          `api/histories/${historyId}/contents`,
          {
            method: "GET",
            params: {
              V: "dev"
            }
          }
        );
        terminalState = datasets.map((d) => d.state).every((state) => terminalStatesSet.has(state));
        if (terminalState)
          return datasets;
        await delay(3e3);
      } catch (error) {
        throw createError({
          statusCode: 500,
          statusMessage: getErrorMessage(error)
        });
      }
    }
  }
  async downloadDataset(historyId, datasetId) {
    try {
      const datasetDescription = await __privateGet$4(this, _client$4).datasets().getDataset(datasetId, historyId);
      if (datasetDescription.file_size === 0)
        return new Blob([]);
      const dataset = await __privateGet$4(this, _client$4).api(
        `api/histories/${historyId}/contents/${datasetId}/display`,
        {
          method: "GET"
        }
      );
      return dataset;
    } catch (error) {
      const statusCode = getStatusCode(error);
      if (statusCode === 404)
        return void 0;
      throw createError({
        statusCode,
        statusMessage: getErrorMessage(error)
      });
    }
  }
};
_client$4 = new WeakMap();
__publicField$5(_Histories, "instance");
let Histories = _Histories;

var __defProp$4 = Object.defineProperty;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$4 = (obj, key, value) => {
  __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck$4 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$3 = (obj, member, getter) => {
  __accessCheck$4(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$4 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$4 = (obj, member, value, setter) => {
  __accessCheck$4(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client$3;
const _Invocations = class _Invocations {
  constructor(client) {
    __privateAdd$4(this, _client$3, void 0);
    __privateSet$4(this, _client$3, client);
  }
  static getInstance(client) {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new _Invocations(client);
    return this.instance;
  }
  async getInvocation(invocationId) {
    try {
      const invocation = await __privateGet$3(this, _client$3).api(
        `api/invocations/${invocationId}`,
        {
          method: "GET"
        }
      );
      return invocation;
    } catch (error) {
      throw createError({
        statusCode: getStatusCode(error),
        statusMessage: `${getErrorMessage(error)}
Unable to get invocation ${invocationId}`
      });
    }
  }
};
_client$3 = new WeakMap();
__publicField$4(_Invocations, "instance");
let Invocations = _Invocations;

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck$3 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$2 = (obj, member, getter) => {
  __accessCheck$3(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$3 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$3 = (obj, member, value, setter) => {
  __accessCheck$3(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client$2;
const _Jobs = class _Jobs {
  constructor(client) {
    __privateAdd$3(this, _client$2, void 0);
    __privateSet$3(this, _client$2, client);
  }
  static getInstance(client) {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new _Jobs(client);
    return this.instance;
  }
  async getJob(jobId) {
    try {
      const galaxyJob = await __privateGet$2(this, _client$2).api(
        `api/jobs/${jobId}?full=true`,
        {
          method: "GET"
        }
      );
      return galaxyJob;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error)
      });
    }
  }
};
_client$2 = new WeakMap();
__publicField$3(_Jobs, "instance");
let Jobs = _Jobs;

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck$2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$1 = (obj, member, getter) => {
  __accessCheck$2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$2 = (obj, member, value, setter) => {
  __accessCheck$2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client$1;
const _Tools = class _Tools {
  constructor(client) {
    __privateAdd$2(this, _client$1, void 0);
    __privateSet$2(this, _client$1, client);
  }
  static getInstance(client) {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new _Tools(client);
    return this.instance;
  }
  async getTool(toolId, version) {
    try {
      const galaxyTool = await __privateGet$1(this, _client$1).api(
        `api/tools/${toolId}?io_details=true&version=${version}`,
        {
          method: "GET"
        }
      );
      return galaxyTool;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error)
      });
    }
  }
};
_client$1 = new WeakMap();
__publicField$2(_Tools, "instance");
let Tools = _Tools;

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck$1 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck$1(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$1 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$1 = (obj, member, value, setter) => {
  __accessCheck$1(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client;
const _Workflows = class _Workflows {
  constructor(client) {
    __privateAdd$1(this, _client, void 0);
    __privateSet$1(this, _client, client);
  }
  static getInstance(client) {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new _Workflows(client);
    return this.instance;
  }
  async getWorkflow(workflowId) {
    try {
      const galaxyWorkflow = await __privateGet(this, _client).api(
        `api/workflows/${workflowId}`,
        {
          method: "GET"
        }
      );
      return galaxyWorkflow;
    } catch (error) {
      throw createError({
        statusCode: getStatusCode(error),
        statusMessage: `Unable to get workflow ${workflowId}`
      });
    }
  }
  async exportWorkflow(workflowId, style = "export") {
    try {
      const galaxyWorkflow = await __privateGet(this, _client).api(
        `api/workflows/${workflowId}/download?style=${style}`,
        {
          method: "GET"
        }
      );
      return galaxyWorkflow;
    } catch (error) {
      throw createError({
        statusCode: getStatusCode(error),
        // statusMessage: `Unable to get workflow ${workflowId}`,
        statusMessage: getErrorMessage(error)
      });
    }
  }
  async getWorkflows() {
    try {
      const galaxyWorkflows = await __privateGet(this, _client).api(
        "api/workflows",
        {
          method: "GET"
        }
      );
      return galaxyWorkflows;
    } catch (error) {
      throw createError({
        statusCode: getStatusCode(error),
        statusMessage: "Unable to get the list of workflows"
      });
    }
  }
  async invokeWorkflow(historyGalaxyId, workflowId, inputs, parameters) {
    try {
      const galaxyInvocation = await __privateGet(this, _client).api(
        `api/workflows/${workflowId}/invocations`,
        {
          method: "POST",
          body: { history_id: historyGalaxyId, inputs, parameters }
        }
      );
      return galaxyInvocation;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error)
      });
    }
  }
};
_client = new WeakMap();
__publicField$1(_Workflows, "instance");
let Workflows = _Workflows;

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _apiKey;
const _GalaxyClient = class _GalaxyClient {
  constructor(apiKey, url) {
    __privateAdd(this, _apiKey, void 0);
    __publicField(this, "url");
    __publicField(this, "api");
    __privateSet(this, _apiKey, apiKey);
    this.url = url;
    const fetch = $fetch.create({
      headers: {
        "x-api-key": apiKey,
        "accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Cookie": "galaxysession=3ce3e2281e4506fb5d1455b3a2f405b9575788704745930e9740ee41808187ceef17fb24a6b062bc"
      },
      baseURL: this.url
    });
    this.api = fetch;
  }
  static getInstance(apiKey, url) {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new _GalaxyClient(apiKey, url);
    return this.instance;
  }
  async getVersion() {
    return await this.api("/api/version");
  }
  histories() {
    return Histories.getInstance(this);
  }
  workflows() {
    return Workflows.getInstance(this);
  }
  tools() {
    return Tools.getInstance(this);
  }
  invocations() {
    return Invocations.getInstance(this);
  }
  jobs() {
    return Jobs.getInstance(this);
  }
  datasets() {
    return Datasets.getInstance(this);
  }
};
_apiKey = new WeakMap();
__publicField(_GalaxyClient, "instance");
let GalaxyClient = _GalaxyClient;

export { DatasetStates, DatasetsTerminalStates, GalaxyClient, GalaxyStates, HistoryStates, InvocationStates, InvocationTerminalStates, JobStates, JobTerminalStates, getErrorMessage, getStatusCode, isErrorWithMessage, isErrorWithStatus, toErrorWithMessage, toErrorWithStatus };
