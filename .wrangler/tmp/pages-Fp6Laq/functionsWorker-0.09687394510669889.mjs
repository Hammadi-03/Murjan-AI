var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../.wrangler/tmp/bundle-QPkCtR/checked-fetch.js
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  "../.wrangler/tmp/bundle-QPkCtR/checked-fetch.js"() {
    urls = /* @__PURE__ */ new Set();
    __name(checkURL, "checkURL");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init] = argArray;
        checkURL(request, init);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// ../node_modules/hono/dist/http-exception.js
var init_http_exception = __esm({
  "../node_modules/hono/dist/http-exception.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
  }
});

// ../node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT;
var init_constants = __esm({
  "../node_modules/hono/dist/request/constants.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    GET_MATCH_RESULT = /* @__PURE__ */ Symbol();
  }
});

// ../node_modules/hono/dist/utils/body.js
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var parseBody, handleParsingAllValues, handleParsingNestedValues;
var init_body = __esm({
  "../node_modules/hono/dist/utils/body.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_request();
    parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
      const { all = false, dot = false } = options;
      const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
      const contentType = headers.get("Content-Type");
      if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
        return parseFormData(request, { all, dot });
      }
      return {};
    }, "parseBody");
    __name(parseFormData, "parseFormData");
    __name(convertFormDataToBodyData, "convertFormDataToBodyData");
    handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
      if (form[key] !== void 0) {
        if (Array.isArray(form[key])) {
          ;
          form[key].push(value);
        } else {
          form[key] = [form[key], value];
        }
      } else {
        if (!key.endsWith("[]")) {
          form[key] = value;
        } else {
          form[key] = [value];
        }
      }
    }, "handleParsingAllValues");
    handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
      if (/(?:^|\.)__proto__\./.test(key)) {
        return;
      }
      let nestedForm = form;
      const keys = key.split(".");
      keys.forEach((key2, index) => {
        if (index === keys.length - 1) {
          nestedForm[key2] = value;
        } else {
          if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
            nestedForm[key2] = /* @__PURE__ */ Object.create(null);
          }
          nestedForm = nestedForm[key2];
        }
      });
    }, "handleParsingNestedValues");
  }
});

// ../node_modules/hono/dist/utils/url.js
var splitPath, splitRoutingPath, extractGroupsFromPath, replaceGroupMarks, patternCache, getPattern, tryDecode, tryDecodeURI, getPath, getPathNoStrict, mergePath, checkOptionalParameter, _decodeURI, _getQueryParam, getQueryParam, getQueryParams, decodeURIComponent_;
var init_url = __esm({
  "../node_modules/hono/dist/utils/url.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    splitPath = /* @__PURE__ */ __name((path2) => {
      const paths = path2.split("/");
      if (paths[0] === "") {
        paths.shift();
      }
      return paths;
    }, "splitPath");
    splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
      const { groups, path: path2 } = extractGroupsFromPath(routePath);
      const paths = splitPath(path2);
      return replaceGroupMarks(paths, groups);
    }, "splitRoutingPath");
    extractGroupsFromPath = /* @__PURE__ */ __name((path2) => {
      const groups = [];
      path2 = path2.replace(/\{[^}]+\}/g, (match3, index) => {
        const mark = `@${index}`;
        groups.push([mark, match3]);
        return mark;
      });
      return { groups, path: path2 };
    }, "extractGroupsFromPath");
    replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
      for (let i = groups.length - 1; i >= 0; i--) {
        const [mark] = groups[i];
        for (let j = paths.length - 1; j >= 0; j--) {
          if (paths[j].includes(mark)) {
            paths[j] = paths[j].replace(mark, groups[i][1]);
            break;
          }
        }
      }
      return paths;
    }, "replaceGroupMarks");
    patternCache = {};
    getPattern = /* @__PURE__ */ __name((label, next) => {
      if (label === "*") {
        return "*";
      }
      const match3 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
      if (match3) {
        const cacheKey = `${label}#${next}`;
        if (!patternCache[cacheKey]) {
          if (match3[2]) {
            patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match3[1], new RegExp(`^${match3[2]}(?=/${next})`)] : [label, match3[1], new RegExp(`^${match3[2]}$`)];
          } else {
            patternCache[cacheKey] = [label, match3[1], true];
          }
        }
        return patternCache[cacheKey];
      }
      return null;
    }, "getPattern");
    tryDecode = /* @__PURE__ */ __name((str, decoder) => {
      try {
        return decoder(str);
      } catch {
        return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match3) => {
          try {
            return decoder(match3);
          } catch {
            return match3;
          }
        });
      }
    }, "tryDecode");
    tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
    getPath = /* @__PURE__ */ __name((request) => {
      const url = request.url;
      const start = url.indexOf("/", url.indexOf(":") + 4);
      let i = start;
      for (; i < url.length; i++) {
        const charCode = url.charCodeAt(i);
        if (charCode === 37) {
          const queryIndex = url.indexOf("?", i);
          const hashIndex = url.indexOf("#", i);
          const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
          const path2 = url.slice(start, end);
          return tryDecodeURI(path2.includes("%25") ? path2.replace(/%25/g, "%2525") : path2);
        } else if (charCode === 63 || charCode === 35) {
          break;
        }
      }
      return url.slice(start, i);
    }, "getPath");
    getPathNoStrict = /* @__PURE__ */ __name((request) => {
      const result = getPath(request);
      return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
    }, "getPathNoStrict");
    mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
      if (rest.length) {
        sub = mergePath(sub, ...rest);
      }
      return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
    }, "mergePath");
    checkOptionalParameter = /* @__PURE__ */ __name((path2) => {
      if (path2.charCodeAt(path2.length - 1) !== 63 || !path2.includes(":")) {
        return null;
      }
      const segments = path2.split("/");
      const results = [];
      let basePath = "";
      segments.forEach((segment) => {
        if (segment !== "" && !/\:/.test(segment)) {
          basePath += "/" + segment;
        } else if (/\:/.test(segment)) {
          if (/\?/.test(segment)) {
            if (results.length === 0 && basePath === "") {
              results.push("/");
            } else {
              results.push(basePath);
            }
            const optionalSegment = segment.replace("?", "");
            basePath += "/" + optionalSegment;
            results.push(basePath);
          } else {
            basePath += "/" + segment;
          }
        }
      });
      return results.filter((v, i, a) => a.indexOf(v) === i);
    }, "checkOptionalParameter");
    _decodeURI = /* @__PURE__ */ __name((value) => {
      if (!/[%+]/.test(value)) {
        return value;
      }
      if (value.indexOf("+") !== -1) {
        value = value.replace(/\+/g, " ");
      }
      return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
    }, "_decodeURI");
    _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
      let encoded;
      if (!multiple && key && !/[%+]/.test(key)) {
        let keyIndex2 = url.indexOf("?", 8);
        if (keyIndex2 === -1) {
          return void 0;
        }
        if (!url.startsWith(key, keyIndex2 + 1)) {
          keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
        }
        while (keyIndex2 !== -1) {
          const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
          if (trailingKeyCode === 61) {
            const valueIndex = keyIndex2 + key.length + 2;
            const endIndex = url.indexOf("&", valueIndex);
            return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
          } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
            return "";
          }
          keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
        }
        encoded = /[%+]/.test(url);
        if (!encoded) {
          return void 0;
        }
      }
      const results = {};
      encoded ??= /[%+]/.test(url);
      let keyIndex = url.indexOf("?", 8);
      while (keyIndex !== -1) {
        const nextKeyIndex = url.indexOf("&", keyIndex + 1);
        let valueIndex = url.indexOf("=", keyIndex);
        if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
          valueIndex = -1;
        }
        let name = url.slice(
          keyIndex + 1,
          valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
        );
        if (encoded) {
          name = _decodeURI(name);
        }
        keyIndex = nextKeyIndex;
        if (name === "") {
          continue;
        }
        let value;
        if (valueIndex === -1) {
          value = "";
        } else {
          value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
          if (encoded) {
            value = _decodeURI(value);
          }
        }
        if (multiple) {
          if (!(results[name] && Array.isArray(results[name]))) {
            results[name] = [];
          }
          ;
          results[name].push(value);
        } else {
          results[name] ??= value;
        }
      }
      return key ? results[key] : results;
    }, "_getQueryParam");
    getQueryParam = _getQueryParam;
    getQueryParams = /* @__PURE__ */ __name((url, key) => {
      return _getQueryParam(url, key, true);
    }, "getQueryParams");
    decodeURIComponent_ = decodeURIComponent;
  }
});

// ../node_modules/hono/dist/request.js
var tryDecodeURIComponent, HonoRequest;
var init_request = __esm({
  "../node_modules/hono/dist/request.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_http_exception();
    init_constants();
    init_body();
    init_url();
    tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
    HonoRequest = class {
      static {
        __name(this, "HonoRequest");
      }
      /**
       * `.raw` can get the raw Request object.
       *
       * @see {@link https://hono.dev/docs/api/request#raw}
       *
       * @example
       * ```ts
       * // For Cloudflare Workers
       * app.post('/', async (c) => {
       *   const metadata = c.req.raw.cf?.hostMetadata?
       *   ...
       * })
       * ```
       */
      raw;
      #validatedData;
      // Short name of validatedData
      #matchResult;
      routeIndex = 0;
      /**
       * `.path` can get the pathname of the request.
       *
       * @see {@link https://hono.dev/docs/api/request#path}
       *
       * @example
       * ```ts
       * app.get('/about/me', (c) => {
       *   const pathname = c.req.path // `/about/me`
       * })
       * ```
       */
      path;
      bodyCache = {};
      constructor(request, path2 = "/", matchResult = [[]]) {
        this.raw = request;
        this.path = path2;
        this.#matchResult = matchResult;
        this.#validatedData = {};
      }
      param(key) {
        return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
      }
      #getDecodedParam(key) {
        const paramKey = this.#matchResult[0][this.routeIndex][1][key];
        const param = this.#getParamValue(paramKey);
        return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
      }
      #getAllDecodedParams() {
        const decoded = {};
        const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
        for (const key of keys) {
          const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
          if (value !== void 0) {
            decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
          }
        }
        return decoded;
      }
      #getParamValue(paramKey) {
        return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
      }
      query(key) {
        return getQueryParam(this.url, key);
      }
      queries(key) {
        return getQueryParams(this.url, key);
      }
      header(name) {
        if (name) {
          return this.raw.headers.get(name) ?? void 0;
        }
        const headerData = {};
        this.raw.headers.forEach((value, key) => {
          headerData[key] = value;
        });
        return headerData;
      }
      async parseBody(options) {
        return parseBody(this, options);
      }
      #cachedBody = /* @__PURE__ */ __name((key) => {
        const { bodyCache, raw: raw2 } = this;
        const cachedBody = bodyCache[key];
        if (cachedBody) {
          return cachedBody;
        }
        const anyCachedKey = Object.keys(bodyCache)[0];
        if (anyCachedKey) {
          return bodyCache[anyCachedKey].then((body) => {
            if (anyCachedKey === "json") {
              body = JSON.stringify(body);
            }
            return new Response(body)[key]();
          });
        }
        return bodyCache[key] = raw2[key]();
      }, "#cachedBody");
      /**
       * `.json()` can parse Request body of type `application/json`
       *
       * @see {@link https://hono.dev/docs/api/request#json}
       *
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.json()
       * })
       * ```
       */
      json() {
        return this.#cachedBody("text").then((text) => JSON.parse(text));
      }
      /**
       * `.text()` can parse Request body of type `text/plain`
       *
       * @see {@link https://hono.dev/docs/api/request#text}
       *
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.text()
       * })
       * ```
       */
      text() {
        return this.#cachedBody("text");
      }
      /**
       * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
       *
       * @see {@link https://hono.dev/docs/api/request#arraybuffer}
       *
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.arrayBuffer()
       * })
       * ```
       */
      arrayBuffer() {
        return this.#cachedBody("arrayBuffer");
      }
      /**
       * Parses the request body as a `Blob`.
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.blob();
       * });
       * ```
       * @see https://hono.dev/docs/api/request#blob
       */
      blob() {
        return this.#cachedBody("blob");
      }
      /**
       * Parses the request body as `FormData`.
       * @example
       * ```ts
       * app.post('/entry', async (c) => {
       *   const body = await c.req.formData();
       * });
       * ```
       * @see https://hono.dev/docs/api/request#formdata
       */
      formData() {
        return this.#cachedBody("formData");
      }
      /**
       * Adds validated data to the request.
       *
       * @param target - The target of the validation.
       * @param data - The validated data to add.
       */
      addValidatedData(target, data) {
        this.#validatedData[target] = data;
      }
      valid(target) {
        return this.#validatedData[target];
      }
      /**
       * `.url()` can get the request url strings.
       *
       * @see {@link https://hono.dev/docs/api/request#url}
       *
       * @example
       * ```ts
       * app.get('/about/me', (c) => {
       *   const url = c.req.url // `http://localhost:8787/about/me`
       *   ...
       * })
       * ```
       */
      get url() {
        return this.raw.url;
      }
      /**
       * `.method()` can get the method name of the request.
       *
       * @see {@link https://hono.dev/docs/api/request#method}
       *
       * @example
       * ```ts
       * app.get('/about/me', (c) => {
       *   const method = c.req.method // `GET`
       * })
       * ```
       */
      get method() {
        return this.raw.method;
      }
      get [GET_MATCH_RESULT]() {
        return this.#matchResult;
      }
      /**
       * `.matchedRoutes()` can return a matched route in the handler
       *
       * @deprecated
       *
       * Use matchedRoutes helper defined in "hono/route" instead.
       *
       * @see {@link https://hono.dev/docs/api/request#matchedroutes}
       *
       * @example
       * ```ts
       * app.use('*', async function logger(c, next) {
       *   await next()
       *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
       *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
       *     console.log(
       *       method,
       *       ' ',
       *       path,
       *       ' '.repeat(Math.max(10 - path.length, 0)),
       *       name,
       *       i === c.req.routeIndex ? '<- respond from here' : ''
       *     )
       *   })
       * })
       * ```
       */
      get matchedRoutes() {
        return this.#matchResult[0].map(([[, route]]) => route);
      }
      /**
       * `routePath()` can retrieve the path registered within the handler
       *
       * @deprecated
       *
       * Use routePath helper defined in "hono/route" instead.
       *
       * @see {@link https://hono.dev/docs/api/request#routepath}
       *
       * @example
       * ```ts
       * app.get('/posts/:id', (c) => {
       *   return c.json({ path: c.req.routePath })
       * })
       * ```
       */
      get routePath() {
        return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
      }
    };
  }
});

// ../node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase, raw, resolveCallback;
var init_html = __esm({
  "../node_modules/hono/dist/utils/html.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    HtmlEscapedCallbackPhase = {
      Stringify: 1,
      BeforeStream: 2,
      Stream: 3
    };
    raw = /* @__PURE__ */ __name((value, callbacks) => {
      const escapedString = new String(value);
      escapedString.isEscaped = true;
      escapedString.callbacks = callbacks;
      return escapedString;
    }, "raw");
    resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context, buffer) => {
      if (typeof str === "object" && !(str instanceof String)) {
        if (!(str instanceof Promise)) {
          str = str.toString();
        }
        if (str instanceof Promise) {
          str = await str;
        }
      }
      const callbacks = str.callbacks;
      if (!callbacks?.length) {
        return Promise.resolve(str);
      }
      if (buffer) {
        buffer[0] += str;
      } else {
        buffer = [str];
      }
      const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
        (res) => Promise.all(
          res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
        ).then(() => buffer[0])
      );
      if (preserveCallbacks) {
        return raw(await resStr, callbacks);
      } else {
        return resStr;
      }
    }, "resolveCallback");
  }
});

// ../node_modules/hono/dist/context.js
var TEXT_PLAIN, setDefaultContentType, createResponseInstance, Context;
var init_context = __esm({
  "../node_modules/hono/dist/context.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_request();
    init_html();
    TEXT_PLAIN = "text/plain; charset=UTF-8";
    setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
      return {
        "Content-Type": contentType,
        ...headers
      };
    }, "setDefaultContentType");
    createResponseInstance = /* @__PURE__ */ __name((body, init) => new Response(body, init), "createResponseInstance");
    Context = class {
      static {
        __name(this, "Context");
      }
      #rawRequest;
      #req;
      /**
       * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
       *
       * @see {@link https://hono.dev/docs/api/context#env}
       *
       * @example
       * ```ts
       * // Environment object for Cloudflare Workers
       * app.get('*', async c => {
       *   const counter = c.env.COUNTER
       * })
       * ```
       */
      env = {};
      #var;
      finalized = false;
      /**
       * `.error` can get the error object from the middleware if the Handler throws an error.
       *
       * @see {@link https://hono.dev/docs/api/context#error}
       *
       * @example
       * ```ts
       * app.use('*', async (c, next) => {
       *   await next()
       *   if (c.error) {
       *     // do something...
       *   }
       * })
       * ```
       */
      error;
      #status;
      #executionCtx;
      #res;
      #layout;
      #renderer;
      #notFoundHandler;
      #preparedHeaders;
      #matchResult;
      #path;
      /**
       * Creates an instance of the Context class.
       *
       * @param req - The Request object.
       * @param options - Optional configuration options for the context.
       */
      constructor(req, options) {
        this.#rawRequest = req;
        if (options) {
          this.#executionCtx = options.executionCtx;
          this.env = options.env;
          this.#notFoundHandler = options.notFoundHandler;
          this.#path = options.path;
          this.#matchResult = options.matchResult;
        }
      }
      /**
       * `.req` is the instance of {@link HonoRequest}.
       */
      get req() {
        this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
        return this.#req;
      }
      /**
       * @see {@link https://hono.dev/docs/api/context#event}
       * The FetchEvent associated with the current request.
       *
       * @throws Will throw an error if the context does not have a FetchEvent.
       */
      get event() {
        if (this.#executionCtx && "respondWith" in this.#executionCtx) {
          return this.#executionCtx;
        } else {
          throw Error("This context has no FetchEvent");
        }
      }
      /**
       * @see {@link https://hono.dev/docs/api/context#executionctx}
       * The ExecutionContext associated with the current request.
       *
       * @throws Will throw an error if the context does not have an ExecutionContext.
       */
      get executionCtx() {
        if (this.#executionCtx) {
          return this.#executionCtx;
        } else {
          throw Error("This context has no ExecutionContext");
        }
      }
      /**
       * @see {@link https://hono.dev/docs/api/context#res}
       * The Response object for the current request.
       */
      get res() {
        return this.#res ||= createResponseInstance(null, {
          headers: this.#preparedHeaders ??= new Headers()
        });
      }
      /**
       * Sets the Response object for the current request.
       *
       * @param _res - The Response object to set.
       */
      set res(_res) {
        if (this.#res && _res) {
          _res = createResponseInstance(_res.body, _res);
          for (const [k, v] of this.#res.headers.entries()) {
            if (k === "content-type") {
              continue;
            }
            if (k === "set-cookie") {
              const cookies = this.#res.headers.getSetCookie();
              _res.headers.delete("set-cookie");
              for (const cookie of cookies) {
                _res.headers.append("set-cookie", cookie);
              }
            } else {
              _res.headers.set(k, v);
            }
          }
        }
        this.#res = _res;
        this.finalized = true;
      }
      /**
       * `.render()` can create a response within a layout.
       *
       * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
       *
       * @example
       * ```ts
       * app.get('/', (c) => {
       *   return c.render('Hello!')
       * })
       * ```
       */
      render = /* @__PURE__ */ __name((...args) => {
        this.#renderer ??= (content) => this.html(content);
        return this.#renderer(...args);
      }, "render");
      /**
       * Sets the layout for the response.
       *
       * @param layout - The layout to set.
       * @returns The layout function.
       */
      setLayout = /* @__PURE__ */ __name((layout) => this.#layout = layout, "setLayout");
      /**
       * Gets the current layout for the response.
       *
       * @returns The current layout function.
       */
      getLayout = /* @__PURE__ */ __name(() => this.#layout, "getLayout");
      /**
       * `.setRenderer()` can set the layout in the custom middleware.
       *
       * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
       *
       * @example
       * ```tsx
       * app.use('*', async (c, next) => {
       *   c.setRenderer((content) => {
       *     return c.html(
       *       <html>
       *         <body>
       *           <p>{content}</p>
       *         </body>
       *       </html>
       *     )
       *   })
       *   await next()
       * })
       * ```
       */
      setRenderer = /* @__PURE__ */ __name((renderer) => {
        this.#renderer = renderer;
      }, "setRenderer");
      /**
       * `.header()` can set headers.
       *
       * @see {@link https://hono.dev/docs/api/context#header}
       *
       * @example
       * ```ts
       * app.get('/welcome', (c) => {
       *   // Set headers
       *   c.header('X-Message', 'Hello!')
       *   c.header('Content-Type', 'text/plain')
       *
       *   return c.body('Thank you for coming')
       * })
       * ```
       */
      header = /* @__PURE__ */ __name((name, value, options) => {
        if (this.finalized) {
          this.#res = createResponseInstance(this.#res.body, this.#res);
        }
        const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
        if (value === void 0) {
          headers.delete(name);
        } else if (options?.append) {
          headers.append(name, value);
        } else {
          headers.set(name, value);
        }
      }, "header");
      status = /* @__PURE__ */ __name((status) => {
        this.#status = status;
      }, "status");
      /**
       * `.set()` can set the value specified by the key.
       *
       * @see {@link https://hono.dev/docs/api/context#set-get}
       *
       * @example
       * ```ts
       * app.use('*', async (c, next) => {
       *   c.set('message', 'Hono is hot!!')
       *   await next()
       * })
       * ```
       */
      set = /* @__PURE__ */ __name((key, value) => {
        this.#var ??= /* @__PURE__ */ new Map();
        this.#var.set(key, value);
      }, "set");
      /**
       * `.get()` can use the value specified by the key.
       *
       * @see {@link https://hono.dev/docs/api/context#set-get}
       *
       * @example
       * ```ts
       * app.get('/', (c) => {
       *   const message = c.get('message')
       *   return c.text(`The message is "${message}"`)
       * })
       * ```
       */
      get = /* @__PURE__ */ __name((key) => {
        return this.#var ? this.#var.get(key) : void 0;
      }, "get");
      /**
       * `.var` can access the value of a variable.
       *
       * @see {@link https://hono.dev/docs/api/context#var}
       *
       * @example
       * ```ts
       * const result = c.var.client.oneMethod()
       * ```
       */
      // c.var.propName is a read-only
      get var() {
        if (!this.#var) {
          return {};
        }
        return Object.fromEntries(this.#var);
      }
      #newResponse(data, arg, headers) {
        const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
        if (typeof arg === "object" && "headers" in arg) {
          const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
          for (const [key, value] of argHeaders) {
            if (key.toLowerCase() === "set-cookie") {
              responseHeaders.append(key, value);
            } else {
              responseHeaders.set(key, value);
            }
          }
        }
        if (headers) {
          for (const [k, v] of Object.entries(headers)) {
            if (typeof v === "string") {
              responseHeaders.set(k, v);
            } else {
              responseHeaders.delete(k);
              for (const v2 of v) {
                responseHeaders.append(k, v2);
              }
            }
          }
        }
        const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
        return createResponseInstance(data, { status, headers: responseHeaders });
      }
      newResponse = /* @__PURE__ */ __name((...args) => this.#newResponse(...args), "newResponse");
      /**
       * `.body()` can return the HTTP response.
       * You can set headers with `.header()` and set HTTP status code with `.status`.
       * This can also be set in `.text()`, `.json()` and so on.
       *
       * @see {@link https://hono.dev/docs/api/context#body}
       *
       * @example
       * ```ts
       * app.get('/welcome', (c) => {
       *   // Set headers
       *   c.header('X-Message', 'Hello!')
       *   c.header('Content-Type', 'text/plain')
       *   // Set HTTP status code
       *   c.status(201)
       *
       *   // Return the response body
       *   return c.body('Thank you for coming')
       * })
       * ```
       */
      body = /* @__PURE__ */ __name((data, arg, headers) => this.#newResponse(data, arg, headers), "body");
      /**
       * `.text()` can render text as `Content-Type:text/plain`.
       *
       * @see {@link https://hono.dev/docs/api/context#text}
       *
       * @example
       * ```ts
       * app.get('/say', (c) => {
       *   return c.text('Hello!')
       * })
       * ```
       */
      text = /* @__PURE__ */ __name((text, arg, headers) => {
        return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
          text,
          arg,
          setDefaultContentType(TEXT_PLAIN, headers)
        );
      }, "text");
      /**
       * `.json()` can render JSON as `Content-Type:application/json`.
       *
       * @see {@link https://hono.dev/docs/api/context#json}
       *
       * @example
       * ```ts
       * app.get('/api', (c) => {
       *   return c.json({ message: 'Hello!' })
       * })
       * ```
       */
      json = /* @__PURE__ */ __name((object, arg, headers) => {
        return this.#newResponse(
          JSON.stringify(object),
          arg,
          setDefaultContentType("application/json", headers)
        );
      }, "json");
      html = /* @__PURE__ */ __name((html, arg, headers) => {
        const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
        return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
      }, "html");
      /**
       * `.redirect()` can Redirect, default status code is 302.
       *
       * @see {@link https://hono.dev/docs/api/context#redirect}
       *
       * @example
       * ```ts
       * app.get('/redirect', (c) => {
       *   return c.redirect('/')
       * })
       * app.get('/redirect-permanently', (c) => {
       *   return c.redirect('/', 301)
       * })
       * ```
       */
      redirect = /* @__PURE__ */ __name((location, status) => {
        const locationString = String(location);
        this.header(
          "Location",
          // Multibyes should be encoded
          // eslint-disable-next-line no-control-regex
          !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
        );
        return this.newResponse(null, status ?? 302);
      }, "redirect");
      /**
       * `.notFound()` can return the Not Found Response.
       *
       * @see {@link https://hono.dev/docs/api/context#notfound}
       *
       * @example
       * ```ts
       * app.get('/notfound', (c) => {
       *   return c.notFound()
       * })
       * ```
       */
      notFound = /* @__PURE__ */ __name(() => {
        this.#notFoundHandler ??= () => createResponseInstance();
        return this.#notFoundHandler(this);
      }, "notFound");
    };
  }
});

// ../node_modules/hono/dist/adapter/cloudflare-pages/handler.js
var handle;
var init_handler = __esm({
  "../node_modules/hono/dist/adapter/cloudflare-pages/handler.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_context();
    init_http_exception();
    handle = /* @__PURE__ */ __name((app2) => (eventContext) => {
      return app2.fetch(
        eventContext.request,
        { ...eventContext.env, eventContext },
        {
          waitUntil: eventContext.waitUntil,
          passThroughOnException: eventContext.passThroughOnException,
          props: {}
        }
      );
    }, "handle");
  }
});

// ../node_modules/hono/dist/adapter/cloudflare-pages/conninfo.js
var init_conninfo = __esm({
  "../node_modules/hono/dist/adapter/cloudflare-pages/conninfo.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
  }
});

// ../node_modules/hono/dist/adapter/cloudflare-pages/index.js
var init_cloudflare_pages = __esm({
  "../node_modules/hono/dist/adapter/cloudflare-pages/index.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_handler();
    init_conninfo();
  }
});

// ../node_modules/hono/dist/compose.js
var compose;
var init_compose = __esm({
  "../node_modules/hono/dist/compose.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
      return (context, next) => {
        let index = -1;
        return dispatch(0);
        async function dispatch(i) {
          if (i <= index) {
            throw new Error("next() called multiple times");
          }
          index = i;
          let res;
          let isError = false;
          let handler;
          if (middleware[i]) {
            handler = middleware[i][0][0];
            context.req.routeIndex = i;
          } else {
            handler = i === middleware.length && next || void 0;
          }
          if (handler) {
            try {
              res = await handler(context, () => dispatch(i + 1));
            } catch (err) {
              if (err instanceof Error && onError) {
                context.error = err;
                res = await onError(err, context);
                isError = true;
              } else {
                throw err;
              }
            }
          } else {
            if (context.finalized === false && onNotFound) {
              res = await onNotFound(context);
            }
          }
          if (res && (context.finalized === false || isError)) {
            context.res = res;
          }
          return context;
        }
        __name(dispatch, "dispatch");
      };
    }, "compose");
  }
});

// ../node_modules/hono/dist/router.js
var METHOD_NAME_ALL, METHOD_NAME_ALL_LOWERCASE, METHODS, MESSAGE_MATCHER_IS_ALREADY_BUILT, UnsupportedPathError;
var init_router = __esm({
  "../node_modules/hono/dist/router.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    METHOD_NAME_ALL = "ALL";
    METHOD_NAME_ALL_LOWERCASE = "all";
    METHODS = ["get", "post", "put", "delete", "options", "patch"];
    MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
    UnsupportedPathError = class extends Error {
      static {
        __name(this, "UnsupportedPathError");
      }
    };
  }
});

// ../node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER;
var init_constants2 = __esm({
  "../node_modules/hono/dist/utils/constants.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    COMPOSED_HANDLER = "__COMPOSED_HANDLER";
  }
});

// ../node_modules/hono/dist/hono-base.js
var notFoundHandler, errorHandler, Hono;
var init_hono_base = __esm({
  "../node_modules/hono/dist/hono-base.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_compose();
    init_context();
    init_router();
    init_constants2();
    init_url();
    notFoundHandler = /* @__PURE__ */ __name((c) => {
      return c.text("404 Not Found", 404);
    }, "notFoundHandler");
    errorHandler = /* @__PURE__ */ __name((err, c) => {
      if ("getResponse" in err) {
        const res = err.getResponse();
        return c.newResponse(res.body, res);
      }
      console.error(err);
      return c.text("Internal Server Error", 500);
    }, "errorHandler");
    Hono = class _Hono {
      static {
        __name(this, "_Hono");
      }
      get;
      post;
      put;
      delete;
      options;
      patch;
      all;
      on;
      use;
      /*
        This class is like an abstract class and does not have a router.
        To use it, inherit the class and implement router in the constructor.
      */
      router;
      getPath;
      // Cannot use `#` because it requires visibility at JavaScript runtime.
      _basePath = "/";
      #path = "/";
      routes = [];
      constructor(options = {}) {
        const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
        allMethods.forEach((method) => {
          this[method] = (args1, ...args) => {
            if (typeof args1 === "string") {
              this.#path = args1;
            } else {
              this.#addRoute(method, this.#path, args1);
            }
            args.forEach((handler) => {
              this.#addRoute(method, this.#path, handler);
            });
            return this;
          };
        });
        this.on = (method, path2, ...handlers) => {
          for (const p of [path2].flat()) {
            this.#path = p;
            for (const m of [method].flat()) {
              handlers.map((handler) => {
                this.#addRoute(m.toUpperCase(), this.#path, handler);
              });
            }
          }
          return this;
        };
        this.use = (arg1, ...handlers) => {
          if (typeof arg1 === "string") {
            this.#path = arg1;
          } else {
            this.#path = "*";
            handlers.unshift(arg1);
          }
          handlers.forEach((handler) => {
            this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
          });
          return this;
        };
        const { strict, ...optionsWithoutStrict } = options;
        Object.assign(this, optionsWithoutStrict);
        this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
      }
      #clone() {
        const clone = new _Hono({
          router: this.router,
          getPath: this.getPath
        });
        clone.errorHandler = this.errorHandler;
        clone.#notFoundHandler = this.#notFoundHandler;
        clone.routes = this.routes;
        return clone;
      }
      #notFoundHandler = notFoundHandler;
      // Cannot use `#` because it requires visibility at JavaScript runtime.
      errorHandler = errorHandler;
      /**
       * `.route()` allows grouping other Hono instance in routes.
       *
       * @see {@link https://hono.dev/docs/api/routing#grouping}
       *
       * @param {string} path - base Path
       * @param {Hono} app - other Hono instance
       * @returns {Hono} routed Hono instance
       *
       * @example
       * ```ts
       * const app = new Hono()
       * const app2 = new Hono()
       *
       * app2.get("/user", (c) => c.text("user"))
       * app.route("/api", app2) // GET /api/user
       * ```
       */
      route(path2, app2) {
        const subApp = this.basePath(path2);
        app2.routes.map((r) => {
          let handler;
          if (app2.errorHandler === errorHandler) {
            handler = r.handler;
          } else {
            handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
            handler[COMPOSED_HANDLER] = r.handler;
          }
          subApp.#addRoute(r.method, r.path, handler);
        });
        return this;
      }
      /**
       * `.basePath()` allows base paths to be specified.
       *
       * @see {@link https://hono.dev/docs/api/routing#base-path}
       *
       * @param {string} path - base Path
       * @returns {Hono} changed Hono instance
       *
       * @example
       * ```ts
       * const api = new Hono().basePath('/api')
       * ```
       */
      basePath(path2) {
        const subApp = this.#clone();
        subApp._basePath = mergePath(this._basePath, path2);
        return subApp;
      }
      /**
       * `.onError()` handles an error and returns a customized Response.
       *
       * @see {@link https://hono.dev/docs/api/hono#error-handling}
       *
       * @param {ErrorHandler} handler - request Handler for error
       * @returns {Hono} changed Hono instance
       *
       * @example
       * ```ts
       * app.onError((err, c) => {
       *   console.error(`${err}`)
       *   return c.text('Custom Error Message', 500)
       * })
       * ```
       */
      onError = /* @__PURE__ */ __name((handler) => {
        this.errorHandler = handler;
        return this;
      }, "onError");
      /**
       * `.notFound()` allows you to customize a Not Found Response.
       *
       * @see {@link https://hono.dev/docs/api/hono#not-found}
       *
       * @param {NotFoundHandler} handler - request handler for not-found
       * @returns {Hono} changed Hono instance
       *
       * @example
       * ```ts
       * app.notFound((c) => {
       *   return c.text('Custom 404 Message', 404)
       * })
       * ```
       */
      notFound = /* @__PURE__ */ __name((handler) => {
        this.#notFoundHandler = handler;
        return this;
      }, "notFound");
      /**
       * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
       *
       * @see {@link https://hono.dev/docs/api/hono#mount}
       *
       * @param {string} path - base Path
       * @param {Function} applicationHandler - other Request Handler
       * @param {MountOptions} [options] - options of `.mount()`
       * @returns {Hono} mounted Hono instance
       *
       * @example
       * ```ts
       * import { Router as IttyRouter } from 'itty-router'
       * import { Hono } from 'hono'
       * // Create itty-router application
       * const ittyRouter = IttyRouter()
       * // GET /itty-router/hello
       * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
       *
       * const app = new Hono()
       * app.mount('/itty-router', ittyRouter.handle)
       * ```
       *
       * @example
       * ```ts
       * const app = new Hono()
       * // Send the request to another application without modification.
       * app.mount('/app', anotherApp, {
       *   replaceRequest: (req) => req,
       * })
       * ```
       */
      mount(path2, applicationHandler, options) {
        let replaceRequest;
        let optionHandler;
        if (options) {
          if (typeof options === "function") {
            optionHandler = options;
          } else {
            optionHandler = options.optionHandler;
            if (options.replaceRequest === false) {
              replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
            } else {
              replaceRequest = options.replaceRequest;
            }
          }
        }
        const getOptions = optionHandler ? (c) => {
          const options2 = optionHandler(c);
          return Array.isArray(options2) ? options2 : [options2];
        } : (c) => {
          let executionContext = void 0;
          try {
            executionContext = c.executionCtx;
          } catch {
          }
          return [c.env, executionContext];
        };
        replaceRequest ||= (() => {
          const mergedPath = mergePath(this._basePath, path2);
          const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
          return (request) => {
            const url = new URL(request.url);
            url.pathname = url.pathname.slice(pathPrefixLength) || "/";
            return new Request(url, request);
          };
        })();
        const handler = /* @__PURE__ */ __name(async (c, next) => {
          const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
          if (res) {
            return res;
          }
          await next();
        }, "handler");
        this.#addRoute(METHOD_NAME_ALL, mergePath(path2, "*"), handler);
        return this;
      }
      #addRoute(method, path2, handler) {
        method = method.toUpperCase();
        path2 = mergePath(this._basePath, path2);
        const r = { basePath: this._basePath, path: path2, method, handler };
        this.router.add(method, path2, [handler, r]);
        this.routes.push(r);
      }
      #handleError(err, c) {
        if (err instanceof Error) {
          return this.errorHandler(err, c);
        }
        throw err;
      }
      #dispatch(request, executionCtx, env2, method) {
        if (method === "HEAD") {
          return (async () => new Response(null, await this.#dispatch(request, executionCtx, env2, "GET")))();
        }
        const path2 = this.getPath(request, { env: env2 });
        const matchResult = this.router.match(method, path2);
        const c = new Context(request, {
          path: path2,
          matchResult,
          env: env2,
          executionCtx,
          notFoundHandler: this.#notFoundHandler
        });
        if (matchResult[0].length === 1) {
          let res;
          try {
            res = matchResult[0][0][0][0](c, async () => {
              c.res = await this.#notFoundHandler(c);
            });
          } catch (err) {
            return this.#handleError(err, c);
          }
          return res instanceof Promise ? res.then(
            (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
          ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
        }
        const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
        return (async () => {
          try {
            const context = await composed(c);
            if (!context.finalized) {
              throw new Error(
                "Context is not finalized. Did you forget to return a Response object or `await next()`?"
              );
            }
            return context.res;
          } catch (err) {
            return this.#handleError(err, c);
          }
        })();
      }
      /**
       * `.fetch()` will be entry point of your app.
       *
       * @see {@link https://hono.dev/docs/api/hono#fetch}
       *
       * @param {Request} request - request Object of request
       * @param {Env} Env - env Object
       * @param {ExecutionContext} - context of execution
       * @returns {Response | Promise<Response>} response of request
       *
       */
      fetch = /* @__PURE__ */ __name((request, ...rest) => {
        return this.#dispatch(request, rest[1], rest[0], request.method);
      }, "fetch");
      /**
       * `.request()` is a useful method for testing.
       * You can pass a URL or pathname to send a GET request.
       * app will return a Response object.
       * ```ts
       * test('GET /hello is ok', async () => {
       *   const res = await app.request('/hello')
       *   expect(res.status).toBe(200)
       * })
       * ```
       * @see https://hono.dev/docs/api/hono#request
       */
      request = /* @__PURE__ */ __name((input, requestInit, Env, executionCtx) => {
        if (input instanceof Request) {
          return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
        }
        input = input.toString();
        return this.fetch(
          new Request(
            /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
            requestInit
          ),
          Env,
          executionCtx
        );
      }, "request");
      /**
       * `.fire()` automatically adds a global fetch event listener.
       * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
       * @deprecated
       * Use `fire` from `hono/service-worker` instead.
       * ```ts
       * import { Hono } from 'hono'
       * import { fire } from 'hono/service-worker'
       *
       * const app = new Hono()
       * // ...
       * fire(app)
       * ```
       * @see https://hono.dev/docs/api/hono#fire
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
       * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
       */
      fire = /* @__PURE__ */ __name(() => {
        addEventListener("fetch", (event) => {
          event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
        });
      }, "fire");
    };
  }
});

// ../node_modules/hono/dist/router/reg-exp-router/matcher.js
function match(method, path2) {
  const matchers = this.buildAllMatchers();
  const match22 = /* @__PURE__ */ __name(((method2, path22) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path22];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path22.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }), "match2");
  this.match = match22;
  return match22(method, path2);
}
var emptyParam;
var init_matcher = __esm({
  "../node_modules/hono/dist/router/reg-exp-router/matcher.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_router();
    emptyParam = [];
    __name(match, "match");
  }
});

// ../node_modules/hono/dist/router/reg-exp-router/node.js
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var LABEL_REG_EXP_STR, ONLY_WILDCARD_REG_EXP_STR, TAIL_WILDCARD_REG_EXP_STR, PATH_ERROR, regExpMetaChars, Node;
var init_node = __esm({
  "../node_modules/hono/dist/router/reg-exp-router/node.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    LABEL_REG_EXP_STR = "[^/]+";
    ONLY_WILDCARD_REG_EXP_STR = ".*";
    TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
    PATH_ERROR = /* @__PURE__ */ Symbol();
    regExpMetaChars = new Set(".\\+*[^]$()");
    __name(compareKey, "compareKey");
    Node = class _Node {
      static {
        __name(this, "_Node");
      }
      #index;
      #varIndex;
      #children = /* @__PURE__ */ Object.create(null);
      insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
        if (tokens.length === 0) {
          if (this.#index !== void 0) {
            throw PATH_ERROR;
          }
          if (pathErrorCheckOnly) {
            return;
          }
          this.#index = index;
          return;
        }
        const [token, ...restTokens] = tokens;
        const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
        let node;
        if (pattern) {
          const name = pattern[1];
          let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
          if (name && pattern[2]) {
            if (regexpStr === ".*") {
              throw PATH_ERROR;
            }
            regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
            if (/\((?!\?:)/.test(regexpStr)) {
              throw PATH_ERROR;
            }
          }
          node = this.#children[regexpStr];
          if (!node) {
            if (Object.keys(this.#children).some(
              (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
            )) {
              throw PATH_ERROR;
            }
            if (pathErrorCheckOnly) {
              return;
            }
            node = this.#children[regexpStr] = new _Node();
            if (name !== "") {
              node.#varIndex = context.varIndex++;
            }
          }
          if (!pathErrorCheckOnly && name !== "") {
            paramMap.push([name, node.#varIndex]);
          }
        } else {
          node = this.#children[token];
          if (!node) {
            if (Object.keys(this.#children).some(
              (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
            )) {
              throw PATH_ERROR;
            }
            if (pathErrorCheckOnly) {
              return;
            }
            node = this.#children[token] = new _Node();
          }
        }
        node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
      }
      buildRegExpStr() {
        const childKeys = Object.keys(this.#children).sort(compareKey);
        const strList = childKeys.map((k) => {
          const c = this.#children[k];
          return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
        });
        if (typeof this.#index === "number") {
          strList.unshift(`#${this.#index}`);
        }
        if (strList.length === 0) {
          return "";
        }
        if (strList.length === 1) {
          return strList[0];
        }
        return "(?:" + strList.join("|") + ")";
      }
    };
  }
});

// ../node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie;
var init_trie = __esm({
  "../node_modules/hono/dist/router/reg-exp-router/trie.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_node();
    Trie = class {
      static {
        __name(this, "Trie");
      }
      #context = { varIndex: 0 };
      #root = new Node();
      insert(path2, index, pathErrorCheckOnly) {
        const paramAssoc = [];
        const groups = [];
        for (let i = 0; ; ) {
          let replaced = false;
          path2 = path2.replace(/\{[^}]+\}/g, (m) => {
            const mark = `@\\${i}`;
            groups[i] = [mark, m];
            i++;
            replaced = true;
            return mark;
          });
          if (!replaced) {
            break;
          }
        }
        const tokens = path2.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
        for (let i = groups.length - 1; i >= 0; i--) {
          const [mark] = groups[i];
          for (let j = tokens.length - 1; j >= 0; j--) {
            if (tokens[j].indexOf(mark) !== -1) {
              tokens[j] = tokens[j].replace(mark, groups[i][1]);
              break;
            }
          }
        }
        this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
        return paramAssoc;
      }
      buildRegExp() {
        let regexp = this.#root.buildRegExpStr();
        if (regexp === "") {
          return [/^$/, [], []];
        }
        let captureIndex = 0;
        const indexReplacementMap = [];
        const paramReplacementMap = [];
        regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
          if (handlerIndex !== void 0) {
            indexReplacementMap[++captureIndex] = Number(handlerIndex);
            return "$()";
          }
          if (paramIndex !== void 0) {
            paramReplacementMap[Number(paramIndex)] = ++captureIndex;
            return "";
          }
          return "";
        });
        return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
      }
    };
  }
});

// ../node_modules/hono/dist/router/reg-exp-router/router.js
function buildWildcardRegExp(path2) {
  return wildcardRegExpCache[path2] ??= new RegExp(
    path2 === "*" ? "" : `^${path2.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes2) {
  const trie = new Trie();
  const handlerData = [];
  if (routes2.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes2.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path2, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path2] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path2, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path2) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path2) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path2)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
var nullMatcher, wildcardRegExpCache, RegExpRouter;
var init_router2 = __esm({
  "../node_modules/hono/dist/router/reg-exp-router/router.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_router();
    init_url();
    init_matcher();
    init_node();
    init_trie();
    nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
    wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
    __name(buildWildcardRegExp, "buildWildcardRegExp");
    __name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
    __name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
    __name(findMiddleware, "findMiddleware");
    RegExpRouter = class {
      static {
        __name(this, "RegExpRouter");
      }
      name = "RegExpRouter";
      #middleware;
      #routes;
      constructor() {
        this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
        this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
      }
      add(method, path2, handler) {
        const middleware = this.#middleware;
        const routes2 = this.#routes;
        if (!middleware || !routes2) {
          throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
        }
        if (!middleware[method]) {
          ;
          [middleware, routes2].forEach((handlerMap) => {
            handlerMap[method] = /* @__PURE__ */ Object.create(null);
            Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
              handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
            });
          });
        }
        if (path2 === "/*") {
          path2 = "*";
        }
        const paramCount = (path2.match(/\/:/g) || []).length;
        if (/\*$/.test(path2)) {
          const re = buildWildcardRegExp(path2);
          if (method === METHOD_NAME_ALL) {
            Object.keys(middleware).forEach((m) => {
              middleware[m][path2] ||= findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || [];
            });
          } else {
            middleware[method][path2] ||= findMiddleware(middleware[method], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || [];
          }
          Object.keys(middleware).forEach((m) => {
            if (method === METHOD_NAME_ALL || method === m) {
              Object.keys(middleware[m]).forEach((p) => {
                re.test(p) && middleware[m][p].push([handler, paramCount]);
              });
            }
          });
          Object.keys(routes2).forEach((m) => {
            if (method === METHOD_NAME_ALL || method === m) {
              Object.keys(routes2[m]).forEach(
                (p) => re.test(p) && routes2[m][p].push([handler, paramCount])
              );
            }
          });
          return;
        }
        const paths = checkOptionalParameter(path2) || [path2];
        for (let i = 0, len = paths.length; i < len; i++) {
          const path22 = paths[i];
          Object.keys(routes2).forEach((m) => {
            if (method === METHOD_NAME_ALL || method === m) {
              routes2[m][path22] ||= [
                ...findMiddleware(middleware[m], path22) || findMiddleware(middleware[METHOD_NAME_ALL], path22) || []
              ];
              routes2[m][path22].push([handler, paramCount - len + i + 1]);
            }
          });
        }
      }
      match = match;
      buildAllMatchers() {
        const matchers = /* @__PURE__ */ Object.create(null);
        Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
          matchers[method] ||= this.#buildMatcher(method);
        });
        this.#middleware = this.#routes = void 0;
        clearWildcardRegExpCache();
        return matchers;
      }
      #buildMatcher(method) {
        const routes2 = [];
        let hasOwnRoute = method === METHOD_NAME_ALL;
        [this.#middleware, this.#routes].forEach((r) => {
          const ownRoute = r[method] ? Object.keys(r[method]).map((path2) => [path2, r[method][path2]]) : [];
          if (ownRoute.length !== 0) {
            hasOwnRoute ||= true;
            routes2.push(...ownRoute);
          } else if (method !== METHOD_NAME_ALL) {
            routes2.push(
              ...Object.keys(r[METHOD_NAME_ALL]).map((path2) => [path2, r[METHOD_NAME_ALL][path2]])
            );
          }
        });
        if (!hasOwnRoute) {
          return null;
        } else {
          return buildMatcherFromPreprocessedRoutes(routes2);
        }
      }
    };
  }
});

// ../node_modules/hono/dist/router/reg-exp-router/prepared-router.js
var init_prepared_router = __esm({
  "../node_modules/hono/dist/router/reg-exp-router/prepared-router.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_router();
    init_matcher();
    init_router2();
  }
});

// ../node_modules/hono/dist/router/reg-exp-router/index.js
var init_reg_exp_router = __esm({
  "../node_modules/hono/dist/router/reg-exp-router/index.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_router2();
    init_prepared_router();
  }
});

// ../node_modules/hono/dist/router/smart-router/router.js
var SmartRouter;
var init_router3 = __esm({
  "../node_modules/hono/dist/router/smart-router/router.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_router();
    SmartRouter = class {
      static {
        __name(this, "SmartRouter");
      }
      name = "SmartRouter";
      #routers = [];
      #routes = [];
      constructor(init) {
        this.#routers = init.routers;
      }
      add(method, path2, handler) {
        if (!this.#routes) {
          throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
        }
        this.#routes.push([method, path2, handler]);
      }
      match(method, path2) {
        if (!this.#routes) {
          throw new Error("Fatal error");
        }
        const routers = this.#routers;
        const routes2 = this.#routes;
        const len = routers.length;
        let i = 0;
        let res;
        for (; i < len; i++) {
          const router = routers[i];
          try {
            for (let i2 = 0, len2 = routes2.length; i2 < len2; i2++) {
              router.add(...routes2[i2]);
            }
            res = router.match(method, path2);
          } catch (e) {
            if (e instanceof UnsupportedPathError) {
              continue;
            }
            throw e;
          }
          this.match = router.match.bind(router);
          this.#routers = [router];
          this.#routes = void 0;
          break;
        }
        if (i === len) {
          throw new Error("Fatal error");
        }
        this.name = `SmartRouter + ${this.activeRouter.name}`;
        return res;
      }
      get activeRouter() {
        if (this.#routes || this.#routers.length !== 1) {
          throw new Error("No active router has been determined yet.");
        }
        return this.#routers[0];
      }
    };
  }
});

// ../node_modules/hono/dist/router/smart-router/index.js
var init_smart_router = __esm({
  "../node_modules/hono/dist/router/smart-router/index.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_router3();
  }
});

// ../node_modules/hono/dist/router/trie-router/node.js
var emptyParams, hasChildren, Node2;
var init_node2 = __esm({
  "../node_modules/hono/dist/router/trie-router/node.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_router();
    init_url();
    emptyParams = /* @__PURE__ */ Object.create(null);
    hasChildren = /* @__PURE__ */ __name((children) => {
      for (const _ in children) {
        return true;
      }
      return false;
    }, "hasChildren");
    Node2 = class _Node2 {
      static {
        __name(this, "_Node");
      }
      #methods;
      #children;
      #patterns;
      #order = 0;
      #params = emptyParams;
      constructor(method, handler, children) {
        this.#children = children || /* @__PURE__ */ Object.create(null);
        this.#methods = [];
        if (method && handler) {
          const m = /* @__PURE__ */ Object.create(null);
          m[method] = { handler, possibleKeys: [], score: 0 };
          this.#methods = [m];
        }
        this.#patterns = [];
      }
      insert(method, path2, handler) {
        this.#order = ++this.#order;
        let curNode = this;
        const parts = splitRoutingPath(path2);
        const possibleKeys = [];
        for (let i = 0, len = parts.length; i < len; i++) {
          const p = parts[i];
          const nextP = parts[i + 1];
          const pattern = getPattern(p, nextP);
          const key = Array.isArray(pattern) ? pattern[0] : p;
          if (key in curNode.#children) {
            curNode = curNode.#children[key];
            if (pattern) {
              possibleKeys.push(pattern[1]);
            }
            continue;
          }
          curNode.#children[key] = new _Node2();
          if (pattern) {
            curNode.#patterns.push(pattern);
            possibleKeys.push(pattern[1]);
          }
          curNode = curNode.#children[key];
        }
        curNode.#methods.push({
          [method]: {
            handler,
            possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
            score: this.#order
          }
        });
        return curNode;
      }
      #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
        for (let i = 0, len = node.#methods.length; i < len; i++) {
          const m = node.#methods[i];
          const handlerSet = m[method] || m[METHOD_NAME_ALL];
          const processedSet = {};
          if (handlerSet !== void 0) {
            handlerSet.params = /* @__PURE__ */ Object.create(null);
            handlerSets.push(handlerSet);
            if (nodeParams !== emptyParams || params && params !== emptyParams) {
              for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
                const key = handlerSet.possibleKeys[i2];
                const processed = processedSet[handlerSet.score];
                handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
                processedSet[handlerSet.score] = true;
              }
            }
          }
        }
      }
      search(method, path2) {
        const handlerSets = [];
        this.#params = emptyParams;
        const curNode = this;
        let curNodes = [curNode];
        const parts = splitPath(path2);
        const curNodesQueue = [];
        const len = parts.length;
        let partOffsets = null;
        for (let i = 0; i < len; i++) {
          const part = parts[i];
          const isLast = i === len - 1;
          const tempNodes = [];
          for (let j = 0, len2 = curNodes.length; j < len2; j++) {
            const node = curNodes[j];
            const nextNode = node.#children[part];
            if (nextNode) {
              nextNode.#params = node.#params;
              if (isLast) {
                if (nextNode.#children["*"]) {
                  this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
                }
                this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
              } else {
                tempNodes.push(nextNode);
              }
            }
            for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
              const pattern = node.#patterns[k];
              const params = node.#params === emptyParams ? {} : { ...node.#params };
              if (pattern === "*") {
                const astNode = node.#children["*"];
                if (astNode) {
                  this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
                  astNode.#params = params;
                  tempNodes.push(astNode);
                }
                continue;
              }
              const [key, name, matcher] = pattern;
              if (!part && !(matcher instanceof RegExp)) {
                continue;
              }
              const child = node.#children[key];
              if (matcher instanceof RegExp) {
                if (partOffsets === null) {
                  partOffsets = new Array(len);
                  let offset = path2[0] === "/" ? 1 : 0;
                  for (let p = 0; p < len; p++) {
                    partOffsets[p] = offset;
                    offset += parts[p].length + 1;
                  }
                }
                const restPathString = path2.substring(partOffsets[i]);
                const m = matcher.exec(restPathString);
                if (m) {
                  params[name] = m[0];
                  this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
                  if (hasChildren(child.#children)) {
                    child.#params = params;
                    const componentCount = m[0].match(/\//)?.length ?? 0;
                    const targetCurNodes = curNodesQueue[componentCount] ||= [];
                    targetCurNodes.push(child);
                  }
                  continue;
                }
              }
              if (matcher === true || matcher.test(part)) {
                params[name] = part;
                if (isLast) {
                  this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
                  if (child.#children["*"]) {
                    this.#pushHandlerSets(
                      handlerSets,
                      child.#children["*"],
                      method,
                      params,
                      node.#params
                    );
                  }
                } else {
                  child.#params = params;
                  tempNodes.push(child);
                }
              }
            }
          }
          const shifted = curNodesQueue.shift();
          curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
        }
        if (handlerSets.length > 1) {
          handlerSets.sort((a, b) => {
            return a.score - b.score;
          });
        }
        return [handlerSets.map(({ handler, params }) => [handler, params])];
      }
    };
  }
});

// ../node_modules/hono/dist/router/trie-router/router.js
var TrieRouter;
var init_router4 = __esm({
  "../node_modules/hono/dist/router/trie-router/router.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_url();
    init_node2();
    TrieRouter = class {
      static {
        __name(this, "TrieRouter");
      }
      name = "TrieRouter";
      #node;
      constructor() {
        this.#node = new Node2();
      }
      add(method, path2, handler) {
        const results = checkOptionalParameter(path2);
        if (results) {
          for (let i = 0, len = results.length; i < len; i++) {
            this.#node.insert(method, results[i], handler);
          }
          return;
        }
        this.#node.insert(method, path2, handler);
      }
      match(method, path2) {
        return this.#node.search(method, path2);
      }
    };
  }
});

// ../node_modules/hono/dist/router/trie-router/index.js
var init_trie_router = __esm({
  "../node_modules/hono/dist/router/trie-router/index.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_router4();
  }
});

// ../node_modules/hono/dist/hono.js
var Hono2;
var init_hono = __esm({
  "../node_modules/hono/dist/hono.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_hono_base();
    init_reg_exp_router();
    init_smart_router();
    init_trie_router();
    Hono2 = class extends Hono {
      static {
        __name(this, "Hono");
      }
      /**
       * Creates an instance of the Hono class.
       *
       * @param options - Optional configuration options for the Hono instance.
       */
      constructor(options = {}) {
        super(options);
        this.router = options.router ?? new SmartRouter({
          routers: [new RegExpRouter(), new TrieRouter()]
        });
      }
    };
  }
});

// ../node_modules/hono/dist/index.js
var init_dist = __esm({
  "../node_modules/hono/dist/index.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_hono();
  }
});

// ../node_modules/hono/dist/middleware/cors/index.js
var cors;
var init_cors = __esm({
  "../node_modules/hono/dist/middleware/cors/index.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    cors = /* @__PURE__ */ __name((options) => {
      const defaults = {
        origin: "*",
        allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
        allowHeaders: [],
        exposeHeaders: []
      };
      const opts = {
        ...defaults,
        ...options
      };
      const findAllowOrigin = ((optsOrigin) => {
        if (typeof optsOrigin === "string") {
          if (optsOrigin === "*") {
            if (opts.credentials) {
              return (origin) => origin || null;
            }
            return () => optsOrigin;
          } else {
            return (origin) => optsOrigin === origin ? origin : null;
          }
        } else if (typeof optsOrigin === "function") {
          return optsOrigin;
        } else {
          return (origin) => optsOrigin.includes(origin) ? origin : null;
        }
      })(opts.origin);
      const findAllowMethods = ((optsAllowMethods) => {
        if (typeof optsAllowMethods === "function") {
          return optsAllowMethods;
        } else if (Array.isArray(optsAllowMethods)) {
          return () => optsAllowMethods;
        } else {
          return () => [];
        }
      })(opts.allowMethods);
      return /* @__PURE__ */ __name(async function cors2(c, next) {
        function set(key, value) {
          c.res.headers.set(key, value);
        }
        __name(set, "set");
        const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
        if (allowOrigin) {
          set("Access-Control-Allow-Origin", allowOrigin);
        }
        if (opts.credentials) {
          set("Access-Control-Allow-Credentials", "true");
        }
        if (opts.exposeHeaders?.length) {
          set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
        }
        if (c.req.method === "OPTIONS") {
          if (opts.origin !== "*" || opts.credentials) {
            set("Vary", "Origin");
          }
          if (opts.maxAge != null) {
            set("Access-Control-Max-Age", opts.maxAge.toString());
          }
          const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
          if (allowMethods.length) {
            set("Access-Control-Allow-Methods", allowMethods.join(","));
          }
          let headers = opts.allowHeaders;
          if (!headers?.length) {
            const requestHeaders = c.req.header("Access-Control-Request-Headers");
            if (requestHeaders) {
              headers = requestHeaders.split(/\s*,\s*/);
            }
          }
          if (headers?.length) {
            set("Access-Control-Allow-Headers", headers.join(","));
            c.res.headers.append("Vary", "Access-Control-Request-Headers");
          }
          c.res.headers.delete("Content-Length");
          c.res.headers.delete("Content-Type");
          return new Response(null, {
            headers: c.res.headers,
            status: 204,
            statusText: "No Content"
          });
        }
        await next();
        if (opts.origin !== "*" || opts.credentials) {
          c.header("Vary", "Origin", { append: true });
        }
      }, "cors2");
    }, "cors");
  }
});

// ../node_modules/retry/lib/retry_operation.js
var require_retry_operation = __commonJS({
  "../node_modules/retry/lib/retry_operation.js"(exports, module) {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    function RetryOperation(timeouts, options) {
      if (typeof options === "boolean") {
        options = { forever: options };
      }
      this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
      this._timeouts = timeouts;
      this._options = options || {};
      this._maxRetryTime = options && options.maxRetryTime || Infinity;
      this._fn = null;
      this._errors = [];
      this._attempts = 1;
      this._operationTimeout = null;
      this._operationTimeoutCb = null;
      this._timeout = null;
      this._operationStart = null;
      this._timer = null;
      if (this._options.forever) {
        this._cachedTimeouts = this._timeouts.slice(0);
      }
    }
    __name(RetryOperation, "RetryOperation");
    module.exports = RetryOperation;
    RetryOperation.prototype.reset = function() {
      this._attempts = 1;
      this._timeouts = this._originalTimeouts.slice(0);
    };
    RetryOperation.prototype.stop = function() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this._timeouts = [];
      this._cachedTimeouts = null;
    };
    RetryOperation.prototype.retry = function(err) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (!err) {
        return false;
      }
      var currentTime = (/* @__PURE__ */ new Date()).getTime();
      if (err && currentTime - this._operationStart >= this._maxRetryTime) {
        this._errors.push(err);
        this._errors.unshift(new Error("RetryOperation timeout occurred"));
        return false;
      }
      this._errors.push(err);
      var timeout = this._timeouts.shift();
      if (timeout === void 0) {
        if (this._cachedTimeouts) {
          this._errors.splice(0, this._errors.length - 1);
          timeout = this._cachedTimeouts.slice(-1);
        } else {
          return false;
        }
      }
      var self = this;
      this._timer = setTimeout(function() {
        self._attempts++;
        if (self._operationTimeoutCb) {
          self._timeout = setTimeout(function() {
            self._operationTimeoutCb(self._attempts);
          }, self._operationTimeout);
          if (self._options.unref) {
            self._timeout.unref();
          }
        }
        self._fn(self._attempts);
      }, timeout);
      if (this._options.unref) {
        this._timer.unref();
      }
      return true;
    };
    RetryOperation.prototype.attempt = function(fn, timeoutOps) {
      this._fn = fn;
      if (timeoutOps) {
        if (timeoutOps.timeout) {
          this._operationTimeout = timeoutOps.timeout;
        }
        if (timeoutOps.cb) {
          this._operationTimeoutCb = timeoutOps.cb;
        }
      }
      var self = this;
      if (this._operationTimeoutCb) {
        this._timeout = setTimeout(function() {
          self._operationTimeoutCb();
        }, self._operationTimeout);
      }
      this._operationStart = (/* @__PURE__ */ new Date()).getTime();
      this._fn(this._attempts);
    };
    RetryOperation.prototype.try = function(fn) {
      console.log("Using RetryOperation.try() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = function(fn) {
      console.log("Using RetryOperation.start() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = RetryOperation.prototype.try;
    RetryOperation.prototype.errors = function() {
      return this._errors;
    };
    RetryOperation.prototype.attempts = function() {
      return this._attempts;
    };
    RetryOperation.prototype.mainError = function() {
      if (this._errors.length === 0) {
        return null;
      }
      var counts = {};
      var mainError = null;
      var mainErrorCount = 0;
      for (var i = 0; i < this._errors.length; i++) {
        var error = this._errors[i];
        var message = error.message;
        var count = (counts[message] || 0) + 1;
        counts[message] = count;
        if (count >= mainErrorCount) {
          mainError = error;
          mainErrorCount = count;
        }
      }
      return mainError;
    };
  }
});

// ../node_modules/retry/lib/retry.js
var require_retry = __commonJS({
  "../node_modules/retry/lib/retry.js"(exports) {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    var RetryOperation = require_retry_operation();
    exports.operation = function(options) {
      var timeouts = exports.timeouts(options);
      return new RetryOperation(timeouts, {
        forever: options && (options.forever || options.retries === Infinity),
        unref: options && options.unref,
        maxRetryTime: options && options.maxRetryTime
      });
    };
    exports.timeouts = function(options) {
      if (options instanceof Array) {
        return [].concat(options);
      }
      var opts = {
        retries: 10,
        factor: 2,
        minTimeout: 1 * 1e3,
        maxTimeout: Infinity,
        randomize: false
      };
      for (var key in options) {
        opts[key] = options[key];
      }
      if (opts.minTimeout > opts.maxTimeout) {
        throw new Error("minTimeout is greater than maxTimeout");
      }
      var timeouts = [];
      for (var i = 0; i < opts.retries; i++) {
        timeouts.push(this.createTimeout(i, opts));
      }
      if (options && options.forever && !timeouts.length) {
        timeouts.push(this.createTimeout(i, opts));
      }
      timeouts.sort(function(a, b) {
        return a - b;
      });
      return timeouts;
    };
    exports.createTimeout = function(attempt, opts) {
      var random = opts.randomize ? Math.random() + 1 : 1;
      var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
      timeout = Math.min(timeout, opts.maxTimeout);
      return timeout;
    };
    exports.wrap = function(obj, options, methods) {
      if (options instanceof Array) {
        methods = options;
        options = null;
      }
      if (!methods) {
        methods = [];
        for (var key in obj) {
          if (typeof obj[key] === "function") {
            methods.push(key);
          }
        }
      }
      for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        var original = obj[method];
        obj[method] = (/* @__PURE__ */ __name(function retryWrapper(original2) {
          var op = exports.operation(options);
          var args = Array.prototype.slice.call(arguments, 1);
          var callback = args.pop();
          args.push(function(err) {
            if (op.retry(err)) {
              return;
            }
            if (err) {
              arguments[0] = op.mainError();
            }
            callback.apply(this, arguments);
          });
          op.attempt(function() {
            original2.apply(obj, args);
          });
        }, "retryWrapper")).bind(obj, original);
        obj[method].options = options;
      }
    };
  }
});

// ../node_modules/retry/index.js
var require_retry2 = __commonJS({
  "../node_modules/retry/index.js"(exports, module) {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    module.exports = require_retry();
  }
});

// ../node_modules/p-retry/index.js
var require_p_retry = __commonJS({
  "../node_modules/p-retry/index.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    var retry = require_retry2();
    var networkErrorMsgs = [
      "Failed to fetch",
      // Chrome
      "NetworkError when attempting to fetch resource.",
      // Firefox
      "The Internet connection appears to be offline.",
      // Safari
      "Network request failed"
      // `cross-fetch`
    ];
    var AbortError2 = class extends Error {
      static {
        __name(this, "AbortError");
      }
      constructor(message) {
        super();
        if (message instanceof Error) {
          this.originalError = message;
          ({ message } = message);
        } else {
          this.originalError = new Error(message);
          this.originalError.stack = this.stack;
        }
        this.name = "AbortError";
        this.message = message;
      }
    };
    var decorateErrorWithCounts = /* @__PURE__ */ __name((error, attemptNumber, options) => {
      const retriesLeft = options.retries - (attemptNumber - 1);
      error.attemptNumber = attemptNumber;
      error.retriesLeft = retriesLeft;
      return error;
    }, "decorateErrorWithCounts");
    var isNetworkError = /* @__PURE__ */ __name((errorMessage) => networkErrorMsgs.includes(errorMessage), "isNetworkError");
    var pRetry2 = /* @__PURE__ */ __name((input, options) => new Promise((resolve, reject) => {
      options = {
        onFailedAttempt: /* @__PURE__ */ __name(() => {
        }, "onFailedAttempt"),
        retries: 10,
        ...options
      };
      const operation = retry.operation(options);
      operation.attempt(async (attemptNumber) => {
        try {
          resolve(await input(attemptNumber));
        } catch (error) {
          if (!(error instanceof Error)) {
            reject(new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`));
            return;
          }
          if (error instanceof AbortError2) {
            operation.stop();
            reject(error.originalError);
          } else if (error instanceof TypeError && !isNetworkError(error.message)) {
            operation.stop();
            reject(error);
          } else {
            decorateErrorWithCounts(error, attemptNumber, options);
            try {
              await options.onFailedAttempt(error);
            } catch (error2) {
              reject(error2);
              return;
            }
            if (!operation.retry(error)) {
              reject(operation.mainError());
            }
          }
        }
      });
    }), "pRetry");
    module.exports = pRetry2;
    module.exports.default = pRetry2;
    module.exports.AbortError = AbortError2;
  }
});

// ../node_modules/@google/genai/dist/web/index.mjs
function getDefaultBaseUrls() {
  return {
    geminiUrl: _defaultBaseGeminiUrl,
    vertexUrl: _defaultBaseVertexUrl
  };
}
function getBaseUrl(httpOptions, vertexai, vertexBaseUrlFromEnv, geminiBaseUrlFromEnv) {
  var _a2, _b;
  if (!(httpOptions === null || httpOptions === void 0 ? void 0 : httpOptions.baseUrl)) {
    const defaultBaseUrls = getDefaultBaseUrls();
    if (vertexai) {
      return (_a2 = defaultBaseUrls.vertexUrl) !== null && _a2 !== void 0 ? _a2 : vertexBaseUrlFromEnv;
    } else {
      return (_b = defaultBaseUrls.geminiUrl) !== null && _b !== void 0 ? _b : geminiBaseUrlFromEnv;
    }
  }
  return httpOptions.baseUrl;
}
function formatMap(templateString, valueMap) {
  const regex = /\{([^}]+)\}/g;
  return templateString.replace(regex, (match3, key) => {
    if (Object.prototype.hasOwnProperty.call(valueMap, key)) {
      const value = valueMap[key];
      return value !== void 0 && value !== null ? String(value) : "";
    } else {
      throw new Error(`Key '${key}' not found in valueMap.`);
    }
  });
}
function setValueByPath(data, keys, value) {
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (key.endsWith("[]")) {
      const keyName = key.slice(0, -2);
      if (!(keyName in data)) {
        if (Array.isArray(value)) {
          data[keyName] = Array.from({ length: value.length }, () => ({}));
        } else {
          throw new Error(`Value must be a list given an array path ${key}`);
        }
      }
      if (Array.isArray(data[keyName])) {
        const arrayData = data[keyName];
        if (Array.isArray(value)) {
          for (let j = 0; j < arrayData.length; j++) {
            const entry = arrayData[j];
            setValueByPath(entry, keys.slice(i + 1), value[j]);
          }
        } else {
          for (const d of arrayData) {
            setValueByPath(d, keys.slice(i + 1), value);
          }
        }
      }
      return;
    } else if (key.endsWith("[0]")) {
      const keyName = key.slice(0, -3);
      if (!(keyName in data)) {
        data[keyName] = [{}];
      }
      const arrayData = data[keyName];
      setValueByPath(arrayData[0], keys.slice(i + 1), value);
      return;
    }
    if (!data[key] || typeof data[key] !== "object") {
      data[key] = {};
    }
    data = data[key];
  }
  const keyToSet = keys[keys.length - 1];
  const existingData = data[keyToSet];
  if (existingData !== void 0) {
    if (!value || typeof value === "object" && Object.keys(value).length === 0) {
      return;
    }
    if (value === existingData) {
      return;
    }
    if (typeof existingData === "object" && typeof value === "object" && existingData !== null && value !== null) {
      Object.assign(existingData, value);
    } else {
      throw new Error(`Cannot set value for an existing key. Key: ${keyToSet}`);
    }
  } else {
    if (keyToSet === "_self" && typeof value === "object" && value !== null && !Array.isArray(value)) {
      const valueAsRecord = value;
      Object.assign(data, valueAsRecord);
    } else {
      data[keyToSet] = value;
    }
  }
}
function getValueByPath(data, keys, defaultValue = void 0) {
  try {
    if (keys.length === 1 && keys[0] === "_self") {
      return data;
    }
    for (let i = 0; i < keys.length; i++) {
      if (typeof data !== "object" || data === null) {
        return defaultValue;
      }
      const key = keys[i];
      if (key.endsWith("[]")) {
        const keyName = key.slice(0, -2);
        if (keyName in data) {
          const arrayData = data[keyName];
          if (!Array.isArray(arrayData)) {
            return defaultValue;
          }
          return arrayData.map((d) => getValueByPath(d, keys.slice(i + 1), defaultValue));
        } else {
          return defaultValue;
        }
      } else {
        data = data[key];
      }
    }
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      return defaultValue;
    }
    throw error;
  }
}
function moveValueByPath(data, paths) {
  for (const [sourcePath, destPath] of Object.entries(paths)) {
    const sourceKeys = sourcePath.split(".");
    const destKeys = destPath.split(".");
    const excludeKeys = /* @__PURE__ */ new Set();
    let wildcardIdx = -1;
    for (let i = 0; i < sourceKeys.length; i++) {
      if (sourceKeys[i] === "*") {
        wildcardIdx = i;
        break;
      }
    }
    if (wildcardIdx !== -1 && destKeys.length > wildcardIdx) {
      for (let i = wildcardIdx; i < destKeys.length; i++) {
        const key = destKeys[i];
        if (key !== "*" && !key.endsWith("[]") && !key.endsWith("[0]")) {
          excludeKeys.add(key);
        }
      }
    }
    _moveValueRecursive(data, sourceKeys, destKeys, 0, excludeKeys);
  }
}
function _moveValueRecursive(data, sourceKeys, destKeys, keyIdx, excludeKeys) {
  if (keyIdx >= sourceKeys.length) {
    return;
  }
  if (typeof data !== "object" || data === null) {
    return;
  }
  const key = sourceKeys[keyIdx];
  if (key.endsWith("[]")) {
    const keyName = key.slice(0, -2);
    const dataRecord = data;
    if (keyName in dataRecord && Array.isArray(dataRecord[keyName])) {
      for (const item of dataRecord[keyName]) {
        _moveValueRecursive(item, sourceKeys, destKeys, keyIdx + 1, excludeKeys);
      }
    }
  } else if (key === "*") {
    if (typeof data === "object" && data !== null && !Array.isArray(data)) {
      const dataRecord = data;
      const keysToMove = Object.keys(dataRecord).filter((k) => !k.startsWith("_") && !excludeKeys.has(k));
      const valuesToMove = {};
      for (const k of keysToMove) {
        valuesToMove[k] = dataRecord[k];
      }
      for (const [k, v] of Object.entries(valuesToMove)) {
        const newDestKeys = [];
        for (const dk of destKeys.slice(keyIdx)) {
          if (dk === "*") {
            newDestKeys.push(k);
          } else {
            newDestKeys.push(dk);
          }
        }
        setValueByPath(dataRecord, newDestKeys, v);
      }
      for (const k of keysToMove) {
        delete dataRecord[k];
      }
    }
  } else {
    const dataRecord = data;
    if (key in dataRecord) {
      _moveValueRecursive(dataRecord[key], sourceKeys, destKeys, keyIdx + 1, excludeKeys);
    }
  }
}
function tBytes$1(fromBytes) {
  if (typeof fromBytes !== "string") {
    throw new Error("fromImageBytes must be a string");
  }
  return fromBytes;
}
function fetchPredictOperationParametersToVertex(fromObject) {
  const toObject = {};
  const fromOperationName = getValueByPath(fromObject, [
    "operationName"
  ]);
  if (fromOperationName != null) {
    setValueByPath(toObject, ["operationName"], fromOperationName);
  }
  const fromResourceName = getValueByPath(fromObject, ["resourceName"]);
  if (fromResourceName != null) {
    setValueByPath(toObject, ["_url", "resourceName"], fromResourceName);
  }
  return toObject;
}
function generateVideosOperationFromMldev$1(fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  const fromDone = getValueByPath(fromObject, ["done"]);
  if (fromDone != null) {
    setValueByPath(toObject, ["done"], fromDone);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  const fromResponse = getValueByPath(fromObject, [
    "response",
    "generateVideoResponse"
  ]);
  if (fromResponse != null) {
    setValueByPath(toObject, ["response"], generateVideosResponseFromMldev$1(fromResponse));
  }
  return toObject;
}
function generateVideosOperationFromVertex$1(fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  const fromDone = getValueByPath(fromObject, ["done"]);
  if (fromDone != null) {
    setValueByPath(toObject, ["done"], fromDone);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  const fromResponse = getValueByPath(fromObject, ["response"]);
  if (fromResponse != null) {
    setValueByPath(toObject, ["response"], generateVideosResponseFromVertex$1(fromResponse));
  }
  return toObject;
}
function generateVideosResponseFromMldev$1(fromObject) {
  const toObject = {};
  const fromGeneratedVideos = getValueByPath(fromObject, [
    "generatedSamples"
  ]);
  if (fromGeneratedVideos != null) {
    let transformedList = fromGeneratedVideos;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedVideoFromMldev$1(item);
      });
    }
    setValueByPath(toObject, ["generatedVideos"], transformedList);
  }
  const fromRaiMediaFilteredCount = getValueByPath(fromObject, [
    "raiMediaFilteredCount"
  ]);
  if (fromRaiMediaFilteredCount != null) {
    setValueByPath(toObject, ["raiMediaFilteredCount"], fromRaiMediaFilteredCount);
  }
  const fromRaiMediaFilteredReasons = getValueByPath(fromObject, [
    "raiMediaFilteredReasons"
  ]);
  if (fromRaiMediaFilteredReasons != null) {
    setValueByPath(toObject, ["raiMediaFilteredReasons"], fromRaiMediaFilteredReasons);
  }
  return toObject;
}
function generateVideosResponseFromVertex$1(fromObject) {
  const toObject = {};
  const fromGeneratedVideos = getValueByPath(fromObject, ["videos"]);
  if (fromGeneratedVideos != null) {
    let transformedList = fromGeneratedVideos;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedVideoFromVertex$1(item);
      });
    }
    setValueByPath(toObject, ["generatedVideos"], transformedList);
  }
  const fromRaiMediaFilteredCount = getValueByPath(fromObject, [
    "raiMediaFilteredCount"
  ]);
  if (fromRaiMediaFilteredCount != null) {
    setValueByPath(toObject, ["raiMediaFilteredCount"], fromRaiMediaFilteredCount);
  }
  const fromRaiMediaFilteredReasons = getValueByPath(fromObject, [
    "raiMediaFilteredReasons"
  ]);
  if (fromRaiMediaFilteredReasons != null) {
    setValueByPath(toObject, ["raiMediaFilteredReasons"], fromRaiMediaFilteredReasons);
  }
  return toObject;
}
function generatedVideoFromMldev$1(fromObject) {
  const toObject = {};
  const fromVideo = getValueByPath(fromObject, ["video"]);
  if (fromVideo != null) {
    setValueByPath(toObject, ["video"], videoFromMldev$1(fromVideo));
  }
  return toObject;
}
function generatedVideoFromVertex$1(fromObject) {
  const toObject = {};
  const fromVideo = getValueByPath(fromObject, ["_self"]);
  if (fromVideo != null) {
    setValueByPath(toObject, ["video"], videoFromVertex$1(fromVideo));
  }
  return toObject;
}
function getOperationParametersToMldev(fromObject) {
  const toObject = {};
  const fromOperationName = getValueByPath(fromObject, [
    "operationName"
  ]);
  if (fromOperationName != null) {
    setValueByPath(toObject, ["_url", "operationName"], fromOperationName);
  }
  return toObject;
}
function getOperationParametersToVertex(fromObject) {
  const toObject = {};
  const fromOperationName = getValueByPath(fromObject, [
    "operationName"
  ]);
  if (fromOperationName != null) {
    setValueByPath(toObject, ["_url", "operationName"], fromOperationName);
  }
  return toObject;
}
function importFileOperationFromMldev$1(fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  const fromDone = getValueByPath(fromObject, ["done"]);
  if (fromDone != null) {
    setValueByPath(toObject, ["done"], fromDone);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  const fromResponse = getValueByPath(fromObject, ["response"]);
  if (fromResponse != null) {
    setValueByPath(toObject, ["response"], importFileResponseFromMldev$1(fromResponse));
  }
  return toObject;
}
function importFileResponseFromMldev$1(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromParent = getValueByPath(fromObject, ["parent"]);
  if (fromParent != null) {
    setValueByPath(toObject, ["parent"], fromParent);
  }
  const fromDocumentName = getValueByPath(fromObject, ["documentName"]);
  if (fromDocumentName != null) {
    setValueByPath(toObject, ["documentName"], fromDocumentName);
  }
  return toObject;
}
function uploadToFileSearchStoreOperationFromMldev(fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  const fromDone = getValueByPath(fromObject, ["done"]);
  if (fromDone != null) {
    setValueByPath(toObject, ["done"], fromDone);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  const fromResponse = getValueByPath(fromObject, ["response"]);
  if (fromResponse != null) {
    setValueByPath(toObject, ["response"], uploadToFileSearchStoreResponseFromMldev(fromResponse));
  }
  return toObject;
}
function uploadToFileSearchStoreResponseFromMldev(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromParent = getValueByPath(fromObject, ["parent"]);
  if (fromParent != null) {
    setValueByPath(toObject, ["parent"], fromParent);
  }
  const fromDocumentName = getValueByPath(fromObject, ["documentName"]);
  if (fromDocumentName != null) {
    setValueByPath(toObject, ["documentName"], fromDocumentName);
  }
  return toObject;
}
function videoFromMldev$1(fromObject) {
  const toObject = {};
  const fromUri = getValueByPath(fromObject, ["uri"]);
  if (fromUri != null) {
    setValueByPath(toObject, ["uri"], fromUri);
  }
  const fromVideoBytes = getValueByPath(fromObject, ["encodedVideo"]);
  if (fromVideoBytes != null) {
    setValueByPath(toObject, ["videoBytes"], tBytes$1(fromVideoBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["encoding"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function videoFromVertex$1(fromObject) {
  const toObject = {};
  const fromUri = getValueByPath(fromObject, ["gcsUri"]);
  if (fromUri != null) {
    setValueByPath(toObject, ["uri"], fromUri);
  }
  const fromVideoBytes = getValueByPath(fromObject, [
    "bytesBase64Encoded"
  ]);
  if (fromVideoBytes != null) {
    setValueByPath(toObject, ["videoBytes"], tBytes$1(fromVideoBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function tModel(apiClient, model) {
  if (!model || typeof model !== "string") {
    throw new Error("model is required and must be a string");
  }
  if (model.includes("..") || model.includes("?") || model.includes("&")) {
    throw new Error("invalid model parameter");
  }
  if (apiClient.isVertexAI()) {
    if (model.startsWith("publishers/") || model.startsWith("projects/") || model.startsWith("models/")) {
      return model;
    } else if (model.indexOf("/") >= 0) {
      const parts = model.split("/", 2);
      return `publishers/${parts[0]}/models/${parts[1]}`;
    } else {
      return `publishers/google/models/${model}`;
    }
  } else {
    if (model.startsWith("models/") || model.startsWith("tunedModels/")) {
      return model;
    } else {
      return `models/${model}`;
    }
  }
}
function tCachesModel(apiClient, model) {
  const transformedModel = tModel(apiClient, model);
  if (!transformedModel) {
    return "";
  }
  if (transformedModel.startsWith("publishers/") && apiClient.isVertexAI()) {
    return `projects/${apiClient.getProject()}/locations/${apiClient.getLocation()}/${transformedModel}`;
  } else if (transformedModel.startsWith("models/") && apiClient.isVertexAI()) {
    return `projects/${apiClient.getProject()}/locations/${apiClient.getLocation()}/publishers/google/${transformedModel}`;
  } else {
    return transformedModel;
  }
}
function tBlobs(blobs) {
  if (Array.isArray(blobs)) {
    return blobs.map((blob) => tBlob(blob));
  } else {
    return [tBlob(blobs)];
  }
}
function tBlob(blob) {
  if (typeof blob === "object" && blob !== null) {
    return blob;
  }
  throw new Error(`Could not parse input as Blob. Unsupported blob type: ${typeof blob}`);
}
function tImageBlob(blob) {
  const transformedBlob = tBlob(blob);
  if (transformedBlob.mimeType && transformedBlob.mimeType.startsWith("image/")) {
    return transformedBlob;
  }
  throw new Error(`Unsupported mime type: ${transformedBlob.mimeType}`);
}
function tAudioBlob(blob) {
  const transformedBlob = tBlob(blob);
  if (transformedBlob.mimeType && transformedBlob.mimeType.startsWith("audio/")) {
    return transformedBlob;
  }
  throw new Error(`Unsupported mime type: ${transformedBlob.mimeType}`);
}
function tPart(origin) {
  if (origin === null || origin === void 0) {
    throw new Error("PartUnion is required");
  }
  if (typeof origin === "object") {
    return origin;
  }
  if (typeof origin === "string") {
    return { text: origin };
  }
  throw new Error(`Unsupported part type: ${typeof origin}`);
}
function tParts(origin) {
  if (origin === null || origin === void 0 || Array.isArray(origin) && origin.length === 0) {
    throw new Error("PartListUnion is required");
  }
  if (Array.isArray(origin)) {
    return origin.map((item) => tPart(item));
  }
  return [tPart(origin)];
}
function _isContent(origin) {
  return origin !== null && origin !== void 0 && typeof origin === "object" && "parts" in origin && Array.isArray(origin.parts);
}
function _isFunctionCallPart(origin) {
  return origin !== null && origin !== void 0 && typeof origin === "object" && "functionCall" in origin;
}
function _isFunctionResponsePart(origin) {
  return origin !== null && origin !== void 0 && typeof origin === "object" && "functionResponse" in origin;
}
function tContent(origin) {
  if (origin === null || origin === void 0) {
    throw new Error("ContentUnion is required");
  }
  if (_isContent(origin)) {
    return origin;
  }
  return {
    role: "user",
    parts: tParts(origin)
  };
}
function tContentsForEmbed(apiClient, origin) {
  if (!origin) {
    return [];
  }
  if (apiClient.isVertexAI() && Array.isArray(origin)) {
    return origin.flatMap((item) => {
      const content = tContent(item);
      if (content.parts && content.parts.length > 0 && content.parts[0].text !== void 0) {
        return [content.parts[0].text];
      }
      return [];
    });
  } else if (apiClient.isVertexAI()) {
    const content = tContent(origin);
    if (content.parts && content.parts.length > 0 && content.parts[0].text !== void 0) {
      return [content.parts[0].text];
    }
    return [];
  }
  if (Array.isArray(origin)) {
    return origin.map((item) => tContent(item));
  }
  return [tContent(origin)];
}
function tContents(origin) {
  if (origin === null || origin === void 0 || Array.isArray(origin) && origin.length === 0) {
    throw new Error("contents are required");
  }
  if (!Array.isArray(origin)) {
    if (_isFunctionCallPart(origin) || _isFunctionResponsePart(origin)) {
      throw new Error("To specify functionCall or functionResponse parts, please wrap them in a Content object, specifying the role for them");
    }
    return [tContent(origin)];
  }
  const result = [];
  const accumulatedParts = [];
  const isContentArray = _isContent(origin[0]);
  for (const item of origin) {
    const isContent = _isContent(item);
    if (isContent != isContentArray) {
      throw new Error("Mixing Content and Parts is not supported, please group the parts into a the appropriate Content objects and specify the roles for them");
    }
    if (isContent) {
      result.push(item);
    } else if (_isFunctionCallPart(item) || _isFunctionResponsePart(item)) {
      throw new Error("To specify functionCall or functionResponse parts, please wrap them, and any other parts, in Content objects as appropriate, specifying the role for them");
    } else {
      accumulatedParts.push(item);
    }
  }
  if (!isContentArray) {
    result.push({ role: "user", parts: tParts(accumulatedParts) });
  }
  return result;
}
function flattenTypeArrayToAnyOf(typeList, resultingSchema) {
  if (typeList.includes("null")) {
    resultingSchema["nullable"] = true;
  }
  const listWithoutNull = typeList.filter((type) => type !== "null");
  if (listWithoutNull.length === 1) {
    resultingSchema["type"] = Object.values(Type).includes(listWithoutNull[0].toUpperCase()) ? listWithoutNull[0].toUpperCase() : Type.TYPE_UNSPECIFIED;
  } else {
    resultingSchema["anyOf"] = [];
    for (const i of listWithoutNull) {
      resultingSchema["anyOf"].push({
        "type": Object.values(Type).includes(i.toUpperCase()) ? i.toUpperCase() : Type.TYPE_UNSPECIFIED
      });
    }
  }
}
function processJsonSchema(_jsonSchema) {
  const genAISchema = {};
  const schemaFieldNames = ["items"];
  const listSchemaFieldNames = ["anyOf"];
  const dictSchemaFieldNames = ["properties"];
  if (_jsonSchema["type"] && _jsonSchema["anyOf"]) {
    throw new Error("type and anyOf cannot be both populated.");
  }
  const incomingAnyOf = _jsonSchema["anyOf"];
  if (incomingAnyOf != null && incomingAnyOf.length == 2) {
    if (incomingAnyOf[0]["type"] === "null") {
      genAISchema["nullable"] = true;
      _jsonSchema = incomingAnyOf[1];
    } else if (incomingAnyOf[1]["type"] === "null") {
      genAISchema["nullable"] = true;
      _jsonSchema = incomingAnyOf[0];
    }
  }
  if (_jsonSchema["type"] instanceof Array) {
    flattenTypeArrayToAnyOf(_jsonSchema["type"], genAISchema);
  }
  for (const [fieldName, fieldValue] of Object.entries(_jsonSchema)) {
    if (fieldValue == null) {
      continue;
    }
    if (fieldName == "type") {
      if (fieldValue === "null") {
        throw new Error("type: null can not be the only possible type for the field.");
      }
      if (fieldValue instanceof Array) {
        continue;
      }
      genAISchema["type"] = Object.values(Type).includes(fieldValue.toUpperCase()) ? fieldValue.toUpperCase() : Type.TYPE_UNSPECIFIED;
    } else if (schemaFieldNames.includes(fieldName)) {
      genAISchema[fieldName] = processJsonSchema(fieldValue);
    } else if (listSchemaFieldNames.includes(fieldName)) {
      const listSchemaFieldValue = [];
      for (const item of fieldValue) {
        if (item["type"] == "null") {
          genAISchema["nullable"] = true;
          continue;
        }
        listSchemaFieldValue.push(processJsonSchema(item));
      }
      genAISchema[fieldName] = listSchemaFieldValue;
    } else if (dictSchemaFieldNames.includes(fieldName)) {
      const dictSchemaFieldValue = {};
      for (const [key, value] of Object.entries(fieldValue)) {
        dictSchemaFieldValue[key] = processJsonSchema(value);
      }
      genAISchema[fieldName] = dictSchemaFieldValue;
    } else {
      if (fieldName === "additionalProperties") {
        continue;
      }
      genAISchema[fieldName] = fieldValue;
    }
  }
  return genAISchema;
}
function tSchema(schema) {
  return processJsonSchema(schema);
}
function tSpeechConfig(speechConfig) {
  if (typeof speechConfig === "object") {
    return speechConfig;
  } else if (typeof speechConfig === "string") {
    return {
      voiceConfig: {
        prebuiltVoiceConfig: {
          voiceName: speechConfig
        }
      }
    };
  } else {
    throw new Error(`Unsupported speechConfig type: ${typeof speechConfig}`);
  }
}
function tLiveSpeechConfig(speechConfig) {
  if ("multiSpeakerVoiceConfig" in speechConfig) {
    throw new Error("multiSpeakerVoiceConfig is not supported in the live API.");
  }
  return speechConfig;
}
function tTool(tool) {
  if (tool.functionDeclarations) {
    for (const functionDeclaration of tool.functionDeclarations) {
      if (functionDeclaration.parameters) {
        if (!Object.keys(functionDeclaration.parameters).includes("$schema")) {
          functionDeclaration.parameters = processJsonSchema(functionDeclaration.parameters);
        } else {
          if (!functionDeclaration.parametersJsonSchema) {
            functionDeclaration.parametersJsonSchema = functionDeclaration.parameters;
            delete functionDeclaration.parameters;
          }
        }
      }
      if (functionDeclaration.response) {
        if (!Object.keys(functionDeclaration.response).includes("$schema")) {
          functionDeclaration.response = processJsonSchema(functionDeclaration.response);
        } else {
          if (!functionDeclaration.responseJsonSchema) {
            functionDeclaration.responseJsonSchema = functionDeclaration.response;
            delete functionDeclaration.response;
          }
        }
      }
    }
  }
  return tool;
}
function tTools(tools) {
  if (tools === void 0 || tools === null) {
    throw new Error("tools is required");
  }
  if (!Array.isArray(tools)) {
    throw new Error("tools is required and must be an array of Tools");
  }
  const result = [];
  for (const tool of tools) {
    result.push(tool);
  }
  return result;
}
function resourceName(client, resourceName2, resourcePrefix, splitsAfterPrefix = 1) {
  const shouldAppendPrefix = !resourceName2.startsWith(`${resourcePrefix}/`) && resourceName2.split("/").length === splitsAfterPrefix;
  if (client.isVertexAI()) {
    if (resourceName2.startsWith("projects/")) {
      return resourceName2;
    } else if (resourceName2.startsWith("locations/")) {
      return `projects/${client.getProject()}/${resourceName2}`;
    } else if (resourceName2.startsWith(`${resourcePrefix}/`)) {
      return `projects/${client.getProject()}/locations/${client.getLocation()}/${resourceName2}`;
    } else if (shouldAppendPrefix) {
      return `projects/${client.getProject()}/locations/${client.getLocation()}/${resourcePrefix}/${resourceName2}`;
    } else {
      return resourceName2;
    }
  }
  if (shouldAppendPrefix) {
    return `${resourcePrefix}/${resourceName2}`;
  }
  return resourceName2;
}
function tCachedContentName(apiClient, name) {
  if (typeof name !== "string") {
    throw new Error("name must be a string");
  }
  return resourceName(apiClient, name, "cachedContents");
}
function tTuningJobStatus(status) {
  switch (status) {
    case "STATE_UNSPECIFIED":
      return "JOB_STATE_UNSPECIFIED";
    case "CREATING":
      return "JOB_STATE_RUNNING";
    case "ACTIVE":
      return "JOB_STATE_SUCCEEDED";
    case "FAILED":
      return "JOB_STATE_FAILED";
    default:
      return status;
  }
}
function tBytes(fromImageBytes) {
  return tBytes$1(fromImageBytes);
}
function _isFile(origin) {
  return origin !== null && origin !== void 0 && typeof origin === "object" && "name" in origin;
}
function isGeneratedVideo(origin) {
  return origin !== null && origin !== void 0 && typeof origin === "object" && "video" in origin;
}
function isVideo(origin) {
  return origin !== null && origin !== void 0 && typeof origin === "object" && "uri" in origin;
}
function tFileName(fromName) {
  var _a2;
  let name;
  if (_isFile(fromName)) {
    name = fromName.name;
  }
  if (isVideo(fromName)) {
    name = fromName.uri;
    if (name === void 0) {
      return void 0;
    }
  }
  if (isGeneratedVideo(fromName)) {
    name = (_a2 = fromName.video) === null || _a2 === void 0 ? void 0 : _a2.uri;
    if (name === void 0) {
      return void 0;
    }
  }
  if (typeof fromName === "string") {
    name = fromName;
  }
  if (name === void 0) {
    throw new Error("Could not extract file name from the provided input.");
  }
  if (name.startsWith("https://")) {
    const suffix = name.split("files/")[1];
    const match3 = suffix.match(/[a-z0-9]+/);
    if (match3 === null) {
      throw new Error(`Could not extract file name from URI ${name}`);
    }
    name = match3[0];
  } else if (name.startsWith("files/")) {
    name = name.split("files/")[1];
  }
  return name;
}
function tModelsUrl(apiClient, baseModels) {
  let res;
  if (apiClient.isVertexAI()) {
    res = baseModels ? "publishers/google/models" : "models";
  } else {
    res = baseModels ? "models" : "tunedModels";
  }
  return res;
}
function tExtractModels(response) {
  for (const key of ["models", "tunedModels", "publisherModels"]) {
    if (hasField(response, key)) {
      return response[key];
    }
  }
  return [];
}
function hasField(data, fieldName) {
  return data !== null && typeof data === "object" && fieldName in data;
}
function mcpToGeminiTool(mcpTool, config = {}) {
  const mcpToolSchema = mcpTool;
  const functionDeclaration = {
    name: mcpToolSchema["name"],
    description: mcpToolSchema["description"],
    parametersJsonSchema: mcpToolSchema["inputSchema"]
  };
  if (mcpToolSchema["outputSchema"]) {
    functionDeclaration["responseJsonSchema"] = mcpToolSchema["outputSchema"];
  }
  if (config.behavior) {
    functionDeclaration["behavior"] = config.behavior;
  }
  const geminiTool = {
    functionDeclarations: [
      functionDeclaration
    ]
  };
  return geminiTool;
}
function mcpToolsToGeminiTool(mcpTools, config = {}) {
  const functionDeclarations = [];
  const toolNames = /* @__PURE__ */ new Set();
  for (const mcpTool of mcpTools) {
    const mcpToolName = mcpTool.name;
    if (toolNames.has(mcpToolName)) {
      throw new Error(`Duplicate function name ${mcpToolName} found in MCP tools. Please ensure function names are unique.`);
    }
    toolNames.add(mcpToolName);
    const geminiTool = mcpToGeminiTool(mcpTool, config);
    if (geminiTool.functionDeclarations) {
      functionDeclarations.push(...geminiTool.functionDeclarations);
    }
  }
  return { functionDeclarations };
}
function tBatchJobSource(client, src) {
  let sourceObj;
  if (typeof src === "string") {
    if (client.isVertexAI()) {
      if (src.startsWith("gs://")) {
        sourceObj = { format: "jsonl", gcsUri: [src] };
      } else if (src.startsWith("bq://")) {
        sourceObj = { format: "bigquery", bigqueryUri: src };
      } else {
        throw new Error(`Unsupported string source for Vertex AI: ${src}`);
      }
    } else {
      if (src.startsWith("files/")) {
        sourceObj = { fileName: src };
      } else {
        throw new Error(`Unsupported string source for Gemini API: ${src}`);
      }
    }
  } else if (Array.isArray(src)) {
    if (client.isVertexAI()) {
      throw new Error("InlinedRequest[] is not supported in Vertex AI.");
    }
    sourceObj = { inlinedRequests: src };
  } else {
    sourceObj = src;
  }
  const vertexSourcesCount = [sourceObj.gcsUri, sourceObj.bigqueryUri].filter(Boolean).length;
  const mldevSourcesCount = [
    sourceObj.inlinedRequests,
    sourceObj.fileName
  ].filter(Boolean).length;
  if (client.isVertexAI()) {
    if (mldevSourcesCount > 0 || vertexSourcesCount !== 1) {
      throw new Error("Exactly one of `gcsUri` or `bigqueryUri` must be set for Vertex AI.");
    }
  } else {
    if (vertexSourcesCount > 0 || mldevSourcesCount !== 1) {
      throw new Error("Exactly one of `inlinedRequests`, `fileName`, must be set for Gemini API.");
    }
  }
  return sourceObj;
}
function tBatchJobDestination(dest) {
  if (typeof dest !== "string") {
    return dest;
  }
  const destString = dest;
  if (destString.startsWith("gs://")) {
    return {
      format: "jsonl",
      gcsUri: destString
    };
  } else if (destString.startsWith("bq://")) {
    return {
      format: "bigquery",
      bigqueryUri: destString
    };
  } else {
    throw new Error(`Unsupported destination: ${destString}`);
  }
}
function tRecvBatchJobDestination(dest) {
  if (typeof dest !== "object" || dest === null) {
    return {};
  }
  const obj = dest;
  const inlineResponsesVal = obj["inlinedResponses"];
  if (typeof inlineResponsesVal !== "object" || inlineResponsesVal === null) {
    return dest;
  }
  const inlineResponsesObj = inlineResponsesVal;
  const responsesArray = inlineResponsesObj["inlinedResponses"];
  if (!Array.isArray(responsesArray) || responsesArray.length === 0) {
    return dest;
  }
  let hasEmbedding = false;
  for (const responseItem of responsesArray) {
    if (typeof responseItem !== "object" || responseItem === null) {
      continue;
    }
    const responseItemObj = responseItem;
    const responseVal = responseItemObj["response"];
    if (typeof responseVal !== "object" || responseVal === null) {
      continue;
    }
    const responseObj = responseVal;
    if (responseObj["embedding"] !== void 0) {
      hasEmbedding = true;
      break;
    }
  }
  if (hasEmbedding) {
    obj["inlinedEmbedContentResponses"] = obj["inlinedResponses"];
    delete obj["inlinedResponses"];
  }
  return dest;
}
function tBatchJobName(apiClient, name) {
  const nameString = name;
  if (!apiClient.isVertexAI()) {
    const mldevPattern = /batches\/[^/]+$/;
    if (mldevPattern.test(nameString)) {
      return nameString.split("/").pop();
    } else {
      throw new Error(`Invalid batch job name: ${nameString}.`);
    }
  }
  const vertexPattern = /^projects\/[^/]+\/locations\/[^/]+\/batchPredictionJobs\/[^/]+$/;
  if (vertexPattern.test(nameString)) {
    return nameString.split("/").pop();
  } else if (/^\d+$/.test(nameString)) {
    return nameString;
  } else {
    throw new Error(`Invalid batch job name: ${nameString}.`);
  }
}
function tJobState(state) {
  const stateString = state;
  if (stateString === "BATCH_STATE_UNSPECIFIED") {
    return "JOB_STATE_UNSPECIFIED";
  } else if (stateString === "BATCH_STATE_PENDING") {
    return "JOB_STATE_PENDING";
  } else if (stateString === "BATCH_STATE_RUNNING") {
    return "JOB_STATE_RUNNING";
  } else if (stateString === "BATCH_STATE_SUCCEEDED") {
    return "JOB_STATE_SUCCEEDED";
  } else if (stateString === "BATCH_STATE_FAILED") {
    return "JOB_STATE_FAILED";
  } else if (stateString === "BATCH_STATE_CANCELLED") {
    return "JOB_STATE_CANCELLED";
  } else if (stateString === "BATCH_STATE_EXPIRED") {
    return "JOB_STATE_EXPIRED";
  } else {
    return stateString;
  }
}
function tIsVertexEmbedContentModel(model) {
  return model.includes("gemini") && model !== "gemini-embedding-001" || model.includes("maas");
}
function authConfigToMldev$4(fromObject) {
  const toObject = {};
  const fromApiKey = getValueByPath(fromObject, ["apiKey"]);
  if (fromApiKey != null) {
    setValueByPath(toObject, ["apiKey"], fromApiKey);
  }
  if (getValueByPath(fromObject, ["apiKeyConfig"]) !== void 0) {
    throw new Error("apiKeyConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["authType"]) !== void 0) {
    throw new Error("authType parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["googleServiceAccountConfig"]) !== void 0) {
    throw new Error("googleServiceAccountConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["httpBasicAuthConfig"]) !== void 0) {
    throw new Error("httpBasicAuthConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["oauthConfig"]) !== void 0) {
    throw new Error("oauthConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["oidcConfig"]) !== void 0) {
    throw new Error("oidcConfig parameter is not supported in Gemini API.");
  }
  return toObject;
}
function batchJobDestinationFromMldev(fromObject) {
  const toObject = {};
  const fromFileName = getValueByPath(fromObject, ["responsesFile"]);
  if (fromFileName != null) {
    setValueByPath(toObject, ["fileName"], fromFileName);
  }
  const fromInlinedResponses = getValueByPath(fromObject, [
    "inlinedResponses",
    "inlinedResponses"
  ]);
  if (fromInlinedResponses != null) {
    let transformedList = fromInlinedResponses;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return inlinedResponseFromMldev(item);
      });
    }
    setValueByPath(toObject, ["inlinedResponses"], transformedList);
  }
  const fromInlinedEmbedContentResponses = getValueByPath(fromObject, [
    "inlinedEmbedContentResponses",
    "inlinedResponses"
  ]);
  if (fromInlinedEmbedContentResponses != null) {
    let transformedList = fromInlinedEmbedContentResponses;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["inlinedEmbedContentResponses"], transformedList);
  }
  return toObject;
}
function batchJobDestinationFromVertex(fromObject) {
  const toObject = {};
  const fromFormat = getValueByPath(fromObject, ["predictionsFormat"]);
  if (fromFormat != null) {
    setValueByPath(toObject, ["format"], fromFormat);
  }
  const fromGcsUri = getValueByPath(fromObject, [
    "gcsDestination",
    "outputUriPrefix"
  ]);
  if (fromGcsUri != null) {
    setValueByPath(toObject, ["gcsUri"], fromGcsUri);
  }
  const fromBigqueryUri = getValueByPath(fromObject, [
    "bigqueryDestination",
    "outputUri"
  ]);
  if (fromBigqueryUri != null) {
    setValueByPath(toObject, ["bigqueryUri"], fromBigqueryUri);
  }
  return toObject;
}
function batchJobDestinationToVertex(fromObject) {
  const toObject = {};
  const fromFormat = getValueByPath(fromObject, ["format"]);
  if (fromFormat != null) {
    setValueByPath(toObject, ["predictionsFormat"], fromFormat);
  }
  const fromGcsUri = getValueByPath(fromObject, ["gcsUri"]);
  if (fromGcsUri != null) {
    setValueByPath(toObject, ["gcsDestination", "outputUriPrefix"], fromGcsUri);
  }
  const fromBigqueryUri = getValueByPath(fromObject, ["bigqueryUri"]);
  if (fromBigqueryUri != null) {
    setValueByPath(toObject, ["bigqueryDestination", "outputUri"], fromBigqueryUri);
  }
  if (getValueByPath(fromObject, ["fileName"]) !== void 0) {
    throw new Error("fileName parameter is not supported in Vertex AI.");
  }
  if (getValueByPath(fromObject, ["inlinedResponses"]) !== void 0) {
    throw new Error("inlinedResponses parameter is not supported in Vertex AI.");
  }
  if (getValueByPath(fromObject, ["inlinedEmbedContentResponses"]) !== void 0) {
    throw new Error("inlinedEmbedContentResponses parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function batchJobFromMldev(fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromDisplayName = getValueByPath(fromObject, [
    "metadata",
    "displayName"
  ]);
  if (fromDisplayName != null) {
    setValueByPath(toObject, ["displayName"], fromDisplayName);
  }
  const fromState = getValueByPath(fromObject, ["metadata", "state"]);
  if (fromState != null) {
    setValueByPath(toObject, ["state"], tJobState(fromState));
  }
  const fromCreateTime = getValueByPath(fromObject, [
    "metadata",
    "createTime"
  ]);
  if (fromCreateTime != null) {
    setValueByPath(toObject, ["createTime"], fromCreateTime);
  }
  const fromEndTime = getValueByPath(fromObject, [
    "metadata",
    "endTime"
  ]);
  if (fromEndTime != null) {
    setValueByPath(toObject, ["endTime"], fromEndTime);
  }
  const fromUpdateTime = getValueByPath(fromObject, [
    "metadata",
    "updateTime"
  ]);
  if (fromUpdateTime != null) {
    setValueByPath(toObject, ["updateTime"], fromUpdateTime);
  }
  const fromModel = getValueByPath(fromObject, ["metadata", "model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["model"], fromModel);
  }
  const fromDest = getValueByPath(fromObject, ["metadata", "output"]);
  if (fromDest != null) {
    setValueByPath(toObject, ["dest"], batchJobDestinationFromMldev(tRecvBatchJobDestination(fromDest)));
  }
  return toObject;
}
function batchJobFromVertex(fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (fromDisplayName != null) {
    setValueByPath(toObject, ["displayName"], fromDisplayName);
  }
  const fromState = getValueByPath(fromObject, ["state"]);
  if (fromState != null) {
    setValueByPath(toObject, ["state"], tJobState(fromState));
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  const fromCreateTime = getValueByPath(fromObject, ["createTime"]);
  if (fromCreateTime != null) {
    setValueByPath(toObject, ["createTime"], fromCreateTime);
  }
  const fromStartTime = getValueByPath(fromObject, ["startTime"]);
  if (fromStartTime != null) {
    setValueByPath(toObject, ["startTime"], fromStartTime);
  }
  const fromEndTime = getValueByPath(fromObject, ["endTime"]);
  if (fromEndTime != null) {
    setValueByPath(toObject, ["endTime"], fromEndTime);
  }
  const fromUpdateTime = getValueByPath(fromObject, ["updateTime"]);
  if (fromUpdateTime != null) {
    setValueByPath(toObject, ["updateTime"], fromUpdateTime);
  }
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["model"], fromModel);
  }
  const fromSrc = getValueByPath(fromObject, ["inputConfig"]);
  if (fromSrc != null) {
    setValueByPath(toObject, ["src"], batchJobSourceFromVertex(fromSrc));
  }
  const fromDest = getValueByPath(fromObject, ["outputConfig"]);
  if (fromDest != null) {
    setValueByPath(toObject, ["dest"], batchJobDestinationFromVertex(tRecvBatchJobDestination(fromDest)));
  }
  const fromCompletionStats = getValueByPath(fromObject, [
    "completionStats"
  ]);
  if (fromCompletionStats != null) {
    setValueByPath(toObject, ["completionStats"], fromCompletionStats);
  }
  return toObject;
}
function batchJobSourceFromVertex(fromObject) {
  const toObject = {};
  const fromFormat = getValueByPath(fromObject, ["instancesFormat"]);
  if (fromFormat != null) {
    setValueByPath(toObject, ["format"], fromFormat);
  }
  const fromGcsUri = getValueByPath(fromObject, ["gcsSource", "uris"]);
  if (fromGcsUri != null) {
    setValueByPath(toObject, ["gcsUri"], fromGcsUri);
  }
  const fromBigqueryUri = getValueByPath(fromObject, [
    "bigquerySource",
    "inputUri"
  ]);
  if (fromBigqueryUri != null) {
    setValueByPath(toObject, ["bigqueryUri"], fromBigqueryUri);
  }
  return toObject;
}
function batchJobSourceToMldev(apiClient, fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["format"]) !== void 0) {
    throw new Error("format parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["gcsUri"]) !== void 0) {
    throw new Error("gcsUri parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["bigqueryUri"]) !== void 0) {
    throw new Error("bigqueryUri parameter is not supported in Gemini API.");
  }
  const fromFileName = getValueByPath(fromObject, ["fileName"]);
  if (fromFileName != null) {
    setValueByPath(toObject, ["fileName"], fromFileName);
  }
  const fromInlinedRequests = getValueByPath(fromObject, [
    "inlinedRequests"
  ]);
  if (fromInlinedRequests != null) {
    let transformedList = fromInlinedRequests;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return inlinedRequestToMldev(apiClient, item);
      });
    }
    setValueByPath(toObject, ["requests", "requests"], transformedList);
  }
  return toObject;
}
function batchJobSourceToVertex(fromObject) {
  const toObject = {};
  const fromFormat = getValueByPath(fromObject, ["format"]);
  if (fromFormat != null) {
    setValueByPath(toObject, ["instancesFormat"], fromFormat);
  }
  const fromGcsUri = getValueByPath(fromObject, ["gcsUri"]);
  if (fromGcsUri != null) {
    setValueByPath(toObject, ["gcsSource", "uris"], fromGcsUri);
  }
  const fromBigqueryUri = getValueByPath(fromObject, ["bigqueryUri"]);
  if (fromBigqueryUri != null) {
    setValueByPath(toObject, ["bigquerySource", "inputUri"], fromBigqueryUri);
  }
  if (getValueByPath(fromObject, ["fileName"]) !== void 0) {
    throw new Error("fileName parameter is not supported in Vertex AI.");
  }
  if (getValueByPath(fromObject, ["inlinedRequests"]) !== void 0) {
    throw new Error("inlinedRequests parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function blobToMldev$4(fromObject) {
  const toObject = {};
  const fromData = getValueByPath(fromObject, ["data"]);
  if (fromData != null) {
    setValueByPath(toObject, ["data"], fromData);
  }
  if (getValueByPath(fromObject, ["displayName"]) !== void 0) {
    throw new Error("displayName parameter is not supported in Gemini API.");
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function cancelBatchJobParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tBatchJobName(apiClient, fromName));
  }
  return toObject;
}
function cancelBatchJobParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tBatchJobName(apiClient, fromName));
  }
  return toObject;
}
function candidateFromMldev$1(fromObject) {
  const toObject = {};
  const fromContent = getValueByPath(fromObject, ["content"]);
  if (fromContent != null) {
    setValueByPath(toObject, ["content"], fromContent);
  }
  const fromCitationMetadata = getValueByPath(fromObject, [
    "citationMetadata"
  ]);
  if (fromCitationMetadata != null) {
    setValueByPath(toObject, ["citationMetadata"], citationMetadataFromMldev$1(fromCitationMetadata));
  }
  const fromTokenCount = getValueByPath(fromObject, ["tokenCount"]);
  if (fromTokenCount != null) {
    setValueByPath(toObject, ["tokenCount"], fromTokenCount);
  }
  const fromFinishReason = getValueByPath(fromObject, ["finishReason"]);
  if (fromFinishReason != null) {
    setValueByPath(toObject, ["finishReason"], fromFinishReason);
  }
  const fromGroundingMetadata = getValueByPath(fromObject, [
    "groundingMetadata"
  ]);
  if (fromGroundingMetadata != null) {
    setValueByPath(toObject, ["groundingMetadata"], fromGroundingMetadata);
  }
  const fromAvgLogprobs = getValueByPath(fromObject, ["avgLogprobs"]);
  if (fromAvgLogprobs != null) {
    setValueByPath(toObject, ["avgLogprobs"], fromAvgLogprobs);
  }
  const fromIndex = getValueByPath(fromObject, ["index"]);
  if (fromIndex != null) {
    setValueByPath(toObject, ["index"], fromIndex);
  }
  const fromLogprobsResult = getValueByPath(fromObject, [
    "logprobsResult"
  ]);
  if (fromLogprobsResult != null) {
    setValueByPath(toObject, ["logprobsResult"], fromLogprobsResult);
  }
  const fromSafetyRatings = getValueByPath(fromObject, [
    "safetyRatings"
  ]);
  if (fromSafetyRatings != null) {
    let transformedList = fromSafetyRatings;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["safetyRatings"], transformedList);
  }
  const fromUrlContextMetadata = getValueByPath(fromObject, [
    "urlContextMetadata"
  ]);
  if (fromUrlContextMetadata != null) {
    setValueByPath(toObject, ["urlContextMetadata"], fromUrlContextMetadata);
  }
  return toObject;
}
function citationMetadataFromMldev$1(fromObject) {
  const toObject = {};
  const fromCitations = getValueByPath(fromObject, ["citationSources"]);
  if (fromCitations != null) {
    let transformedList = fromCitations;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["citations"], transformedList);
  }
  return toObject;
}
function contentToMldev$4(fromObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partToMldev$4(item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function createBatchJobConfigToMldev(fromObject, parentObject) {
  const toObject = {};
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (parentObject !== void 0 && fromDisplayName != null) {
    setValueByPath(parentObject, ["batch", "displayName"], fromDisplayName);
  }
  if (getValueByPath(fromObject, ["dest"]) !== void 0) {
    throw new Error("dest parameter is not supported in Gemini API.");
  }
  return toObject;
}
function createBatchJobConfigToVertex(fromObject, parentObject) {
  const toObject = {};
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (parentObject !== void 0 && fromDisplayName != null) {
    setValueByPath(parentObject, ["displayName"], fromDisplayName);
  }
  const fromDest = getValueByPath(fromObject, ["dest"]);
  if (parentObject !== void 0 && fromDest != null) {
    setValueByPath(parentObject, ["outputConfig"], batchJobDestinationToVertex(tBatchJobDestination(fromDest)));
  }
  return toObject;
}
function createBatchJobParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromSrc = getValueByPath(fromObject, ["src"]);
  if (fromSrc != null) {
    setValueByPath(toObject, ["batch", "inputConfig"], batchJobSourceToMldev(apiClient, tBatchJobSource(apiClient, fromSrc)));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    createBatchJobConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function createBatchJobParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["model"], tModel(apiClient, fromModel));
  }
  const fromSrc = getValueByPath(fromObject, ["src"]);
  if (fromSrc != null) {
    setValueByPath(toObject, ["inputConfig"], batchJobSourceToVertex(tBatchJobSource(apiClient, fromSrc)));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    createBatchJobConfigToVertex(fromConfig, toObject);
  }
  return toObject;
}
function createEmbeddingsBatchJobConfigToMldev(fromObject, parentObject) {
  const toObject = {};
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (parentObject !== void 0 && fromDisplayName != null) {
    setValueByPath(parentObject, ["batch", "displayName"], fromDisplayName);
  }
  return toObject;
}
function createEmbeddingsBatchJobParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromSrc = getValueByPath(fromObject, ["src"]);
  if (fromSrc != null) {
    setValueByPath(toObject, ["batch", "inputConfig"], embeddingsBatchJobSourceToMldev(apiClient, fromSrc));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    createEmbeddingsBatchJobConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function deleteBatchJobParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tBatchJobName(apiClient, fromName));
  }
  return toObject;
}
function deleteBatchJobParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tBatchJobName(apiClient, fromName));
  }
  return toObject;
}
function deleteResourceJobFromMldev(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromDone = getValueByPath(fromObject, ["done"]);
  if (fromDone != null) {
    setValueByPath(toObject, ["done"], fromDone);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  return toObject;
}
function deleteResourceJobFromVertex(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromDone = getValueByPath(fromObject, ["done"]);
  if (fromDone != null) {
    setValueByPath(toObject, ["done"], fromDone);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  return toObject;
}
function embedContentBatchToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (fromContents != null) {
    let transformedList = tContentsForEmbed(apiClient, fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["requests[]", "request", "content"], transformedList);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["_self"], embedContentConfigToMldev$1(fromConfig, toObject));
    moveValueByPath(toObject, { "requests[].*": "requests[].request.*" });
  }
  return toObject;
}
function embedContentConfigToMldev$1(fromObject, parentObject) {
  const toObject = {};
  const fromTaskType = getValueByPath(fromObject, ["taskType"]);
  if (parentObject !== void 0 && fromTaskType != null) {
    setValueByPath(parentObject, ["requests[]", "taskType"], fromTaskType);
  }
  const fromTitle = getValueByPath(fromObject, ["title"]);
  if (parentObject !== void 0 && fromTitle != null) {
    setValueByPath(parentObject, ["requests[]", "title"], fromTitle);
  }
  const fromOutputDimensionality = getValueByPath(fromObject, [
    "outputDimensionality"
  ]);
  if (parentObject !== void 0 && fromOutputDimensionality != null) {
    setValueByPath(parentObject, ["requests[]", "outputDimensionality"], fromOutputDimensionality);
  }
  if (getValueByPath(fromObject, ["mimeType"]) !== void 0) {
    throw new Error("mimeType parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["autoTruncate"]) !== void 0) {
    throw new Error("autoTruncate parameter is not supported in Gemini API.");
  }
  return toObject;
}
function embeddingsBatchJobSourceToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromFileName = getValueByPath(fromObject, ["fileName"]);
  if (fromFileName != null) {
    setValueByPath(toObject, ["file_name"], fromFileName);
  }
  const fromInlinedRequests = getValueByPath(fromObject, [
    "inlinedRequests"
  ]);
  if (fromInlinedRequests != null) {
    setValueByPath(toObject, ["requests"], embedContentBatchToMldev(apiClient, fromInlinedRequests));
  }
  return toObject;
}
function fileDataToMldev$4(fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["displayName"]) !== void 0) {
    throw new Error("displayName parameter is not supported in Gemini API.");
  }
  const fromFileUri = getValueByPath(fromObject, ["fileUri"]);
  if (fromFileUri != null) {
    setValueByPath(toObject, ["fileUri"], fromFileUri);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function functionCallToMldev$4(fromObject) {
  const toObject = {};
  const fromId = getValueByPath(fromObject, ["id"]);
  if (fromId != null) {
    setValueByPath(toObject, ["id"], fromId);
  }
  const fromArgs = getValueByPath(fromObject, ["args"]);
  if (fromArgs != null) {
    setValueByPath(toObject, ["args"], fromArgs);
  }
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  if (getValueByPath(fromObject, ["partialArgs"]) !== void 0) {
    throw new Error("partialArgs parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["willContinue"]) !== void 0) {
    throw new Error("willContinue parameter is not supported in Gemini API.");
  }
  return toObject;
}
function functionCallingConfigToMldev$2(fromObject) {
  const toObject = {};
  const fromAllowedFunctionNames = getValueByPath(fromObject, [
    "allowedFunctionNames"
  ]);
  if (fromAllowedFunctionNames != null) {
    setValueByPath(toObject, ["allowedFunctionNames"], fromAllowedFunctionNames);
  }
  const fromMode = getValueByPath(fromObject, ["mode"]);
  if (fromMode != null) {
    setValueByPath(toObject, ["mode"], fromMode);
  }
  if (getValueByPath(fromObject, ["streamFunctionCallArguments"]) !== void 0) {
    throw new Error("streamFunctionCallArguments parameter is not supported in Gemini API.");
  }
  return toObject;
}
function generateContentConfigToMldev$1(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromSystemInstruction = getValueByPath(fromObject, [
    "systemInstruction"
  ]);
  if (parentObject !== void 0 && fromSystemInstruction != null) {
    setValueByPath(parentObject, ["systemInstruction"], contentToMldev$4(tContent(fromSystemInstruction)));
  }
  const fromTemperature = getValueByPath(fromObject, ["temperature"]);
  if (fromTemperature != null) {
    setValueByPath(toObject, ["temperature"], fromTemperature);
  }
  const fromTopP = getValueByPath(fromObject, ["topP"]);
  if (fromTopP != null) {
    setValueByPath(toObject, ["topP"], fromTopP);
  }
  const fromTopK = getValueByPath(fromObject, ["topK"]);
  if (fromTopK != null) {
    setValueByPath(toObject, ["topK"], fromTopK);
  }
  const fromCandidateCount = getValueByPath(fromObject, [
    "candidateCount"
  ]);
  if (fromCandidateCount != null) {
    setValueByPath(toObject, ["candidateCount"], fromCandidateCount);
  }
  const fromMaxOutputTokens = getValueByPath(fromObject, [
    "maxOutputTokens"
  ]);
  if (fromMaxOutputTokens != null) {
    setValueByPath(toObject, ["maxOutputTokens"], fromMaxOutputTokens);
  }
  const fromStopSequences = getValueByPath(fromObject, [
    "stopSequences"
  ]);
  if (fromStopSequences != null) {
    setValueByPath(toObject, ["stopSequences"], fromStopSequences);
  }
  const fromResponseLogprobs = getValueByPath(fromObject, [
    "responseLogprobs"
  ]);
  if (fromResponseLogprobs != null) {
    setValueByPath(toObject, ["responseLogprobs"], fromResponseLogprobs);
  }
  const fromLogprobs = getValueByPath(fromObject, ["logprobs"]);
  if (fromLogprobs != null) {
    setValueByPath(toObject, ["logprobs"], fromLogprobs);
  }
  const fromPresencePenalty = getValueByPath(fromObject, [
    "presencePenalty"
  ]);
  if (fromPresencePenalty != null) {
    setValueByPath(toObject, ["presencePenalty"], fromPresencePenalty);
  }
  const fromFrequencyPenalty = getValueByPath(fromObject, [
    "frequencyPenalty"
  ]);
  if (fromFrequencyPenalty != null) {
    setValueByPath(toObject, ["frequencyPenalty"], fromFrequencyPenalty);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (fromSeed != null) {
    setValueByPath(toObject, ["seed"], fromSeed);
  }
  const fromResponseMimeType = getValueByPath(fromObject, [
    "responseMimeType"
  ]);
  if (fromResponseMimeType != null) {
    setValueByPath(toObject, ["responseMimeType"], fromResponseMimeType);
  }
  const fromResponseSchema = getValueByPath(fromObject, [
    "responseSchema"
  ]);
  if (fromResponseSchema != null) {
    setValueByPath(toObject, ["responseSchema"], tSchema(fromResponseSchema));
  }
  const fromResponseJsonSchema = getValueByPath(fromObject, [
    "responseJsonSchema"
  ]);
  if (fromResponseJsonSchema != null) {
    setValueByPath(toObject, ["responseJsonSchema"], fromResponseJsonSchema);
  }
  if (getValueByPath(fromObject, ["routingConfig"]) !== void 0) {
    throw new Error("routingConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["modelSelectionConfig"]) !== void 0) {
    throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");
  }
  const fromSafetySettings = getValueByPath(fromObject, [
    "safetySettings"
  ]);
  if (parentObject !== void 0 && fromSafetySettings != null) {
    let transformedList = fromSafetySettings;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return safetySettingToMldev$1(item);
      });
    }
    setValueByPath(parentObject, ["safetySettings"], transformedList);
  }
  const fromTools = getValueByPath(fromObject, ["tools"]);
  if (parentObject !== void 0 && fromTools != null) {
    let transformedList = tTools(fromTools);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return toolToMldev$4(tTool(item));
      });
    }
    setValueByPath(parentObject, ["tools"], transformedList);
  }
  const fromToolConfig = getValueByPath(fromObject, ["toolConfig"]);
  if (parentObject !== void 0 && fromToolConfig != null) {
    setValueByPath(parentObject, ["toolConfig"], toolConfigToMldev$2(fromToolConfig));
  }
  if (getValueByPath(fromObject, ["labels"]) !== void 0) {
    throw new Error("labels parameter is not supported in Gemini API.");
  }
  const fromCachedContent = getValueByPath(fromObject, [
    "cachedContent"
  ]);
  if (parentObject !== void 0 && fromCachedContent != null) {
    setValueByPath(parentObject, ["cachedContent"], tCachedContentName(apiClient, fromCachedContent));
  }
  const fromResponseModalities = getValueByPath(fromObject, [
    "responseModalities"
  ]);
  if (fromResponseModalities != null) {
    setValueByPath(toObject, ["responseModalities"], fromResponseModalities);
  }
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (fromMediaResolution != null) {
    setValueByPath(toObject, ["mediaResolution"], fromMediaResolution);
  }
  const fromSpeechConfig = getValueByPath(fromObject, ["speechConfig"]);
  if (fromSpeechConfig != null) {
    setValueByPath(toObject, ["speechConfig"], tSpeechConfig(fromSpeechConfig));
  }
  if (getValueByPath(fromObject, ["audioTimestamp"]) !== void 0) {
    throw new Error("audioTimestamp parameter is not supported in Gemini API.");
  }
  const fromThinkingConfig = getValueByPath(fromObject, [
    "thinkingConfig"
  ]);
  if (fromThinkingConfig != null) {
    setValueByPath(toObject, ["thinkingConfig"], fromThinkingConfig);
  }
  const fromImageConfig = getValueByPath(fromObject, ["imageConfig"]);
  if (fromImageConfig != null) {
    setValueByPath(toObject, ["imageConfig"], imageConfigToMldev$1(fromImageConfig));
  }
  const fromEnableEnhancedCivicAnswers = getValueByPath(fromObject, [
    "enableEnhancedCivicAnswers"
  ]);
  if (fromEnableEnhancedCivicAnswers != null) {
    setValueByPath(toObject, ["enableEnhancedCivicAnswers"], fromEnableEnhancedCivicAnswers);
  }
  if (getValueByPath(fromObject, ["modelArmorConfig"]) !== void 0) {
    throw new Error("modelArmorConfig parameter is not supported in Gemini API.");
  }
  return toObject;
}
function generateContentResponseFromMldev$1(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromCandidates = getValueByPath(fromObject, ["candidates"]);
  if (fromCandidates != null) {
    let transformedList = fromCandidates;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return candidateFromMldev$1(item);
      });
    }
    setValueByPath(toObject, ["candidates"], transformedList);
  }
  const fromModelVersion = getValueByPath(fromObject, ["modelVersion"]);
  if (fromModelVersion != null) {
    setValueByPath(toObject, ["modelVersion"], fromModelVersion);
  }
  const fromPromptFeedback = getValueByPath(fromObject, [
    "promptFeedback"
  ]);
  if (fromPromptFeedback != null) {
    setValueByPath(toObject, ["promptFeedback"], fromPromptFeedback);
  }
  const fromResponseId = getValueByPath(fromObject, ["responseId"]);
  if (fromResponseId != null) {
    setValueByPath(toObject, ["responseId"], fromResponseId);
  }
  const fromUsageMetadata = getValueByPath(fromObject, [
    "usageMetadata"
  ]);
  if (fromUsageMetadata != null) {
    setValueByPath(toObject, ["usageMetadata"], fromUsageMetadata);
  }
  return toObject;
}
function getBatchJobParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tBatchJobName(apiClient, fromName));
  }
  return toObject;
}
function getBatchJobParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tBatchJobName(apiClient, fromName));
  }
  return toObject;
}
function googleMapsToMldev$4(fromObject) {
  const toObject = {};
  const fromAuthConfig = getValueByPath(fromObject, ["authConfig"]);
  if (fromAuthConfig != null) {
    setValueByPath(toObject, ["authConfig"], authConfigToMldev$4(fromAuthConfig));
  }
  const fromEnableWidget = getValueByPath(fromObject, ["enableWidget"]);
  if (fromEnableWidget != null) {
    setValueByPath(toObject, ["enableWidget"], fromEnableWidget);
  }
  return toObject;
}
function googleSearchToMldev$4(fromObject) {
  const toObject = {};
  const fromSearchTypes = getValueByPath(fromObject, ["searchTypes"]);
  if (fromSearchTypes != null) {
    setValueByPath(toObject, ["searchTypes"], fromSearchTypes);
  }
  if (getValueByPath(fromObject, ["blockingConfidence"]) !== void 0) {
    throw new Error("blockingConfidence parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["excludeDomains"]) !== void 0) {
    throw new Error("excludeDomains parameter is not supported in Gemini API.");
  }
  const fromTimeRangeFilter = getValueByPath(fromObject, [
    "timeRangeFilter"
  ]);
  if (fromTimeRangeFilter != null) {
    setValueByPath(toObject, ["timeRangeFilter"], fromTimeRangeFilter);
  }
  return toObject;
}
function imageConfigToMldev$1(fromObject) {
  const toObject = {};
  const fromAspectRatio = getValueByPath(fromObject, ["aspectRatio"]);
  if (fromAspectRatio != null) {
    setValueByPath(toObject, ["aspectRatio"], fromAspectRatio);
  }
  const fromImageSize = getValueByPath(fromObject, ["imageSize"]);
  if (fromImageSize != null) {
    setValueByPath(toObject, ["imageSize"], fromImageSize);
  }
  if (getValueByPath(fromObject, ["personGeneration"]) !== void 0) {
    throw new Error("personGeneration parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["prominentPeople"]) !== void 0) {
    throw new Error("prominentPeople parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["outputMimeType"]) !== void 0) {
    throw new Error("outputMimeType parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["outputCompressionQuality"]) !== void 0) {
    throw new Error("outputCompressionQuality parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["imageOutputOptions"]) !== void 0) {
    throw new Error("imageOutputOptions parameter is not supported in Gemini API.");
  }
  return toObject;
}
function inlinedRequestToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["request", "model"], tModel(apiClient, fromModel));
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (fromContents != null) {
    let transformedList = tContents(fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentToMldev$4(item);
      });
    }
    setValueByPath(toObject, ["request", "contents"], transformedList);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["request", "generationConfig"], generateContentConfigToMldev$1(apiClient, fromConfig, getValueByPath(toObject, ["request"], {})));
  }
  return toObject;
}
function inlinedResponseFromMldev(fromObject) {
  const toObject = {};
  const fromResponse = getValueByPath(fromObject, ["response"]);
  if (fromResponse != null) {
    setValueByPath(toObject, ["response"], generateContentResponseFromMldev$1(fromResponse));
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  return toObject;
}
function listBatchJobsConfigToMldev(fromObject, parentObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== void 0 && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== void 0 && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  if (getValueByPath(fromObject, ["filter"]) !== void 0) {
    throw new Error("filter parameter is not supported in Gemini API.");
  }
  return toObject;
}
function listBatchJobsConfigToVertex(fromObject, parentObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== void 0 && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== void 0 && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  const fromFilter = getValueByPath(fromObject, ["filter"]);
  if (parentObject !== void 0 && fromFilter != null) {
    setValueByPath(parentObject, ["_query", "filter"], fromFilter);
  }
  return toObject;
}
function listBatchJobsParametersToMldev(fromObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    listBatchJobsConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function listBatchJobsParametersToVertex(fromObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    listBatchJobsConfigToVertex(fromConfig, toObject);
  }
  return toObject;
}
function listBatchJobsResponseFromMldev(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromBatchJobs = getValueByPath(fromObject, ["operations"]);
  if (fromBatchJobs != null) {
    let transformedList = fromBatchJobs;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return batchJobFromMldev(item);
      });
    }
    setValueByPath(toObject, ["batchJobs"], transformedList);
  }
  return toObject;
}
function listBatchJobsResponseFromVertex(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromBatchJobs = getValueByPath(fromObject, [
    "batchPredictionJobs"
  ]);
  if (fromBatchJobs != null) {
    let transformedList = fromBatchJobs;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return batchJobFromVertex(item);
      });
    }
    setValueByPath(toObject, ["batchJobs"], transformedList);
  }
  return toObject;
}
function partToMldev$4(fromObject) {
  const toObject = {};
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (fromMediaResolution != null) {
    setValueByPath(toObject, ["mediaResolution"], fromMediaResolution);
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fileDataToMldev$4(fromFileData));
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], functionCallToMldev$4(fromFunctionCall));
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], blobToMldev$4(fromInlineData));
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromThoughtSignature = getValueByPath(fromObject, [
    "thoughtSignature"
  ]);
  if (fromThoughtSignature != null) {
    setValueByPath(toObject, ["thoughtSignature"], fromThoughtSignature);
  }
  const fromVideoMetadata = getValueByPath(fromObject, [
    "videoMetadata"
  ]);
  if (fromVideoMetadata != null) {
    setValueByPath(toObject, ["videoMetadata"], fromVideoMetadata);
  }
  const fromToolCall = getValueByPath(fromObject, ["toolCall"]);
  if (fromToolCall != null) {
    setValueByPath(toObject, ["toolCall"], fromToolCall);
  }
  const fromToolResponse = getValueByPath(fromObject, ["toolResponse"]);
  if (fromToolResponse != null) {
    setValueByPath(toObject, ["toolResponse"], fromToolResponse);
  }
  return toObject;
}
function safetySettingToMldev$1(fromObject) {
  const toObject = {};
  const fromCategory = getValueByPath(fromObject, ["category"]);
  if (fromCategory != null) {
    setValueByPath(toObject, ["category"], fromCategory);
  }
  if (getValueByPath(fromObject, ["method"]) !== void 0) {
    throw new Error("method parameter is not supported in Gemini API.");
  }
  const fromThreshold = getValueByPath(fromObject, ["threshold"]);
  if (fromThreshold != null) {
    setValueByPath(toObject, ["threshold"], fromThreshold);
  }
  return toObject;
}
function toolConfigToMldev$2(fromObject) {
  const toObject = {};
  const fromRetrievalConfig = getValueByPath(fromObject, [
    "retrievalConfig"
  ]);
  if (fromRetrievalConfig != null) {
    setValueByPath(toObject, ["retrievalConfig"], fromRetrievalConfig);
  }
  const fromFunctionCallingConfig = getValueByPath(fromObject, [
    "functionCallingConfig"
  ]);
  if (fromFunctionCallingConfig != null) {
    setValueByPath(toObject, ["functionCallingConfig"], functionCallingConfigToMldev$2(fromFunctionCallingConfig));
  }
  const fromIncludeServerSideToolInvocations = getValueByPath(fromObject, ["includeServerSideToolInvocations"]);
  if (fromIncludeServerSideToolInvocations != null) {
    setValueByPath(toObject, ["includeServerSideToolInvocations"], fromIncludeServerSideToolInvocations);
  }
  return toObject;
}
function toolToMldev$4(fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["retrieval"]) !== void 0) {
    throw new Error("retrieval parameter is not supported in Gemini API.");
  }
  const fromComputerUse = getValueByPath(fromObject, ["computerUse"]);
  if (fromComputerUse != null) {
    setValueByPath(toObject, ["computerUse"], fromComputerUse);
  }
  const fromFileSearch = getValueByPath(fromObject, ["fileSearch"]);
  if (fromFileSearch != null) {
    setValueByPath(toObject, ["fileSearch"], fromFileSearch);
  }
  const fromGoogleSearch = getValueByPath(fromObject, ["googleSearch"]);
  if (fromGoogleSearch != null) {
    setValueByPath(toObject, ["googleSearch"], googleSearchToMldev$4(fromGoogleSearch));
  }
  const fromGoogleMaps = getValueByPath(fromObject, ["googleMaps"]);
  if (fromGoogleMaps != null) {
    setValueByPath(toObject, ["googleMaps"], googleMapsToMldev$4(fromGoogleMaps));
  }
  const fromCodeExecution = getValueByPath(fromObject, [
    "codeExecution"
  ]);
  if (fromCodeExecution != null) {
    setValueByPath(toObject, ["codeExecution"], fromCodeExecution);
  }
  if (getValueByPath(fromObject, ["enterpriseWebSearch"]) !== void 0) {
    throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  }
  const fromFunctionDeclarations = getValueByPath(fromObject, [
    "functionDeclarations"
  ]);
  if (fromFunctionDeclarations != null) {
    let transformedList = fromFunctionDeclarations;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["functionDeclarations"], transformedList);
  }
  const fromGoogleSearchRetrieval = getValueByPath(fromObject, [
    "googleSearchRetrieval"
  ]);
  if (fromGoogleSearchRetrieval != null) {
    setValueByPath(toObject, ["googleSearchRetrieval"], fromGoogleSearchRetrieval);
  }
  if (getValueByPath(fromObject, ["parallelAiSearch"]) !== void 0) {
    throw new Error("parallelAiSearch parameter is not supported in Gemini API.");
  }
  const fromUrlContext = getValueByPath(fromObject, ["urlContext"]);
  if (fromUrlContext != null) {
    setValueByPath(toObject, ["urlContext"], fromUrlContext);
  }
  const fromMcpServers = getValueByPath(fromObject, ["mcpServers"]);
  if (fromMcpServers != null) {
    let transformedList = fromMcpServers;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["mcpServers"], transformedList);
  }
  return toObject;
}
function authConfigToMldev$3(fromObject) {
  const toObject = {};
  const fromApiKey = getValueByPath(fromObject, ["apiKey"]);
  if (fromApiKey != null) {
    setValueByPath(toObject, ["apiKey"], fromApiKey);
  }
  if (getValueByPath(fromObject, ["apiKeyConfig"]) !== void 0) {
    throw new Error("apiKeyConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["authType"]) !== void 0) {
    throw new Error("authType parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["googleServiceAccountConfig"]) !== void 0) {
    throw new Error("googleServiceAccountConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["httpBasicAuthConfig"]) !== void 0) {
    throw new Error("httpBasicAuthConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["oauthConfig"]) !== void 0) {
    throw new Error("oauthConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["oidcConfig"]) !== void 0) {
    throw new Error("oidcConfig parameter is not supported in Gemini API.");
  }
  return toObject;
}
function blobToMldev$3(fromObject) {
  const toObject = {};
  const fromData = getValueByPath(fromObject, ["data"]);
  if (fromData != null) {
    setValueByPath(toObject, ["data"], fromData);
  }
  if (getValueByPath(fromObject, ["displayName"]) !== void 0) {
    throw new Error("displayName parameter is not supported in Gemini API.");
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function contentToMldev$3(fromObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partToMldev$3(item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function contentToVertex$2(fromObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partToVertex$2(item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function createCachedContentConfigToMldev(fromObject, parentObject) {
  const toObject = {};
  const fromTtl = getValueByPath(fromObject, ["ttl"]);
  if (parentObject !== void 0 && fromTtl != null) {
    setValueByPath(parentObject, ["ttl"], fromTtl);
  }
  const fromExpireTime = getValueByPath(fromObject, ["expireTime"]);
  if (parentObject !== void 0 && fromExpireTime != null) {
    setValueByPath(parentObject, ["expireTime"], fromExpireTime);
  }
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (parentObject !== void 0 && fromDisplayName != null) {
    setValueByPath(parentObject, ["displayName"], fromDisplayName);
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (parentObject !== void 0 && fromContents != null) {
    let transformedList = tContents(fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentToMldev$3(item);
      });
    }
    setValueByPath(parentObject, ["contents"], transformedList);
  }
  const fromSystemInstruction = getValueByPath(fromObject, [
    "systemInstruction"
  ]);
  if (parentObject !== void 0 && fromSystemInstruction != null) {
    setValueByPath(parentObject, ["systemInstruction"], contentToMldev$3(tContent(fromSystemInstruction)));
  }
  const fromTools = getValueByPath(fromObject, ["tools"]);
  if (parentObject !== void 0 && fromTools != null) {
    let transformedList = fromTools;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return toolToMldev$3(item);
      });
    }
    setValueByPath(parentObject, ["tools"], transformedList);
  }
  const fromToolConfig = getValueByPath(fromObject, ["toolConfig"]);
  if (parentObject !== void 0 && fromToolConfig != null) {
    setValueByPath(parentObject, ["toolConfig"], toolConfigToMldev$1(fromToolConfig));
  }
  if (getValueByPath(fromObject, ["kmsKeyName"]) !== void 0) {
    throw new Error("kmsKeyName parameter is not supported in Gemini API.");
  }
  return toObject;
}
function createCachedContentConfigToVertex(fromObject, parentObject) {
  const toObject = {};
  const fromTtl = getValueByPath(fromObject, ["ttl"]);
  if (parentObject !== void 0 && fromTtl != null) {
    setValueByPath(parentObject, ["ttl"], fromTtl);
  }
  const fromExpireTime = getValueByPath(fromObject, ["expireTime"]);
  if (parentObject !== void 0 && fromExpireTime != null) {
    setValueByPath(parentObject, ["expireTime"], fromExpireTime);
  }
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (parentObject !== void 0 && fromDisplayName != null) {
    setValueByPath(parentObject, ["displayName"], fromDisplayName);
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (parentObject !== void 0 && fromContents != null) {
    let transformedList = tContents(fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentToVertex$2(item);
      });
    }
    setValueByPath(parentObject, ["contents"], transformedList);
  }
  const fromSystemInstruction = getValueByPath(fromObject, [
    "systemInstruction"
  ]);
  if (parentObject !== void 0 && fromSystemInstruction != null) {
    setValueByPath(parentObject, ["systemInstruction"], contentToVertex$2(tContent(fromSystemInstruction)));
  }
  const fromTools = getValueByPath(fromObject, ["tools"]);
  if (parentObject !== void 0 && fromTools != null) {
    let transformedList = fromTools;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return toolToVertex$2(item);
      });
    }
    setValueByPath(parentObject, ["tools"], transformedList);
  }
  const fromToolConfig = getValueByPath(fromObject, ["toolConfig"]);
  if (parentObject !== void 0 && fromToolConfig != null) {
    setValueByPath(parentObject, ["toolConfig"], toolConfigToVertex$1(fromToolConfig));
  }
  const fromKmsKeyName = getValueByPath(fromObject, ["kmsKeyName"]);
  if (parentObject !== void 0 && fromKmsKeyName != null) {
    setValueByPath(parentObject, ["encryption_spec", "kmsKeyName"], fromKmsKeyName);
  }
  return toObject;
}
function createCachedContentParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["model"], tCachesModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    createCachedContentConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function createCachedContentParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["model"], tCachesModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    createCachedContentConfigToVertex(fromConfig, toObject);
  }
  return toObject;
}
function deleteCachedContentParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tCachedContentName(apiClient, fromName));
  }
  return toObject;
}
function deleteCachedContentParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tCachedContentName(apiClient, fromName));
  }
  return toObject;
}
function deleteCachedContentResponseFromMldev(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  return toObject;
}
function deleteCachedContentResponseFromVertex(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  return toObject;
}
function fileDataToMldev$3(fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["displayName"]) !== void 0) {
    throw new Error("displayName parameter is not supported in Gemini API.");
  }
  const fromFileUri = getValueByPath(fromObject, ["fileUri"]);
  if (fromFileUri != null) {
    setValueByPath(toObject, ["fileUri"], fromFileUri);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function functionCallToMldev$3(fromObject) {
  const toObject = {};
  const fromId = getValueByPath(fromObject, ["id"]);
  if (fromId != null) {
    setValueByPath(toObject, ["id"], fromId);
  }
  const fromArgs = getValueByPath(fromObject, ["args"]);
  if (fromArgs != null) {
    setValueByPath(toObject, ["args"], fromArgs);
  }
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  if (getValueByPath(fromObject, ["partialArgs"]) !== void 0) {
    throw new Error("partialArgs parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["willContinue"]) !== void 0) {
    throw new Error("willContinue parameter is not supported in Gemini API.");
  }
  return toObject;
}
function functionCallingConfigToMldev$1(fromObject) {
  const toObject = {};
  const fromAllowedFunctionNames = getValueByPath(fromObject, [
    "allowedFunctionNames"
  ]);
  if (fromAllowedFunctionNames != null) {
    setValueByPath(toObject, ["allowedFunctionNames"], fromAllowedFunctionNames);
  }
  const fromMode = getValueByPath(fromObject, ["mode"]);
  if (fromMode != null) {
    setValueByPath(toObject, ["mode"], fromMode);
  }
  if (getValueByPath(fromObject, ["streamFunctionCallArguments"]) !== void 0) {
    throw new Error("streamFunctionCallArguments parameter is not supported in Gemini API.");
  }
  return toObject;
}
function functionDeclarationToVertex$2(fromObject) {
  const toObject = {};
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (fromDescription != null) {
    setValueByPath(toObject, ["description"], fromDescription);
  }
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromParameters = getValueByPath(fromObject, ["parameters"]);
  if (fromParameters != null) {
    setValueByPath(toObject, ["parameters"], fromParameters);
  }
  const fromParametersJsonSchema = getValueByPath(fromObject, [
    "parametersJsonSchema"
  ]);
  if (fromParametersJsonSchema != null) {
    setValueByPath(toObject, ["parametersJsonSchema"], fromParametersJsonSchema);
  }
  const fromResponse = getValueByPath(fromObject, ["response"]);
  if (fromResponse != null) {
    setValueByPath(toObject, ["response"], fromResponse);
  }
  const fromResponseJsonSchema = getValueByPath(fromObject, [
    "responseJsonSchema"
  ]);
  if (fromResponseJsonSchema != null) {
    setValueByPath(toObject, ["responseJsonSchema"], fromResponseJsonSchema);
  }
  if (getValueByPath(fromObject, ["behavior"]) !== void 0) {
    throw new Error("behavior parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function getCachedContentParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tCachedContentName(apiClient, fromName));
  }
  return toObject;
}
function getCachedContentParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tCachedContentName(apiClient, fromName));
  }
  return toObject;
}
function googleMapsToMldev$3(fromObject) {
  const toObject = {};
  const fromAuthConfig = getValueByPath(fromObject, ["authConfig"]);
  if (fromAuthConfig != null) {
    setValueByPath(toObject, ["authConfig"], authConfigToMldev$3(fromAuthConfig));
  }
  const fromEnableWidget = getValueByPath(fromObject, ["enableWidget"]);
  if (fromEnableWidget != null) {
    setValueByPath(toObject, ["enableWidget"], fromEnableWidget);
  }
  return toObject;
}
function googleSearchToMldev$3(fromObject) {
  const toObject = {};
  const fromSearchTypes = getValueByPath(fromObject, ["searchTypes"]);
  if (fromSearchTypes != null) {
    setValueByPath(toObject, ["searchTypes"], fromSearchTypes);
  }
  if (getValueByPath(fromObject, ["blockingConfidence"]) !== void 0) {
    throw new Error("blockingConfidence parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["excludeDomains"]) !== void 0) {
    throw new Error("excludeDomains parameter is not supported in Gemini API.");
  }
  const fromTimeRangeFilter = getValueByPath(fromObject, [
    "timeRangeFilter"
  ]);
  if (fromTimeRangeFilter != null) {
    setValueByPath(toObject, ["timeRangeFilter"], fromTimeRangeFilter);
  }
  return toObject;
}
function listCachedContentsConfigToMldev(fromObject, parentObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== void 0 && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== void 0 && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  return toObject;
}
function listCachedContentsConfigToVertex(fromObject, parentObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== void 0 && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== void 0 && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  return toObject;
}
function listCachedContentsParametersToMldev(fromObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    listCachedContentsConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function listCachedContentsParametersToVertex(fromObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    listCachedContentsConfigToVertex(fromConfig, toObject);
  }
  return toObject;
}
function listCachedContentsResponseFromMldev(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromCachedContents = getValueByPath(fromObject, [
    "cachedContents"
  ]);
  if (fromCachedContents != null) {
    let transformedList = fromCachedContents;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["cachedContents"], transformedList);
  }
  return toObject;
}
function listCachedContentsResponseFromVertex(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromCachedContents = getValueByPath(fromObject, [
    "cachedContents"
  ]);
  if (fromCachedContents != null) {
    let transformedList = fromCachedContents;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["cachedContents"], transformedList);
  }
  return toObject;
}
function partToMldev$3(fromObject) {
  const toObject = {};
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (fromMediaResolution != null) {
    setValueByPath(toObject, ["mediaResolution"], fromMediaResolution);
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fileDataToMldev$3(fromFileData));
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], functionCallToMldev$3(fromFunctionCall));
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], blobToMldev$3(fromInlineData));
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromThoughtSignature = getValueByPath(fromObject, [
    "thoughtSignature"
  ]);
  if (fromThoughtSignature != null) {
    setValueByPath(toObject, ["thoughtSignature"], fromThoughtSignature);
  }
  const fromVideoMetadata = getValueByPath(fromObject, [
    "videoMetadata"
  ]);
  if (fromVideoMetadata != null) {
    setValueByPath(toObject, ["videoMetadata"], fromVideoMetadata);
  }
  const fromToolCall = getValueByPath(fromObject, ["toolCall"]);
  if (fromToolCall != null) {
    setValueByPath(toObject, ["toolCall"], fromToolCall);
  }
  const fromToolResponse = getValueByPath(fromObject, ["toolResponse"]);
  if (fromToolResponse != null) {
    setValueByPath(toObject, ["toolResponse"], fromToolResponse);
  }
  return toObject;
}
function partToVertex$2(fromObject) {
  const toObject = {};
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (fromMediaResolution != null) {
    setValueByPath(toObject, ["mediaResolution"], fromMediaResolution);
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fromFileData);
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], fromFunctionCall);
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], fromInlineData);
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromThoughtSignature = getValueByPath(fromObject, [
    "thoughtSignature"
  ]);
  if (fromThoughtSignature != null) {
    setValueByPath(toObject, ["thoughtSignature"], fromThoughtSignature);
  }
  const fromVideoMetadata = getValueByPath(fromObject, [
    "videoMetadata"
  ]);
  if (fromVideoMetadata != null) {
    setValueByPath(toObject, ["videoMetadata"], fromVideoMetadata);
  }
  if (getValueByPath(fromObject, ["toolCall"]) !== void 0) {
    throw new Error("toolCall parameter is not supported in Vertex AI.");
  }
  if (getValueByPath(fromObject, ["toolResponse"]) !== void 0) {
    throw new Error("toolResponse parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function toolConfigToMldev$1(fromObject) {
  const toObject = {};
  const fromRetrievalConfig = getValueByPath(fromObject, [
    "retrievalConfig"
  ]);
  if (fromRetrievalConfig != null) {
    setValueByPath(toObject, ["retrievalConfig"], fromRetrievalConfig);
  }
  const fromFunctionCallingConfig = getValueByPath(fromObject, [
    "functionCallingConfig"
  ]);
  if (fromFunctionCallingConfig != null) {
    setValueByPath(toObject, ["functionCallingConfig"], functionCallingConfigToMldev$1(fromFunctionCallingConfig));
  }
  const fromIncludeServerSideToolInvocations = getValueByPath(fromObject, ["includeServerSideToolInvocations"]);
  if (fromIncludeServerSideToolInvocations != null) {
    setValueByPath(toObject, ["includeServerSideToolInvocations"], fromIncludeServerSideToolInvocations);
  }
  return toObject;
}
function toolConfigToVertex$1(fromObject) {
  const toObject = {};
  const fromRetrievalConfig = getValueByPath(fromObject, [
    "retrievalConfig"
  ]);
  if (fromRetrievalConfig != null) {
    setValueByPath(toObject, ["retrievalConfig"], fromRetrievalConfig);
  }
  const fromFunctionCallingConfig = getValueByPath(fromObject, [
    "functionCallingConfig"
  ]);
  if (fromFunctionCallingConfig != null) {
    setValueByPath(toObject, ["functionCallingConfig"], fromFunctionCallingConfig);
  }
  if (getValueByPath(fromObject, ["includeServerSideToolInvocations"]) !== void 0) {
    throw new Error("includeServerSideToolInvocations parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function toolToMldev$3(fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["retrieval"]) !== void 0) {
    throw new Error("retrieval parameter is not supported in Gemini API.");
  }
  const fromComputerUse = getValueByPath(fromObject, ["computerUse"]);
  if (fromComputerUse != null) {
    setValueByPath(toObject, ["computerUse"], fromComputerUse);
  }
  const fromFileSearch = getValueByPath(fromObject, ["fileSearch"]);
  if (fromFileSearch != null) {
    setValueByPath(toObject, ["fileSearch"], fromFileSearch);
  }
  const fromGoogleSearch = getValueByPath(fromObject, ["googleSearch"]);
  if (fromGoogleSearch != null) {
    setValueByPath(toObject, ["googleSearch"], googleSearchToMldev$3(fromGoogleSearch));
  }
  const fromGoogleMaps = getValueByPath(fromObject, ["googleMaps"]);
  if (fromGoogleMaps != null) {
    setValueByPath(toObject, ["googleMaps"], googleMapsToMldev$3(fromGoogleMaps));
  }
  const fromCodeExecution = getValueByPath(fromObject, [
    "codeExecution"
  ]);
  if (fromCodeExecution != null) {
    setValueByPath(toObject, ["codeExecution"], fromCodeExecution);
  }
  if (getValueByPath(fromObject, ["enterpriseWebSearch"]) !== void 0) {
    throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  }
  const fromFunctionDeclarations = getValueByPath(fromObject, [
    "functionDeclarations"
  ]);
  if (fromFunctionDeclarations != null) {
    let transformedList = fromFunctionDeclarations;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["functionDeclarations"], transformedList);
  }
  const fromGoogleSearchRetrieval = getValueByPath(fromObject, [
    "googleSearchRetrieval"
  ]);
  if (fromGoogleSearchRetrieval != null) {
    setValueByPath(toObject, ["googleSearchRetrieval"], fromGoogleSearchRetrieval);
  }
  if (getValueByPath(fromObject, ["parallelAiSearch"]) !== void 0) {
    throw new Error("parallelAiSearch parameter is not supported in Gemini API.");
  }
  const fromUrlContext = getValueByPath(fromObject, ["urlContext"]);
  if (fromUrlContext != null) {
    setValueByPath(toObject, ["urlContext"], fromUrlContext);
  }
  const fromMcpServers = getValueByPath(fromObject, ["mcpServers"]);
  if (fromMcpServers != null) {
    let transformedList = fromMcpServers;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["mcpServers"], transformedList);
  }
  return toObject;
}
function toolToVertex$2(fromObject) {
  const toObject = {};
  const fromRetrieval = getValueByPath(fromObject, ["retrieval"]);
  if (fromRetrieval != null) {
    setValueByPath(toObject, ["retrieval"], fromRetrieval);
  }
  const fromComputerUse = getValueByPath(fromObject, ["computerUse"]);
  if (fromComputerUse != null) {
    setValueByPath(toObject, ["computerUse"], fromComputerUse);
  }
  if (getValueByPath(fromObject, ["fileSearch"]) !== void 0) {
    throw new Error("fileSearch parameter is not supported in Vertex AI.");
  }
  const fromGoogleSearch = getValueByPath(fromObject, ["googleSearch"]);
  if (fromGoogleSearch != null) {
    setValueByPath(toObject, ["googleSearch"], fromGoogleSearch);
  }
  const fromGoogleMaps = getValueByPath(fromObject, ["googleMaps"]);
  if (fromGoogleMaps != null) {
    setValueByPath(toObject, ["googleMaps"], fromGoogleMaps);
  }
  const fromCodeExecution = getValueByPath(fromObject, [
    "codeExecution"
  ]);
  if (fromCodeExecution != null) {
    setValueByPath(toObject, ["codeExecution"], fromCodeExecution);
  }
  const fromEnterpriseWebSearch = getValueByPath(fromObject, [
    "enterpriseWebSearch"
  ]);
  if (fromEnterpriseWebSearch != null) {
    setValueByPath(toObject, ["enterpriseWebSearch"], fromEnterpriseWebSearch);
  }
  const fromFunctionDeclarations = getValueByPath(fromObject, [
    "functionDeclarations"
  ]);
  if (fromFunctionDeclarations != null) {
    let transformedList = fromFunctionDeclarations;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return functionDeclarationToVertex$2(item);
      });
    }
    setValueByPath(toObject, ["functionDeclarations"], transformedList);
  }
  const fromGoogleSearchRetrieval = getValueByPath(fromObject, [
    "googleSearchRetrieval"
  ]);
  if (fromGoogleSearchRetrieval != null) {
    setValueByPath(toObject, ["googleSearchRetrieval"], fromGoogleSearchRetrieval);
  }
  const fromParallelAiSearch = getValueByPath(fromObject, [
    "parallelAiSearch"
  ]);
  if (fromParallelAiSearch != null) {
    setValueByPath(toObject, ["parallelAiSearch"], fromParallelAiSearch);
  }
  const fromUrlContext = getValueByPath(fromObject, ["urlContext"]);
  if (fromUrlContext != null) {
    setValueByPath(toObject, ["urlContext"], fromUrlContext);
  }
  if (getValueByPath(fromObject, ["mcpServers"]) !== void 0) {
    throw new Error("mcpServers parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function updateCachedContentConfigToMldev(fromObject, parentObject) {
  const toObject = {};
  const fromTtl = getValueByPath(fromObject, ["ttl"]);
  if (parentObject !== void 0 && fromTtl != null) {
    setValueByPath(parentObject, ["ttl"], fromTtl);
  }
  const fromExpireTime = getValueByPath(fromObject, ["expireTime"]);
  if (parentObject !== void 0 && fromExpireTime != null) {
    setValueByPath(parentObject, ["expireTime"], fromExpireTime);
  }
  return toObject;
}
function updateCachedContentConfigToVertex(fromObject, parentObject) {
  const toObject = {};
  const fromTtl = getValueByPath(fromObject, ["ttl"]);
  if (parentObject !== void 0 && fromTtl != null) {
    setValueByPath(parentObject, ["ttl"], fromTtl);
  }
  const fromExpireTime = getValueByPath(fromObject, ["expireTime"]);
  if (parentObject !== void 0 && fromExpireTime != null) {
    setValueByPath(parentObject, ["expireTime"], fromExpireTime);
  }
  return toObject;
}
function updateCachedContentParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tCachedContentName(apiClient, fromName));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    updateCachedContentConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function updateCachedContentParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], tCachedContentName(apiClient, fromName));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    updateCachedContentConfigToVertex(fromConfig, toObject);
  }
  return toObject;
}
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: /* @__PURE__ */ __name(function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }, "next")
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  __name(awaitReturn, "awaitReturn");
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  __name(verb, "verb");
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  __name(resume, "resume");
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  __name(step, "step");
  function fulfill(value) {
    resume("next", value);
  }
  __name(fulfill, "fulfill");
  function reject(value) {
    resume("throw", value);
  }
  __name(reject, "reject");
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
  __name(settle, "settle");
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  __name(verb, "verb");
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
  __name(settle, "settle");
}
function isValidResponse(response) {
  var _a2;
  if (response.candidates == void 0 || response.candidates.length === 0) {
    return false;
  }
  const content = (_a2 = response.candidates[0]) === null || _a2 === void 0 ? void 0 : _a2.content;
  if (content === void 0) {
    return false;
  }
  return isValidContent(content);
}
function isValidContent(content) {
  if (content.parts === void 0 || content.parts.length === 0) {
    return false;
  }
  for (const part of content.parts) {
    if (part === void 0 || Object.keys(part).length === 0) {
      return false;
    }
  }
  return true;
}
function validateHistory(history) {
  if (history.length === 0) {
    return;
  }
  for (const content of history) {
    if (content.role !== "user" && content.role !== "model") {
      throw new Error(`Role must be user or model, but got ${content.role}.`);
    }
  }
}
function extractCuratedHistory(comprehensiveHistory) {
  if (comprehensiveHistory === void 0 || comprehensiveHistory.length === 0) {
    return [];
  }
  const curatedHistory = [];
  const length = comprehensiveHistory.length;
  let i = 0;
  while (i < length) {
    if (comprehensiveHistory[i].role === "user") {
      curatedHistory.push(comprehensiveHistory[i]);
      i++;
    } else {
      const modelOutput = [];
      let isValid = true;
      while (i < length && comprehensiveHistory[i].role === "model") {
        modelOutput.push(comprehensiveHistory[i]);
        if (isValid && !isValidContent(comprehensiveHistory[i])) {
          isValid = false;
        }
        i++;
      }
      if (isValid) {
        curatedHistory.push(...modelOutput);
      } else {
        curatedHistory.pop();
      }
    }
  }
  return curatedHistory;
}
function createFileParametersToMldev(fromObject) {
  const toObject = {};
  const fromFile = getValueByPath(fromObject, ["file"]);
  if (fromFile != null) {
    setValueByPath(toObject, ["file"], fromFile);
  }
  return toObject;
}
function createFileResponseFromMldev(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  return toObject;
}
function deleteFileParametersToMldev(fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "file"], tFileName(fromName));
  }
  return toObject;
}
function deleteFileResponseFromMldev(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  return toObject;
}
function getFileParametersToMldev(fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "file"], tFileName(fromName));
  }
  return toObject;
}
function internalRegisterFilesParametersToMldev(fromObject) {
  const toObject = {};
  const fromUris = getValueByPath(fromObject, ["uris"]);
  if (fromUris != null) {
    setValueByPath(toObject, ["uris"], fromUris);
  }
  return toObject;
}
function listFilesConfigToMldev(fromObject, parentObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== void 0 && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== void 0 && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  return toObject;
}
function listFilesParametersToMldev(fromObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    listFilesConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function listFilesResponseFromMldev(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromFiles = getValueByPath(fromObject, ["files"]);
  if (fromFiles != null) {
    let transformedList = fromFiles;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["files"], transformedList);
  }
  return toObject;
}
function registerFilesResponseFromMldev(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromFiles = getValueByPath(fromObject, ["files"]);
  if (fromFiles != null) {
    let transformedList = fromFiles;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["files"], transformedList);
  }
  return toObject;
}
function audioTranscriptionConfigToMldev$1(fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["languageCodes"]) !== void 0) {
    throw new Error("languageCodes parameter is not supported in Gemini API.");
  }
  return toObject;
}
function authConfigToMldev$2(fromObject) {
  const toObject = {};
  const fromApiKey = getValueByPath(fromObject, ["apiKey"]);
  if (fromApiKey != null) {
    setValueByPath(toObject, ["apiKey"], fromApiKey);
  }
  if (getValueByPath(fromObject, ["apiKeyConfig"]) !== void 0) {
    throw new Error("apiKeyConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["authType"]) !== void 0) {
    throw new Error("authType parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["googleServiceAccountConfig"]) !== void 0) {
    throw new Error("googleServiceAccountConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["httpBasicAuthConfig"]) !== void 0) {
    throw new Error("httpBasicAuthConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["oauthConfig"]) !== void 0) {
    throw new Error("oauthConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["oidcConfig"]) !== void 0) {
    throw new Error("oidcConfig parameter is not supported in Gemini API.");
  }
  return toObject;
}
function blobToMldev$2(fromObject) {
  const toObject = {};
  const fromData = getValueByPath(fromObject, ["data"]);
  if (fromData != null) {
    setValueByPath(toObject, ["data"], fromData);
  }
  if (getValueByPath(fromObject, ["displayName"]) !== void 0) {
    throw new Error("displayName parameter is not supported in Gemini API.");
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function contentToMldev$2(fromObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partToMldev$2(item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function contentToVertex$1(fromObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partToVertex$1(item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function fileDataToMldev$2(fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["displayName"]) !== void 0) {
    throw new Error("displayName parameter is not supported in Gemini API.");
  }
  const fromFileUri = getValueByPath(fromObject, ["fileUri"]);
  if (fromFileUri != null) {
    setValueByPath(toObject, ["fileUri"], fromFileUri);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function functionCallToMldev$2(fromObject) {
  const toObject = {};
  const fromId = getValueByPath(fromObject, ["id"]);
  if (fromId != null) {
    setValueByPath(toObject, ["id"], fromId);
  }
  const fromArgs = getValueByPath(fromObject, ["args"]);
  if (fromArgs != null) {
    setValueByPath(toObject, ["args"], fromArgs);
  }
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  if (getValueByPath(fromObject, ["partialArgs"]) !== void 0) {
    throw new Error("partialArgs parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["willContinue"]) !== void 0) {
    throw new Error("willContinue parameter is not supported in Gemini API.");
  }
  return toObject;
}
function functionDeclarationToVertex$1(fromObject) {
  const toObject = {};
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (fromDescription != null) {
    setValueByPath(toObject, ["description"], fromDescription);
  }
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromParameters = getValueByPath(fromObject, ["parameters"]);
  if (fromParameters != null) {
    setValueByPath(toObject, ["parameters"], fromParameters);
  }
  const fromParametersJsonSchema = getValueByPath(fromObject, [
    "parametersJsonSchema"
  ]);
  if (fromParametersJsonSchema != null) {
    setValueByPath(toObject, ["parametersJsonSchema"], fromParametersJsonSchema);
  }
  const fromResponse = getValueByPath(fromObject, ["response"]);
  if (fromResponse != null) {
    setValueByPath(toObject, ["response"], fromResponse);
  }
  const fromResponseJsonSchema = getValueByPath(fromObject, [
    "responseJsonSchema"
  ]);
  if (fromResponseJsonSchema != null) {
    setValueByPath(toObject, ["responseJsonSchema"], fromResponseJsonSchema);
  }
  if (getValueByPath(fromObject, ["behavior"]) !== void 0) {
    throw new Error("behavior parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function generationConfigToVertex$1(fromObject) {
  const toObject = {};
  const fromModelSelectionConfig = getValueByPath(fromObject, [
    "modelSelectionConfig"
  ]);
  if (fromModelSelectionConfig != null) {
    setValueByPath(toObject, ["modelConfig"], fromModelSelectionConfig);
  }
  const fromResponseJsonSchema = getValueByPath(fromObject, [
    "responseJsonSchema"
  ]);
  if (fromResponseJsonSchema != null) {
    setValueByPath(toObject, ["responseJsonSchema"], fromResponseJsonSchema);
  }
  const fromAudioTimestamp = getValueByPath(fromObject, [
    "audioTimestamp"
  ]);
  if (fromAudioTimestamp != null) {
    setValueByPath(toObject, ["audioTimestamp"], fromAudioTimestamp);
  }
  const fromCandidateCount = getValueByPath(fromObject, [
    "candidateCount"
  ]);
  if (fromCandidateCount != null) {
    setValueByPath(toObject, ["candidateCount"], fromCandidateCount);
  }
  const fromEnableAffectiveDialog = getValueByPath(fromObject, [
    "enableAffectiveDialog"
  ]);
  if (fromEnableAffectiveDialog != null) {
    setValueByPath(toObject, ["enableAffectiveDialog"], fromEnableAffectiveDialog);
  }
  const fromFrequencyPenalty = getValueByPath(fromObject, [
    "frequencyPenalty"
  ]);
  if (fromFrequencyPenalty != null) {
    setValueByPath(toObject, ["frequencyPenalty"], fromFrequencyPenalty);
  }
  const fromLogprobs = getValueByPath(fromObject, ["logprobs"]);
  if (fromLogprobs != null) {
    setValueByPath(toObject, ["logprobs"], fromLogprobs);
  }
  const fromMaxOutputTokens = getValueByPath(fromObject, [
    "maxOutputTokens"
  ]);
  if (fromMaxOutputTokens != null) {
    setValueByPath(toObject, ["maxOutputTokens"], fromMaxOutputTokens);
  }
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (fromMediaResolution != null) {
    setValueByPath(toObject, ["mediaResolution"], fromMediaResolution);
  }
  const fromPresencePenalty = getValueByPath(fromObject, [
    "presencePenalty"
  ]);
  if (fromPresencePenalty != null) {
    setValueByPath(toObject, ["presencePenalty"], fromPresencePenalty);
  }
  const fromResponseLogprobs = getValueByPath(fromObject, [
    "responseLogprobs"
  ]);
  if (fromResponseLogprobs != null) {
    setValueByPath(toObject, ["responseLogprobs"], fromResponseLogprobs);
  }
  const fromResponseMimeType = getValueByPath(fromObject, [
    "responseMimeType"
  ]);
  if (fromResponseMimeType != null) {
    setValueByPath(toObject, ["responseMimeType"], fromResponseMimeType);
  }
  const fromResponseModalities = getValueByPath(fromObject, [
    "responseModalities"
  ]);
  if (fromResponseModalities != null) {
    setValueByPath(toObject, ["responseModalities"], fromResponseModalities);
  }
  const fromResponseSchema = getValueByPath(fromObject, [
    "responseSchema"
  ]);
  if (fromResponseSchema != null) {
    setValueByPath(toObject, ["responseSchema"], fromResponseSchema);
  }
  const fromRoutingConfig = getValueByPath(fromObject, [
    "routingConfig"
  ]);
  if (fromRoutingConfig != null) {
    setValueByPath(toObject, ["routingConfig"], fromRoutingConfig);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (fromSeed != null) {
    setValueByPath(toObject, ["seed"], fromSeed);
  }
  const fromSpeechConfig = getValueByPath(fromObject, ["speechConfig"]);
  if (fromSpeechConfig != null) {
    setValueByPath(toObject, ["speechConfig"], fromSpeechConfig);
  }
  const fromStopSequences = getValueByPath(fromObject, [
    "stopSequences"
  ]);
  if (fromStopSequences != null) {
    setValueByPath(toObject, ["stopSequences"], fromStopSequences);
  }
  const fromTemperature = getValueByPath(fromObject, ["temperature"]);
  if (fromTemperature != null) {
    setValueByPath(toObject, ["temperature"], fromTemperature);
  }
  const fromThinkingConfig = getValueByPath(fromObject, [
    "thinkingConfig"
  ]);
  if (fromThinkingConfig != null) {
    setValueByPath(toObject, ["thinkingConfig"], fromThinkingConfig);
  }
  const fromTopK = getValueByPath(fromObject, ["topK"]);
  if (fromTopK != null) {
    setValueByPath(toObject, ["topK"], fromTopK);
  }
  const fromTopP = getValueByPath(fromObject, ["topP"]);
  if (fromTopP != null) {
    setValueByPath(toObject, ["topP"], fromTopP);
  }
  if (getValueByPath(fromObject, ["enableEnhancedCivicAnswers"]) !== void 0) {
    throw new Error("enableEnhancedCivicAnswers parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function googleMapsToMldev$2(fromObject) {
  const toObject = {};
  const fromAuthConfig = getValueByPath(fromObject, ["authConfig"]);
  if (fromAuthConfig != null) {
    setValueByPath(toObject, ["authConfig"], authConfigToMldev$2(fromAuthConfig));
  }
  const fromEnableWidget = getValueByPath(fromObject, ["enableWidget"]);
  if (fromEnableWidget != null) {
    setValueByPath(toObject, ["enableWidget"], fromEnableWidget);
  }
  return toObject;
}
function googleSearchToMldev$2(fromObject) {
  const toObject = {};
  const fromSearchTypes = getValueByPath(fromObject, ["searchTypes"]);
  if (fromSearchTypes != null) {
    setValueByPath(toObject, ["searchTypes"], fromSearchTypes);
  }
  if (getValueByPath(fromObject, ["blockingConfidence"]) !== void 0) {
    throw new Error("blockingConfidence parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["excludeDomains"]) !== void 0) {
    throw new Error("excludeDomains parameter is not supported in Gemini API.");
  }
  const fromTimeRangeFilter = getValueByPath(fromObject, [
    "timeRangeFilter"
  ]);
  if (fromTimeRangeFilter != null) {
    setValueByPath(toObject, ["timeRangeFilter"], fromTimeRangeFilter);
  }
  return toObject;
}
function liveConnectConfigToMldev$1(fromObject, parentObject) {
  const toObject = {};
  const fromGenerationConfig = getValueByPath(fromObject, [
    "generationConfig"
  ]);
  if (parentObject !== void 0 && fromGenerationConfig != null) {
    setValueByPath(parentObject, ["setup", "generationConfig"], fromGenerationConfig);
  }
  const fromResponseModalities = getValueByPath(fromObject, [
    "responseModalities"
  ]);
  if (parentObject !== void 0 && fromResponseModalities != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "responseModalities"], fromResponseModalities);
  }
  const fromTemperature = getValueByPath(fromObject, ["temperature"]);
  if (parentObject !== void 0 && fromTemperature != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "temperature"], fromTemperature);
  }
  const fromTopP = getValueByPath(fromObject, ["topP"]);
  if (parentObject !== void 0 && fromTopP != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "topP"], fromTopP);
  }
  const fromTopK = getValueByPath(fromObject, ["topK"]);
  if (parentObject !== void 0 && fromTopK != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "topK"], fromTopK);
  }
  const fromMaxOutputTokens = getValueByPath(fromObject, [
    "maxOutputTokens"
  ]);
  if (parentObject !== void 0 && fromMaxOutputTokens != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "maxOutputTokens"], fromMaxOutputTokens);
  }
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (parentObject !== void 0 && fromMediaResolution != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "mediaResolution"], fromMediaResolution);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (parentObject !== void 0 && fromSeed != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "seed"], fromSeed);
  }
  const fromSpeechConfig = getValueByPath(fromObject, ["speechConfig"]);
  if (parentObject !== void 0 && fromSpeechConfig != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "speechConfig"], tLiveSpeechConfig(fromSpeechConfig));
  }
  const fromThinkingConfig = getValueByPath(fromObject, [
    "thinkingConfig"
  ]);
  if (parentObject !== void 0 && fromThinkingConfig != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "thinkingConfig"], fromThinkingConfig);
  }
  const fromEnableAffectiveDialog = getValueByPath(fromObject, [
    "enableAffectiveDialog"
  ]);
  if (parentObject !== void 0 && fromEnableAffectiveDialog != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "enableAffectiveDialog"], fromEnableAffectiveDialog);
  }
  const fromSystemInstruction = getValueByPath(fromObject, [
    "systemInstruction"
  ]);
  if (parentObject !== void 0 && fromSystemInstruction != null) {
    setValueByPath(parentObject, ["setup", "systemInstruction"], contentToMldev$2(tContent(fromSystemInstruction)));
  }
  const fromTools = getValueByPath(fromObject, ["tools"]);
  if (parentObject !== void 0 && fromTools != null) {
    let transformedList = tTools(fromTools);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return toolToMldev$2(tTool(item));
      });
    }
    setValueByPath(parentObject, ["setup", "tools"], transformedList);
  }
  const fromSessionResumption = getValueByPath(fromObject, [
    "sessionResumption"
  ]);
  if (parentObject !== void 0 && fromSessionResumption != null) {
    setValueByPath(parentObject, ["setup", "sessionResumption"], sessionResumptionConfigToMldev$1(fromSessionResumption));
  }
  const fromInputAudioTranscription = getValueByPath(fromObject, [
    "inputAudioTranscription"
  ]);
  if (parentObject !== void 0 && fromInputAudioTranscription != null) {
    setValueByPath(parentObject, ["setup", "inputAudioTranscription"], audioTranscriptionConfigToMldev$1(fromInputAudioTranscription));
  }
  const fromOutputAudioTranscription = getValueByPath(fromObject, [
    "outputAudioTranscription"
  ]);
  if (parentObject !== void 0 && fromOutputAudioTranscription != null) {
    setValueByPath(parentObject, ["setup", "outputAudioTranscription"], audioTranscriptionConfigToMldev$1(fromOutputAudioTranscription));
  }
  const fromRealtimeInputConfig = getValueByPath(fromObject, [
    "realtimeInputConfig"
  ]);
  if (parentObject !== void 0 && fromRealtimeInputConfig != null) {
    setValueByPath(parentObject, ["setup", "realtimeInputConfig"], fromRealtimeInputConfig);
  }
  const fromContextWindowCompression = getValueByPath(fromObject, [
    "contextWindowCompression"
  ]);
  if (parentObject !== void 0 && fromContextWindowCompression != null) {
    setValueByPath(parentObject, ["setup", "contextWindowCompression"], fromContextWindowCompression);
  }
  const fromProactivity = getValueByPath(fromObject, ["proactivity"]);
  if (parentObject !== void 0 && fromProactivity != null) {
    setValueByPath(parentObject, ["setup", "proactivity"], fromProactivity);
  }
  if (getValueByPath(fromObject, ["explicitVadSignal"]) !== void 0) {
    throw new Error("explicitVadSignal parameter is not supported in Gemini API.");
  }
  return toObject;
}
function liveConnectConfigToVertex(fromObject, parentObject) {
  const toObject = {};
  const fromGenerationConfig = getValueByPath(fromObject, [
    "generationConfig"
  ]);
  if (parentObject !== void 0 && fromGenerationConfig != null) {
    setValueByPath(parentObject, ["setup", "generationConfig"], generationConfigToVertex$1(fromGenerationConfig));
  }
  const fromResponseModalities = getValueByPath(fromObject, [
    "responseModalities"
  ]);
  if (parentObject !== void 0 && fromResponseModalities != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "responseModalities"], fromResponseModalities);
  }
  const fromTemperature = getValueByPath(fromObject, ["temperature"]);
  if (parentObject !== void 0 && fromTemperature != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "temperature"], fromTemperature);
  }
  const fromTopP = getValueByPath(fromObject, ["topP"]);
  if (parentObject !== void 0 && fromTopP != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "topP"], fromTopP);
  }
  const fromTopK = getValueByPath(fromObject, ["topK"]);
  if (parentObject !== void 0 && fromTopK != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "topK"], fromTopK);
  }
  const fromMaxOutputTokens = getValueByPath(fromObject, [
    "maxOutputTokens"
  ]);
  if (parentObject !== void 0 && fromMaxOutputTokens != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "maxOutputTokens"], fromMaxOutputTokens);
  }
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (parentObject !== void 0 && fromMediaResolution != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "mediaResolution"], fromMediaResolution);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (parentObject !== void 0 && fromSeed != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "seed"], fromSeed);
  }
  const fromSpeechConfig = getValueByPath(fromObject, ["speechConfig"]);
  if (parentObject !== void 0 && fromSpeechConfig != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "speechConfig"], tLiveSpeechConfig(fromSpeechConfig));
  }
  const fromThinkingConfig = getValueByPath(fromObject, [
    "thinkingConfig"
  ]);
  if (parentObject !== void 0 && fromThinkingConfig != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "thinkingConfig"], fromThinkingConfig);
  }
  const fromEnableAffectiveDialog = getValueByPath(fromObject, [
    "enableAffectiveDialog"
  ]);
  if (parentObject !== void 0 && fromEnableAffectiveDialog != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "enableAffectiveDialog"], fromEnableAffectiveDialog);
  }
  const fromSystemInstruction = getValueByPath(fromObject, [
    "systemInstruction"
  ]);
  if (parentObject !== void 0 && fromSystemInstruction != null) {
    setValueByPath(parentObject, ["setup", "systemInstruction"], contentToVertex$1(tContent(fromSystemInstruction)));
  }
  const fromTools = getValueByPath(fromObject, ["tools"]);
  if (parentObject !== void 0 && fromTools != null) {
    let transformedList = tTools(fromTools);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return toolToVertex$1(tTool(item));
      });
    }
    setValueByPath(parentObject, ["setup", "tools"], transformedList);
  }
  const fromSessionResumption = getValueByPath(fromObject, [
    "sessionResumption"
  ]);
  if (parentObject !== void 0 && fromSessionResumption != null) {
    setValueByPath(parentObject, ["setup", "sessionResumption"], fromSessionResumption);
  }
  const fromInputAudioTranscription = getValueByPath(fromObject, [
    "inputAudioTranscription"
  ]);
  if (parentObject !== void 0 && fromInputAudioTranscription != null) {
    setValueByPath(parentObject, ["setup", "inputAudioTranscription"], fromInputAudioTranscription);
  }
  const fromOutputAudioTranscription = getValueByPath(fromObject, [
    "outputAudioTranscription"
  ]);
  if (parentObject !== void 0 && fromOutputAudioTranscription != null) {
    setValueByPath(parentObject, ["setup", "outputAudioTranscription"], fromOutputAudioTranscription);
  }
  const fromRealtimeInputConfig = getValueByPath(fromObject, [
    "realtimeInputConfig"
  ]);
  if (parentObject !== void 0 && fromRealtimeInputConfig != null) {
    setValueByPath(parentObject, ["setup", "realtimeInputConfig"], fromRealtimeInputConfig);
  }
  const fromContextWindowCompression = getValueByPath(fromObject, [
    "contextWindowCompression"
  ]);
  if (parentObject !== void 0 && fromContextWindowCompression != null) {
    setValueByPath(parentObject, ["setup", "contextWindowCompression"], fromContextWindowCompression);
  }
  const fromProactivity = getValueByPath(fromObject, ["proactivity"]);
  if (parentObject !== void 0 && fromProactivity != null) {
    setValueByPath(parentObject, ["setup", "proactivity"], fromProactivity);
  }
  const fromExplicitVadSignal = getValueByPath(fromObject, [
    "explicitVadSignal"
  ]);
  if (parentObject !== void 0 && fromExplicitVadSignal != null) {
    setValueByPath(parentObject, ["setup", "explicitVadSignal"], fromExplicitVadSignal);
  }
  return toObject;
}
function liveConnectParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["setup", "model"], tModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], liveConnectConfigToMldev$1(fromConfig, toObject));
  }
  return toObject;
}
function liveConnectParametersToVertex(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["setup", "model"], tModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], liveConnectConfigToVertex(fromConfig, toObject));
  }
  return toObject;
}
function liveMusicSetConfigParametersToMldev(fromObject) {
  const toObject = {};
  const fromMusicGenerationConfig = getValueByPath(fromObject, [
    "musicGenerationConfig"
  ]);
  if (fromMusicGenerationConfig != null) {
    setValueByPath(toObject, ["musicGenerationConfig"], fromMusicGenerationConfig);
  }
  return toObject;
}
function liveMusicSetWeightedPromptsParametersToMldev(fromObject) {
  const toObject = {};
  const fromWeightedPrompts = getValueByPath(fromObject, [
    "weightedPrompts"
  ]);
  if (fromWeightedPrompts != null) {
    let transformedList = fromWeightedPrompts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["weightedPrompts"], transformedList);
  }
  return toObject;
}
function liveSendRealtimeInputParametersToMldev(fromObject) {
  const toObject = {};
  const fromMedia = getValueByPath(fromObject, ["media"]);
  if (fromMedia != null) {
    let transformedList = tBlobs(fromMedia);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return blobToMldev$2(item);
      });
    }
    setValueByPath(toObject, ["mediaChunks"], transformedList);
  }
  const fromAudio = getValueByPath(fromObject, ["audio"]);
  if (fromAudio != null) {
    setValueByPath(toObject, ["audio"], blobToMldev$2(tAudioBlob(fromAudio)));
  }
  const fromAudioStreamEnd = getValueByPath(fromObject, [
    "audioStreamEnd"
  ]);
  if (fromAudioStreamEnd != null) {
    setValueByPath(toObject, ["audioStreamEnd"], fromAudioStreamEnd);
  }
  const fromVideo = getValueByPath(fromObject, ["video"]);
  if (fromVideo != null) {
    setValueByPath(toObject, ["video"], blobToMldev$2(tImageBlob(fromVideo)));
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  const fromActivityStart = getValueByPath(fromObject, [
    "activityStart"
  ]);
  if (fromActivityStart != null) {
    setValueByPath(toObject, ["activityStart"], fromActivityStart);
  }
  const fromActivityEnd = getValueByPath(fromObject, ["activityEnd"]);
  if (fromActivityEnd != null) {
    setValueByPath(toObject, ["activityEnd"], fromActivityEnd);
  }
  return toObject;
}
function liveSendRealtimeInputParametersToVertex(fromObject) {
  const toObject = {};
  const fromMedia = getValueByPath(fromObject, ["media"]);
  if (fromMedia != null) {
    let transformedList = tBlobs(fromMedia);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["mediaChunks"], transformedList);
  }
  const fromAudio = getValueByPath(fromObject, ["audio"]);
  if (fromAudio != null) {
    setValueByPath(toObject, ["audio"], tAudioBlob(fromAudio));
  }
  const fromAudioStreamEnd = getValueByPath(fromObject, [
    "audioStreamEnd"
  ]);
  if (fromAudioStreamEnd != null) {
    setValueByPath(toObject, ["audioStreamEnd"], fromAudioStreamEnd);
  }
  const fromVideo = getValueByPath(fromObject, ["video"]);
  if (fromVideo != null) {
    setValueByPath(toObject, ["video"], tImageBlob(fromVideo));
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  const fromActivityStart = getValueByPath(fromObject, [
    "activityStart"
  ]);
  if (fromActivityStart != null) {
    setValueByPath(toObject, ["activityStart"], fromActivityStart);
  }
  const fromActivityEnd = getValueByPath(fromObject, ["activityEnd"]);
  if (fromActivityEnd != null) {
    setValueByPath(toObject, ["activityEnd"], fromActivityEnd);
  }
  return toObject;
}
function liveServerMessageFromVertex(fromObject) {
  const toObject = {};
  const fromSetupComplete = getValueByPath(fromObject, [
    "setupComplete"
  ]);
  if (fromSetupComplete != null) {
    setValueByPath(toObject, ["setupComplete"], fromSetupComplete);
  }
  const fromServerContent = getValueByPath(fromObject, [
    "serverContent"
  ]);
  if (fromServerContent != null) {
    setValueByPath(toObject, ["serverContent"], fromServerContent);
  }
  const fromToolCall = getValueByPath(fromObject, ["toolCall"]);
  if (fromToolCall != null) {
    setValueByPath(toObject, ["toolCall"], fromToolCall);
  }
  const fromToolCallCancellation = getValueByPath(fromObject, [
    "toolCallCancellation"
  ]);
  if (fromToolCallCancellation != null) {
    setValueByPath(toObject, ["toolCallCancellation"], fromToolCallCancellation);
  }
  const fromUsageMetadata = getValueByPath(fromObject, [
    "usageMetadata"
  ]);
  if (fromUsageMetadata != null) {
    setValueByPath(toObject, ["usageMetadata"], usageMetadataFromVertex(fromUsageMetadata));
  }
  const fromGoAway = getValueByPath(fromObject, ["goAway"]);
  if (fromGoAway != null) {
    setValueByPath(toObject, ["goAway"], fromGoAway);
  }
  const fromSessionResumptionUpdate = getValueByPath(fromObject, [
    "sessionResumptionUpdate"
  ]);
  if (fromSessionResumptionUpdate != null) {
    setValueByPath(toObject, ["sessionResumptionUpdate"], fromSessionResumptionUpdate);
  }
  const fromVoiceActivityDetectionSignal = getValueByPath(fromObject, [
    "voiceActivityDetectionSignal"
  ]);
  if (fromVoiceActivityDetectionSignal != null) {
    setValueByPath(toObject, ["voiceActivityDetectionSignal"], fromVoiceActivityDetectionSignal);
  }
  const fromVoiceActivity = getValueByPath(fromObject, [
    "voiceActivity"
  ]);
  if (fromVoiceActivity != null) {
    setValueByPath(toObject, ["voiceActivity"], voiceActivityFromVertex(fromVoiceActivity));
  }
  return toObject;
}
function partToMldev$2(fromObject) {
  const toObject = {};
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (fromMediaResolution != null) {
    setValueByPath(toObject, ["mediaResolution"], fromMediaResolution);
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fileDataToMldev$2(fromFileData));
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], functionCallToMldev$2(fromFunctionCall));
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], blobToMldev$2(fromInlineData));
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromThoughtSignature = getValueByPath(fromObject, [
    "thoughtSignature"
  ]);
  if (fromThoughtSignature != null) {
    setValueByPath(toObject, ["thoughtSignature"], fromThoughtSignature);
  }
  const fromVideoMetadata = getValueByPath(fromObject, [
    "videoMetadata"
  ]);
  if (fromVideoMetadata != null) {
    setValueByPath(toObject, ["videoMetadata"], fromVideoMetadata);
  }
  const fromToolCall = getValueByPath(fromObject, ["toolCall"]);
  if (fromToolCall != null) {
    setValueByPath(toObject, ["toolCall"], fromToolCall);
  }
  const fromToolResponse = getValueByPath(fromObject, ["toolResponse"]);
  if (fromToolResponse != null) {
    setValueByPath(toObject, ["toolResponse"], fromToolResponse);
  }
  return toObject;
}
function partToVertex$1(fromObject) {
  const toObject = {};
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (fromMediaResolution != null) {
    setValueByPath(toObject, ["mediaResolution"], fromMediaResolution);
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fromFileData);
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], fromFunctionCall);
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], fromInlineData);
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromThoughtSignature = getValueByPath(fromObject, [
    "thoughtSignature"
  ]);
  if (fromThoughtSignature != null) {
    setValueByPath(toObject, ["thoughtSignature"], fromThoughtSignature);
  }
  const fromVideoMetadata = getValueByPath(fromObject, [
    "videoMetadata"
  ]);
  if (fromVideoMetadata != null) {
    setValueByPath(toObject, ["videoMetadata"], fromVideoMetadata);
  }
  if (getValueByPath(fromObject, ["toolCall"]) !== void 0) {
    throw new Error("toolCall parameter is not supported in Vertex AI.");
  }
  if (getValueByPath(fromObject, ["toolResponse"]) !== void 0) {
    throw new Error("toolResponse parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function sessionResumptionConfigToMldev$1(fromObject) {
  const toObject = {};
  const fromHandle = getValueByPath(fromObject, ["handle"]);
  if (fromHandle != null) {
    setValueByPath(toObject, ["handle"], fromHandle);
  }
  if (getValueByPath(fromObject, ["transparent"]) !== void 0) {
    throw new Error("transparent parameter is not supported in Gemini API.");
  }
  return toObject;
}
function toolToMldev$2(fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["retrieval"]) !== void 0) {
    throw new Error("retrieval parameter is not supported in Gemini API.");
  }
  const fromComputerUse = getValueByPath(fromObject, ["computerUse"]);
  if (fromComputerUse != null) {
    setValueByPath(toObject, ["computerUse"], fromComputerUse);
  }
  const fromFileSearch = getValueByPath(fromObject, ["fileSearch"]);
  if (fromFileSearch != null) {
    setValueByPath(toObject, ["fileSearch"], fromFileSearch);
  }
  const fromGoogleSearch = getValueByPath(fromObject, ["googleSearch"]);
  if (fromGoogleSearch != null) {
    setValueByPath(toObject, ["googleSearch"], googleSearchToMldev$2(fromGoogleSearch));
  }
  const fromGoogleMaps = getValueByPath(fromObject, ["googleMaps"]);
  if (fromGoogleMaps != null) {
    setValueByPath(toObject, ["googleMaps"], googleMapsToMldev$2(fromGoogleMaps));
  }
  const fromCodeExecution = getValueByPath(fromObject, [
    "codeExecution"
  ]);
  if (fromCodeExecution != null) {
    setValueByPath(toObject, ["codeExecution"], fromCodeExecution);
  }
  if (getValueByPath(fromObject, ["enterpriseWebSearch"]) !== void 0) {
    throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  }
  const fromFunctionDeclarations = getValueByPath(fromObject, [
    "functionDeclarations"
  ]);
  if (fromFunctionDeclarations != null) {
    let transformedList = fromFunctionDeclarations;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["functionDeclarations"], transformedList);
  }
  const fromGoogleSearchRetrieval = getValueByPath(fromObject, [
    "googleSearchRetrieval"
  ]);
  if (fromGoogleSearchRetrieval != null) {
    setValueByPath(toObject, ["googleSearchRetrieval"], fromGoogleSearchRetrieval);
  }
  if (getValueByPath(fromObject, ["parallelAiSearch"]) !== void 0) {
    throw new Error("parallelAiSearch parameter is not supported in Gemini API.");
  }
  const fromUrlContext = getValueByPath(fromObject, ["urlContext"]);
  if (fromUrlContext != null) {
    setValueByPath(toObject, ["urlContext"], fromUrlContext);
  }
  const fromMcpServers = getValueByPath(fromObject, ["mcpServers"]);
  if (fromMcpServers != null) {
    let transformedList = fromMcpServers;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["mcpServers"], transformedList);
  }
  return toObject;
}
function toolToVertex$1(fromObject) {
  const toObject = {};
  const fromRetrieval = getValueByPath(fromObject, ["retrieval"]);
  if (fromRetrieval != null) {
    setValueByPath(toObject, ["retrieval"], fromRetrieval);
  }
  const fromComputerUse = getValueByPath(fromObject, ["computerUse"]);
  if (fromComputerUse != null) {
    setValueByPath(toObject, ["computerUse"], fromComputerUse);
  }
  if (getValueByPath(fromObject, ["fileSearch"]) !== void 0) {
    throw new Error("fileSearch parameter is not supported in Vertex AI.");
  }
  const fromGoogleSearch = getValueByPath(fromObject, ["googleSearch"]);
  if (fromGoogleSearch != null) {
    setValueByPath(toObject, ["googleSearch"], fromGoogleSearch);
  }
  const fromGoogleMaps = getValueByPath(fromObject, ["googleMaps"]);
  if (fromGoogleMaps != null) {
    setValueByPath(toObject, ["googleMaps"], fromGoogleMaps);
  }
  const fromCodeExecution = getValueByPath(fromObject, [
    "codeExecution"
  ]);
  if (fromCodeExecution != null) {
    setValueByPath(toObject, ["codeExecution"], fromCodeExecution);
  }
  const fromEnterpriseWebSearch = getValueByPath(fromObject, [
    "enterpriseWebSearch"
  ]);
  if (fromEnterpriseWebSearch != null) {
    setValueByPath(toObject, ["enterpriseWebSearch"], fromEnterpriseWebSearch);
  }
  const fromFunctionDeclarations = getValueByPath(fromObject, [
    "functionDeclarations"
  ]);
  if (fromFunctionDeclarations != null) {
    let transformedList = fromFunctionDeclarations;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return functionDeclarationToVertex$1(item);
      });
    }
    setValueByPath(toObject, ["functionDeclarations"], transformedList);
  }
  const fromGoogleSearchRetrieval = getValueByPath(fromObject, [
    "googleSearchRetrieval"
  ]);
  if (fromGoogleSearchRetrieval != null) {
    setValueByPath(toObject, ["googleSearchRetrieval"], fromGoogleSearchRetrieval);
  }
  const fromParallelAiSearch = getValueByPath(fromObject, [
    "parallelAiSearch"
  ]);
  if (fromParallelAiSearch != null) {
    setValueByPath(toObject, ["parallelAiSearch"], fromParallelAiSearch);
  }
  const fromUrlContext = getValueByPath(fromObject, ["urlContext"]);
  if (fromUrlContext != null) {
    setValueByPath(toObject, ["urlContext"], fromUrlContext);
  }
  if (getValueByPath(fromObject, ["mcpServers"]) !== void 0) {
    throw new Error("mcpServers parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function usageMetadataFromVertex(fromObject) {
  const toObject = {};
  const fromPromptTokenCount = getValueByPath(fromObject, [
    "promptTokenCount"
  ]);
  if (fromPromptTokenCount != null) {
    setValueByPath(toObject, ["promptTokenCount"], fromPromptTokenCount);
  }
  const fromCachedContentTokenCount = getValueByPath(fromObject, [
    "cachedContentTokenCount"
  ]);
  if (fromCachedContentTokenCount != null) {
    setValueByPath(toObject, ["cachedContentTokenCount"], fromCachedContentTokenCount);
  }
  const fromResponseTokenCount = getValueByPath(fromObject, [
    "candidatesTokenCount"
  ]);
  if (fromResponseTokenCount != null) {
    setValueByPath(toObject, ["responseTokenCount"], fromResponseTokenCount);
  }
  const fromToolUsePromptTokenCount = getValueByPath(fromObject, [
    "toolUsePromptTokenCount"
  ]);
  if (fromToolUsePromptTokenCount != null) {
    setValueByPath(toObject, ["toolUsePromptTokenCount"], fromToolUsePromptTokenCount);
  }
  const fromThoughtsTokenCount = getValueByPath(fromObject, [
    "thoughtsTokenCount"
  ]);
  if (fromThoughtsTokenCount != null) {
    setValueByPath(toObject, ["thoughtsTokenCount"], fromThoughtsTokenCount);
  }
  const fromTotalTokenCount = getValueByPath(fromObject, [
    "totalTokenCount"
  ]);
  if (fromTotalTokenCount != null) {
    setValueByPath(toObject, ["totalTokenCount"], fromTotalTokenCount);
  }
  const fromPromptTokensDetails = getValueByPath(fromObject, [
    "promptTokensDetails"
  ]);
  if (fromPromptTokensDetails != null) {
    let transformedList = fromPromptTokensDetails;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["promptTokensDetails"], transformedList);
  }
  const fromCacheTokensDetails = getValueByPath(fromObject, [
    "cacheTokensDetails"
  ]);
  if (fromCacheTokensDetails != null) {
    let transformedList = fromCacheTokensDetails;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["cacheTokensDetails"], transformedList);
  }
  const fromResponseTokensDetails = getValueByPath(fromObject, [
    "candidatesTokensDetails"
  ]);
  if (fromResponseTokensDetails != null) {
    let transformedList = fromResponseTokensDetails;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["responseTokensDetails"], transformedList);
  }
  const fromToolUsePromptTokensDetails = getValueByPath(fromObject, [
    "toolUsePromptTokensDetails"
  ]);
  if (fromToolUsePromptTokensDetails != null) {
    let transformedList = fromToolUsePromptTokensDetails;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["toolUsePromptTokensDetails"], transformedList);
  }
  const fromTrafficType = getValueByPath(fromObject, ["trafficType"]);
  if (fromTrafficType != null) {
    setValueByPath(toObject, ["trafficType"], fromTrafficType);
  }
  return toObject;
}
function voiceActivityFromVertex(fromObject) {
  const toObject = {};
  const fromVoiceActivityType = getValueByPath(fromObject, ["type"]);
  if (fromVoiceActivityType != null) {
    setValueByPath(toObject, ["voiceActivityType"], fromVoiceActivityType);
  }
  return toObject;
}
function authConfigToMldev$1(fromObject, _rootObject) {
  const toObject = {};
  const fromApiKey = getValueByPath(fromObject, ["apiKey"]);
  if (fromApiKey != null) {
    setValueByPath(toObject, ["apiKey"], fromApiKey);
  }
  if (getValueByPath(fromObject, ["apiKeyConfig"]) !== void 0) {
    throw new Error("apiKeyConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["authType"]) !== void 0) {
    throw new Error("authType parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["googleServiceAccountConfig"]) !== void 0) {
    throw new Error("googleServiceAccountConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["httpBasicAuthConfig"]) !== void 0) {
    throw new Error("httpBasicAuthConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["oauthConfig"]) !== void 0) {
    throw new Error("oauthConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["oidcConfig"]) !== void 0) {
    throw new Error("oidcConfig parameter is not supported in Gemini API.");
  }
  return toObject;
}
function blobToMldev$1(fromObject, _rootObject) {
  const toObject = {};
  const fromData = getValueByPath(fromObject, ["data"]);
  if (fromData != null) {
    setValueByPath(toObject, ["data"], fromData);
  }
  if (getValueByPath(fromObject, ["displayName"]) !== void 0) {
    throw new Error("displayName parameter is not supported in Gemini API.");
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function candidateFromMldev(fromObject, rootObject) {
  const toObject = {};
  const fromContent = getValueByPath(fromObject, ["content"]);
  if (fromContent != null) {
    setValueByPath(toObject, ["content"], fromContent);
  }
  const fromCitationMetadata = getValueByPath(fromObject, [
    "citationMetadata"
  ]);
  if (fromCitationMetadata != null) {
    setValueByPath(toObject, ["citationMetadata"], citationMetadataFromMldev(fromCitationMetadata));
  }
  const fromTokenCount = getValueByPath(fromObject, ["tokenCount"]);
  if (fromTokenCount != null) {
    setValueByPath(toObject, ["tokenCount"], fromTokenCount);
  }
  const fromFinishReason = getValueByPath(fromObject, ["finishReason"]);
  if (fromFinishReason != null) {
    setValueByPath(toObject, ["finishReason"], fromFinishReason);
  }
  const fromGroundingMetadata = getValueByPath(fromObject, [
    "groundingMetadata"
  ]);
  if (fromGroundingMetadata != null) {
    setValueByPath(toObject, ["groundingMetadata"], fromGroundingMetadata);
  }
  const fromAvgLogprobs = getValueByPath(fromObject, ["avgLogprobs"]);
  if (fromAvgLogprobs != null) {
    setValueByPath(toObject, ["avgLogprobs"], fromAvgLogprobs);
  }
  const fromIndex = getValueByPath(fromObject, ["index"]);
  if (fromIndex != null) {
    setValueByPath(toObject, ["index"], fromIndex);
  }
  const fromLogprobsResult = getValueByPath(fromObject, [
    "logprobsResult"
  ]);
  if (fromLogprobsResult != null) {
    setValueByPath(toObject, ["logprobsResult"], fromLogprobsResult);
  }
  const fromSafetyRatings = getValueByPath(fromObject, [
    "safetyRatings"
  ]);
  if (fromSafetyRatings != null) {
    let transformedList = fromSafetyRatings;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["safetyRatings"], transformedList);
  }
  const fromUrlContextMetadata = getValueByPath(fromObject, [
    "urlContextMetadata"
  ]);
  if (fromUrlContextMetadata != null) {
    setValueByPath(toObject, ["urlContextMetadata"], fromUrlContextMetadata);
  }
  return toObject;
}
function citationMetadataFromMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromCitations = getValueByPath(fromObject, ["citationSources"]);
  if (fromCitations != null) {
    let transformedList = fromCitations;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["citations"], transformedList);
  }
  return toObject;
}
function computeTokensParametersToVertex(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (fromContents != null) {
    let transformedList = tContents(fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentToVertex(item);
      });
    }
    setValueByPath(toObject, ["contents"], transformedList);
  }
  return toObject;
}
function computeTokensResponseFromVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromTokensInfo = getValueByPath(fromObject, ["tokensInfo"]);
  if (fromTokensInfo != null) {
    let transformedList = fromTokensInfo;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["tokensInfo"], transformedList);
  }
  return toObject;
}
function contentEmbeddingFromVertex(fromObject, rootObject) {
  const toObject = {};
  const fromValues = getValueByPath(fromObject, ["values"]);
  if (fromValues != null) {
    setValueByPath(toObject, ["values"], fromValues);
  }
  const fromStatistics = getValueByPath(fromObject, ["statistics"]);
  if (fromStatistics != null) {
    setValueByPath(toObject, ["statistics"], contentEmbeddingStatisticsFromVertex(fromStatistics));
  }
  return toObject;
}
function contentEmbeddingStatisticsFromVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromTruncated = getValueByPath(fromObject, ["truncated"]);
  if (fromTruncated != null) {
    setValueByPath(toObject, ["truncated"], fromTruncated);
  }
  const fromTokenCount = getValueByPath(fromObject, ["token_count"]);
  if (fromTokenCount != null) {
    setValueByPath(toObject, ["tokenCount"], fromTokenCount);
  }
  return toObject;
}
function contentToMldev$1(fromObject, rootObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partToMldev$1(item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function contentToVertex(fromObject, rootObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partToVertex(item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function controlReferenceConfigToVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromControlType = getValueByPath(fromObject, ["controlType"]);
  if (fromControlType != null) {
    setValueByPath(toObject, ["controlType"], fromControlType);
  }
  const fromEnableControlImageComputation = getValueByPath(fromObject, [
    "enableControlImageComputation"
  ]);
  if (fromEnableControlImageComputation != null) {
    setValueByPath(toObject, ["computeControl"], fromEnableControlImageComputation);
  }
  return toObject;
}
function countTokensConfigToMldev(fromObject, _rootObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["systemInstruction"]) !== void 0) {
    throw new Error("systemInstruction parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["tools"]) !== void 0) {
    throw new Error("tools parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["generationConfig"]) !== void 0) {
    throw new Error("generationConfig parameter is not supported in Gemini API.");
  }
  return toObject;
}
function countTokensConfigToVertex(fromObject, parentObject, rootObject) {
  const toObject = {};
  const fromSystemInstruction = getValueByPath(fromObject, [
    "systemInstruction"
  ]);
  if (parentObject !== void 0 && fromSystemInstruction != null) {
    setValueByPath(parentObject, ["systemInstruction"], contentToVertex(tContent(fromSystemInstruction)));
  }
  const fromTools = getValueByPath(fromObject, ["tools"]);
  if (parentObject !== void 0 && fromTools != null) {
    let transformedList = fromTools;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return toolToVertex(item);
      });
    }
    setValueByPath(parentObject, ["tools"], transformedList);
  }
  const fromGenerationConfig = getValueByPath(fromObject, [
    "generationConfig"
  ]);
  if (parentObject !== void 0 && fromGenerationConfig != null) {
    setValueByPath(parentObject, ["generationConfig"], generationConfigToVertex(fromGenerationConfig));
  }
  return toObject;
}
function countTokensParametersToMldev(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (fromContents != null) {
    let transformedList = tContents(fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentToMldev$1(item);
      });
    }
    setValueByPath(toObject, ["contents"], transformedList);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    countTokensConfigToMldev(fromConfig);
  }
  return toObject;
}
function countTokensParametersToVertex(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (fromContents != null) {
    let transformedList = tContents(fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentToVertex(item);
      });
    }
    setValueByPath(toObject, ["contents"], transformedList);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    countTokensConfigToVertex(fromConfig, toObject);
  }
  return toObject;
}
function countTokensResponseFromMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromTotalTokens = getValueByPath(fromObject, ["totalTokens"]);
  if (fromTotalTokens != null) {
    setValueByPath(toObject, ["totalTokens"], fromTotalTokens);
  }
  const fromCachedContentTokenCount = getValueByPath(fromObject, [
    "cachedContentTokenCount"
  ]);
  if (fromCachedContentTokenCount != null) {
    setValueByPath(toObject, ["cachedContentTokenCount"], fromCachedContentTokenCount);
  }
  return toObject;
}
function countTokensResponseFromVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromTotalTokens = getValueByPath(fromObject, ["totalTokens"]);
  if (fromTotalTokens != null) {
    setValueByPath(toObject, ["totalTokens"], fromTotalTokens);
  }
  return toObject;
}
function deleteModelParametersToMldev(apiClient, fromObject, _rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "name"], tModel(apiClient, fromModel));
  }
  return toObject;
}
function deleteModelParametersToVertex(apiClient, fromObject, _rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "name"], tModel(apiClient, fromModel));
  }
  return toObject;
}
function deleteModelResponseFromMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  return toObject;
}
function deleteModelResponseFromVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  return toObject;
}
function editImageConfigToVertex(fromObject, parentObject, _rootObject) {
  const toObject = {};
  const fromOutputGcsUri = getValueByPath(fromObject, ["outputGcsUri"]);
  if (parentObject !== void 0 && fromOutputGcsUri != null) {
    setValueByPath(parentObject, ["parameters", "storageUri"], fromOutputGcsUri);
  }
  const fromNegativePrompt = getValueByPath(fromObject, [
    "negativePrompt"
  ]);
  if (parentObject !== void 0 && fromNegativePrompt != null) {
    setValueByPath(parentObject, ["parameters", "negativePrompt"], fromNegativePrompt);
  }
  const fromNumberOfImages = getValueByPath(fromObject, [
    "numberOfImages"
  ]);
  if (parentObject !== void 0 && fromNumberOfImages != null) {
    setValueByPath(parentObject, ["parameters", "sampleCount"], fromNumberOfImages);
  }
  const fromAspectRatio = getValueByPath(fromObject, ["aspectRatio"]);
  if (parentObject !== void 0 && fromAspectRatio != null) {
    setValueByPath(parentObject, ["parameters", "aspectRatio"], fromAspectRatio);
  }
  const fromGuidanceScale = getValueByPath(fromObject, [
    "guidanceScale"
  ]);
  if (parentObject !== void 0 && fromGuidanceScale != null) {
    setValueByPath(parentObject, ["parameters", "guidanceScale"], fromGuidanceScale);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (parentObject !== void 0 && fromSeed != null) {
    setValueByPath(parentObject, ["parameters", "seed"], fromSeed);
  }
  const fromSafetyFilterLevel = getValueByPath(fromObject, [
    "safetyFilterLevel"
  ]);
  if (parentObject !== void 0 && fromSafetyFilterLevel != null) {
    setValueByPath(parentObject, ["parameters", "safetySetting"], fromSafetyFilterLevel);
  }
  const fromPersonGeneration = getValueByPath(fromObject, [
    "personGeneration"
  ]);
  if (parentObject !== void 0 && fromPersonGeneration != null) {
    setValueByPath(parentObject, ["parameters", "personGeneration"], fromPersonGeneration);
  }
  const fromIncludeSafetyAttributes = getValueByPath(fromObject, [
    "includeSafetyAttributes"
  ]);
  if (parentObject !== void 0 && fromIncludeSafetyAttributes != null) {
    setValueByPath(parentObject, ["parameters", "includeSafetyAttributes"], fromIncludeSafetyAttributes);
  }
  const fromIncludeRaiReason = getValueByPath(fromObject, [
    "includeRaiReason"
  ]);
  if (parentObject !== void 0 && fromIncludeRaiReason != null) {
    setValueByPath(parentObject, ["parameters", "includeRaiReason"], fromIncludeRaiReason);
  }
  const fromLanguage = getValueByPath(fromObject, ["language"]);
  if (parentObject !== void 0 && fromLanguage != null) {
    setValueByPath(parentObject, ["parameters", "language"], fromLanguage);
  }
  const fromOutputMimeType = getValueByPath(fromObject, [
    "outputMimeType"
  ]);
  if (parentObject !== void 0 && fromOutputMimeType != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "mimeType"], fromOutputMimeType);
  }
  const fromOutputCompressionQuality = getValueByPath(fromObject, [
    "outputCompressionQuality"
  ]);
  if (parentObject !== void 0 && fromOutputCompressionQuality != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "compressionQuality"], fromOutputCompressionQuality);
  }
  const fromAddWatermark = getValueByPath(fromObject, ["addWatermark"]);
  if (parentObject !== void 0 && fromAddWatermark != null) {
    setValueByPath(parentObject, ["parameters", "addWatermark"], fromAddWatermark);
  }
  const fromLabels = getValueByPath(fromObject, ["labels"]);
  if (parentObject !== void 0 && fromLabels != null) {
    setValueByPath(parentObject, ["labels"], fromLabels);
  }
  const fromEditMode = getValueByPath(fromObject, ["editMode"]);
  if (parentObject !== void 0 && fromEditMode != null) {
    setValueByPath(parentObject, ["parameters", "editMode"], fromEditMode);
  }
  const fromBaseSteps = getValueByPath(fromObject, ["baseSteps"]);
  if (parentObject !== void 0 && fromBaseSteps != null) {
    setValueByPath(parentObject, ["parameters", "editConfig", "baseSteps"], fromBaseSteps);
  }
  return toObject;
}
function editImageParametersInternalToVertex(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromPrompt = getValueByPath(fromObject, ["prompt"]);
  if (fromPrompt != null) {
    setValueByPath(toObject, ["instances[0]", "prompt"], fromPrompt);
  }
  const fromReferenceImages = getValueByPath(fromObject, [
    "referenceImages"
  ]);
  if (fromReferenceImages != null) {
    let transformedList = fromReferenceImages;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return referenceImageAPIInternalToVertex(item);
      });
    }
    setValueByPath(toObject, ["instances[0]", "referenceImages"], transformedList);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    editImageConfigToVertex(fromConfig, toObject);
  }
  return toObject;
}
function editImageResponseFromVertex(fromObject, rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromGeneratedImages = getValueByPath(fromObject, [
    "predictions"
  ]);
  if (fromGeneratedImages != null) {
    let transformedList = fromGeneratedImages;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedImageFromVertex(item);
      });
    }
    setValueByPath(toObject, ["generatedImages"], transformedList);
  }
  return toObject;
}
function embedContentConfigToMldev(fromObject, parentObject, _rootObject) {
  const toObject = {};
  const fromTaskType = getValueByPath(fromObject, ["taskType"]);
  if (parentObject !== void 0 && fromTaskType != null) {
    setValueByPath(parentObject, ["requests[]", "taskType"], fromTaskType);
  }
  const fromTitle = getValueByPath(fromObject, ["title"]);
  if (parentObject !== void 0 && fromTitle != null) {
    setValueByPath(parentObject, ["requests[]", "title"], fromTitle);
  }
  const fromOutputDimensionality = getValueByPath(fromObject, [
    "outputDimensionality"
  ]);
  if (parentObject !== void 0 && fromOutputDimensionality != null) {
    setValueByPath(parentObject, ["requests[]", "outputDimensionality"], fromOutputDimensionality);
  }
  if (getValueByPath(fromObject, ["mimeType"]) !== void 0) {
    throw new Error("mimeType parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["autoTruncate"]) !== void 0) {
    throw new Error("autoTruncate parameter is not supported in Gemini API.");
  }
  return toObject;
}
function embedContentConfigToVertex(fromObject, parentObject, rootObject) {
  const toObject = {};
  let discriminatorTaskType = getValueByPath(rootObject, [
    "embeddingApiType"
  ]);
  if (discriminatorTaskType === void 0) {
    discriminatorTaskType = "PREDICT";
  }
  if (discriminatorTaskType === "PREDICT") {
    const fromTaskType = getValueByPath(fromObject, ["taskType"]);
    if (parentObject !== void 0 && fromTaskType != null) {
      setValueByPath(parentObject, ["instances[]", "task_type"], fromTaskType);
    }
  } else if (discriminatorTaskType === "EMBED_CONTENT") {
    const fromTaskType = getValueByPath(fromObject, ["taskType"]);
    if (parentObject !== void 0 && fromTaskType != null) {
      setValueByPath(parentObject, ["taskType"], fromTaskType);
    }
  }
  let discriminatorTitle = getValueByPath(rootObject, [
    "embeddingApiType"
  ]);
  if (discriminatorTitle === void 0) {
    discriminatorTitle = "PREDICT";
  }
  if (discriminatorTitle === "PREDICT") {
    const fromTitle = getValueByPath(fromObject, ["title"]);
    if (parentObject !== void 0 && fromTitle != null) {
      setValueByPath(parentObject, ["instances[]", "title"], fromTitle);
    }
  } else if (discriminatorTitle === "EMBED_CONTENT") {
    const fromTitle = getValueByPath(fromObject, ["title"]);
    if (parentObject !== void 0 && fromTitle != null) {
      setValueByPath(parentObject, ["title"], fromTitle);
    }
  }
  let discriminatorOutputDimensionality = getValueByPath(rootObject, [
    "embeddingApiType"
  ]);
  if (discriminatorOutputDimensionality === void 0) {
    discriminatorOutputDimensionality = "PREDICT";
  }
  if (discriminatorOutputDimensionality === "PREDICT") {
    const fromOutputDimensionality = getValueByPath(fromObject, [
      "outputDimensionality"
    ]);
    if (parentObject !== void 0 && fromOutputDimensionality != null) {
      setValueByPath(parentObject, ["parameters", "outputDimensionality"], fromOutputDimensionality);
    }
  } else if (discriminatorOutputDimensionality === "EMBED_CONTENT") {
    const fromOutputDimensionality = getValueByPath(fromObject, [
      "outputDimensionality"
    ]);
    if (parentObject !== void 0 && fromOutputDimensionality != null) {
      setValueByPath(parentObject, ["outputDimensionality"], fromOutputDimensionality);
    }
  }
  let discriminatorMimeType = getValueByPath(rootObject, [
    "embeddingApiType"
  ]);
  if (discriminatorMimeType === void 0) {
    discriminatorMimeType = "PREDICT";
  }
  if (discriminatorMimeType === "PREDICT") {
    const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
    if (parentObject !== void 0 && fromMimeType != null) {
      setValueByPath(parentObject, ["instances[]", "mimeType"], fromMimeType);
    }
  }
  let discriminatorAutoTruncate = getValueByPath(rootObject, [
    "embeddingApiType"
  ]);
  if (discriminatorAutoTruncate === void 0) {
    discriminatorAutoTruncate = "PREDICT";
  }
  if (discriminatorAutoTruncate === "PREDICT") {
    const fromAutoTruncate = getValueByPath(fromObject, [
      "autoTruncate"
    ]);
    if (parentObject !== void 0 && fromAutoTruncate != null) {
      setValueByPath(parentObject, ["parameters", "autoTruncate"], fromAutoTruncate);
    }
  } else if (discriminatorAutoTruncate === "EMBED_CONTENT") {
    const fromAutoTruncate = getValueByPath(fromObject, [
      "autoTruncate"
    ]);
    if (parentObject !== void 0 && fromAutoTruncate != null) {
      setValueByPath(parentObject, ["autoTruncate"], fromAutoTruncate);
    }
  }
  return toObject;
}
function embedContentParametersPrivateToMldev(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (fromContents != null) {
    let transformedList = tContentsForEmbed(apiClient, fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["requests[]", "content"], transformedList);
  }
  const fromContent = getValueByPath(fromObject, ["content"]);
  if (fromContent != null) {
    contentToMldev$1(tContent(fromContent));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    embedContentConfigToMldev(fromConfig, toObject);
  }
  const fromModelForEmbedContent = getValueByPath(fromObject, ["model"]);
  if (fromModelForEmbedContent !== void 0) {
    setValueByPath(toObject, ["requests[]", "model"], tModel(apiClient, fromModelForEmbedContent));
  }
  return toObject;
}
function embedContentParametersPrivateToVertex(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  let discriminatorContents = getValueByPath(rootObject, [
    "embeddingApiType"
  ]);
  if (discriminatorContents === void 0) {
    discriminatorContents = "PREDICT";
  }
  if (discriminatorContents === "PREDICT") {
    const fromContents = getValueByPath(fromObject, ["contents"]);
    if (fromContents != null) {
      let transformedList = tContentsForEmbed(apiClient, fromContents);
      if (Array.isArray(transformedList)) {
        transformedList = transformedList.map((item) => {
          return item;
        });
      }
      setValueByPath(toObject, ["instances[]", "content"], transformedList);
    }
  }
  let discriminatorContent = getValueByPath(rootObject, [
    "embeddingApiType"
  ]);
  if (discriminatorContent === void 0) {
    discriminatorContent = "PREDICT";
  }
  if (discriminatorContent === "EMBED_CONTENT") {
    const fromContent = getValueByPath(fromObject, ["content"]);
    if (fromContent != null) {
      setValueByPath(toObject, ["content"], contentToVertex(tContent(fromContent)));
    }
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    embedContentConfigToVertex(fromConfig, toObject, rootObject);
  }
  return toObject;
}
function embedContentResponseFromMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromEmbeddings = getValueByPath(fromObject, ["embeddings"]);
  if (fromEmbeddings != null) {
    let transformedList = fromEmbeddings;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["embeddings"], transformedList);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  return toObject;
}
function embedContentResponseFromVertex(fromObject, rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromEmbeddings = getValueByPath(fromObject, [
    "predictions[]",
    "embeddings"
  ]);
  if (fromEmbeddings != null) {
    let transformedList = fromEmbeddings;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentEmbeddingFromVertex(item);
      });
    }
    setValueByPath(toObject, ["embeddings"], transformedList);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  if (rootObject && getValueByPath(rootObject, ["embeddingApiType"]) === "EMBED_CONTENT") {
    const embedding = getValueByPath(fromObject, ["embedding"]);
    const usageMetadata = getValueByPath(fromObject, ["usageMetadata"]);
    const truncated = getValueByPath(fromObject, ["truncated"]);
    if (embedding) {
      const stats = {};
      if (usageMetadata && usageMetadata["promptTokenCount"]) {
        stats.tokenCount = usageMetadata["promptTokenCount"];
      }
      if (truncated) {
        stats.truncated = truncated;
      }
      embedding.statistics = stats;
      setValueByPath(toObject, ["embeddings"], [embedding]);
    }
  }
  return toObject;
}
function endpointFromVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["endpoint"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromDeployedModelId = getValueByPath(fromObject, [
    "deployedModelId"
  ]);
  if (fromDeployedModelId != null) {
    setValueByPath(toObject, ["deployedModelId"], fromDeployedModelId);
  }
  return toObject;
}
function fileDataToMldev$1(fromObject, _rootObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["displayName"]) !== void 0) {
    throw new Error("displayName parameter is not supported in Gemini API.");
  }
  const fromFileUri = getValueByPath(fromObject, ["fileUri"]);
  if (fromFileUri != null) {
    setValueByPath(toObject, ["fileUri"], fromFileUri);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function functionCallToMldev$1(fromObject, _rootObject) {
  const toObject = {};
  const fromId = getValueByPath(fromObject, ["id"]);
  if (fromId != null) {
    setValueByPath(toObject, ["id"], fromId);
  }
  const fromArgs = getValueByPath(fromObject, ["args"]);
  if (fromArgs != null) {
    setValueByPath(toObject, ["args"], fromArgs);
  }
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  if (getValueByPath(fromObject, ["partialArgs"]) !== void 0) {
    throw new Error("partialArgs parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["willContinue"]) !== void 0) {
    throw new Error("willContinue parameter is not supported in Gemini API.");
  }
  return toObject;
}
function functionCallingConfigToMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromAllowedFunctionNames = getValueByPath(fromObject, [
    "allowedFunctionNames"
  ]);
  if (fromAllowedFunctionNames != null) {
    setValueByPath(toObject, ["allowedFunctionNames"], fromAllowedFunctionNames);
  }
  const fromMode = getValueByPath(fromObject, ["mode"]);
  if (fromMode != null) {
    setValueByPath(toObject, ["mode"], fromMode);
  }
  if (getValueByPath(fromObject, ["streamFunctionCallArguments"]) !== void 0) {
    throw new Error("streamFunctionCallArguments parameter is not supported in Gemini API.");
  }
  return toObject;
}
function functionDeclarationToVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (fromDescription != null) {
    setValueByPath(toObject, ["description"], fromDescription);
  }
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromParameters = getValueByPath(fromObject, ["parameters"]);
  if (fromParameters != null) {
    setValueByPath(toObject, ["parameters"], fromParameters);
  }
  const fromParametersJsonSchema = getValueByPath(fromObject, [
    "parametersJsonSchema"
  ]);
  if (fromParametersJsonSchema != null) {
    setValueByPath(toObject, ["parametersJsonSchema"], fromParametersJsonSchema);
  }
  const fromResponse = getValueByPath(fromObject, ["response"]);
  if (fromResponse != null) {
    setValueByPath(toObject, ["response"], fromResponse);
  }
  const fromResponseJsonSchema = getValueByPath(fromObject, [
    "responseJsonSchema"
  ]);
  if (fromResponseJsonSchema != null) {
    setValueByPath(toObject, ["responseJsonSchema"], fromResponseJsonSchema);
  }
  if (getValueByPath(fromObject, ["behavior"]) !== void 0) {
    throw new Error("behavior parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function generateContentConfigToMldev(apiClient, fromObject, parentObject, rootObject) {
  const toObject = {};
  const fromSystemInstruction = getValueByPath(fromObject, [
    "systemInstruction"
  ]);
  if (parentObject !== void 0 && fromSystemInstruction != null) {
    setValueByPath(parentObject, ["systemInstruction"], contentToMldev$1(tContent(fromSystemInstruction)));
  }
  const fromTemperature = getValueByPath(fromObject, ["temperature"]);
  if (fromTemperature != null) {
    setValueByPath(toObject, ["temperature"], fromTemperature);
  }
  const fromTopP = getValueByPath(fromObject, ["topP"]);
  if (fromTopP != null) {
    setValueByPath(toObject, ["topP"], fromTopP);
  }
  const fromTopK = getValueByPath(fromObject, ["topK"]);
  if (fromTopK != null) {
    setValueByPath(toObject, ["topK"], fromTopK);
  }
  const fromCandidateCount = getValueByPath(fromObject, [
    "candidateCount"
  ]);
  if (fromCandidateCount != null) {
    setValueByPath(toObject, ["candidateCount"], fromCandidateCount);
  }
  const fromMaxOutputTokens = getValueByPath(fromObject, [
    "maxOutputTokens"
  ]);
  if (fromMaxOutputTokens != null) {
    setValueByPath(toObject, ["maxOutputTokens"], fromMaxOutputTokens);
  }
  const fromStopSequences = getValueByPath(fromObject, [
    "stopSequences"
  ]);
  if (fromStopSequences != null) {
    setValueByPath(toObject, ["stopSequences"], fromStopSequences);
  }
  const fromResponseLogprobs = getValueByPath(fromObject, [
    "responseLogprobs"
  ]);
  if (fromResponseLogprobs != null) {
    setValueByPath(toObject, ["responseLogprobs"], fromResponseLogprobs);
  }
  const fromLogprobs = getValueByPath(fromObject, ["logprobs"]);
  if (fromLogprobs != null) {
    setValueByPath(toObject, ["logprobs"], fromLogprobs);
  }
  const fromPresencePenalty = getValueByPath(fromObject, [
    "presencePenalty"
  ]);
  if (fromPresencePenalty != null) {
    setValueByPath(toObject, ["presencePenalty"], fromPresencePenalty);
  }
  const fromFrequencyPenalty = getValueByPath(fromObject, [
    "frequencyPenalty"
  ]);
  if (fromFrequencyPenalty != null) {
    setValueByPath(toObject, ["frequencyPenalty"], fromFrequencyPenalty);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (fromSeed != null) {
    setValueByPath(toObject, ["seed"], fromSeed);
  }
  const fromResponseMimeType = getValueByPath(fromObject, [
    "responseMimeType"
  ]);
  if (fromResponseMimeType != null) {
    setValueByPath(toObject, ["responseMimeType"], fromResponseMimeType);
  }
  const fromResponseSchema = getValueByPath(fromObject, [
    "responseSchema"
  ]);
  if (fromResponseSchema != null) {
    setValueByPath(toObject, ["responseSchema"], tSchema(fromResponseSchema));
  }
  const fromResponseJsonSchema = getValueByPath(fromObject, [
    "responseJsonSchema"
  ]);
  if (fromResponseJsonSchema != null) {
    setValueByPath(toObject, ["responseJsonSchema"], fromResponseJsonSchema);
  }
  if (getValueByPath(fromObject, ["routingConfig"]) !== void 0) {
    throw new Error("routingConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["modelSelectionConfig"]) !== void 0) {
    throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");
  }
  const fromSafetySettings = getValueByPath(fromObject, [
    "safetySettings"
  ]);
  if (parentObject !== void 0 && fromSafetySettings != null) {
    let transformedList = fromSafetySettings;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return safetySettingToMldev(item);
      });
    }
    setValueByPath(parentObject, ["safetySettings"], transformedList);
  }
  const fromTools = getValueByPath(fromObject, ["tools"]);
  if (parentObject !== void 0 && fromTools != null) {
    let transformedList = tTools(fromTools);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return toolToMldev$1(tTool(item));
      });
    }
    setValueByPath(parentObject, ["tools"], transformedList);
  }
  const fromToolConfig = getValueByPath(fromObject, ["toolConfig"]);
  if (parentObject !== void 0 && fromToolConfig != null) {
    setValueByPath(parentObject, ["toolConfig"], toolConfigToMldev(fromToolConfig));
  }
  if (getValueByPath(fromObject, ["labels"]) !== void 0) {
    throw new Error("labels parameter is not supported in Gemini API.");
  }
  const fromCachedContent = getValueByPath(fromObject, [
    "cachedContent"
  ]);
  if (parentObject !== void 0 && fromCachedContent != null) {
    setValueByPath(parentObject, ["cachedContent"], tCachedContentName(apiClient, fromCachedContent));
  }
  const fromResponseModalities = getValueByPath(fromObject, [
    "responseModalities"
  ]);
  if (fromResponseModalities != null) {
    setValueByPath(toObject, ["responseModalities"], fromResponseModalities);
  }
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (fromMediaResolution != null) {
    setValueByPath(toObject, ["mediaResolution"], fromMediaResolution);
  }
  const fromSpeechConfig = getValueByPath(fromObject, ["speechConfig"]);
  if (fromSpeechConfig != null) {
    setValueByPath(toObject, ["speechConfig"], tSpeechConfig(fromSpeechConfig));
  }
  if (getValueByPath(fromObject, ["audioTimestamp"]) !== void 0) {
    throw new Error("audioTimestamp parameter is not supported in Gemini API.");
  }
  const fromThinkingConfig = getValueByPath(fromObject, [
    "thinkingConfig"
  ]);
  if (fromThinkingConfig != null) {
    setValueByPath(toObject, ["thinkingConfig"], fromThinkingConfig);
  }
  const fromImageConfig = getValueByPath(fromObject, ["imageConfig"]);
  if (fromImageConfig != null) {
    setValueByPath(toObject, ["imageConfig"], imageConfigToMldev(fromImageConfig));
  }
  const fromEnableEnhancedCivicAnswers = getValueByPath(fromObject, [
    "enableEnhancedCivicAnswers"
  ]);
  if (fromEnableEnhancedCivicAnswers != null) {
    setValueByPath(toObject, ["enableEnhancedCivicAnswers"], fromEnableEnhancedCivicAnswers);
  }
  if (getValueByPath(fromObject, ["modelArmorConfig"]) !== void 0) {
    throw new Error("modelArmorConfig parameter is not supported in Gemini API.");
  }
  return toObject;
}
function generateContentConfigToVertex(apiClient, fromObject, parentObject, rootObject) {
  const toObject = {};
  const fromSystemInstruction = getValueByPath(fromObject, [
    "systemInstruction"
  ]);
  if (parentObject !== void 0 && fromSystemInstruction != null) {
    setValueByPath(parentObject, ["systemInstruction"], contentToVertex(tContent(fromSystemInstruction)));
  }
  const fromTemperature = getValueByPath(fromObject, ["temperature"]);
  if (fromTemperature != null) {
    setValueByPath(toObject, ["temperature"], fromTemperature);
  }
  const fromTopP = getValueByPath(fromObject, ["topP"]);
  if (fromTopP != null) {
    setValueByPath(toObject, ["topP"], fromTopP);
  }
  const fromTopK = getValueByPath(fromObject, ["topK"]);
  if (fromTopK != null) {
    setValueByPath(toObject, ["topK"], fromTopK);
  }
  const fromCandidateCount = getValueByPath(fromObject, [
    "candidateCount"
  ]);
  if (fromCandidateCount != null) {
    setValueByPath(toObject, ["candidateCount"], fromCandidateCount);
  }
  const fromMaxOutputTokens = getValueByPath(fromObject, [
    "maxOutputTokens"
  ]);
  if (fromMaxOutputTokens != null) {
    setValueByPath(toObject, ["maxOutputTokens"], fromMaxOutputTokens);
  }
  const fromStopSequences = getValueByPath(fromObject, [
    "stopSequences"
  ]);
  if (fromStopSequences != null) {
    setValueByPath(toObject, ["stopSequences"], fromStopSequences);
  }
  const fromResponseLogprobs = getValueByPath(fromObject, [
    "responseLogprobs"
  ]);
  if (fromResponseLogprobs != null) {
    setValueByPath(toObject, ["responseLogprobs"], fromResponseLogprobs);
  }
  const fromLogprobs = getValueByPath(fromObject, ["logprobs"]);
  if (fromLogprobs != null) {
    setValueByPath(toObject, ["logprobs"], fromLogprobs);
  }
  const fromPresencePenalty = getValueByPath(fromObject, [
    "presencePenalty"
  ]);
  if (fromPresencePenalty != null) {
    setValueByPath(toObject, ["presencePenalty"], fromPresencePenalty);
  }
  const fromFrequencyPenalty = getValueByPath(fromObject, [
    "frequencyPenalty"
  ]);
  if (fromFrequencyPenalty != null) {
    setValueByPath(toObject, ["frequencyPenalty"], fromFrequencyPenalty);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (fromSeed != null) {
    setValueByPath(toObject, ["seed"], fromSeed);
  }
  const fromResponseMimeType = getValueByPath(fromObject, [
    "responseMimeType"
  ]);
  if (fromResponseMimeType != null) {
    setValueByPath(toObject, ["responseMimeType"], fromResponseMimeType);
  }
  const fromResponseSchema = getValueByPath(fromObject, [
    "responseSchema"
  ]);
  if (fromResponseSchema != null) {
    setValueByPath(toObject, ["responseSchema"], tSchema(fromResponseSchema));
  }
  const fromResponseJsonSchema = getValueByPath(fromObject, [
    "responseJsonSchema"
  ]);
  if (fromResponseJsonSchema != null) {
    setValueByPath(toObject, ["responseJsonSchema"], fromResponseJsonSchema);
  }
  const fromRoutingConfig = getValueByPath(fromObject, [
    "routingConfig"
  ]);
  if (fromRoutingConfig != null) {
    setValueByPath(toObject, ["routingConfig"], fromRoutingConfig);
  }
  const fromModelSelectionConfig = getValueByPath(fromObject, [
    "modelSelectionConfig"
  ]);
  if (fromModelSelectionConfig != null) {
    setValueByPath(toObject, ["modelConfig"], fromModelSelectionConfig);
  }
  const fromSafetySettings = getValueByPath(fromObject, [
    "safetySettings"
  ]);
  if (parentObject !== void 0 && fromSafetySettings != null) {
    let transformedList = fromSafetySettings;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(parentObject, ["safetySettings"], transformedList);
  }
  const fromTools = getValueByPath(fromObject, ["tools"]);
  if (parentObject !== void 0 && fromTools != null) {
    let transformedList = tTools(fromTools);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return toolToVertex(tTool(item));
      });
    }
    setValueByPath(parentObject, ["tools"], transformedList);
  }
  const fromToolConfig = getValueByPath(fromObject, ["toolConfig"]);
  if (parentObject !== void 0 && fromToolConfig != null) {
    setValueByPath(parentObject, ["toolConfig"], toolConfigToVertex(fromToolConfig));
  }
  const fromLabels = getValueByPath(fromObject, ["labels"]);
  if (parentObject !== void 0 && fromLabels != null) {
    setValueByPath(parentObject, ["labels"], fromLabels);
  }
  const fromCachedContent = getValueByPath(fromObject, [
    "cachedContent"
  ]);
  if (parentObject !== void 0 && fromCachedContent != null) {
    setValueByPath(parentObject, ["cachedContent"], tCachedContentName(apiClient, fromCachedContent));
  }
  const fromResponseModalities = getValueByPath(fromObject, [
    "responseModalities"
  ]);
  if (fromResponseModalities != null) {
    setValueByPath(toObject, ["responseModalities"], fromResponseModalities);
  }
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (fromMediaResolution != null) {
    setValueByPath(toObject, ["mediaResolution"], fromMediaResolution);
  }
  const fromSpeechConfig = getValueByPath(fromObject, ["speechConfig"]);
  if (fromSpeechConfig != null) {
    setValueByPath(toObject, ["speechConfig"], tSpeechConfig(fromSpeechConfig));
  }
  const fromAudioTimestamp = getValueByPath(fromObject, [
    "audioTimestamp"
  ]);
  if (fromAudioTimestamp != null) {
    setValueByPath(toObject, ["audioTimestamp"], fromAudioTimestamp);
  }
  const fromThinkingConfig = getValueByPath(fromObject, [
    "thinkingConfig"
  ]);
  if (fromThinkingConfig != null) {
    setValueByPath(toObject, ["thinkingConfig"], fromThinkingConfig);
  }
  const fromImageConfig = getValueByPath(fromObject, ["imageConfig"]);
  if (fromImageConfig != null) {
    setValueByPath(toObject, ["imageConfig"], imageConfigToVertex(fromImageConfig));
  }
  if (getValueByPath(fromObject, ["enableEnhancedCivicAnswers"]) !== void 0) {
    throw new Error("enableEnhancedCivicAnswers parameter is not supported in Vertex AI.");
  }
  const fromModelArmorConfig = getValueByPath(fromObject, [
    "modelArmorConfig"
  ]);
  if (parentObject !== void 0 && fromModelArmorConfig != null) {
    setValueByPath(parentObject, ["modelArmorConfig"], fromModelArmorConfig);
  }
  return toObject;
}
function generateContentParametersToMldev(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (fromContents != null) {
    let transformedList = tContents(fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentToMldev$1(item);
      });
    }
    setValueByPath(toObject, ["contents"], transformedList);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["generationConfig"], generateContentConfigToMldev(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function generateContentParametersToVertex(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromContents = getValueByPath(fromObject, ["contents"]);
  if (fromContents != null) {
    let transformedList = tContents(fromContents);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return contentToVertex(item);
      });
    }
    setValueByPath(toObject, ["contents"], transformedList);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["generationConfig"], generateContentConfigToVertex(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function generateContentResponseFromMldev(fromObject, rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromCandidates = getValueByPath(fromObject, ["candidates"]);
  if (fromCandidates != null) {
    let transformedList = fromCandidates;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return candidateFromMldev(item);
      });
    }
    setValueByPath(toObject, ["candidates"], transformedList);
  }
  const fromModelVersion = getValueByPath(fromObject, ["modelVersion"]);
  if (fromModelVersion != null) {
    setValueByPath(toObject, ["modelVersion"], fromModelVersion);
  }
  const fromPromptFeedback = getValueByPath(fromObject, [
    "promptFeedback"
  ]);
  if (fromPromptFeedback != null) {
    setValueByPath(toObject, ["promptFeedback"], fromPromptFeedback);
  }
  const fromResponseId = getValueByPath(fromObject, ["responseId"]);
  if (fromResponseId != null) {
    setValueByPath(toObject, ["responseId"], fromResponseId);
  }
  const fromUsageMetadata = getValueByPath(fromObject, [
    "usageMetadata"
  ]);
  if (fromUsageMetadata != null) {
    setValueByPath(toObject, ["usageMetadata"], fromUsageMetadata);
  }
  return toObject;
}
function generateContentResponseFromVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromCandidates = getValueByPath(fromObject, ["candidates"]);
  if (fromCandidates != null) {
    let transformedList = fromCandidates;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["candidates"], transformedList);
  }
  const fromCreateTime = getValueByPath(fromObject, ["createTime"]);
  if (fromCreateTime != null) {
    setValueByPath(toObject, ["createTime"], fromCreateTime);
  }
  const fromModelVersion = getValueByPath(fromObject, ["modelVersion"]);
  if (fromModelVersion != null) {
    setValueByPath(toObject, ["modelVersion"], fromModelVersion);
  }
  const fromPromptFeedback = getValueByPath(fromObject, [
    "promptFeedback"
  ]);
  if (fromPromptFeedback != null) {
    setValueByPath(toObject, ["promptFeedback"], fromPromptFeedback);
  }
  const fromResponseId = getValueByPath(fromObject, ["responseId"]);
  if (fromResponseId != null) {
    setValueByPath(toObject, ["responseId"], fromResponseId);
  }
  const fromUsageMetadata = getValueByPath(fromObject, [
    "usageMetadata"
  ]);
  if (fromUsageMetadata != null) {
    setValueByPath(toObject, ["usageMetadata"], fromUsageMetadata);
  }
  return toObject;
}
function generateImagesConfigToMldev(fromObject, parentObject, _rootObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["outputGcsUri"]) !== void 0) {
    throw new Error("outputGcsUri parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["negativePrompt"]) !== void 0) {
    throw new Error("negativePrompt parameter is not supported in Gemini API.");
  }
  const fromNumberOfImages = getValueByPath(fromObject, [
    "numberOfImages"
  ]);
  if (parentObject !== void 0 && fromNumberOfImages != null) {
    setValueByPath(parentObject, ["parameters", "sampleCount"], fromNumberOfImages);
  }
  const fromAspectRatio = getValueByPath(fromObject, ["aspectRatio"]);
  if (parentObject !== void 0 && fromAspectRatio != null) {
    setValueByPath(parentObject, ["parameters", "aspectRatio"], fromAspectRatio);
  }
  const fromGuidanceScale = getValueByPath(fromObject, [
    "guidanceScale"
  ]);
  if (parentObject !== void 0 && fromGuidanceScale != null) {
    setValueByPath(parentObject, ["parameters", "guidanceScale"], fromGuidanceScale);
  }
  if (getValueByPath(fromObject, ["seed"]) !== void 0) {
    throw new Error("seed parameter is not supported in Gemini API.");
  }
  const fromSafetyFilterLevel = getValueByPath(fromObject, [
    "safetyFilterLevel"
  ]);
  if (parentObject !== void 0 && fromSafetyFilterLevel != null) {
    setValueByPath(parentObject, ["parameters", "safetySetting"], fromSafetyFilterLevel);
  }
  const fromPersonGeneration = getValueByPath(fromObject, [
    "personGeneration"
  ]);
  if (parentObject !== void 0 && fromPersonGeneration != null) {
    setValueByPath(parentObject, ["parameters", "personGeneration"], fromPersonGeneration);
  }
  const fromIncludeSafetyAttributes = getValueByPath(fromObject, [
    "includeSafetyAttributes"
  ]);
  if (parentObject !== void 0 && fromIncludeSafetyAttributes != null) {
    setValueByPath(parentObject, ["parameters", "includeSafetyAttributes"], fromIncludeSafetyAttributes);
  }
  const fromIncludeRaiReason = getValueByPath(fromObject, [
    "includeRaiReason"
  ]);
  if (parentObject !== void 0 && fromIncludeRaiReason != null) {
    setValueByPath(parentObject, ["parameters", "includeRaiReason"], fromIncludeRaiReason);
  }
  const fromLanguage = getValueByPath(fromObject, ["language"]);
  if (parentObject !== void 0 && fromLanguage != null) {
    setValueByPath(parentObject, ["parameters", "language"], fromLanguage);
  }
  const fromOutputMimeType = getValueByPath(fromObject, [
    "outputMimeType"
  ]);
  if (parentObject !== void 0 && fromOutputMimeType != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "mimeType"], fromOutputMimeType);
  }
  const fromOutputCompressionQuality = getValueByPath(fromObject, [
    "outputCompressionQuality"
  ]);
  if (parentObject !== void 0 && fromOutputCompressionQuality != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "compressionQuality"], fromOutputCompressionQuality);
  }
  if (getValueByPath(fromObject, ["addWatermark"]) !== void 0) {
    throw new Error("addWatermark parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["labels"]) !== void 0) {
    throw new Error("labels parameter is not supported in Gemini API.");
  }
  const fromImageSize = getValueByPath(fromObject, ["imageSize"]);
  if (parentObject !== void 0 && fromImageSize != null) {
    setValueByPath(parentObject, ["parameters", "sampleImageSize"], fromImageSize);
  }
  if (getValueByPath(fromObject, ["enhancePrompt"]) !== void 0) {
    throw new Error("enhancePrompt parameter is not supported in Gemini API.");
  }
  return toObject;
}
function generateImagesConfigToVertex(fromObject, parentObject, _rootObject) {
  const toObject = {};
  const fromOutputGcsUri = getValueByPath(fromObject, ["outputGcsUri"]);
  if (parentObject !== void 0 && fromOutputGcsUri != null) {
    setValueByPath(parentObject, ["parameters", "storageUri"], fromOutputGcsUri);
  }
  const fromNegativePrompt = getValueByPath(fromObject, [
    "negativePrompt"
  ]);
  if (parentObject !== void 0 && fromNegativePrompt != null) {
    setValueByPath(parentObject, ["parameters", "negativePrompt"], fromNegativePrompt);
  }
  const fromNumberOfImages = getValueByPath(fromObject, [
    "numberOfImages"
  ]);
  if (parentObject !== void 0 && fromNumberOfImages != null) {
    setValueByPath(parentObject, ["parameters", "sampleCount"], fromNumberOfImages);
  }
  const fromAspectRatio = getValueByPath(fromObject, ["aspectRatio"]);
  if (parentObject !== void 0 && fromAspectRatio != null) {
    setValueByPath(parentObject, ["parameters", "aspectRatio"], fromAspectRatio);
  }
  const fromGuidanceScale = getValueByPath(fromObject, [
    "guidanceScale"
  ]);
  if (parentObject !== void 0 && fromGuidanceScale != null) {
    setValueByPath(parentObject, ["parameters", "guidanceScale"], fromGuidanceScale);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (parentObject !== void 0 && fromSeed != null) {
    setValueByPath(parentObject, ["parameters", "seed"], fromSeed);
  }
  const fromSafetyFilterLevel = getValueByPath(fromObject, [
    "safetyFilterLevel"
  ]);
  if (parentObject !== void 0 && fromSafetyFilterLevel != null) {
    setValueByPath(parentObject, ["parameters", "safetySetting"], fromSafetyFilterLevel);
  }
  const fromPersonGeneration = getValueByPath(fromObject, [
    "personGeneration"
  ]);
  if (parentObject !== void 0 && fromPersonGeneration != null) {
    setValueByPath(parentObject, ["parameters", "personGeneration"], fromPersonGeneration);
  }
  const fromIncludeSafetyAttributes = getValueByPath(fromObject, [
    "includeSafetyAttributes"
  ]);
  if (parentObject !== void 0 && fromIncludeSafetyAttributes != null) {
    setValueByPath(parentObject, ["parameters", "includeSafetyAttributes"], fromIncludeSafetyAttributes);
  }
  const fromIncludeRaiReason = getValueByPath(fromObject, [
    "includeRaiReason"
  ]);
  if (parentObject !== void 0 && fromIncludeRaiReason != null) {
    setValueByPath(parentObject, ["parameters", "includeRaiReason"], fromIncludeRaiReason);
  }
  const fromLanguage = getValueByPath(fromObject, ["language"]);
  if (parentObject !== void 0 && fromLanguage != null) {
    setValueByPath(parentObject, ["parameters", "language"], fromLanguage);
  }
  const fromOutputMimeType = getValueByPath(fromObject, [
    "outputMimeType"
  ]);
  if (parentObject !== void 0 && fromOutputMimeType != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "mimeType"], fromOutputMimeType);
  }
  const fromOutputCompressionQuality = getValueByPath(fromObject, [
    "outputCompressionQuality"
  ]);
  if (parentObject !== void 0 && fromOutputCompressionQuality != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "compressionQuality"], fromOutputCompressionQuality);
  }
  const fromAddWatermark = getValueByPath(fromObject, ["addWatermark"]);
  if (parentObject !== void 0 && fromAddWatermark != null) {
    setValueByPath(parentObject, ["parameters", "addWatermark"], fromAddWatermark);
  }
  const fromLabels = getValueByPath(fromObject, ["labels"]);
  if (parentObject !== void 0 && fromLabels != null) {
    setValueByPath(parentObject, ["labels"], fromLabels);
  }
  const fromImageSize = getValueByPath(fromObject, ["imageSize"]);
  if (parentObject !== void 0 && fromImageSize != null) {
    setValueByPath(parentObject, ["parameters", "sampleImageSize"], fromImageSize);
  }
  const fromEnhancePrompt = getValueByPath(fromObject, [
    "enhancePrompt"
  ]);
  if (parentObject !== void 0 && fromEnhancePrompt != null) {
    setValueByPath(parentObject, ["parameters", "enhancePrompt"], fromEnhancePrompt);
  }
  return toObject;
}
function generateImagesParametersToMldev(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromPrompt = getValueByPath(fromObject, ["prompt"]);
  if (fromPrompt != null) {
    setValueByPath(toObject, ["instances[0]", "prompt"], fromPrompt);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    generateImagesConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function generateImagesParametersToVertex(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromPrompt = getValueByPath(fromObject, ["prompt"]);
  if (fromPrompt != null) {
    setValueByPath(toObject, ["instances[0]", "prompt"], fromPrompt);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    generateImagesConfigToVertex(fromConfig, toObject);
  }
  return toObject;
}
function generateImagesResponseFromMldev(fromObject, rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromGeneratedImages = getValueByPath(fromObject, [
    "predictions"
  ]);
  if (fromGeneratedImages != null) {
    let transformedList = fromGeneratedImages;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedImageFromMldev(item);
      });
    }
    setValueByPath(toObject, ["generatedImages"], transformedList);
  }
  const fromPositivePromptSafetyAttributes = getValueByPath(fromObject, [
    "positivePromptSafetyAttributes"
  ]);
  if (fromPositivePromptSafetyAttributes != null) {
    setValueByPath(toObject, ["positivePromptSafetyAttributes"], safetyAttributesFromMldev(fromPositivePromptSafetyAttributes));
  }
  return toObject;
}
function generateImagesResponseFromVertex(fromObject, rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromGeneratedImages = getValueByPath(fromObject, [
    "predictions"
  ]);
  if (fromGeneratedImages != null) {
    let transformedList = fromGeneratedImages;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedImageFromVertex(item);
      });
    }
    setValueByPath(toObject, ["generatedImages"], transformedList);
  }
  const fromPositivePromptSafetyAttributes = getValueByPath(fromObject, [
    "positivePromptSafetyAttributes"
  ]);
  if (fromPositivePromptSafetyAttributes != null) {
    setValueByPath(toObject, ["positivePromptSafetyAttributes"], safetyAttributesFromVertex(fromPositivePromptSafetyAttributes));
  }
  return toObject;
}
function generateVideosConfigToMldev(fromObject, parentObject, rootObject) {
  const toObject = {};
  const fromNumberOfVideos = getValueByPath(fromObject, [
    "numberOfVideos"
  ]);
  if (parentObject !== void 0 && fromNumberOfVideos != null) {
    setValueByPath(parentObject, ["parameters", "sampleCount"], fromNumberOfVideos);
  }
  if (getValueByPath(fromObject, ["outputGcsUri"]) !== void 0) {
    throw new Error("outputGcsUri parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["fps"]) !== void 0) {
    throw new Error("fps parameter is not supported in Gemini API.");
  }
  const fromDurationSeconds = getValueByPath(fromObject, [
    "durationSeconds"
  ]);
  if (parentObject !== void 0 && fromDurationSeconds != null) {
    setValueByPath(parentObject, ["parameters", "durationSeconds"], fromDurationSeconds);
  }
  if (getValueByPath(fromObject, ["seed"]) !== void 0) {
    throw new Error("seed parameter is not supported in Gemini API.");
  }
  const fromAspectRatio = getValueByPath(fromObject, ["aspectRatio"]);
  if (parentObject !== void 0 && fromAspectRatio != null) {
    setValueByPath(parentObject, ["parameters", "aspectRatio"], fromAspectRatio);
  }
  const fromResolution = getValueByPath(fromObject, ["resolution"]);
  if (parentObject !== void 0 && fromResolution != null) {
    setValueByPath(parentObject, ["parameters", "resolution"], fromResolution);
  }
  const fromPersonGeneration = getValueByPath(fromObject, [
    "personGeneration"
  ]);
  if (parentObject !== void 0 && fromPersonGeneration != null) {
    setValueByPath(parentObject, ["parameters", "personGeneration"], fromPersonGeneration);
  }
  if (getValueByPath(fromObject, ["pubsubTopic"]) !== void 0) {
    throw new Error("pubsubTopic parameter is not supported in Gemini API.");
  }
  const fromNegativePrompt = getValueByPath(fromObject, [
    "negativePrompt"
  ]);
  if (parentObject !== void 0 && fromNegativePrompt != null) {
    setValueByPath(parentObject, ["parameters", "negativePrompt"], fromNegativePrompt);
  }
  const fromEnhancePrompt = getValueByPath(fromObject, [
    "enhancePrompt"
  ]);
  if (parentObject !== void 0 && fromEnhancePrompt != null) {
    setValueByPath(parentObject, ["parameters", "enhancePrompt"], fromEnhancePrompt);
  }
  if (getValueByPath(fromObject, ["generateAudio"]) !== void 0) {
    throw new Error("generateAudio parameter is not supported in Gemini API.");
  }
  const fromLastFrame = getValueByPath(fromObject, ["lastFrame"]);
  if (parentObject !== void 0 && fromLastFrame != null) {
    setValueByPath(parentObject, ["instances[0]", "lastFrame"], imageToMldev(fromLastFrame));
  }
  const fromReferenceImages = getValueByPath(fromObject, [
    "referenceImages"
  ]);
  if (parentObject !== void 0 && fromReferenceImages != null) {
    let transformedList = fromReferenceImages;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return videoGenerationReferenceImageToMldev(item);
      });
    }
    setValueByPath(parentObject, ["instances[0]", "referenceImages"], transformedList);
  }
  if (getValueByPath(fromObject, ["mask"]) !== void 0) {
    throw new Error("mask parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["compressionQuality"]) !== void 0) {
    throw new Error("compressionQuality parameter is not supported in Gemini API.");
  }
  return toObject;
}
function generateVideosConfigToVertex(fromObject, parentObject, rootObject) {
  const toObject = {};
  const fromNumberOfVideos = getValueByPath(fromObject, [
    "numberOfVideos"
  ]);
  if (parentObject !== void 0 && fromNumberOfVideos != null) {
    setValueByPath(parentObject, ["parameters", "sampleCount"], fromNumberOfVideos);
  }
  const fromOutputGcsUri = getValueByPath(fromObject, ["outputGcsUri"]);
  if (parentObject !== void 0 && fromOutputGcsUri != null) {
    setValueByPath(parentObject, ["parameters", "storageUri"], fromOutputGcsUri);
  }
  const fromFps = getValueByPath(fromObject, ["fps"]);
  if (parentObject !== void 0 && fromFps != null) {
    setValueByPath(parentObject, ["parameters", "fps"], fromFps);
  }
  const fromDurationSeconds = getValueByPath(fromObject, [
    "durationSeconds"
  ]);
  if (parentObject !== void 0 && fromDurationSeconds != null) {
    setValueByPath(parentObject, ["parameters", "durationSeconds"], fromDurationSeconds);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (parentObject !== void 0 && fromSeed != null) {
    setValueByPath(parentObject, ["parameters", "seed"], fromSeed);
  }
  const fromAspectRatio = getValueByPath(fromObject, ["aspectRatio"]);
  if (parentObject !== void 0 && fromAspectRatio != null) {
    setValueByPath(parentObject, ["parameters", "aspectRatio"], fromAspectRatio);
  }
  const fromResolution = getValueByPath(fromObject, ["resolution"]);
  if (parentObject !== void 0 && fromResolution != null) {
    setValueByPath(parentObject, ["parameters", "resolution"], fromResolution);
  }
  const fromPersonGeneration = getValueByPath(fromObject, [
    "personGeneration"
  ]);
  if (parentObject !== void 0 && fromPersonGeneration != null) {
    setValueByPath(parentObject, ["parameters", "personGeneration"], fromPersonGeneration);
  }
  const fromPubsubTopic = getValueByPath(fromObject, ["pubsubTopic"]);
  if (parentObject !== void 0 && fromPubsubTopic != null) {
    setValueByPath(parentObject, ["parameters", "pubsubTopic"], fromPubsubTopic);
  }
  const fromNegativePrompt = getValueByPath(fromObject, [
    "negativePrompt"
  ]);
  if (parentObject !== void 0 && fromNegativePrompt != null) {
    setValueByPath(parentObject, ["parameters", "negativePrompt"], fromNegativePrompt);
  }
  const fromEnhancePrompt = getValueByPath(fromObject, [
    "enhancePrompt"
  ]);
  if (parentObject !== void 0 && fromEnhancePrompt != null) {
    setValueByPath(parentObject, ["parameters", "enhancePrompt"], fromEnhancePrompt);
  }
  const fromGenerateAudio = getValueByPath(fromObject, [
    "generateAudio"
  ]);
  if (parentObject !== void 0 && fromGenerateAudio != null) {
    setValueByPath(parentObject, ["parameters", "generateAudio"], fromGenerateAudio);
  }
  const fromLastFrame = getValueByPath(fromObject, ["lastFrame"]);
  if (parentObject !== void 0 && fromLastFrame != null) {
    setValueByPath(parentObject, ["instances[0]", "lastFrame"], imageToVertex(fromLastFrame));
  }
  const fromReferenceImages = getValueByPath(fromObject, [
    "referenceImages"
  ]);
  if (parentObject !== void 0 && fromReferenceImages != null) {
    let transformedList = fromReferenceImages;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return videoGenerationReferenceImageToVertex(item);
      });
    }
    setValueByPath(parentObject, ["instances[0]", "referenceImages"], transformedList);
  }
  const fromMask = getValueByPath(fromObject, ["mask"]);
  if (parentObject !== void 0 && fromMask != null) {
    setValueByPath(parentObject, ["instances[0]", "mask"], videoGenerationMaskToVertex(fromMask));
  }
  const fromCompressionQuality = getValueByPath(fromObject, [
    "compressionQuality"
  ]);
  if (parentObject !== void 0 && fromCompressionQuality != null) {
    setValueByPath(parentObject, ["parameters", "compressionQuality"], fromCompressionQuality);
  }
  return toObject;
}
function generateVideosOperationFromMldev(fromObject, rootObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  const fromDone = getValueByPath(fromObject, ["done"]);
  if (fromDone != null) {
    setValueByPath(toObject, ["done"], fromDone);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  const fromResponse = getValueByPath(fromObject, [
    "response",
    "generateVideoResponse"
  ]);
  if (fromResponse != null) {
    setValueByPath(toObject, ["response"], generateVideosResponseFromMldev(fromResponse));
  }
  return toObject;
}
function generateVideosOperationFromVertex(fromObject, rootObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  const fromDone = getValueByPath(fromObject, ["done"]);
  if (fromDone != null) {
    setValueByPath(toObject, ["done"], fromDone);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  const fromResponse = getValueByPath(fromObject, ["response"]);
  if (fromResponse != null) {
    setValueByPath(toObject, ["response"], generateVideosResponseFromVertex(fromResponse));
  }
  return toObject;
}
function generateVideosParametersToMldev(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromPrompt = getValueByPath(fromObject, ["prompt"]);
  if (fromPrompt != null) {
    setValueByPath(toObject, ["instances[0]", "prompt"], fromPrompt);
  }
  const fromImage = getValueByPath(fromObject, ["image"]);
  if (fromImage != null) {
    setValueByPath(toObject, ["instances[0]", "image"], imageToMldev(fromImage));
  }
  const fromVideo = getValueByPath(fromObject, ["video"]);
  if (fromVideo != null) {
    setValueByPath(toObject, ["instances[0]", "video"], videoToMldev(fromVideo));
  }
  const fromSource = getValueByPath(fromObject, ["source"]);
  if (fromSource != null) {
    generateVideosSourceToMldev(fromSource, toObject);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    generateVideosConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function generateVideosParametersToVertex(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromPrompt = getValueByPath(fromObject, ["prompt"]);
  if (fromPrompt != null) {
    setValueByPath(toObject, ["instances[0]", "prompt"], fromPrompt);
  }
  const fromImage = getValueByPath(fromObject, ["image"]);
  if (fromImage != null) {
    setValueByPath(toObject, ["instances[0]", "image"], imageToVertex(fromImage));
  }
  const fromVideo = getValueByPath(fromObject, ["video"]);
  if (fromVideo != null) {
    setValueByPath(toObject, ["instances[0]", "video"], videoToVertex(fromVideo));
  }
  const fromSource = getValueByPath(fromObject, ["source"]);
  if (fromSource != null) {
    generateVideosSourceToVertex(fromSource, toObject);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    generateVideosConfigToVertex(fromConfig, toObject);
  }
  return toObject;
}
function generateVideosResponseFromMldev(fromObject, rootObject) {
  const toObject = {};
  const fromGeneratedVideos = getValueByPath(fromObject, [
    "generatedSamples"
  ]);
  if (fromGeneratedVideos != null) {
    let transformedList = fromGeneratedVideos;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedVideoFromMldev(item);
      });
    }
    setValueByPath(toObject, ["generatedVideos"], transformedList);
  }
  const fromRaiMediaFilteredCount = getValueByPath(fromObject, [
    "raiMediaFilteredCount"
  ]);
  if (fromRaiMediaFilteredCount != null) {
    setValueByPath(toObject, ["raiMediaFilteredCount"], fromRaiMediaFilteredCount);
  }
  const fromRaiMediaFilteredReasons = getValueByPath(fromObject, [
    "raiMediaFilteredReasons"
  ]);
  if (fromRaiMediaFilteredReasons != null) {
    setValueByPath(toObject, ["raiMediaFilteredReasons"], fromRaiMediaFilteredReasons);
  }
  return toObject;
}
function generateVideosResponseFromVertex(fromObject, rootObject) {
  const toObject = {};
  const fromGeneratedVideos = getValueByPath(fromObject, ["videos"]);
  if (fromGeneratedVideos != null) {
    let transformedList = fromGeneratedVideos;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedVideoFromVertex(item);
      });
    }
    setValueByPath(toObject, ["generatedVideos"], transformedList);
  }
  const fromRaiMediaFilteredCount = getValueByPath(fromObject, [
    "raiMediaFilteredCount"
  ]);
  if (fromRaiMediaFilteredCount != null) {
    setValueByPath(toObject, ["raiMediaFilteredCount"], fromRaiMediaFilteredCount);
  }
  const fromRaiMediaFilteredReasons = getValueByPath(fromObject, [
    "raiMediaFilteredReasons"
  ]);
  if (fromRaiMediaFilteredReasons != null) {
    setValueByPath(toObject, ["raiMediaFilteredReasons"], fromRaiMediaFilteredReasons);
  }
  return toObject;
}
function generateVideosSourceToMldev(fromObject, parentObject, rootObject) {
  const toObject = {};
  const fromPrompt = getValueByPath(fromObject, ["prompt"]);
  if (parentObject !== void 0 && fromPrompt != null) {
    setValueByPath(parentObject, ["instances[0]", "prompt"], fromPrompt);
  }
  const fromImage = getValueByPath(fromObject, ["image"]);
  if (parentObject !== void 0 && fromImage != null) {
    setValueByPath(parentObject, ["instances[0]", "image"], imageToMldev(fromImage));
  }
  const fromVideo = getValueByPath(fromObject, ["video"]);
  if (parentObject !== void 0 && fromVideo != null) {
    setValueByPath(parentObject, ["instances[0]", "video"], videoToMldev(fromVideo));
  }
  return toObject;
}
function generateVideosSourceToVertex(fromObject, parentObject, rootObject) {
  const toObject = {};
  const fromPrompt = getValueByPath(fromObject, ["prompt"]);
  if (parentObject !== void 0 && fromPrompt != null) {
    setValueByPath(parentObject, ["instances[0]", "prompt"], fromPrompt);
  }
  const fromImage = getValueByPath(fromObject, ["image"]);
  if (parentObject !== void 0 && fromImage != null) {
    setValueByPath(parentObject, ["instances[0]", "image"], imageToVertex(fromImage));
  }
  const fromVideo = getValueByPath(fromObject, ["video"]);
  if (parentObject !== void 0 && fromVideo != null) {
    setValueByPath(parentObject, ["instances[0]", "video"], videoToVertex(fromVideo));
  }
  return toObject;
}
function generatedImageFromMldev(fromObject, rootObject) {
  const toObject = {};
  const fromImage = getValueByPath(fromObject, ["_self"]);
  if (fromImage != null) {
    setValueByPath(toObject, ["image"], imageFromMldev(fromImage));
  }
  const fromRaiFilteredReason = getValueByPath(fromObject, [
    "raiFilteredReason"
  ]);
  if (fromRaiFilteredReason != null) {
    setValueByPath(toObject, ["raiFilteredReason"], fromRaiFilteredReason);
  }
  const fromSafetyAttributes = getValueByPath(fromObject, ["_self"]);
  if (fromSafetyAttributes != null) {
    setValueByPath(toObject, ["safetyAttributes"], safetyAttributesFromMldev(fromSafetyAttributes));
  }
  return toObject;
}
function generatedImageFromVertex(fromObject, rootObject) {
  const toObject = {};
  const fromImage = getValueByPath(fromObject, ["_self"]);
  if (fromImage != null) {
    setValueByPath(toObject, ["image"], imageFromVertex(fromImage));
  }
  const fromRaiFilteredReason = getValueByPath(fromObject, [
    "raiFilteredReason"
  ]);
  if (fromRaiFilteredReason != null) {
    setValueByPath(toObject, ["raiFilteredReason"], fromRaiFilteredReason);
  }
  const fromSafetyAttributes = getValueByPath(fromObject, ["_self"]);
  if (fromSafetyAttributes != null) {
    setValueByPath(toObject, ["safetyAttributes"], safetyAttributesFromVertex(fromSafetyAttributes));
  }
  const fromEnhancedPrompt = getValueByPath(fromObject, ["prompt"]);
  if (fromEnhancedPrompt != null) {
    setValueByPath(toObject, ["enhancedPrompt"], fromEnhancedPrompt);
  }
  return toObject;
}
function generatedImageMaskFromVertex(fromObject, rootObject) {
  const toObject = {};
  const fromMask = getValueByPath(fromObject, ["_self"]);
  if (fromMask != null) {
    setValueByPath(toObject, ["mask"], imageFromVertex(fromMask));
  }
  const fromLabels = getValueByPath(fromObject, ["labels"]);
  if (fromLabels != null) {
    let transformedList = fromLabels;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["labels"], transformedList);
  }
  return toObject;
}
function generatedVideoFromMldev(fromObject, rootObject) {
  const toObject = {};
  const fromVideo = getValueByPath(fromObject, ["video"]);
  if (fromVideo != null) {
    setValueByPath(toObject, ["video"], videoFromMldev(fromVideo));
  }
  return toObject;
}
function generatedVideoFromVertex(fromObject, rootObject) {
  const toObject = {};
  const fromVideo = getValueByPath(fromObject, ["_self"]);
  if (fromVideo != null) {
    setValueByPath(toObject, ["video"], videoFromVertex(fromVideo));
  }
  return toObject;
}
function generationConfigToVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromModelSelectionConfig = getValueByPath(fromObject, [
    "modelSelectionConfig"
  ]);
  if (fromModelSelectionConfig != null) {
    setValueByPath(toObject, ["modelConfig"], fromModelSelectionConfig);
  }
  const fromResponseJsonSchema = getValueByPath(fromObject, [
    "responseJsonSchema"
  ]);
  if (fromResponseJsonSchema != null) {
    setValueByPath(toObject, ["responseJsonSchema"], fromResponseJsonSchema);
  }
  const fromAudioTimestamp = getValueByPath(fromObject, [
    "audioTimestamp"
  ]);
  if (fromAudioTimestamp != null) {
    setValueByPath(toObject, ["audioTimestamp"], fromAudioTimestamp);
  }
  const fromCandidateCount = getValueByPath(fromObject, [
    "candidateCount"
  ]);
  if (fromCandidateCount != null) {
    setValueByPath(toObject, ["candidateCount"], fromCandidateCount);
  }
  const fromEnableAffectiveDialog = getValueByPath(fromObject, [
    "enableAffectiveDialog"
  ]);
  if (fromEnableAffectiveDialog != null) {
    setValueByPath(toObject, ["enableAffectiveDialog"], fromEnableAffectiveDialog);
  }
  const fromFrequencyPenalty = getValueByPath(fromObject, [
    "frequencyPenalty"
  ]);
  if (fromFrequencyPenalty != null) {
    setValueByPath(toObject, ["frequencyPenalty"], fromFrequencyPenalty);
  }
  const fromLogprobs = getValueByPath(fromObject, ["logprobs"]);
  if (fromLogprobs != null) {
    setValueByPath(toObject, ["logprobs"], fromLogprobs);
  }
  const fromMaxOutputTokens = getValueByPath(fromObject, [
    "maxOutputTokens"
  ]);
  if (fromMaxOutputTokens != null) {
    setValueByPath(toObject, ["maxOutputTokens"], fromMaxOutputTokens);
  }
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (fromMediaResolution != null) {
    setValueByPath(toObject, ["mediaResolution"], fromMediaResolution);
  }
  const fromPresencePenalty = getValueByPath(fromObject, [
    "presencePenalty"
  ]);
  if (fromPresencePenalty != null) {
    setValueByPath(toObject, ["presencePenalty"], fromPresencePenalty);
  }
  const fromResponseLogprobs = getValueByPath(fromObject, [
    "responseLogprobs"
  ]);
  if (fromResponseLogprobs != null) {
    setValueByPath(toObject, ["responseLogprobs"], fromResponseLogprobs);
  }
  const fromResponseMimeType = getValueByPath(fromObject, [
    "responseMimeType"
  ]);
  if (fromResponseMimeType != null) {
    setValueByPath(toObject, ["responseMimeType"], fromResponseMimeType);
  }
  const fromResponseModalities = getValueByPath(fromObject, [
    "responseModalities"
  ]);
  if (fromResponseModalities != null) {
    setValueByPath(toObject, ["responseModalities"], fromResponseModalities);
  }
  const fromResponseSchema = getValueByPath(fromObject, [
    "responseSchema"
  ]);
  if (fromResponseSchema != null) {
    setValueByPath(toObject, ["responseSchema"], fromResponseSchema);
  }
  const fromRoutingConfig = getValueByPath(fromObject, [
    "routingConfig"
  ]);
  if (fromRoutingConfig != null) {
    setValueByPath(toObject, ["routingConfig"], fromRoutingConfig);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (fromSeed != null) {
    setValueByPath(toObject, ["seed"], fromSeed);
  }
  const fromSpeechConfig = getValueByPath(fromObject, ["speechConfig"]);
  if (fromSpeechConfig != null) {
    setValueByPath(toObject, ["speechConfig"], fromSpeechConfig);
  }
  const fromStopSequences = getValueByPath(fromObject, [
    "stopSequences"
  ]);
  if (fromStopSequences != null) {
    setValueByPath(toObject, ["stopSequences"], fromStopSequences);
  }
  const fromTemperature = getValueByPath(fromObject, ["temperature"]);
  if (fromTemperature != null) {
    setValueByPath(toObject, ["temperature"], fromTemperature);
  }
  const fromThinkingConfig = getValueByPath(fromObject, [
    "thinkingConfig"
  ]);
  if (fromThinkingConfig != null) {
    setValueByPath(toObject, ["thinkingConfig"], fromThinkingConfig);
  }
  const fromTopK = getValueByPath(fromObject, ["topK"]);
  if (fromTopK != null) {
    setValueByPath(toObject, ["topK"], fromTopK);
  }
  const fromTopP = getValueByPath(fromObject, ["topP"]);
  if (fromTopP != null) {
    setValueByPath(toObject, ["topP"], fromTopP);
  }
  if (getValueByPath(fromObject, ["enableEnhancedCivicAnswers"]) !== void 0) {
    throw new Error("enableEnhancedCivicAnswers parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function getModelParametersToMldev(apiClient, fromObject, _rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "name"], tModel(apiClient, fromModel));
  }
  return toObject;
}
function getModelParametersToVertex(apiClient, fromObject, _rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "name"], tModel(apiClient, fromModel));
  }
  return toObject;
}
function googleMapsToMldev$1(fromObject, rootObject) {
  const toObject = {};
  const fromAuthConfig = getValueByPath(fromObject, ["authConfig"]);
  if (fromAuthConfig != null) {
    setValueByPath(toObject, ["authConfig"], authConfigToMldev$1(fromAuthConfig));
  }
  const fromEnableWidget = getValueByPath(fromObject, ["enableWidget"]);
  if (fromEnableWidget != null) {
    setValueByPath(toObject, ["enableWidget"], fromEnableWidget);
  }
  return toObject;
}
function googleSearchToMldev$1(fromObject, _rootObject) {
  const toObject = {};
  const fromSearchTypes = getValueByPath(fromObject, ["searchTypes"]);
  if (fromSearchTypes != null) {
    setValueByPath(toObject, ["searchTypes"], fromSearchTypes);
  }
  if (getValueByPath(fromObject, ["blockingConfidence"]) !== void 0) {
    throw new Error("blockingConfidence parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["excludeDomains"]) !== void 0) {
    throw new Error("excludeDomains parameter is not supported in Gemini API.");
  }
  const fromTimeRangeFilter = getValueByPath(fromObject, [
    "timeRangeFilter"
  ]);
  if (fromTimeRangeFilter != null) {
    setValueByPath(toObject, ["timeRangeFilter"], fromTimeRangeFilter);
  }
  return toObject;
}
function imageConfigToMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromAspectRatio = getValueByPath(fromObject, ["aspectRatio"]);
  if (fromAspectRatio != null) {
    setValueByPath(toObject, ["aspectRatio"], fromAspectRatio);
  }
  const fromImageSize = getValueByPath(fromObject, ["imageSize"]);
  if (fromImageSize != null) {
    setValueByPath(toObject, ["imageSize"], fromImageSize);
  }
  if (getValueByPath(fromObject, ["personGeneration"]) !== void 0) {
    throw new Error("personGeneration parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["prominentPeople"]) !== void 0) {
    throw new Error("prominentPeople parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["outputMimeType"]) !== void 0) {
    throw new Error("outputMimeType parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["outputCompressionQuality"]) !== void 0) {
    throw new Error("outputCompressionQuality parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["imageOutputOptions"]) !== void 0) {
    throw new Error("imageOutputOptions parameter is not supported in Gemini API.");
  }
  return toObject;
}
function imageConfigToVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromAspectRatio = getValueByPath(fromObject, ["aspectRatio"]);
  if (fromAspectRatio != null) {
    setValueByPath(toObject, ["aspectRatio"], fromAspectRatio);
  }
  const fromImageSize = getValueByPath(fromObject, ["imageSize"]);
  if (fromImageSize != null) {
    setValueByPath(toObject, ["imageSize"], fromImageSize);
  }
  const fromPersonGeneration = getValueByPath(fromObject, [
    "personGeneration"
  ]);
  if (fromPersonGeneration != null) {
    setValueByPath(toObject, ["personGeneration"], fromPersonGeneration);
  }
  const fromProminentPeople = getValueByPath(fromObject, [
    "prominentPeople"
  ]);
  if (fromProminentPeople != null) {
    setValueByPath(toObject, ["prominentPeople"], fromProminentPeople);
  }
  const fromOutputMimeType = getValueByPath(fromObject, [
    "outputMimeType"
  ]);
  if (fromOutputMimeType != null) {
    setValueByPath(toObject, ["imageOutputOptions", "mimeType"], fromOutputMimeType);
  }
  const fromOutputCompressionQuality = getValueByPath(fromObject, [
    "outputCompressionQuality"
  ]);
  if (fromOutputCompressionQuality != null) {
    setValueByPath(toObject, ["imageOutputOptions", "compressionQuality"], fromOutputCompressionQuality);
  }
  const fromImageOutputOptions = getValueByPath(fromObject, [
    "imageOutputOptions"
  ]);
  if (fromImageOutputOptions != null) {
    setValueByPath(toObject, ["imageOutputOptions"], fromImageOutputOptions);
  }
  return toObject;
}
function imageFromMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromImageBytes = getValueByPath(fromObject, [
    "bytesBase64Encoded"
  ]);
  if (fromImageBytes != null) {
    setValueByPath(toObject, ["imageBytes"], tBytes(fromImageBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function imageFromVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromGcsUri = getValueByPath(fromObject, ["gcsUri"]);
  if (fromGcsUri != null) {
    setValueByPath(toObject, ["gcsUri"], fromGcsUri);
  }
  const fromImageBytes = getValueByPath(fromObject, [
    "bytesBase64Encoded"
  ]);
  if (fromImageBytes != null) {
    setValueByPath(toObject, ["imageBytes"], tBytes(fromImageBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function imageToMldev(fromObject, _rootObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["gcsUri"]) !== void 0) {
    throw new Error("gcsUri parameter is not supported in Gemini API.");
  }
  const fromImageBytes = getValueByPath(fromObject, ["imageBytes"]);
  if (fromImageBytes != null) {
    setValueByPath(toObject, ["bytesBase64Encoded"], tBytes(fromImageBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function imageToVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromGcsUri = getValueByPath(fromObject, ["gcsUri"]);
  if (fromGcsUri != null) {
    setValueByPath(toObject, ["gcsUri"], fromGcsUri);
  }
  const fromImageBytes = getValueByPath(fromObject, ["imageBytes"]);
  if (fromImageBytes != null) {
    setValueByPath(toObject, ["bytesBase64Encoded"], tBytes(fromImageBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function listModelsConfigToMldev(apiClient, fromObject, parentObject, _rootObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== void 0 && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== void 0 && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  const fromFilter = getValueByPath(fromObject, ["filter"]);
  if (parentObject !== void 0 && fromFilter != null) {
    setValueByPath(parentObject, ["_query", "filter"], fromFilter);
  }
  const fromQueryBase = getValueByPath(fromObject, ["queryBase"]);
  if (parentObject !== void 0 && fromQueryBase != null) {
    setValueByPath(parentObject, ["_url", "models_url"], tModelsUrl(apiClient, fromQueryBase));
  }
  return toObject;
}
function listModelsConfigToVertex(apiClient, fromObject, parentObject, _rootObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== void 0 && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== void 0 && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  const fromFilter = getValueByPath(fromObject, ["filter"]);
  if (parentObject !== void 0 && fromFilter != null) {
    setValueByPath(parentObject, ["_query", "filter"], fromFilter);
  }
  const fromQueryBase = getValueByPath(fromObject, ["queryBase"]);
  if (parentObject !== void 0 && fromQueryBase != null) {
    setValueByPath(parentObject, ["_url", "models_url"], tModelsUrl(apiClient, fromQueryBase));
  }
  return toObject;
}
function listModelsParametersToMldev(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    listModelsConfigToMldev(apiClient, fromConfig, toObject);
  }
  return toObject;
}
function listModelsParametersToVertex(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    listModelsConfigToVertex(apiClient, fromConfig, toObject);
  }
  return toObject;
}
function listModelsResponseFromMldev(fromObject, rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromModels = getValueByPath(fromObject, ["_self"]);
  if (fromModels != null) {
    let transformedList = tExtractModels(fromModels);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return modelFromMldev(item);
      });
    }
    setValueByPath(toObject, ["models"], transformedList);
  }
  return toObject;
}
function listModelsResponseFromVertex(fromObject, rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromModels = getValueByPath(fromObject, ["_self"]);
  if (fromModels != null) {
    let transformedList = tExtractModels(fromModels);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return modelFromVertex(item);
      });
    }
    setValueByPath(toObject, ["models"], transformedList);
  }
  return toObject;
}
function maskReferenceConfigToVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromMaskMode = getValueByPath(fromObject, ["maskMode"]);
  if (fromMaskMode != null) {
    setValueByPath(toObject, ["maskMode"], fromMaskMode);
  }
  const fromSegmentationClasses = getValueByPath(fromObject, [
    "segmentationClasses"
  ]);
  if (fromSegmentationClasses != null) {
    setValueByPath(toObject, ["maskClasses"], fromSegmentationClasses);
  }
  const fromMaskDilation = getValueByPath(fromObject, ["maskDilation"]);
  if (fromMaskDilation != null) {
    setValueByPath(toObject, ["dilation"], fromMaskDilation);
  }
  return toObject;
}
function modelFromMldev(fromObject, rootObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (fromDisplayName != null) {
    setValueByPath(toObject, ["displayName"], fromDisplayName);
  }
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (fromDescription != null) {
    setValueByPath(toObject, ["description"], fromDescription);
  }
  const fromVersion = getValueByPath(fromObject, ["version"]);
  if (fromVersion != null) {
    setValueByPath(toObject, ["version"], fromVersion);
  }
  const fromTunedModelInfo = getValueByPath(fromObject, ["_self"]);
  if (fromTunedModelInfo != null) {
    setValueByPath(toObject, ["tunedModelInfo"], tunedModelInfoFromMldev(fromTunedModelInfo));
  }
  const fromInputTokenLimit = getValueByPath(fromObject, [
    "inputTokenLimit"
  ]);
  if (fromInputTokenLimit != null) {
    setValueByPath(toObject, ["inputTokenLimit"], fromInputTokenLimit);
  }
  const fromOutputTokenLimit = getValueByPath(fromObject, [
    "outputTokenLimit"
  ]);
  if (fromOutputTokenLimit != null) {
    setValueByPath(toObject, ["outputTokenLimit"], fromOutputTokenLimit);
  }
  const fromSupportedActions = getValueByPath(fromObject, [
    "supportedGenerationMethods"
  ]);
  if (fromSupportedActions != null) {
    setValueByPath(toObject, ["supportedActions"], fromSupportedActions);
  }
  const fromTemperature = getValueByPath(fromObject, ["temperature"]);
  if (fromTemperature != null) {
    setValueByPath(toObject, ["temperature"], fromTemperature);
  }
  const fromMaxTemperature = getValueByPath(fromObject, [
    "maxTemperature"
  ]);
  if (fromMaxTemperature != null) {
    setValueByPath(toObject, ["maxTemperature"], fromMaxTemperature);
  }
  const fromTopP = getValueByPath(fromObject, ["topP"]);
  if (fromTopP != null) {
    setValueByPath(toObject, ["topP"], fromTopP);
  }
  const fromTopK = getValueByPath(fromObject, ["topK"]);
  if (fromTopK != null) {
    setValueByPath(toObject, ["topK"], fromTopK);
  }
  const fromThinking = getValueByPath(fromObject, ["thinking"]);
  if (fromThinking != null) {
    setValueByPath(toObject, ["thinking"], fromThinking);
  }
  return toObject;
}
function modelFromVertex(fromObject, rootObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (fromDisplayName != null) {
    setValueByPath(toObject, ["displayName"], fromDisplayName);
  }
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (fromDescription != null) {
    setValueByPath(toObject, ["description"], fromDescription);
  }
  const fromVersion = getValueByPath(fromObject, ["versionId"]);
  if (fromVersion != null) {
    setValueByPath(toObject, ["version"], fromVersion);
  }
  const fromEndpoints = getValueByPath(fromObject, ["deployedModels"]);
  if (fromEndpoints != null) {
    let transformedList = fromEndpoints;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return endpointFromVertex(item);
      });
    }
    setValueByPath(toObject, ["endpoints"], transformedList);
  }
  const fromLabels = getValueByPath(fromObject, ["labels"]);
  if (fromLabels != null) {
    setValueByPath(toObject, ["labels"], fromLabels);
  }
  const fromTunedModelInfo = getValueByPath(fromObject, ["_self"]);
  if (fromTunedModelInfo != null) {
    setValueByPath(toObject, ["tunedModelInfo"], tunedModelInfoFromVertex(fromTunedModelInfo));
  }
  const fromDefaultCheckpointId = getValueByPath(fromObject, [
    "defaultCheckpointId"
  ]);
  if (fromDefaultCheckpointId != null) {
    setValueByPath(toObject, ["defaultCheckpointId"], fromDefaultCheckpointId);
  }
  const fromCheckpoints = getValueByPath(fromObject, ["checkpoints"]);
  if (fromCheckpoints != null) {
    let transformedList = fromCheckpoints;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["checkpoints"], transformedList);
  }
  return toObject;
}
function partToMldev$1(fromObject, rootObject) {
  const toObject = {};
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (fromMediaResolution != null) {
    setValueByPath(toObject, ["mediaResolution"], fromMediaResolution);
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fileDataToMldev$1(fromFileData));
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], functionCallToMldev$1(fromFunctionCall));
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], blobToMldev$1(fromInlineData));
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromThoughtSignature = getValueByPath(fromObject, [
    "thoughtSignature"
  ]);
  if (fromThoughtSignature != null) {
    setValueByPath(toObject, ["thoughtSignature"], fromThoughtSignature);
  }
  const fromVideoMetadata = getValueByPath(fromObject, [
    "videoMetadata"
  ]);
  if (fromVideoMetadata != null) {
    setValueByPath(toObject, ["videoMetadata"], fromVideoMetadata);
  }
  const fromToolCall = getValueByPath(fromObject, ["toolCall"]);
  if (fromToolCall != null) {
    setValueByPath(toObject, ["toolCall"], fromToolCall);
  }
  const fromToolResponse = getValueByPath(fromObject, ["toolResponse"]);
  if (fromToolResponse != null) {
    setValueByPath(toObject, ["toolResponse"], fromToolResponse);
  }
  return toObject;
}
function partToVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (fromMediaResolution != null) {
    setValueByPath(toObject, ["mediaResolution"], fromMediaResolution);
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fromFileData);
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], fromFunctionCall);
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], fromInlineData);
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromThoughtSignature = getValueByPath(fromObject, [
    "thoughtSignature"
  ]);
  if (fromThoughtSignature != null) {
    setValueByPath(toObject, ["thoughtSignature"], fromThoughtSignature);
  }
  const fromVideoMetadata = getValueByPath(fromObject, [
    "videoMetadata"
  ]);
  if (fromVideoMetadata != null) {
    setValueByPath(toObject, ["videoMetadata"], fromVideoMetadata);
  }
  if (getValueByPath(fromObject, ["toolCall"]) !== void 0) {
    throw new Error("toolCall parameter is not supported in Vertex AI.");
  }
  if (getValueByPath(fromObject, ["toolResponse"]) !== void 0) {
    throw new Error("toolResponse parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function productImageToVertex(fromObject, rootObject) {
  const toObject = {};
  const fromProductImage = getValueByPath(fromObject, ["productImage"]);
  if (fromProductImage != null) {
    setValueByPath(toObject, ["image"], imageToVertex(fromProductImage));
  }
  return toObject;
}
function recontextImageConfigToVertex(fromObject, parentObject, _rootObject) {
  const toObject = {};
  const fromNumberOfImages = getValueByPath(fromObject, [
    "numberOfImages"
  ]);
  if (parentObject !== void 0 && fromNumberOfImages != null) {
    setValueByPath(parentObject, ["parameters", "sampleCount"], fromNumberOfImages);
  }
  const fromBaseSteps = getValueByPath(fromObject, ["baseSteps"]);
  if (parentObject !== void 0 && fromBaseSteps != null) {
    setValueByPath(parentObject, ["parameters", "baseSteps"], fromBaseSteps);
  }
  const fromOutputGcsUri = getValueByPath(fromObject, ["outputGcsUri"]);
  if (parentObject !== void 0 && fromOutputGcsUri != null) {
    setValueByPath(parentObject, ["parameters", "storageUri"], fromOutputGcsUri);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (parentObject !== void 0 && fromSeed != null) {
    setValueByPath(parentObject, ["parameters", "seed"], fromSeed);
  }
  const fromSafetyFilterLevel = getValueByPath(fromObject, [
    "safetyFilterLevel"
  ]);
  if (parentObject !== void 0 && fromSafetyFilterLevel != null) {
    setValueByPath(parentObject, ["parameters", "safetySetting"], fromSafetyFilterLevel);
  }
  const fromPersonGeneration = getValueByPath(fromObject, [
    "personGeneration"
  ]);
  if (parentObject !== void 0 && fromPersonGeneration != null) {
    setValueByPath(parentObject, ["parameters", "personGeneration"], fromPersonGeneration);
  }
  const fromAddWatermark = getValueByPath(fromObject, ["addWatermark"]);
  if (parentObject !== void 0 && fromAddWatermark != null) {
    setValueByPath(parentObject, ["parameters", "addWatermark"], fromAddWatermark);
  }
  const fromOutputMimeType = getValueByPath(fromObject, [
    "outputMimeType"
  ]);
  if (parentObject !== void 0 && fromOutputMimeType != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "mimeType"], fromOutputMimeType);
  }
  const fromOutputCompressionQuality = getValueByPath(fromObject, [
    "outputCompressionQuality"
  ]);
  if (parentObject !== void 0 && fromOutputCompressionQuality != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "compressionQuality"], fromOutputCompressionQuality);
  }
  const fromEnhancePrompt = getValueByPath(fromObject, [
    "enhancePrompt"
  ]);
  if (parentObject !== void 0 && fromEnhancePrompt != null) {
    setValueByPath(parentObject, ["parameters", "enhancePrompt"], fromEnhancePrompt);
  }
  const fromLabels = getValueByPath(fromObject, ["labels"]);
  if (parentObject !== void 0 && fromLabels != null) {
    setValueByPath(parentObject, ["labels"], fromLabels);
  }
  return toObject;
}
function recontextImageParametersToVertex(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromSource = getValueByPath(fromObject, ["source"]);
  if (fromSource != null) {
    recontextImageSourceToVertex(fromSource, toObject);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    recontextImageConfigToVertex(fromConfig, toObject);
  }
  return toObject;
}
function recontextImageResponseFromVertex(fromObject, rootObject) {
  const toObject = {};
  const fromGeneratedImages = getValueByPath(fromObject, [
    "predictions"
  ]);
  if (fromGeneratedImages != null) {
    let transformedList = fromGeneratedImages;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedImageFromVertex(item);
      });
    }
    setValueByPath(toObject, ["generatedImages"], transformedList);
  }
  return toObject;
}
function recontextImageSourceToVertex(fromObject, parentObject, rootObject) {
  const toObject = {};
  const fromPrompt = getValueByPath(fromObject, ["prompt"]);
  if (parentObject !== void 0 && fromPrompt != null) {
    setValueByPath(parentObject, ["instances[0]", "prompt"], fromPrompt);
  }
  const fromPersonImage = getValueByPath(fromObject, ["personImage"]);
  if (parentObject !== void 0 && fromPersonImage != null) {
    setValueByPath(parentObject, ["instances[0]", "personImage", "image"], imageToVertex(fromPersonImage));
  }
  const fromProductImages = getValueByPath(fromObject, [
    "productImages"
  ]);
  if (parentObject !== void 0 && fromProductImages != null) {
    let transformedList = fromProductImages;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return productImageToVertex(item);
      });
    }
    setValueByPath(parentObject, ["instances[0]", "productImages"], transformedList);
  }
  return toObject;
}
function referenceImageAPIInternalToVertex(fromObject, rootObject) {
  const toObject = {};
  const fromReferenceImage = getValueByPath(fromObject, [
    "referenceImage"
  ]);
  if (fromReferenceImage != null) {
    setValueByPath(toObject, ["referenceImage"], imageToVertex(fromReferenceImage));
  }
  const fromReferenceId = getValueByPath(fromObject, ["referenceId"]);
  if (fromReferenceId != null) {
    setValueByPath(toObject, ["referenceId"], fromReferenceId);
  }
  const fromReferenceType = getValueByPath(fromObject, [
    "referenceType"
  ]);
  if (fromReferenceType != null) {
    setValueByPath(toObject, ["referenceType"], fromReferenceType);
  }
  const fromMaskImageConfig = getValueByPath(fromObject, [
    "maskImageConfig"
  ]);
  if (fromMaskImageConfig != null) {
    setValueByPath(toObject, ["maskImageConfig"], maskReferenceConfigToVertex(fromMaskImageConfig));
  }
  const fromControlImageConfig = getValueByPath(fromObject, [
    "controlImageConfig"
  ]);
  if (fromControlImageConfig != null) {
    setValueByPath(toObject, ["controlImageConfig"], controlReferenceConfigToVertex(fromControlImageConfig));
  }
  const fromStyleImageConfig = getValueByPath(fromObject, [
    "styleImageConfig"
  ]);
  if (fromStyleImageConfig != null) {
    setValueByPath(toObject, ["styleImageConfig"], fromStyleImageConfig);
  }
  const fromSubjectImageConfig = getValueByPath(fromObject, [
    "subjectImageConfig"
  ]);
  if (fromSubjectImageConfig != null) {
    setValueByPath(toObject, ["subjectImageConfig"], fromSubjectImageConfig);
  }
  return toObject;
}
function safetyAttributesFromMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromCategories = getValueByPath(fromObject, [
    "safetyAttributes",
    "categories"
  ]);
  if (fromCategories != null) {
    setValueByPath(toObject, ["categories"], fromCategories);
  }
  const fromScores = getValueByPath(fromObject, [
    "safetyAttributes",
    "scores"
  ]);
  if (fromScores != null) {
    setValueByPath(toObject, ["scores"], fromScores);
  }
  const fromContentType = getValueByPath(fromObject, ["contentType"]);
  if (fromContentType != null) {
    setValueByPath(toObject, ["contentType"], fromContentType);
  }
  return toObject;
}
function safetyAttributesFromVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromCategories = getValueByPath(fromObject, [
    "safetyAttributes",
    "categories"
  ]);
  if (fromCategories != null) {
    setValueByPath(toObject, ["categories"], fromCategories);
  }
  const fromScores = getValueByPath(fromObject, [
    "safetyAttributes",
    "scores"
  ]);
  if (fromScores != null) {
    setValueByPath(toObject, ["scores"], fromScores);
  }
  const fromContentType = getValueByPath(fromObject, ["contentType"]);
  if (fromContentType != null) {
    setValueByPath(toObject, ["contentType"], fromContentType);
  }
  return toObject;
}
function safetySettingToMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromCategory = getValueByPath(fromObject, ["category"]);
  if (fromCategory != null) {
    setValueByPath(toObject, ["category"], fromCategory);
  }
  if (getValueByPath(fromObject, ["method"]) !== void 0) {
    throw new Error("method parameter is not supported in Gemini API.");
  }
  const fromThreshold = getValueByPath(fromObject, ["threshold"]);
  if (fromThreshold != null) {
    setValueByPath(toObject, ["threshold"], fromThreshold);
  }
  return toObject;
}
function scribbleImageToVertex(fromObject, rootObject) {
  const toObject = {};
  const fromImage = getValueByPath(fromObject, ["image"]);
  if (fromImage != null) {
    setValueByPath(toObject, ["image"], imageToVertex(fromImage));
  }
  return toObject;
}
function segmentImageConfigToVertex(fromObject, parentObject, _rootObject) {
  const toObject = {};
  const fromMode = getValueByPath(fromObject, ["mode"]);
  if (parentObject !== void 0 && fromMode != null) {
    setValueByPath(parentObject, ["parameters", "mode"], fromMode);
  }
  const fromMaxPredictions = getValueByPath(fromObject, [
    "maxPredictions"
  ]);
  if (parentObject !== void 0 && fromMaxPredictions != null) {
    setValueByPath(parentObject, ["parameters", "maxPredictions"], fromMaxPredictions);
  }
  const fromConfidenceThreshold = getValueByPath(fromObject, [
    "confidenceThreshold"
  ]);
  if (parentObject !== void 0 && fromConfidenceThreshold != null) {
    setValueByPath(parentObject, ["parameters", "confidenceThreshold"], fromConfidenceThreshold);
  }
  const fromMaskDilation = getValueByPath(fromObject, ["maskDilation"]);
  if (parentObject !== void 0 && fromMaskDilation != null) {
    setValueByPath(parentObject, ["parameters", "maskDilation"], fromMaskDilation);
  }
  const fromBinaryColorThreshold = getValueByPath(fromObject, [
    "binaryColorThreshold"
  ]);
  if (parentObject !== void 0 && fromBinaryColorThreshold != null) {
    setValueByPath(parentObject, ["parameters", "binaryColorThreshold"], fromBinaryColorThreshold);
  }
  const fromLabels = getValueByPath(fromObject, ["labels"]);
  if (parentObject !== void 0 && fromLabels != null) {
    setValueByPath(parentObject, ["labels"], fromLabels);
  }
  return toObject;
}
function segmentImageParametersToVertex(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromSource = getValueByPath(fromObject, ["source"]);
  if (fromSource != null) {
    segmentImageSourceToVertex(fromSource, toObject);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    segmentImageConfigToVertex(fromConfig, toObject);
  }
  return toObject;
}
function segmentImageResponseFromVertex(fromObject, rootObject) {
  const toObject = {};
  const fromGeneratedMasks = getValueByPath(fromObject, ["predictions"]);
  if (fromGeneratedMasks != null) {
    let transformedList = fromGeneratedMasks;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedImageMaskFromVertex(item);
      });
    }
    setValueByPath(toObject, ["generatedMasks"], transformedList);
  }
  return toObject;
}
function segmentImageSourceToVertex(fromObject, parentObject, rootObject) {
  const toObject = {};
  const fromPrompt = getValueByPath(fromObject, ["prompt"]);
  if (parentObject !== void 0 && fromPrompt != null) {
    setValueByPath(parentObject, ["instances[0]", "prompt"], fromPrompt);
  }
  const fromImage = getValueByPath(fromObject, ["image"]);
  if (parentObject !== void 0 && fromImage != null) {
    setValueByPath(parentObject, ["instances[0]", "image"], imageToVertex(fromImage));
  }
  const fromScribbleImage = getValueByPath(fromObject, [
    "scribbleImage"
  ]);
  if (parentObject !== void 0 && fromScribbleImage != null) {
    setValueByPath(parentObject, ["instances[0]", "scribble"], scribbleImageToVertex(fromScribbleImage));
  }
  return toObject;
}
function toolConfigToMldev(fromObject, rootObject) {
  const toObject = {};
  const fromRetrievalConfig = getValueByPath(fromObject, [
    "retrievalConfig"
  ]);
  if (fromRetrievalConfig != null) {
    setValueByPath(toObject, ["retrievalConfig"], fromRetrievalConfig);
  }
  const fromFunctionCallingConfig = getValueByPath(fromObject, [
    "functionCallingConfig"
  ]);
  if (fromFunctionCallingConfig != null) {
    setValueByPath(toObject, ["functionCallingConfig"], functionCallingConfigToMldev(fromFunctionCallingConfig));
  }
  const fromIncludeServerSideToolInvocations = getValueByPath(fromObject, ["includeServerSideToolInvocations"]);
  if (fromIncludeServerSideToolInvocations != null) {
    setValueByPath(toObject, ["includeServerSideToolInvocations"], fromIncludeServerSideToolInvocations);
  }
  return toObject;
}
function toolConfigToVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromRetrievalConfig = getValueByPath(fromObject, [
    "retrievalConfig"
  ]);
  if (fromRetrievalConfig != null) {
    setValueByPath(toObject, ["retrievalConfig"], fromRetrievalConfig);
  }
  const fromFunctionCallingConfig = getValueByPath(fromObject, [
    "functionCallingConfig"
  ]);
  if (fromFunctionCallingConfig != null) {
    setValueByPath(toObject, ["functionCallingConfig"], fromFunctionCallingConfig);
  }
  if (getValueByPath(fromObject, ["includeServerSideToolInvocations"]) !== void 0) {
    throw new Error("includeServerSideToolInvocations parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function toolToMldev$1(fromObject, rootObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["retrieval"]) !== void 0) {
    throw new Error("retrieval parameter is not supported in Gemini API.");
  }
  const fromComputerUse = getValueByPath(fromObject, ["computerUse"]);
  if (fromComputerUse != null) {
    setValueByPath(toObject, ["computerUse"], fromComputerUse);
  }
  const fromFileSearch = getValueByPath(fromObject, ["fileSearch"]);
  if (fromFileSearch != null) {
    setValueByPath(toObject, ["fileSearch"], fromFileSearch);
  }
  const fromGoogleSearch = getValueByPath(fromObject, ["googleSearch"]);
  if (fromGoogleSearch != null) {
    setValueByPath(toObject, ["googleSearch"], googleSearchToMldev$1(fromGoogleSearch));
  }
  const fromGoogleMaps = getValueByPath(fromObject, ["googleMaps"]);
  if (fromGoogleMaps != null) {
    setValueByPath(toObject, ["googleMaps"], googleMapsToMldev$1(fromGoogleMaps));
  }
  const fromCodeExecution = getValueByPath(fromObject, [
    "codeExecution"
  ]);
  if (fromCodeExecution != null) {
    setValueByPath(toObject, ["codeExecution"], fromCodeExecution);
  }
  if (getValueByPath(fromObject, ["enterpriseWebSearch"]) !== void 0) {
    throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  }
  const fromFunctionDeclarations = getValueByPath(fromObject, [
    "functionDeclarations"
  ]);
  if (fromFunctionDeclarations != null) {
    let transformedList = fromFunctionDeclarations;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["functionDeclarations"], transformedList);
  }
  const fromGoogleSearchRetrieval = getValueByPath(fromObject, [
    "googleSearchRetrieval"
  ]);
  if (fromGoogleSearchRetrieval != null) {
    setValueByPath(toObject, ["googleSearchRetrieval"], fromGoogleSearchRetrieval);
  }
  if (getValueByPath(fromObject, ["parallelAiSearch"]) !== void 0) {
    throw new Error("parallelAiSearch parameter is not supported in Gemini API.");
  }
  const fromUrlContext = getValueByPath(fromObject, ["urlContext"]);
  if (fromUrlContext != null) {
    setValueByPath(toObject, ["urlContext"], fromUrlContext);
  }
  const fromMcpServers = getValueByPath(fromObject, ["mcpServers"]);
  if (fromMcpServers != null) {
    let transformedList = fromMcpServers;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["mcpServers"], transformedList);
  }
  return toObject;
}
function toolToVertex(fromObject, rootObject) {
  const toObject = {};
  const fromRetrieval = getValueByPath(fromObject, ["retrieval"]);
  if (fromRetrieval != null) {
    setValueByPath(toObject, ["retrieval"], fromRetrieval);
  }
  const fromComputerUse = getValueByPath(fromObject, ["computerUse"]);
  if (fromComputerUse != null) {
    setValueByPath(toObject, ["computerUse"], fromComputerUse);
  }
  if (getValueByPath(fromObject, ["fileSearch"]) !== void 0) {
    throw new Error("fileSearch parameter is not supported in Vertex AI.");
  }
  const fromGoogleSearch = getValueByPath(fromObject, ["googleSearch"]);
  if (fromGoogleSearch != null) {
    setValueByPath(toObject, ["googleSearch"], fromGoogleSearch);
  }
  const fromGoogleMaps = getValueByPath(fromObject, ["googleMaps"]);
  if (fromGoogleMaps != null) {
    setValueByPath(toObject, ["googleMaps"], fromGoogleMaps);
  }
  const fromCodeExecution = getValueByPath(fromObject, [
    "codeExecution"
  ]);
  if (fromCodeExecution != null) {
    setValueByPath(toObject, ["codeExecution"], fromCodeExecution);
  }
  const fromEnterpriseWebSearch = getValueByPath(fromObject, [
    "enterpriseWebSearch"
  ]);
  if (fromEnterpriseWebSearch != null) {
    setValueByPath(toObject, ["enterpriseWebSearch"], fromEnterpriseWebSearch);
  }
  const fromFunctionDeclarations = getValueByPath(fromObject, [
    "functionDeclarations"
  ]);
  if (fromFunctionDeclarations != null) {
    let transformedList = fromFunctionDeclarations;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return functionDeclarationToVertex(item);
      });
    }
    setValueByPath(toObject, ["functionDeclarations"], transformedList);
  }
  const fromGoogleSearchRetrieval = getValueByPath(fromObject, [
    "googleSearchRetrieval"
  ]);
  if (fromGoogleSearchRetrieval != null) {
    setValueByPath(toObject, ["googleSearchRetrieval"], fromGoogleSearchRetrieval);
  }
  const fromParallelAiSearch = getValueByPath(fromObject, [
    "parallelAiSearch"
  ]);
  if (fromParallelAiSearch != null) {
    setValueByPath(toObject, ["parallelAiSearch"], fromParallelAiSearch);
  }
  const fromUrlContext = getValueByPath(fromObject, ["urlContext"]);
  if (fromUrlContext != null) {
    setValueByPath(toObject, ["urlContext"], fromUrlContext);
  }
  if (getValueByPath(fromObject, ["mcpServers"]) !== void 0) {
    throw new Error("mcpServers parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function tunedModelInfoFromMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromBaseModel = getValueByPath(fromObject, ["baseModel"]);
  if (fromBaseModel != null) {
    setValueByPath(toObject, ["baseModel"], fromBaseModel);
  }
  const fromCreateTime = getValueByPath(fromObject, ["createTime"]);
  if (fromCreateTime != null) {
    setValueByPath(toObject, ["createTime"], fromCreateTime);
  }
  const fromUpdateTime = getValueByPath(fromObject, ["updateTime"]);
  if (fromUpdateTime != null) {
    setValueByPath(toObject, ["updateTime"], fromUpdateTime);
  }
  return toObject;
}
function tunedModelInfoFromVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromBaseModel = getValueByPath(fromObject, [
    "labels",
    "google-vertex-llm-tuning-base-model-id"
  ]);
  if (fromBaseModel != null) {
    setValueByPath(toObject, ["baseModel"], fromBaseModel);
  }
  const fromCreateTime = getValueByPath(fromObject, ["createTime"]);
  if (fromCreateTime != null) {
    setValueByPath(toObject, ["createTime"], fromCreateTime);
  }
  const fromUpdateTime = getValueByPath(fromObject, ["updateTime"]);
  if (fromUpdateTime != null) {
    setValueByPath(toObject, ["updateTime"], fromUpdateTime);
  }
  return toObject;
}
function updateModelConfigToMldev(fromObject, parentObject, _rootObject) {
  const toObject = {};
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (parentObject !== void 0 && fromDisplayName != null) {
    setValueByPath(parentObject, ["displayName"], fromDisplayName);
  }
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (parentObject !== void 0 && fromDescription != null) {
    setValueByPath(parentObject, ["description"], fromDescription);
  }
  const fromDefaultCheckpointId = getValueByPath(fromObject, [
    "defaultCheckpointId"
  ]);
  if (parentObject !== void 0 && fromDefaultCheckpointId != null) {
    setValueByPath(parentObject, ["defaultCheckpointId"], fromDefaultCheckpointId);
  }
  return toObject;
}
function updateModelConfigToVertex(fromObject, parentObject, _rootObject) {
  const toObject = {};
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (parentObject !== void 0 && fromDisplayName != null) {
    setValueByPath(parentObject, ["displayName"], fromDisplayName);
  }
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (parentObject !== void 0 && fromDescription != null) {
    setValueByPath(parentObject, ["description"], fromDescription);
  }
  const fromDefaultCheckpointId = getValueByPath(fromObject, [
    "defaultCheckpointId"
  ]);
  if (parentObject !== void 0 && fromDefaultCheckpointId != null) {
    setValueByPath(parentObject, ["defaultCheckpointId"], fromDefaultCheckpointId);
  }
  return toObject;
}
function updateModelParametersToMldev(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "name"], tModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    updateModelConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function updateModelParametersToVertex(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    updateModelConfigToVertex(fromConfig, toObject);
  }
  return toObject;
}
function upscaleImageAPIConfigInternalToVertex(fromObject, parentObject, _rootObject) {
  const toObject = {};
  const fromOutputGcsUri = getValueByPath(fromObject, ["outputGcsUri"]);
  if (parentObject !== void 0 && fromOutputGcsUri != null) {
    setValueByPath(parentObject, ["parameters", "storageUri"], fromOutputGcsUri);
  }
  const fromSafetyFilterLevel = getValueByPath(fromObject, [
    "safetyFilterLevel"
  ]);
  if (parentObject !== void 0 && fromSafetyFilterLevel != null) {
    setValueByPath(parentObject, ["parameters", "safetySetting"], fromSafetyFilterLevel);
  }
  const fromPersonGeneration = getValueByPath(fromObject, [
    "personGeneration"
  ]);
  if (parentObject !== void 0 && fromPersonGeneration != null) {
    setValueByPath(parentObject, ["parameters", "personGeneration"], fromPersonGeneration);
  }
  const fromIncludeRaiReason = getValueByPath(fromObject, [
    "includeRaiReason"
  ]);
  if (parentObject !== void 0 && fromIncludeRaiReason != null) {
    setValueByPath(parentObject, ["parameters", "includeRaiReason"], fromIncludeRaiReason);
  }
  const fromOutputMimeType = getValueByPath(fromObject, [
    "outputMimeType"
  ]);
  if (parentObject !== void 0 && fromOutputMimeType != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "mimeType"], fromOutputMimeType);
  }
  const fromOutputCompressionQuality = getValueByPath(fromObject, [
    "outputCompressionQuality"
  ]);
  if (parentObject !== void 0 && fromOutputCompressionQuality != null) {
    setValueByPath(parentObject, ["parameters", "outputOptions", "compressionQuality"], fromOutputCompressionQuality);
  }
  const fromEnhanceInputImage = getValueByPath(fromObject, [
    "enhanceInputImage"
  ]);
  if (parentObject !== void 0 && fromEnhanceInputImage != null) {
    setValueByPath(parentObject, ["parameters", "upscaleConfig", "enhanceInputImage"], fromEnhanceInputImage);
  }
  const fromImagePreservationFactor = getValueByPath(fromObject, [
    "imagePreservationFactor"
  ]);
  if (parentObject !== void 0 && fromImagePreservationFactor != null) {
    setValueByPath(parentObject, ["parameters", "upscaleConfig", "imagePreservationFactor"], fromImagePreservationFactor);
  }
  const fromLabels = getValueByPath(fromObject, ["labels"]);
  if (parentObject !== void 0 && fromLabels != null) {
    setValueByPath(parentObject, ["labels"], fromLabels);
  }
  const fromNumberOfImages = getValueByPath(fromObject, [
    "numberOfImages"
  ]);
  if (parentObject !== void 0 && fromNumberOfImages != null) {
    setValueByPath(parentObject, ["parameters", "sampleCount"], fromNumberOfImages);
  }
  const fromMode = getValueByPath(fromObject, ["mode"]);
  if (parentObject !== void 0 && fromMode != null) {
    setValueByPath(parentObject, ["parameters", "mode"], fromMode);
  }
  return toObject;
}
function upscaleImageAPIParametersInternalToVertex(apiClient, fromObject, rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["_url", "model"], tModel(apiClient, fromModel));
  }
  const fromImage = getValueByPath(fromObject, ["image"]);
  if (fromImage != null) {
    setValueByPath(toObject, ["instances[0]", "image"], imageToVertex(fromImage));
  }
  const fromUpscaleFactor = getValueByPath(fromObject, [
    "upscaleFactor"
  ]);
  if (fromUpscaleFactor != null) {
    setValueByPath(toObject, ["parameters", "upscaleConfig", "upscaleFactor"], fromUpscaleFactor);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    upscaleImageAPIConfigInternalToVertex(fromConfig, toObject);
  }
  return toObject;
}
function upscaleImageResponseFromVertex(fromObject, rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromGeneratedImages = getValueByPath(fromObject, [
    "predictions"
  ]);
  if (fromGeneratedImages != null) {
    let transformedList = fromGeneratedImages;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return generatedImageFromVertex(item);
      });
    }
    setValueByPath(toObject, ["generatedImages"], transformedList);
  }
  return toObject;
}
function videoFromMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromUri = getValueByPath(fromObject, ["uri"]);
  if (fromUri != null) {
    setValueByPath(toObject, ["uri"], fromUri);
  }
  const fromVideoBytes = getValueByPath(fromObject, ["encodedVideo"]);
  if (fromVideoBytes != null) {
    setValueByPath(toObject, ["videoBytes"], tBytes(fromVideoBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["encoding"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function videoFromVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromUri = getValueByPath(fromObject, ["gcsUri"]);
  if (fromUri != null) {
    setValueByPath(toObject, ["uri"], fromUri);
  }
  const fromVideoBytes = getValueByPath(fromObject, [
    "bytesBase64Encoded"
  ]);
  if (fromVideoBytes != null) {
    setValueByPath(toObject, ["videoBytes"], tBytes(fromVideoBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function videoGenerationMaskToVertex(fromObject, rootObject) {
  const toObject = {};
  const fromImage = getValueByPath(fromObject, ["image"]);
  if (fromImage != null) {
    setValueByPath(toObject, ["_self"], imageToVertex(fromImage));
  }
  const fromMaskMode = getValueByPath(fromObject, ["maskMode"]);
  if (fromMaskMode != null) {
    setValueByPath(toObject, ["maskMode"], fromMaskMode);
  }
  return toObject;
}
function videoGenerationReferenceImageToMldev(fromObject, rootObject) {
  const toObject = {};
  const fromImage = getValueByPath(fromObject, ["image"]);
  if (fromImage != null) {
    setValueByPath(toObject, ["image"], imageToMldev(fromImage));
  }
  const fromReferenceType = getValueByPath(fromObject, [
    "referenceType"
  ]);
  if (fromReferenceType != null) {
    setValueByPath(toObject, ["referenceType"], fromReferenceType);
  }
  return toObject;
}
function videoGenerationReferenceImageToVertex(fromObject, rootObject) {
  const toObject = {};
  const fromImage = getValueByPath(fromObject, ["image"]);
  if (fromImage != null) {
    setValueByPath(toObject, ["image"], imageToVertex(fromImage));
  }
  const fromReferenceType = getValueByPath(fromObject, [
    "referenceType"
  ]);
  if (fromReferenceType != null) {
    setValueByPath(toObject, ["referenceType"], fromReferenceType);
  }
  return toObject;
}
function videoToMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromUri = getValueByPath(fromObject, ["uri"]);
  if (fromUri != null) {
    setValueByPath(toObject, ["uri"], fromUri);
  }
  const fromVideoBytes = getValueByPath(fromObject, ["videoBytes"]);
  if (fromVideoBytes != null) {
    setValueByPath(toObject, ["encodedVideo"], tBytes(fromVideoBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["encoding"], fromMimeType);
  }
  return toObject;
}
function videoToVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromUri = getValueByPath(fromObject, ["uri"]);
  if (fromUri != null) {
    setValueByPath(toObject, ["gcsUri"], fromUri);
  }
  const fromVideoBytes = getValueByPath(fromObject, ["videoBytes"]);
  if (fromVideoBytes != null) {
    setValueByPath(toObject, ["bytesBase64Encoded"], tBytes(fromVideoBytes));
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function createFileSearchStoreConfigToMldev(fromObject, parentObject) {
  const toObject = {};
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (parentObject !== void 0 && fromDisplayName != null) {
    setValueByPath(parentObject, ["displayName"], fromDisplayName);
  }
  return toObject;
}
function createFileSearchStoreParametersToMldev(fromObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    createFileSearchStoreConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function deleteFileSearchStoreConfigToMldev(fromObject, parentObject) {
  const toObject = {};
  const fromForce = getValueByPath(fromObject, ["force"]);
  if (parentObject !== void 0 && fromForce != null) {
    setValueByPath(parentObject, ["_query", "force"], fromForce);
  }
  return toObject;
}
function deleteFileSearchStoreParametersToMldev(fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], fromName);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    deleteFileSearchStoreConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function getFileSearchStoreParametersToMldev(fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], fromName);
  }
  return toObject;
}
function importFileConfigToMldev(fromObject, parentObject) {
  const toObject = {};
  const fromCustomMetadata = getValueByPath(fromObject, [
    "customMetadata"
  ]);
  if (parentObject !== void 0 && fromCustomMetadata != null) {
    let transformedList = fromCustomMetadata;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(parentObject, ["customMetadata"], transformedList);
  }
  const fromChunkingConfig = getValueByPath(fromObject, [
    "chunkingConfig"
  ]);
  if (parentObject !== void 0 && fromChunkingConfig != null) {
    setValueByPath(parentObject, ["chunkingConfig"], fromChunkingConfig);
  }
  return toObject;
}
function importFileOperationFromMldev(fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  const fromDone = getValueByPath(fromObject, ["done"]);
  if (fromDone != null) {
    setValueByPath(toObject, ["done"], fromDone);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  const fromResponse = getValueByPath(fromObject, ["response"]);
  if (fromResponse != null) {
    setValueByPath(toObject, ["response"], importFileResponseFromMldev(fromResponse));
  }
  return toObject;
}
function importFileParametersToMldev(fromObject) {
  const toObject = {};
  const fromFileSearchStoreName = getValueByPath(fromObject, [
    "fileSearchStoreName"
  ]);
  if (fromFileSearchStoreName != null) {
    setValueByPath(toObject, ["_url", "file_search_store_name"], fromFileSearchStoreName);
  }
  const fromFileName = getValueByPath(fromObject, ["fileName"]);
  if (fromFileName != null) {
    setValueByPath(toObject, ["fileName"], fromFileName);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    importFileConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function importFileResponseFromMldev(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromParent = getValueByPath(fromObject, ["parent"]);
  if (fromParent != null) {
    setValueByPath(toObject, ["parent"], fromParent);
  }
  const fromDocumentName = getValueByPath(fromObject, ["documentName"]);
  if (fromDocumentName != null) {
    setValueByPath(toObject, ["documentName"], fromDocumentName);
  }
  return toObject;
}
function listFileSearchStoresConfigToMldev(fromObject, parentObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== void 0 && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== void 0 && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  return toObject;
}
function listFileSearchStoresParametersToMldev(fromObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    listFileSearchStoresConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function listFileSearchStoresResponseFromMldev(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromFileSearchStores = getValueByPath(fromObject, [
    "fileSearchStores"
  ]);
  if (fromFileSearchStores != null) {
    let transformedList = fromFileSearchStores;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["fileSearchStores"], transformedList);
  }
  return toObject;
}
function uploadToFileSearchStoreConfigToMldev(fromObject, parentObject) {
  const toObject = {};
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (parentObject !== void 0 && fromMimeType != null) {
    setValueByPath(parentObject, ["mimeType"], fromMimeType);
  }
  const fromDisplayName = getValueByPath(fromObject, ["displayName"]);
  if (parentObject !== void 0 && fromDisplayName != null) {
    setValueByPath(parentObject, ["displayName"], fromDisplayName);
  }
  const fromCustomMetadata = getValueByPath(fromObject, [
    "customMetadata"
  ]);
  if (parentObject !== void 0 && fromCustomMetadata != null) {
    let transformedList = fromCustomMetadata;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(parentObject, ["customMetadata"], transformedList);
  }
  const fromChunkingConfig = getValueByPath(fromObject, [
    "chunkingConfig"
  ]);
  if (parentObject !== void 0 && fromChunkingConfig != null) {
    setValueByPath(parentObject, ["chunkingConfig"], fromChunkingConfig);
  }
  return toObject;
}
function uploadToFileSearchStoreParametersToMldev(fromObject) {
  const toObject = {};
  const fromFileSearchStoreName = getValueByPath(fromObject, [
    "fileSearchStoreName"
  ]);
  if (fromFileSearchStoreName != null) {
    setValueByPath(toObject, ["_url", "file_search_store_name"], fromFileSearchStoreName);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    uploadToFileSearchStoreConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function uploadToFileSearchStoreResumableResponseFromMldev(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  return toObject;
}
async function throwErrorIfNotOK(response) {
  var _a2;
  if (response === void 0) {
    throw new Error("response is undefined");
  }
  if (!response.ok) {
    const status = response.status;
    let errorBody;
    if ((_a2 = response.headers.get("content-type")) === null || _a2 === void 0 ? void 0 : _a2.includes("application/json")) {
      errorBody = await response.json();
    } else {
      errorBody = {
        error: {
          message: await response.text(),
          code: response.status,
          status: response.statusText
        }
      };
    }
    const errorMessage = JSON.stringify(errorBody);
    if (status >= 400 && status < 600) {
      const apiError = new ApiError({
        message: errorMessage,
        status
      });
      throw apiError;
    }
    throw new Error(errorMessage);
  }
}
function includeExtraBodyToRequestInit(requestInit, extraBody) {
  if (!extraBody || Object.keys(extraBody).length === 0) {
    return;
  }
  if (requestInit.body instanceof Blob) {
    console.warn("includeExtraBodyToRequestInit: extraBody provided but current request body is a Blob. extraBody will be ignored as merging is not supported for Blob bodies.");
    return;
  }
  let currentBodyObject = {};
  if (typeof requestInit.body === "string" && requestInit.body.length > 0) {
    try {
      const parsedBody = JSON.parse(requestInit.body);
      if (typeof parsedBody === "object" && parsedBody !== null && !Array.isArray(parsedBody)) {
        currentBodyObject = parsedBody;
      } else {
        console.warn("includeExtraBodyToRequestInit: Original request body is valid JSON but not a non-array object. Skip applying extraBody to the request body.");
        return;
      }
    } catch (e) {
      console.warn("includeExtraBodyToRequestInit: Original request body is not valid JSON. Skip applying extraBody to the request body.");
      return;
    }
  }
  function deepMerge(target, source) {
    const output = Object.assign({}, target);
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];
        const targetValue = output[key];
        if (sourceValue && typeof sourceValue === "object" && !Array.isArray(sourceValue) && targetValue && typeof targetValue === "object" && !Array.isArray(targetValue)) {
          output[key] = deepMerge(targetValue, sourceValue);
        } else {
          if (targetValue && sourceValue && typeof targetValue !== typeof sourceValue) {
            console.warn(`includeExtraBodyToRequestInit:deepMerge: Type mismatch for key "${key}". Original type: ${typeof targetValue}, New type: ${typeof sourceValue}. Overwriting.`);
          }
          output[key] = sourceValue;
        }
      }
    }
    return output;
  }
  __name(deepMerge, "deepMerge");
  const mergedBody = deepMerge(currentBodyObject, extraBody);
  requestInit.body = JSON.stringify(mergedBody);
}
function hasMcpToolUsage(tools) {
  for (const tool of tools) {
    if (isMcpCallableTool(tool)) {
      return true;
    }
    if (typeof tool === "object" && "inputSchema" in tool) {
      return true;
    }
  }
  return hasMcpToolUsageFromMcpToTool;
}
function setMcpUsageHeader(headers) {
  var _a2;
  const existingHeader = (_a2 = headers[GOOGLE_API_CLIENT_HEADER]) !== null && _a2 !== void 0 ? _a2 : "";
  headers[GOOGLE_API_CLIENT_HEADER] = (existingHeader + ` ${MCP_LABEL}`).trimStart();
}
function isMcpCallableTool(object) {
  return object !== null && typeof object === "object" && object instanceof McpCallableTool;
}
function listAllTools(mcpClient_1) {
  return __asyncGenerator(this, arguments, /* @__PURE__ */ __name(function* listAllTools_1(mcpClient, maxTools = 100) {
    let cursor = void 0;
    let numTools = 0;
    while (numTools < maxTools) {
      const t = yield __await(mcpClient.listTools({ cursor }));
      for (const tool of t.tools) {
        yield yield __await(tool);
        numTools++;
      }
      if (!t.nextCursor) {
        break;
      }
      cursor = t.nextCursor;
    }
  }, "listAllTools_1"));
}
async function handleWebSocketMessage$1(apiClient, onmessage, event) {
  const serverMessage = new LiveMusicServerMessage();
  let data;
  if (event.data instanceof Blob) {
    data = JSON.parse(await event.data.text());
  } else {
    data = JSON.parse(event.data);
  }
  Object.assign(serverMessage, data);
  onmessage(serverMessage);
}
function headersToMap$1(headers) {
  const headerMap = {};
  headers.forEach((value, key) => {
    headerMap[key] = value;
  });
  return headerMap;
}
function mapToHeaders$1(map) {
  const headers = new Headers();
  for (const [key, value] of Object.entries(map)) {
    headers.append(key, value);
  }
  return headers;
}
async function handleWebSocketMessage(apiClient, onmessage, event) {
  const serverMessage = new LiveServerMessage();
  let jsonData;
  if (event.data instanceof Blob) {
    jsonData = await event.data.text();
  } else if (event.data instanceof ArrayBuffer) {
    jsonData = new TextDecoder().decode(event.data);
  } else {
    jsonData = event.data;
  }
  const data = JSON.parse(jsonData);
  if (apiClient.isVertexAI()) {
    const resp = liveServerMessageFromVertex(data);
    Object.assign(serverMessage, resp);
  } else {
    const resp = data;
    Object.assign(serverMessage, resp);
  }
  onmessage(serverMessage);
}
function headersToMap(headers) {
  const headerMap = {};
  headers.forEach((value, key) => {
    headerMap[key] = value;
  });
  return headerMap;
}
function mapToHeaders(map) {
  const headers = new Headers();
  for (const [key, value] of Object.entries(map)) {
    headers.append(key, value);
  }
  return headers;
}
function shouldDisableAfc(config) {
  var _a2, _b, _c;
  if ((_a2 = config === null || config === void 0 ? void 0 : config.automaticFunctionCalling) === null || _a2 === void 0 ? void 0 : _a2.disable) {
    return true;
  }
  let callableToolsPresent = false;
  for (const tool of (_b = config === null || config === void 0 ? void 0 : config.tools) !== null && _b !== void 0 ? _b : []) {
    if (isCallableTool(tool)) {
      callableToolsPresent = true;
      break;
    }
  }
  if (!callableToolsPresent) {
    return true;
  }
  const maxCalls = (_c = config === null || config === void 0 ? void 0 : config.automaticFunctionCalling) === null || _c === void 0 ? void 0 : _c.maximumRemoteCalls;
  if (maxCalls && (maxCalls < 0 || !Number.isInteger(maxCalls)) || maxCalls == 0) {
    console.warn("Invalid maximumRemoteCalls value provided for automatic function calling. Disabled automatic function calling. Please provide a valid integer value greater than 0. maximumRemoteCalls provided:", maxCalls);
    return true;
  }
  return false;
}
function isCallableTool(tool) {
  return "callTool" in tool && typeof tool.callTool === "function";
}
function hasCallableTools(params) {
  var _a2, _b, _c;
  return (_c = (_b = (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.tools) === null || _b === void 0 ? void 0 : _b.some((tool) => isCallableTool(tool))) !== null && _c !== void 0 ? _c : false;
}
function findAfcIncompatibleToolIndexes(params) {
  var _a2;
  const afcIncompatibleToolIndexes = [];
  if (!((_a2 = params === null || params === void 0 ? void 0 : params.config) === null || _a2 === void 0 ? void 0 : _a2.tools)) {
    return afcIncompatibleToolIndexes;
  }
  params.config.tools.forEach((tool, index) => {
    if (isCallableTool(tool)) {
      return;
    }
    const geminiTool = tool;
    if (geminiTool.functionDeclarations && geminiTool.functionDeclarations.length > 0) {
      afcIncompatibleToolIndexes.push(index);
    }
  });
  return afcIncompatibleToolIndexes;
}
function shouldAppendAfcHistory(config) {
  var _a2;
  return !((_a2 = config === null || config === void 0 ? void 0 : config.automaticFunctionCalling) === null || _a2 === void 0 ? void 0 : _a2.ignoreCallHistory);
}
function audioTranscriptionConfigToMldev(fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["languageCodes"]) !== void 0) {
    throw new Error("languageCodes parameter is not supported in Gemini API.");
  }
  return toObject;
}
function authConfigToMldev(fromObject) {
  const toObject = {};
  const fromApiKey = getValueByPath(fromObject, ["apiKey"]);
  if (fromApiKey != null) {
    setValueByPath(toObject, ["apiKey"], fromApiKey);
  }
  if (getValueByPath(fromObject, ["apiKeyConfig"]) !== void 0) {
    throw new Error("apiKeyConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["authType"]) !== void 0) {
    throw new Error("authType parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["googleServiceAccountConfig"]) !== void 0) {
    throw new Error("googleServiceAccountConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["httpBasicAuthConfig"]) !== void 0) {
    throw new Error("httpBasicAuthConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["oauthConfig"]) !== void 0) {
    throw new Error("oauthConfig parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["oidcConfig"]) !== void 0) {
    throw new Error("oidcConfig parameter is not supported in Gemini API.");
  }
  return toObject;
}
function blobToMldev(fromObject) {
  const toObject = {};
  const fromData = getValueByPath(fromObject, ["data"]);
  if (fromData != null) {
    setValueByPath(toObject, ["data"], fromData);
  }
  if (getValueByPath(fromObject, ["displayName"]) !== void 0) {
    throw new Error("displayName parameter is not supported in Gemini API.");
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function contentToMldev(fromObject) {
  const toObject = {};
  const fromParts = getValueByPath(fromObject, ["parts"]);
  if (fromParts != null) {
    let transformedList = fromParts;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return partToMldev(item);
      });
    }
    setValueByPath(toObject, ["parts"], transformedList);
  }
  const fromRole = getValueByPath(fromObject, ["role"]);
  if (fromRole != null) {
    setValueByPath(toObject, ["role"], fromRole);
  }
  return toObject;
}
function createAuthTokenConfigToMldev(apiClient, fromObject, parentObject) {
  const toObject = {};
  const fromExpireTime = getValueByPath(fromObject, ["expireTime"]);
  if (parentObject !== void 0 && fromExpireTime != null) {
    setValueByPath(parentObject, ["expireTime"], fromExpireTime);
  }
  const fromNewSessionExpireTime = getValueByPath(fromObject, [
    "newSessionExpireTime"
  ]);
  if (parentObject !== void 0 && fromNewSessionExpireTime != null) {
    setValueByPath(parentObject, ["newSessionExpireTime"], fromNewSessionExpireTime);
  }
  const fromUses = getValueByPath(fromObject, ["uses"]);
  if (parentObject !== void 0 && fromUses != null) {
    setValueByPath(parentObject, ["uses"], fromUses);
  }
  const fromLiveConnectConstraints = getValueByPath(fromObject, [
    "liveConnectConstraints"
  ]);
  if (parentObject !== void 0 && fromLiveConnectConstraints != null) {
    setValueByPath(parentObject, ["bidiGenerateContentSetup"], liveConnectConstraintsToMldev(apiClient, fromLiveConnectConstraints));
  }
  const fromLockAdditionalFields = getValueByPath(fromObject, [
    "lockAdditionalFields"
  ]);
  if (parentObject !== void 0 && fromLockAdditionalFields != null) {
    setValueByPath(parentObject, ["fieldMask"], fromLockAdditionalFields);
  }
  return toObject;
}
function createAuthTokenParametersToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], createAuthTokenConfigToMldev(apiClient, fromConfig, toObject));
  }
  return toObject;
}
function fileDataToMldev(fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["displayName"]) !== void 0) {
    throw new Error("displayName parameter is not supported in Gemini API.");
  }
  const fromFileUri = getValueByPath(fromObject, ["fileUri"]);
  if (fromFileUri != null) {
    setValueByPath(toObject, ["fileUri"], fromFileUri);
  }
  const fromMimeType = getValueByPath(fromObject, ["mimeType"]);
  if (fromMimeType != null) {
    setValueByPath(toObject, ["mimeType"], fromMimeType);
  }
  return toObject;
}
function functionCallToMldev(fromObject) {
  const toObject = {};
  const fromId = getValueByPath(fromObject, ["id"]);
  if (fromId != null) {
    setValueByPath(toObject, ["id"], fromId);
  }
  const fromArgs = getValueByPath(fromObject, ["args"]);
  if (fromArgs != null) {
    setValueByPath(toObject, ["args"], fromArgs);
  }
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  if (getValueByPath(fromObject, ["partialArgs"]) !== void 0) {
    throw new Error("partialArgs parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["willContinue"]) !== void 0) {
    throw new Error("willContinue parameter is not supported in Gemini API.");
  }
  return toObject;
}
function googleMapsToMldev(fromObject) {
  const toObject = {};
  const fromAuthConfig = getValueByPath(fromObject, ["authConfig"]);
  if (fromAuthConfig != null) {
    setValueByPath(toObject, ["authConfig"], authConfigToMldev(fromAuthConfig));
  }
  const fromEnableWidget = getValueByPath(fromObject, ["enableWidget"]);
  if (fromEnableWidget != null) {
    setValueByPath(toObject, ["enableWidget"], fromEnableWidget);
  }
  return toObject;
}
function googleSearchToMldev(fromObject) {
  const toObject = {};
  const fromSearchTypes = getValueByPath(fromObject, ["searchTypes"]);
  if (fromSearchTypes != null) {
    setValueByPath(toObject, ["searchTypes"], fromSearchTypes);
  }
  if (getValueByPath(fromObject, ["blockingConfidence"]) !== void 0) {
    throw new Error("blockingConfidence parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["excludeDomains"]) !== void 0) {
    throw new Error("excludeDomains parameter is not supported in Gemini API.");
  }
  const fromTimeRangeFilter = getValueByPath(fromObject, [
    "timeRangeFilter"
  ]);
  if (fromTimeRangeFilter != null) {
    setValueByPath(toObject, ["timeRangeFilter"], fromTimeRangeFilter);
  }
  return toObject;
}
function liveConnectConfigToMldev(fromObject, parentObject) {
  const toObject = {};
  const fromGenerationConfig = getValueByPath(fromObject, [
    "generationConfig"
  ]);
  if (parentObject !== void 0 && fromGenerationConfig != null) {
    setValueByPath(parentObject, ["setup", "generationConfig"], fromGenerationConfig);
  }
  const fromResponseModalities = getValueByPath(fromObject, [
    "responseModalities"
  ]);
  if (parentObject !== void 0 && fromResponseModalities != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "responseModalities"], fromResponseModalities);
  }
  const fromTemperature = getValueByPath(fromObject, ["temperature"]);
  if (parentObject !== void 0 && fromTemperature != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "temperature"], fromTemperature);
  }
  const fromTopP = getValueByPath(fromObject, ["topP"]);
  if (parentObject !== void 0 && fromTopP != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "topP"], fromTopP);
  }
  const fromTopK = getValueByPath(fromObject, ["topK"]);
  if (parentObject !== void 0 && fromTopK != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "topK"], fromTopK);
  }
  const fromMaxOutputTokens = getValueByPath(fromObject, [
    "maxOutputTokens"
  ]);
  if (parentObject !== void 0 && fromMaxOutputTokens != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "maxOutputTokens"], fromMaxOutputTokens);
  }
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (parentObject !== void 0 && fromMediaResolution != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "mediaResolution"], fromMediaResolution);
  }
  const fromSeed = getValueByPath(fromObject, ["seed"]);
  if (parentObject !== void 0 && fromSeed != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "seed"], fromSeed);
  }
  const fromSpeechConfig = getValueByPath(fromObject, ["speechConfig"]);
  if (parentObject !== void 0 && fromSpeechConfig != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "speechConfig"], tLiveSpeechConfig(fromSpeechConfig));
  }
  const fromThinkingConfig = getValueByPath(fromObject, [
    "thinkingConfig"
  ]);
  if (parentObject !== void 0 && fromThinkingConfig != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "thinkingConfig"], fromThinkingConfig);
  }
  const fromEnableAffectiveDialog = getValueByPath(fromObject, [
    "enableAffectiveDialog"
  ]);
  if (parentObject !== void 0 && fromEnableAffectiveDialog != null) {
    setValueByPath(parentObject, ["setup", "generationConfig", "enableAffectiveDialog"], fromEnableAffectiveDialog);
  }
  const fromSystemInstruction = getValueByPath(fromObject, [
    "systemInstruction"
  ]);
  if (parentObject !== void 0 && fromSystemInstruction != null) {
    setValueByPath(parentObject, ["setup", "systemInstruction"], contentToMldev(tContent(fromSystemInstruction)));
  }
  const fromTools = getValueByPath(fromObject, ["tools"]);
  if (parentObject !== void 0 && fromTools != null) {
    let transformedList = tTools(fromTools);
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return toolToMldev(tTool(item));
      });
    }
    setValueByPath(parentObject, ["setup", "tools"], transformedList);
  }
  const fromSessionResumption = getValueByPath(fromObject, [
    "sessionResumption"
  ]);
  if (parentObject !== void 0 && fromSessionResumption != null) {
    setValueByPath(parentObject, ["setup", "sessionResumption"], sessionResumptionConfigToMldev(fromSessionResumption));
  }
  const fromInputAudioTranscription = getValueByPath(fromObject, [
    "inputAudioTranscription"
  ]);
  if (parentObject !== void 0 && fromInputAudioTranscription != null) {
    setValueByPath(parentObject, ["setup", "inputAudioTranscription"], audioTranscriptionConfigToMldev(fromInputAudioTranscription));
  }
  const fromOutputAudioTranscription = getValueByPath(fromObject, [
    "outputAudioTranscription"
  ]);
  if (parentObject !== void 0 && fromOutputAudioTranscription != null) {
    setValueByPath(parentObject, ["setup", "outputAudioTranscription"], audioTranscriptionConfigToMldev(fromOutputAudioTranscription));
  }
  const fromRealtimeInputConfig = getValueByPath(fromObject, [
    "realtimeInputConfig"
  ]);
  if (parentObject !== void 0 && fromRealtimeInputConfig != null) {
    setValueByPath(parentObject, ["setup", "realtimeInputConfig"], fromRealtimeInputConfig);
  }
  const fromContextWindowCompression = getValueByPath(fromObject, [
    "contextWindowCompression"
  ]);
  if (parentObject !== void 0 && fromContextWindowCompression != null) {
    setValueByPath(parentObject, ["setup", "contextWindowCompression"], fromContextWindowCompression);
  }
  const fromProactivity = getValueByPath(fromObject, ["proactivity"]);
  if (parentObject !== void 0 && fromProactivity != null) {
    setValueByPath(parentObject, ["setup", "proactivity"], fromProactivity);
  }
  if (getValueByPath(fromObject, ["explicitVadSignal"]) !== void 0) {
    throw new Error("explicitVadSignal parameter is not supported in Gemini API.");
  }
  return toObject;
}
function liveConnectConstraintsToMldev(apiClient, fromObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["model"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["setup", "model"], tModel(apiClient, fromModel));
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    setValueByPath(toObject, ["config"], liveConnectConfigToMldev(fromConfig, toObject));
  }
  return toObject;
}
function partToMldev(fromObject) {
  const toObject = {};
  const fromMediaResolution = getValueByPath(fromObject, [
    "mediaResolution"
  ]);
  if (fromMediaResolution != null) {
    setValueByPath(toObject, ["mediaResolution"], fromMediaResolution);
  }
  const fromCodeExecutionResult = getValueByPath(fromObject, [
    "codeExecutionResult"
  ]);
  if (fromCodeExecutionResult != null) {
    setValueByPath(toObject, ["codeExecutionResult"], fromCodeExecutionResult);
  }
  const fromExecutableCode = getValueByPath(fromObject, [
    "executableCode"
  ]);
  if (fromExecutableCode != null) {
    setValueByPath(toObject, ["executableCode"], fromExecutableCode);
  }
  const fromFileData = getValueByPath(fromObject, ["fileData"]);
  if (fromFileData != null) {
    setValueByPath(toObject, ["fileData"], fileDataToMldev(fromFileData));
  }
  const fromFunctionCall = getValueByPath(fromObject, ["functionCall"]);
  if (fromFunctionCall != null) {
    setValueByPath(toObject, ["functionCall"], functionCallToMldev(fromFunctionCall));
  }
  const fromFunctionResponse = getValueByPath(fromObject, [
    "functionResponse"
  ]);
  if (fromFunctionResponse != null) {
    setValueByPath(toObject, ["functionResponse"], fromFunctionResponse);
  }
  const fromInlineData = getValueByPath(fromObject, ["inlineData"]);
  if (fromInlineData != null) {
    setValueByPath(toObject, ["inlineData"], blobToMldev(fromInlineData));
  }
  const fromText = getValueByPath(fromObject, ["text"]);
  if (fromText != null) {
    setValueByPath(toObject, ["text"], fromText);
  }
  const fromThought = getValueByPath(fromObject, ["thought"]);
  if (fromThought != null) {
    setValueByPath(toObject, ["thought"], fromThought);
  }
  const fromThoughtSignature = getValueByPath(fromObject, [
    "thoughtSignature"
  ]);
  if (fromThoughtSignature != null) {
    setValueByPath(toObject, ["thoughtSignature"], fromThoughtSignature);
  }
  const fromVideoMetadata = getValueByPath(fromObject, [
    "videoMetadata"
  ]);
  if (fromVideoMetadata != null) {
    setValueByPath(toObject, ["videoMetadata"], fromVideoMetadata);
  }
  const fromToolCall = getValueByPath(fromObject, ["toolCall"]);
  if (fromToolCall != null) {
    setValueByPath(toObject, ["toolCall"], fromToolCall);
  }
  const fromToolResponse = getValueByPath(fromObject, ["toolResponse"]);
  if (fromToolResponse != null) {
    setValueByPath(toObject, ["toolResponse"], fromToolResponse);
  }
  return toObject;
}
function sessionResumptionConfigToMldev(fromObject) {
  const toObject = {};
  const fromHandle = getValueByPath(fromObject, ["handle"]);
  if (fromHandle != null) {
    setValueByPath(toObject, ["handle"], fromHandle);
  }
  if (getValueByPath(fromObject, ["transparent"]) !== void 0) {
    throw new Error("transparent parameter is not supported in Gemini API.");
  }
  return toObject;
}
function toolToMldev(fromObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["retrieval"]) !== void 0) {
    throw new Error("retrieval parameter is not supported in Gemini API.");
  }
  const fromComputerUse = getValueByPath(fromObject, ["computerUse"]);
  if (fromComputerUse != null) {
    setValueByPath(toObject, ["computerUse"], fromComputerUse);
  }
  const fromFileSearch = getValueByPath(fromObject, ["fileSearch"]);
  if (fromFileSearch != null) {
    setValueByPath(toObject, ["fileSearch"], fromFileSearch);
  }
  const fromGoogleSearch = getValueByPath(fromObject, ["googleSearch"]);
  if (fromGoogleSearch != null) {
    setValueByPath(toObject, ["googleSearch"], googleSearchToMldev(fromGoogleSearch));
  }
  const fromGoogleMaps = getValueByPath(fromObject, ["googleMaps"]);
  if (fromGoogleMaps != null) {
    setValueByPath(toObject, ["googleMaps"], googleMapsToMldev(fromGoogleMaps));
  }
  const fromCodeExecution = getValueByPath(fromObject, [
    "codeExecution"
  ]);
  if (fromCodeExecution != null) {
    setValueByPath(toObject, ["codeExecution"], fromCodeExecution);
  }
  if (getValueByPath(fromObject, ["enterpriseWebSearch"]) !== void 0) {
    throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");
  }
  const fromFunctionDeclarations = getValueByPath(fromObject, [
    "functionDeclarations"
  ]);
  if (fromFunctionDeclarations != null) {
    let transformedList = fromFunctionDeclarations;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["functionDeclarations"], transformedList);
  }
  const fromGoogleSearchRetrieval = getValueByPath(fromObject, [
    "googleSearchRetrieval"
  ]);
  if (fromGoogleSearchRetrieval != null) {
    setValueByPath(toObject, ["googleSearchRetrieval"], fromGoogleSearchRetrieval);
  }
  if (getValueByPath(fromObject, ["parallelAiSearch"]) !== void 0) {
    throw new Error("parallelAiSearch parameter is not supported in Gemini API.");
  }
  const fromUrlContext = getValueByPath(fromObject, ["urlContext"]);
  if (fromUrlContext != null) {
    setValueByPath(toObject, ["urlContext"], fromUrlContext);
  }
  const fromMcpServers = getValueByPath(fromObject, ["mcpServers"]);
  if (fromMcpServers != null) {
    let transformedList = fromMcpServers;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["mcpServers"], transformedList);
  }
  return toObject;
}
function getFieldMasks(setup) {
  const fields = [];
  for (const key in setup) {
    if (Object.prototype.hasOwnProperty.call(setup, key)) {
      const value = setup[key];
      if (typeof value === "object" && value != null && Object.keys(value).length > 0) {
        const field = Object.keys(value).map((kk) => `${key}.${kk}`);
        fields.push(...field);
      } else {
        fields.push(key);
      }
    }
  }
  return fields.join(",");
}
function convertBidiSetupToTokenSetup(requestDict, config) {
  let setupForMaskGeneration = null;
  const bidiGenerateContentSetupValue = requestDict["bidiGenerateContentSetup"];
  if (typeof bidiGenerateContentSetupValue === "object" && bidiGenerateContentSetupValue !== null && "setup" in bidiGenerateContentSetupValue) {
    const innerSetup = bidiGenerateContentSetupValue.setup;
    if (typeof innerSetup === "object" && innerSetup !== null) {
      requestDict["bidiGenerateContentSetup"] = innerSetup;
      setupForMaskGeneration = innerSetup;
    } else {
      delete requestDict["bidiGenerateContentSetup"];
    }
  } else if (bidiGenerateContentSetupValue !== void 0) {
    delete requestDict["bidiGenerateContentSetup"];
  }
  const preExistingFieldMask = requestDict["fieldMask"];
  if (setupForMaskGeneration) {
    const generatedMaskFromBidi = getFieldMasks(setupForMaskGeneration);
    if (Array.isArray(config === null || config === void 0 ? void 0 : config.lockAdditionalFields) && (config === null || config === void 0 ? void 0 : config.lockAdditionalFields.length) === 0) {
      if (generatedMaskFromBidi) {
        requestDict["fieldMask"] = generatedMaskFromBidi;
      } else {
        delete requestDict["fieldMask"];
      }
    } else if ((config === null || config === void 0 ? void 0 : config.lockAdditionalFields) && config.lockAdditionalFields.length > 0 && preExistingFieldMask !== null && Array.isArray(preExistingFieldMask) && preExistingFieldMask.length > 0) {
      const generationConfigFields = [
        "temperature",
        "topK",
        "topP",
        "maxOutputTokens",
        "responseModalities",
        "seed",
        "speechConfig"
      ];
      let mappedFieldsFromPreExisting = [];
      if (preExistingFieldMask.length > 0) {
        mappedFieldsFromPreExisting = preExistingFieldMask.map((field) => {
          if (generationConfigFields.includes(field)) {
            return `generationConfig.${field}`;
          }
          return field;
        });
      }
      const finalMaskParts = [];
      if (generatedMaskFromBidi) {
        finalMaskParts.push(generatedMaskFromBidi);
      }
      if (mappedFieldsFromPreExisting.length > 0) {
        finalMaskParts.push(...mappedFieldsFromPreExisting);
      }
      if (finalMaskParts.length > 0) {
        requestDict["fieldMask"] = finalMaskParts.join(",");
      } else {
        delete requestDict["fieldMask"];
      }
    } else {
      delete requestDict["fieldMask"];
    }
  } else {
    if (preExistingFieldMask !== null && Array.isArray(preExistingFieldMask) && preExistingFieldMask.length > 0) {
      requestDict["fieldMask"] = preExistingFieldMask.join(",");
    } else {
      delete requestDict["fieldMask"];
    }
  }
  return requestDict;
}
function deleteDocumentConfigToMldev(fromObject, parentObject) {
  const toObject = {};
  const fromForce = getValueByPath(fromObject, ["force"]);
  if (parentObject !== void 0 && fromForce != null) {
    setValueByPath(parentObject, ["_query", "force"], fromForce);
  }
  return toObject;
}
function deleteDocumentParametersToMldev(fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], fromName);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    deleteDocumentConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function getDocumentParametersToMldev(fromObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], fromName);
  }
  return toObject;
}
function listDocumentsConfigToMldev(fromObject, parentObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== void 0 && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== void 0 && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  return toObject;
}
function listDocumentsParametersToMldev(fromObject) {
  const toObject = {};
  const fromParent = getValueByPath(fromObject, ["parent"]);
  if (fromParent != null) {
    setValueByPath(toObject, ["_url", "parent"], fromParent);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    listDocumentsConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function listDocumentsResponseFromMldev(fromObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromDocuments = getValueByPath(fromObject, ["documents"]);
  if (fromDocuments != null) {
    let transformedList = fromDocuments;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["documents"], transformedList);
  }
  return toObject;
}
function isAbortError(err) {
  return typeof err === "object" && err !== null && // Spec-compliant fetch implementations
  ("name" in err && err.name === "AbortError" || // Expo fetch
  "message" in err && String(err.message).includes("FetchRequestCanceledException"));
}
function isEmptyObj(obj) {
  if (!obj)
    return true;
  for (const _k in obj)
    return false;
  return true;
}
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function getDefaultFetch() {
  if (typeof fetch !== "undefined") {
    return fetch;
  }
  throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new GeminiNextGenAPIClient({ fetch })` or polyfill the global, `globalThis.fetch = fetch`");
}
function makeReadableStream(...args) {
  const ReadableStream2 = globalThis.ReadableStream;
  if (typeof ReadableStream2 === "undefined") {
    throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
  }
  return new ReadableStream2(...args);
}
function ReadableStreamFrom(iterable) {
  let iter = Symbol.asyncIterator in iterable ? iterable[Symbol.asyncIterator]() : iterable[Symbol.iterator]();
  return makeReadableStream({
    start() {
    },
    async pull(controller) {
      const { done, value } = await iter.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
    async cancel() {
      var _a2;
      await ((_a2 = iter.return) === null || _a2 === void 0 ? void 0 : _a2.call(iter));
    }
  });
}
function ReadableStreamToAsyncIterable(stream2) {
  if (stream2[Symbol.asyncIterator])
    return stream2;
  const reader = stream2.getReader();
  return {
    async next() {
      try {
        const result = await reader.read();
        if (result === null || result === void 0 ? void 0 : result.done)
          reader.releaseLock();
        return result;
      } catch (e) {
        reader.releaseLock();
        throw e;
      }
    },
    async return() {
      const cancelPromise = reader.cancel();
      reader.releaseLock();
      await cancelPromise;
      return { done: true, value: void 0 };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
async function CancelReadableStream(stream2) {
  var _a2, _b;
  if (stream2 === null || typeof stream2 !== "object")
    return;
  if (stream2[Symbol.asyncIterator]) {
    await ((_b = (_a2 = stream2[Symbol.asyncIterator]()).return) === null || _b === void 0 ? void 0 : _b.call(_a2));
    return;
  }
  const reader = stream2.getReader();
  const cancelPromise = reader.cancel();
  reader.releaseLock();
  await cancelPromise;
}
function stringifyQuery(query) {
  return Object.entries(query).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }
    if (value === null) {
      return `${encodeURIComponent(key)}=`;
    }
    throw new GeminiNextGenAPIClientError(`Cannot stringify type ${typeof value}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
  }).join("&");
}
function makeFile(fileBits, fileName, options) {
  checkFileSupport();
  return new File(fileBits, fileName !== null && fileName !== void 0 ? fileName : "unknown_file", options);
}
function getName(value) {
  return (typeof value === "object" && value !== null && ("name" in value && value.name && String(value.name) || "url" in value && value.url && String(value.url) || "filename" in value && value.filename && String(value.filename) || "path" in value && value.path && String(value.path)) || "").split(/[\\/]/).pop() || void 0;
}
async function toFile(value, name, options) {
  checkFileSupport();
  value = await value;
  if (isFileLike(value)) {
    if (value instanceof File) {
      return value;
    }
    return makeFile([await value.arrayBuffer()], value.name);
  }
  if (isResponseLike(value)) {
    const blob = await value.blob();
    name || (name = new URL(value.url).pathname.split(/[\\/]/).pop());
    return makeFile(await getBytes(blob), name, options);
  }
  const parts = await getBytes(value);
  name || (name = getName(value));
  if (!(options === null || options === void 0 ? void 0 : options.type)) {
    const type = parts.find((part) => typeof part === "object" && "type" in part && part.type);
    if (typeof type === "string") {
      options = Object.assign(Object.assign({}, options), { type });
    }
  }
  return makeFile(parts, name, options);
}
async function getBytes(value) {
  var _a2, e_1, _b, _c;
  var _d;
  let parts = [];
  if (typeof value === "string" || ArrayBuffer.isView(value) || // includes Uint8Array, Buffer, etc.
  value instanceof ArrayBuffer) {
    parts.push(value);
  } else if (isBlobLike(value)) {
    parts.push(value instanceof Blob ? value : await value.arrayBuffer());
  } else if (isAsyncIterable(value)) {
    try {
      for (var _e = true, value_1 = __asyncValues(value), value_1_1; value_1_1 = await value_1.next(), _a2 = value_1_1.done, !_a2; _e = true) {
        _c = value_1_1.value;
        _e = false;
        const chunk = _c;
        parts.push(...await getBytes(chunk));
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (!_e && !_a2 && (_b = value_1.return)) await _b.call(value_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  } else {
    const constructor = (_d = value === null || value === void 0 ? void 0 : value.constructor) === null || _d === void 0 ? void 0 : _d.name;
    throw new Error(`Unexpected data type: ${typeof value}${constructor ? `; constructor: ${constructor}` : ""}${propsForError(value)}`);
  }
  return parts;
}
function propsForError(value) {
  if (typeof value !== "object" || value === null)
    return "";
  const props = Object.getOwnPropertyNames(value);
  return `; props: [${props.map((p) => `"${p}"`).join(", ")}]`;
}
function encodeURIPath(str) {
  return str.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
}
function concatBytes(buffers) {
  let length = 0;
  for (const buffer of buffers) {
    length += buffer.length;
  }
  const output = new Uint8Array(length);
  let index = 0;
  for (const buffer of buffers) {
    output.set(buffer, index);
    index += buffer.length;
  }
  return output;
}
function encodeUTF8(str) {
  let encoder;
  return (encodeUTF8_ !== null && encodeUTF8_ !== void 0 ? encodeUTF8_ : (encoder = new globalThis.TextEncoder(), encodeUTF8_ = encoder.encode.bind(encoder)))(str);
}
function decodeUTF8(bytes) {
  let decoder;
  return (decodeUTF8_ !== null && decodeUTF8_ !== void 0 ? decodeUTF8_ : (decoder = new globalThis.TextDecoder(), decodeUTF8_ = decoder.decode.bind(decoder)))(bytes);
}
function findNewlineIndex(buffer, startIndex) {
  const newline = 10;
  const carriage = 13;
  const start = startIndex !== null && startIndex !== void 0 ? startIndex : 0;
  const nextNewline = buffer.indexOf(newline, start);
  const nextCarriage = buffer.indexOf(carriage, start);
  if (nextNewline === -1 && nextCarriage === -1) {
    return null;
  }
  let i;
  if (nextNewline !== -1 && nextCarriage !== -1) {
    i = Math.min(nextNewline, nextCarriage);
  } else {
    i = nextNewline !== -1 ? nextNewline : nextCarriage;
  }
  if (buffer[i] === newline) {
    return { preceding: i, index: i + 1, carriage: false };
  }
  return { preceding: i, index: i + 1, carriage: true };
}
function noop() {
}
function makeLogFn(fnLevel, logger, logLevel) {
  if (!logger || levelNumbers[fnLevel] > levelNumbers[logLevel]) {
    return noop;
  } else {
    return logger[fnLevel].bind(logger);
  }
}
function loggerFor(client) {
  var _a2;
  const logger = client.logger;
  const logLevel = (_a2 = client.logLevel) !== null && _a2 !== void 0 ? _a2 : "off";
  if (!logger) {
    return noopLogger;
  }
  const cachedLogger = cachedLoggers.get(logger);
  if (cachedLogger && cachedLogger[0] === logLevel) {
    return cachedLogger[1];
  }
  const levelLogger = {
    error: makeLogFn("error", logger, logLevel),
    warn: makeLogFn("warn", logger, logLevel),
    info: makeLogFn("info", logger, logLevel),
    debug: makeLogFn("debug", logger, logLevel)
  };
  cachedLoggers.set(logger, [logLevel, levelLogger]);
  return levelLogger;
}
function _iterSSEMessages(response, controller) {
  return __asyncGenerator(this, arguments, /* @__PURE__ */ __name(function* _iterSSEMessages_1() {
    var _a2, e_4, _b, _c;
    if (!response.body) {
      controller.abort();
      if (typeof globalThis.navigator !== "undefined" && globalThis.navigator.product === "ReactNative") {
        throw new GeminiNextGenAPIClientError(`The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api`);
      }
      throw new GeminiNextGenAPIClientError(`Attempted to iterate over a response with no body`);
    }
    const sseDecoder = new SSEDecoder();
    const lineDecoder = new LineDecoder();
    const iter = ReadableStreamToAsyncIterable(response.body);
    try {
      for (var _d = true, _e = __asyncValues(iterBinaryChunks(iter)), _f; _f = yield __await(_e.next()), _a2 = _f.done, !_a2; _d = true) {
        _c = _f.value;
        _d = false;
        const sseChunk = _c;
        for (const line of lineDecoder.decode(sseChunk)) {
          const sse = sseDecoder.decode(line);
          if (sse)
            yield yield __await(sse);
        }
      }
    } catch (e_4_1) {
      e_4 = { error: e_4_1 };
    } finally {
      try {
        if (!_d && !_a2 && (_b = _e.return)) yield __await(_b.call(_e));
      } finally {
        if (e_4) throw e_4.error;
      }
    }
    for (const line of lineDecoder.flush()) {
      const sse = sseDecoder.decode(line);
      if (sse)
        yield yield __await(sse);
    }
  }, "_iterSSEMessages_1"));
}
function iterBinaryChunks(iterator) {
  return __asyncGenerator(this, arguments, /* @__PURE__ */ __name(function* iterBinaryChunks_1() {
    var _a2, e_5, _b, _c;
    try {
      for (var _d = true, iterator_3 = __asyncValues(iterator), iterator_3_1; iterator_3_1 = yield __await(iterator_3.next()), _a2 = iterator_3_1.done, !_a2; _d = true) {
        _c = iterator_3_1.value;
        _d = false;
        const chunk = _c;
        if (chunk == null) {
          continue;
        }
        const binaryChunk = chunk instanceof ArrayBuffer ? new Uint8Array(chunk) : typeof chunk === "string" ? encodeUTF8(chunk) : chunk;
        yield yield __await(binaryChunk);
      }
    } catch (e_5_1) {
      e_5 = { error: e_5_1 };
    } finally {
      try {
        if (!_d && !_a2 && (_b = iterator_3.return)) yield __await(_b.call(iterator_3));
      } finally {
        if (e_5) throw e_5.error;
      }
    }
  }, "iterBinaryChunks_1"));
}
function partition(str, delimiter) {
  const index = str.indexOf(delimiter);
  if (index !== -1) {
    return [str.substring(0, index), delimiter, str.substring(index + delimiter.length)];
  }
  return [str, "", ""];
}
async function defaultParseResponse(client, props) {
  const { response, requestLogID, retryOfRequestLogID, startTime } = props;
  const body = await (async () => {
    var _a2;
    if (props.options.stream) {
      loggerFor(client).debug("response", response.status, response.url, response.headers, response.body);
      if (props.options.__streamClass) {
        return props.options.__streamClass.fromSSEResponse(response, props.controller, client);
      }
      return Stream.fromSSEResponse(response, props.controller, client);
    }
    if (response.status === 204) {
      return null;
    }
    if (props.options.__binaryResponse) {
      return response;
    }
    const contentType = response.headers.get("content-type");
    const mediaType = (_a2 = contentType === null || contentType === void 0 ? void 0 : contentType.split(";")[0]) === null || _a2 === void 0 ? void 0 : _a2.trim();
    const isJSON = (mediaType === null || mediaType === void 0 ? void 0 : mediaType.includes("application/json")) || (mediaType === null || mediaType === void 0 ? void 0 : mediaType.endsWith("+json"));
    if (isJSON) {
      const contentLength = response.headers.get("content-length");
      if (contentLength === "0") {
        return void 0;
      }
      const json = await response.json();
      return json;
    }
    const text = await response.text();
    return text;
  })();
  loggerFor(client).debug(`[${requestLogID}] response parsed`, formatRequestDetails({
    retryOfRequestLogID,
    url: response.url,
    status: response.status,
    body,
    durationMs: Date.now() - startTime
  }));
  return body;
}
function* iterateHeaders(headers) {
  if (!headers)
    return;
  if (brand_privateNullableHeaders in headers) {
    const { values, nulls } = headers;
    yield* values.entries();
    for (const name of nulls) {
      yield [name, null];
    }
    return;
  }
  let shouldClear = false;
  let iter;
  if (headers instanceof Headers) {
    iter = headers.entries();
  } else if (isReadonlyArray(headers)) {
    iter = headers;
  } else {
    shouldClear = true;
    iter = Object.entries(headers !== null && headers !== void 0 ? headers : {});
  }
  for (let row of iter) {
    const name = row[0];
    if (typeof name !== "string")
      throw new TypeError("expected header name to be a string");
    const values = isReadonlyArray(row[1]) ? row[1] : [row[1]];
    let didClear = false;
    for (const value of values) {
      if (value === void 0)
        continue;
      if (shouldClear && !didClear) {
        didClear = true;
        yield [name, null];
      }
      yield [name, value];
    }
  }
}
function cancelTuningJobParametersToMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], fromName);
  }
  return toObject;
}
function cancelTuningJobParametersToVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], fromName);
  }
  return toObject;
}
function cancelTuningJobResponseFromMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  return toObject;
}
function cancelTuningJobResponseFromVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  return toObject;
}
function createTuningJobConfigToMldev(fromObject, parentObject, _rootObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["validationDataset"]) !== void 0) {
    throw new Error("validationDataset parameter is not supported in Gemini API.");
  }
  const fromTunedModelDisplayName = getValueByPath(fromObject, [
    "tunedModelDisplayName"
  ]);
  if (parentObject !== void 0 && fromTunedModelDisplayName != null) {
    setValueByPath(parentObject, ["displayName"], fromTunedModelDisplayName);
  }
  if (getValueByPath(fromObject, ["description"]) !== void 0) {
    throw new Error("description parameter is not supported in Gemini API.");
  }
  const fromEpochCount = getValueByPath(fromObject, ["epochCount"]);
  if (parentObject !== void 0 && fromEpochCount != null) {
    setValueByPath(parentObject, ["tuningTask", "hyperparameters", "epochCount"], fromEpochCount);
  }
  const fromLearningRateMultiplier = getValueByPath(fromObject, [
    "learningRateMultiplier"
  ]);
  if (fromLearningRateMultiplier != null) {
    setValueByPath(toObject, ["tuningTask", "hyperparameters", "learningRateMultiplier"], fromLearningRateMultiplier);
  }
  if (getValueByPath(fromObject, ["exportLastCheckpointOnly"]) !== void 0) {
    throw new Error("exportLastCheckpointOnly parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["preTunedModelCheckpointId"]) !== void 0) {
    throw new Error("preTunedModelCheckpointId parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["adapterSize"]) !== void 0) {
    throw new Error("adapterSize parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["tuningMode"]) !== void 0) {
    throw new Error("tuningMode parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["customBaseModel"]) !== void 0) {
    throw new Error("customBaseModel parameter is not supported in Gemini API.");
  }
  const fromBatchSize = getValueByPath(fromObject, ["batchSize"]);
  if (parentObject !== void 0 && fromBatchSize != null) {
    setValueByPath(parentObject, ["tuningTask", "hyperparameters", "batchSize"], fromBatchSize);
  }
  const fromLearningRate = getValueByPath(fromObject, ["learningRate"]);
  if (parentObject !== void 0 && fromLearningRate != null) {
    setValueByPath(parentObject, ["tuningTask", "hyperparameters", "learningRate"], fromLearningRate);
  }
  if (getValueByPath(fromObject, ["labels"]) !== void 0) {
    throw new Error("labels parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["beta"]) !== void 0) {
    throw new Error("beta parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["baseTeacherModel"]) !== void 0) {
    throw new Error("baseTeacherModel parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["tunedTeacherModelSource"]) !== void 0) {
    throw new Error("tunedTeacherModelSource parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["sftLossWeightMultiplier"]) !== void 0) {
    throw new Error("sftLossWeightMultiplier parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["outputUri"]) !== void 0) {
    throw new Error("outputUri parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["encryptionSpec"]) !== void 0) {
    throw new Error("encryptionSpec parameter is not supported in Gemini API.");
  }
  return toObject;
}
function createTuningJobConfigToVertex(fromObject, parentObject, rootObject) {
  const toObject = {};
  let discriminatorValidationDataset = getValueByPath(rootObject, [
    "config",
    "method"
  ]);
  if (discriminatorValidationDataset === void 0) {
    discriminatorValidationDataset = "SUPERVISED_FINE_TUNING";
  }
  if (discriminatorValidationDataset === "SUPERVISED_FINE_TUNING") {
    const fromValidationDataset = getValueByPath(fromObject, [
      "validationDataset"
    ]);
    if (parentObject !== void 0 && fromValidationDataset != null) {
      setValueByPath(parentObject, ["supervisedTuningSpec"], tuningValidationDatasetToVertex(fromValidationDataset));
    }
  } else if (discriminatorValidationDataset === "PREFERENCE_TUNING") {
    const fromValidationDataset = getValueByPath(fromObject, [
      "validationDataset"
    ]);
    if (parentObject !== void 0 && fromValidationDataset != null) {
      setValueByPath(parentObject, ["preferenceOptimizationSpec"], tuningValidationDatasetToVertex(fromValidationDataset));
    }
  } else if (discriminatorValidationDataset === "DISTILLATION") {
    const fromValidationDataset = getValueByPath(fromObject, [
      "validationDataset"
    ]);
    if (parentObject !== void 0 && fromValidationDataset != null) {
      setValueByPath(parentObject, ["distillationSpec"], tuningValidationDatasetToVertex(fromValidationDataset));
    }
  }
  const fromTunedModelDisplayName = getValueByPath(fromObject, [
    "tunedModelDisplayName"
  ]);
  if (parentObject !== void 0 && fromTunedModelDisplayName != null) {
    setValueByPath(parentObject, ["tunedModelDisplayName"], fromTunedModelDisplayName);
  }
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (parentObject !== void 0 && fromDescription != null) {
    setValueByPath(parentObject, ["description"], fromDescription);
  }
  let discriminatorEpochCount = getValueByPath(rootObject, [
    "config",
    "method"
  ]);
  if (discriminatorEpochCount === void 0) {
    discriminatorEpochCount = "SUPERVISED_FINE_TUNING";
  }
  if (discriminatorEpochCount === "SUPERVISED_FINE_TUNING") {
    const fromEpochCount = getValueByPath(fromObject, ["epochCount"]);
    if (parentObject !== void 0 && fromEpochCount != null) {
      setValueByPath(parentObject, ["supervisedTuningSpec", "hyperParameters", "epochCount"], fromEpochCount);
    }
  } else if (discriminatorEpochCount === "PREFERENCE_TUNING") {
    const fromEpochCount = getValueByPath(fromObject, ["epochCount"]);
    if (parentObject !== void 0 && fromEpochCount != null) {
      setValueByPath(parentObject, ["preferenceOptimizationSpec", "hyperParameters", "epochCount"], fromEpochCount);
    }
  } else if (discriminatorEpochCount === "DISTILLATION") {
    const fromEpochCount = getValueByPath(fromObject, ["epochCount"]);
    if (parentObject !== void 0 && fromEpochCount != null) {
      setValueByPath(parentObject, ["distillationSpec", "hyperParameters", "epochCount"], fromEpochCount);
    }
  }
  let discriminatorLearningRateMultiplier = getValueByPath(rootObject, [
    "config",
    "method"
  ]);
  if (discriminatorLearningRateMultiplier === void 0) {
    discriminatorLearningRateMultiplier = "SUPERVISED_FINE_TUNING";
  }
  if (discriminatorLearningRateMultiplier === "SUPERVISED_FINE_TUNING") {
    const fromLearningRateMultiplier = getValueByPath(fromObject, [
      "learningRateMultiplier"
    ]);
    if (parentObject !== void 0 && fromLearningRateMultiplier != null) {
      setValueByPath(parentObject, ["supervisedTuningSpec", "hyperParameters", "learningRateMultiplier"], fromLearningRateMultiplier);
    }
  } else if (discriminatorLearningRateMultiplier === "PREFERENCE_TUNING") {
    const fromLearningRateMultiplier = getValueByPath(fromObject, [
      "learningRateMultiplier"
    ]);
    if (parentObject !== void 0 && fromLearningRateMultiplier != null) {
      setValueByPath(parentObject, [
        "preferenceOptimizationSpec",
        "hyperParameters",
        "learningRateMultiplier"
      ], fromLearningRateMultiplier);
    }
  } else if (discriminatorLearningRateMultiplier === "DISTILLATION") {
    const fromLearningRateMultiplier = getValueByPath(fromObject, [
      "learningRateMultiplier"
    ]);
    if (parentObject !== void 0 && fromLearningRateMultiplier != null) {
      setValueByPath(parentObject, ["distillationSpec", "hyperParameters", "learningRateMultiplier"], fromLearningRateMultiplier);
    }
  }
  let discriminatorExportLastCheckpointOnly = getValueByPath(rootObject, ["config", "method"]);
  if (discriminatorExportLastCheckpointOnly === void 0) {
    discriminatorExportLastCheckpointOnly = "SUPERVISED_FINE_TUNING";
  }
  if (discriminatorExportLastCheckpointOnly === "SUPERVISED_FINE_TUNING") {
    const fromExportLastCheckpointOnly = getValueByPath(fromObject, [
      "exportLastCheckpointOnly"
    ]);
    if (parentObject !== void 0 && fromExportLastCheckpointOnly != null) {
      setValueByPath(parentObject, ["supervisedTuningSpec", "exportLastCheckpointOnly"], fromExportLastCheckpointOnly);
    }
  } else if (discriminatorExportLastCheckpointOnly === "PREFERENCE_TUNING") {
    const fromExportLastCheckpointOnly = getValueByPath(fromObject, [
      "exportLastCheckpointOnly"
    ]);
    if (parentObject !== void 0 && fromExportLastCheckpointOnly != null) {
      setValueByPath(parentObject, ["preferenceOptimizationSpec", "exportLastCheckpointOnly"], fromExportLastCheckpointOnly);
    }
  } else if (discriminatorExportLastCheckpointOnly === "DISTILLATION") {
    const fromExportLastCheckpointOnly = getValueByPath(fromObject, [
      "exportLastCheckpointOnly"
    ]);
    if (parentObject !== void 0 && fromExportLastCheckpointOnly != null) {
      setValueByPath(parentObject, ["distillationSpec", "exportLastCheckpointOnly"], fromExportLastCheckpointOnly);
    }
  }
  let discriminatorAdapterSize = getValueByPath(rootObject, [
    "config",
    "method"
  ]);
  if (discriminatorAdapterSize === void 0) {
    discriminatorAdapterSize = "SUPERVISED_FINE_TUNING";
  }
  if (discriminatorAdapterSize === "SUPERVISED_FINE_TUNING") {
    const fromAdapterSize = getValueByPath(fromObject, ["adapterSize"]);
    if (parentObject !== void 0 && fromAdapterSize != null) {
      setValueByPath(parentObject, ["supervisedTuningSpec", "hyperParameters", "adapterSize"], fromAdapterSize);
    }
  } else if (discriminatorAdapterSize === "PREFERENCE_TUNING") {
    const fromAdapterSize = getValueByPath(fromObject, ["adapterSize"]);
    if (parentObject !== void 0 && fromAdapterSize != null) {
      setValueByPath(parentObject, ["preferenceOptimizationSpec", "hyperParameters", "adapterSize"], fromAdapterSize);
    }
  } else if (discriminatorAdapterSize === "DISTILLATION") {
    const fromAdapterSize = getValueByPath(fromObject, ["adapterSize"]);
    if (parentObject !== void 0 && fromAdapterSize != null) {
      setValueByPath(parentObject, ["distillationSpec", "hyperParameters", "adapterSize"], fromAdapterSize);
    }
  }
  let discriminatorTuningMode = getValueByPath(rootObject, [
    "config",
    "method"
  ]);
  if (discriminatorTuningMode === void 0) {
    discriminatorTuningMode = "SUPERVISED_FINE_TUNING";
  }
  if (discriminatorTuningMode === "SUPERVISED_FINE_TUNING") {
    const fromTuningMode = getValueByPath(fromObject, ["tuningMode"]);
    if (parentObject !== void 0 && fromTuningMode != null) {
      setValueByPath(parentObject, ["supervisedTuningSpec", "tuningMode"], fromTuningMode);
    }
  }
  const fromCustomBaseModel = getValueByPath(fromObject, [
    "customBaseModel"
  ]);
  if (parentObject !== void 0 && fromCustomBaseModel != null) {
    setValueByPath(parentObject, ["customBaseModel"], fromCustomBaseModel);
  }
  let discriminatorBatchSize = getValueByPath(rootObject, [
    "config",
    "method"
  ]);
  if (discriminatorBatchSize === void 0) {
    discriminatorBatchSize = "SUPERVISED_FINE_TUNING";
  }
  if (discriminatorBatchSize === "SUPERVISED_FINE_TUNING") {
    const fromBatchSize = getValueByPath(fromObject, ["batchSize"]);
    if (parentObject !== void 0 && fromBatchSize != null) {
      setValueByPath(parentObject, ["supervisedTuningSpec", "hyperParameters", "batchSize"], fromBatchSize);
    }
  }
  let discriminatorLearningRate = getValueByPath(rootObject, [
    "config",
    "method"
  ]);
  if (discriminatorLearningRate === void 0) {
    discriminatorLearningRate = "SUPERVISED_FINE_TUNING";
  }
  if (discriminatorLearningRate === "SUPERVISED_FINE_TUNING") {
    const fromLearningRate = getValueByPath(fromObject, [
      "learningRate"
    ]);
    if (parentObject !== void 0 && fromLearningRate != null) {
      setValueByPath(parentObject, ["supervisedTuningSpec", "hyperParameters", "learningRate"], fromLearningRate);
    }
  }
  const fromLabels = getValueByPath(fromObject, ["labels"]);
  if (parentObject !== void 0 && fromLabels != null) {
    setValueByPath(parentObject, ["labels"], fromLabels);
  }
  const fromBeta = getValueByPath(fromObject, ["beta"]);
  if (parentObject !== void 0 && fromBeta != null) {
    setValueByPath(parentObject, ["preferenceOptimizationSpec", "hyperParameters", "beta"], fromBeta);
  }
  const fromBaseTeacherModel = getValueByPath(fromObject, [
    "baseTeacherModel"
  ]);
  if (parentObject !== void 0 && fromBaseTeacherModel != null) {
    setValueByPath(parentObject, ["distillationSpec", "baseTeacherModel"], fromBaseTeacherModel);
  }
  const fromTunedTeacherModelSource = getValueByPath(fromObject, [
    "tunedTeacherModelSource"
  ]);
  if (parentObject !== void 0 && fromTunedTeacherModelSource != null) {
    setValueByPath(parentObject, ["distillationSpec", "tunedTeacherModelSource"], fromTunedTeacherModelSource);
  }
  const fromSftLossWeightMultiplier = getValueByPath(fromObject, [
    "sftLossWeightMultiplier"
  ]);
  if (parentObject !== void 0 && fromSftLossWeightMultiplier != null) {
    setValueByPath(parentObject, ["distillationSpec", "hyperParameters", "sftLossWeightMultiplier"], fromSftLossWeightMultiplier);
  }
  const fromOutputUri = getValueByPath(fromObject, ["outputUri"]);
  if (parentObject !== void 0 && fromOutputUri != null) {
    setValueByPath(parentObject, ["outputUri"], fromOutputUri);
  }
  const fromEncryptionSpec = getValueByPath(fromObject, [
    "encryptionSpec"
  ]);
  if (parentObject !== void 0 && fromEncryptionSpec != null) {
    setValueByPath(parentObject, ["encryptionSpec"], fromEncryptionSpec);
  }
  return toObject;
}
function createTuningJobParametersPrivateToMldev(fromObject, rootObject) {
  const toObject = {};
  const fromBaseModel = getValueByPath(fromObject, ["baseModel"]);
  if (fromBaseModel != null) {
    setValueByPath(toObject, ["baseModel"], fromBaseModel);
  }
  const fromPreTunedModel = getValueByPath(fromObject, [
    "preTunedModel"
  ]);
  if (fromPreTunedModel != null) {
    setValueByPath(toObject, ["preTunedModel"], fromPreTunedModel);
  }
  const fromTrainingDataset = getValueByPath(fromObject, [
    "trainingDataset"
  ]);
  if (fromTrainingDataset != null) {
    tuningDatasetToMldev(fromTrainingDataset);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    createTuningJobConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function createTuningJobParametersPrivateToVertex(fromObject, rootObject) {
  const toObject = {};
  const fromBaseModel = getValueByPath(fromObject, ["baseModel"]);
  if (fromBaseModel != null) {
    setValueByPath(toObject, ["baseModel"], fromBaseModel);
  }
  const fromPreTunedModel = getValueByPath(fromObject, [
    "preTunedModel"
  ]);
  if (fromPreTunedModel != null) {
    setValueByPath(toObject, ["preTunedModel"], fromPreTunedModel);
  }
  const fromTrainingDataset = getValueByPath(fromObject, [
    "trainingDataset"
  ]);
  if (fromTrainingDataset != null) {
    tuningDatasetToVertex(fromTrainingDataset, toObject, rootObject);
  }
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    createTuningJobConfigToVertex(fromConfig, toObject, rootObject);
  }
  return toObject;
}
function getTuningJobParametersToMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], fromName);
  }
  return toObject;
}
function getTuningJobParametersToVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["_url", "name"], fromName);
  }
  return toObject;
}
function listTuningJobsConfigToMldev(fromObject, parentObject, _rootObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== void 0 && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== void 0 && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  const fromFilter = getValueByPath(fromObject, ["filter"]);
  if (parentObject !== void 0 && fromFilter != null) {
    setValueByPath(parentObject, ["_query", "filter"], fromFilter);
  }
  return toObject;
}
function listTuningJobsConfigToVertex(fromObject, parentObject, _rootObject) {
  const toObject = {};
  const fromPageSize = getValueByPath(fromObject, ["pageSize"]);
  if (parentObject !== void 0 && fromPageSize != null) {
    setValueByPath(parentObject, ["_query", "pageSize"], fromPageSize);
  }
  const fromPageToken = getValueByPath(fromObject, ["pageToken"]);
  if (parentObject !== void 0 && fromPageToken != null) {
    setValueByPath(parentObject, ["_query", "pageToken"], fromPageToken);
  }
  const fromFilter = getValueByPath(fromObject, ["filter"]);
  if (parentObject !== void 0 && fromFilter != null) {
    setValueByPath(parentObject, ["_query", "filter"], fromFilter);
  }
  return toObject;
}
function listTuningJobsParametersToMldev(fromObject, rootObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    listTuningJobsConfigToMldev(fromConfig, toObject);
  }
  return toObject;
}
function listTuningJobsParametersToVertex(fromObject, rootObject) {
  const toObject = {};
  const fromConfig = getValueByPath(fromObject, ["config"]);
  if (fromConfig != null) {
    listTuningJobsConfigToVertex(fromConfig, toObject);
  }
  return toObject;
}
function listTuningJobsResponseFromMldev(fromObject, rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromTuningJobs = getValueByPath(fromObject, ["tunedModels"]);
  if (fromTuningJobs != null) {
    let transformedList = fromTuningJobs;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return tuningJobFromMldev(item);
      });
    }
    setValueByPath(toObject, ["tuningJobs"], transformedList);
  }
  return toObject;
}
function listTuningJobsResponseFromVertex(fromObject, rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromNextPageToken = getValueByPath(fromObject, [
    "nextPageToken"
  ]);
  if (fromNextPageToken != null) {
    setValueByPath(toObject, ["nextPageToken"], fromNextPageToken);
  }
  const fromTuningJobs = getValueByPath(fromObject, ["tuningJobs"]);
  if (fromTuningJobs != null) {
    let transformedList = fromTuningJobs;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return tuningJobFromVertex(item);
      });
    }
    setValueByPath(toObject, ["tuningJobs"], transformedList);
  }
  return toObject;
}
function tunedModelFromMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromModel = getValueByPath(fromObject, ["name"]);
  if (fromModel != null) {
    setValueByPath(toObject, ["model"], fromModel);
  }
  const fromEndpoint = getValueByPath(fromObject, ["name"]);
  if (fromEndpoint != null) {
    setValueByPath(toObject, ["endpoint"], fromEndpoint);
  }
  return toObject;
}
function tuningDatasetToMldev(fromObject, _rootObject) {
  const toObject = {};
  if (getValueByPath(fromObject, ["gcsUri"]) !== void 0) {
    throw new Error("gcsUri parameter is not supported in Gemini API.");
  }
  if (getValueByPath(fromObject, ["vertexDatasetResource"]) !== void 0) {
    throw new Error("vertexDatasetResource parameter is not supported in Gemini API.");
  }
  const fromExamples = getValueByPath(fromObject, ["examples"]);
  if (fromExamples != null) {
    let transformedList = fromExamples;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["examples", "examples"], transformedList);
  }
  return toObject;
}
function tuningDatasetToVertex(fromObject, parentObject, rootObject) {
  const toObject = {};
  let discriminatorGcsUri = getValueByPath(rootObject, [
    "config",
    "method"
  ]);
  if (discriminatorGcsUri === void 0) {
    discriminatorGcsUri = "SUPERVISED_FINE_TUNING";
  }
  if (discriminatorGcsUri === "SUPERVISED_FINE_TUNING") {
    const fromGcsUri = getValueByPath(fromObject, ["gcsUri"]);
    if (parentObject !== void 0 && fromGcsUri != null) {
      setValueByPath(parentObject, ["supervisedTuningSpec", "trainingDatasetUri"], fromGcsUri);
    }
  } else if (discriminatorGcsUri === "PREFERENCE_TUNING") {
    const fromGcsUri = getValueByPath(fromObject, ["gcsUri"]);
    if (parentObject !== void 0 && fromGcsUri != null) {
      setValueByPath(parentObject, ["preferenceOptimizationSpec", "trainingDatasetUri"], fromGcsUri);
    }
  } else if (discriminatorGcsUri === "DISTILLATION") {
    const fromGcsUri = getValueByPath(fromObject, ["gcsUri"]);
    if (parentObject !== void 0 && fromGcsUri != null) {
      setValueByPath(parentObject, ["distillationSpec", "promptDatasetUri"], fromGcsUri);
    }
  }
  let discriminatorVertexDatasetResource = getValueByPath(rootObject, [
    "config",
    "method"
  ]);
  if (discriminatorVertexDatasetResource === void 0) {
    discriminatorVertexDatasetResource = "SUPERVISED_FINE_TUNING";
  }
  if (discriminatorVertexDatasetResource === "SUPERVISED_FINE_TUNING") {
    const fromVertexDatasetResource = getValueByPath(fromObject, [
      "vertexDatasetResource"
    ]);
    if (parentObject !== void 0 && fromVertexDatasetResource != null) {
      setValueByPath(parentObject, ["supervisedTuningSpec", "trainingDatasetUri"], fromVertexDatasetResource);
    }
  } else if (discriminatorVertexDatasetResource === "PREFERENCE_TUNING") {
    const fromVertexDatasetResource = getValueByPath(fromObject, [
      "vertexDatasetResource"
    ]);
    if (parentObject !== void 0 && fromVertexDatasetResource != null) {
      setValueByPath(parentObject, ["preferenceOptimizationSpec", "trainingDatasetUri"], fromVertexDatasetResource);
    }
  } else if (discriminatorVertexDatasetResource === "DISTILLATION") {
    const fromVertexDatasetResource = getValueByPath(fromObject, [
      "vertexDatasetResource"
    ]);
    if (parentObject !== void 0 && fromVertexDatasetResource != null) {
      setValueByPath(parentObject, ["distillationSpec", "promptDatasetUri"], fromVertexDatasetResource);
    }
  }
  if (getValueByPath(fromObject, ["examples"]) !== void 0) {
    throw new Error("examples parameter is not supported in Vertex AI.");
  }
  return toObject;
}
function tuningJobFromMldev(fromObject, rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromState = getValueByPath(fromObject, ["state"]);
  if (fromState != null) {
    setValueByPath(toObject, ["state"], tTuningJobStatus(fromState));
  }
  const fromCreateTime = getValueByPath(fromObject, ["createTime"]);
  if (fromCreateTime != null) {
    setValueByPath(toObject, ["createTime"], fromCreateTime);
  }
  const fromStartTime = getValueByPath(fromObject, [
    "tuningTask",
    "startTime"
  ]);
  if (fromStartTime != null) {
    setValueByPath(toObject, ["startTime"], fromStartTime);
  }
  const fromEndTime = getValueByPath(fromObject, [
    "tuningTask",
    "completeTime"
  ]);
  if (fromEndTime != null) {
    setValueByPath(toObject, ["endTime"], fromEndTime);
  }
  const fromUpdateTime = getValueByPath(fromObject, ["updateTime"]);
  if (fromUpdateTime != null) {
    setValueByPath(toObject, ["updateTime"], fromUpdateTime);
  }
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (fromDescription != null) {
    setValueByPath(toObject, ["description"], fromDescription);
  }
  const fromBaseModel = getValueByPath(fromObject, ["baseModel"]);
  if (fromBaseModel != null) {
    setValueByPath(toObject, ["baseModel"], fromBaseModel);
  }
  const fromTunedModel = getValueByPath(fromObject, ["_self"]);
  if (fromTunedModel != null) {
    setValueByPath(toObject, ["tunedModel"], tunedModelFromMldev(fromTunedModel));
  }
  return toObject;
}
function tuningJobFromVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromState = getValueByPath(fromObject, ["state"]);
  if (fromState != null) {
    setValueByPath(toObject, ["state"], tTuningJobStatus(fromState));
  }
  const fromCreateTime = getValueByPath(fromObject, ["createTime"]);
  if (fromCreateTime != null) {
    setValueByPath(toObject, ["createTime"], fromCreateTime);
  }
  const fromStartTime = getValueByPath(fromObject, ["startTime"]);
  if (fromStartTime != null) {
    setValueByPath(toObject, ["startTime"], fromStartTime);
  }
  const fromEndTime = getValueByPath(fromObject, ["endTime"]);
  if (fromEndTime != null) {
    setValueByPath(toObject, ["endTime"], fromEndTime);
  }
  const fromUpdateTime = getValueByPath(fromObject, ["updateTime"]);
  if (fromUpdateTime != null) {
    setValueByPath(toObject, ["updateTime"], fromUpdateTime);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  const fromDescription = getValueByPath(fromObject, ["description"]);
  if (fromDescription != null) {
    setValueByPath(toObject, ["description"], fromDescription);
  }
  const fromBaseModel = getValueByPath(fromObject, ["baseModel"]);
  if (fromBaseModel != null) {
    setValueByPath(toObject, ["baseModel"], fromBaseModel);
  }
  const fromTunedModel = getValueByPath(fromObject, ["tunedModel"]);
  if (fromTunedModel != null) {
    setValueByPath(toObject, ["tunedModel"], fromTunedModel);
  }
  const fromPreTunedModel = getValueByPath(fromObject, [
    "preTunedModel"
  ]);
  if (fromPreTunedModel != null) {
    setValueByPath(toObject, ["preTunedModel"], fromPreTunedModel);
  }
  const fromSupervisedTuningSpec = getValueByPath(fromObject, [
    "supervisedTuningSpec"
  ]);
  if (fromSupervisedTuningSpec != null) {
    setValueByPath(toObject, ["supervisedTuningSpec"], fromSupervisedTuningSpec);
  }
  const fromPreferenceOptimizationSpec = getValueByPath(fromObject, [
    "preferenceOptimizationSpec"
  ]);
  if (fromPreferenceOptimizationSpec != null) {
    setValueByPath(toObject, ["preferenceOptimizationSpec"], fromPreferenceOptimizationSpec);
  }
  const fromDistillationSpec = getValueByPath(fromObject, [
    "distillationSpec"
  ]);
  if (fromDistillationSpec != null) {
    setValueByPath(toObject, ["distillationSpec"], fromDistillationSpec);
  }
  const fromTuningDataStats = getValueByPath(fromObject, [
    "tuningDataStats"
  ]);
  if (fromTuningDataStats != null) {
    setValueByPath(toObject, ["tuningDataStats"], fromTuningDataStats);
  }
  const fromEncryptionSpec = getValueByPath(fromObject, [
    "encryptionSpec"
  ]);
  if (fromEncryptionSpec != null) {
    setValueByPath(toObject, ["encryptionSpec"], fromEncryptionSpec);
  }
  const fromPartnerModelTuningSpec = getValueByPath(fromObject, [
    "partnerModelTuningSpec"
  ]);
  if (fromPartnerModelTuningSpec != null) {
    setValueByPath(toObject, ["partnerModelTuningSpec"], fromPartnerModelTuningSpec);
  }
  const fromCustomBaseModel = getValueByPath(fromObject, [
    "customBaseModel"
  ]);
  if (fromCustomBaseModel != null) {
    setValueByPath(toObject, ["customBaseModel"], fromCustomBaseModel);
  }
  const fromEvaluateDatasetRuns = getValueByPath(fromObject, [
    "evaluateDatasetRuns"
  ]);
  if (fromEvaluateDatasetRuns != null) {
    let transformedList = fromEvaluateDatasetRuns;
    if (Array.isArray(transformedList)) {
      transformedList = transformedList.map((item) => {
        return item;
      });
    }
    setValueByPath(toObject, ["evaluateDatasetRuns"], transformedList);
  }
  const fromExperiment = getValueByPath(fromObject, ["experiment"]);
  if (fromExperiment != null) {
    setValueByPath(toObject, ["experiment"], fromExperiment);
  }
  const fromFullFineTuningSpec = getValueByPath(fromObject, [
    "fullFineTuningSpec"
  ]);
  if (fromFullFineTuningSpec != null) {
    setValueByPath(toObject, ["fullFineTuningSpec"], fromFullFineTuningSpec);
  }
  const fromLabels = getValueByPath(fromObject, ["labels"]);
  if (fromLabels != null) {
    setValueByPath(toObject, ["labels"], fromLabels);
  }
  const fromOutputUri = getValueByPath(fromObject, ["outputUri"]);
  if (fromOutputUri != null) {
    setValueByPath(toObject, ["outputUri"], fromOutputUri);
  }
  const fromPipelineJob = getValueByPath(fromObject, ["pipelineJob"]);
  if (fromPipelineJob != null) {
    setValueByPath(toObject, ["pipelineJob"], fromPipelineJob);
  }
  const fromServiceAccount = getValueByPath(fromObject, [
    "serviceAccount"
  ]);
  if (fromServiceAccount != null) {
    setValueByPath(toObject, ["serviceAccount"], fromServiceAccount);
  }
  const fromTunedModelDisplayName = getValueByPath(fromObject, [
    "tunedModelDisplayName"
  ]);
  if (fromTunedModelDisplayName != null) {
    setValueByPath(toObject, ["tunedModelDisplayName"], fromTunedModelDisplayName);
  }
  const fromTuningJobState = getValueByPath(fromObject, [
    "tuningJobState"
  ]);
  if (fromTuningJobState != null) {
    setValueByPath(toObject, ["tuningJobState"], fromTuningJobState);
  }
  const fromVeoTuningSpec = getValueByPath(fromObject, [
    "veoTuningSpec"
  ]);
  if (fromVeoTuningSpec != null) {
    setValueByPath(toObject, ["veoTuningSpec"], fromVeoTuningSpec);
  }
  return toObject;
}
function tuningOperationFromMldev(fromObject, _rootObject) {
  const toObject = {};
  const fromSdkHttpResponse = getValueByPath(fromObject, [
    "sdkHttpResponse"
  ]);
  if (fromSdkHttpResponse != null) {
    setValueByPath(toObject, ["sdkHttpResponse"], fromSdkHttpResponse);
  }
  const fromName = getValueByPath(fromObject, ["name"]);
  if (fromName != null) {
    setValueByPath(toObject, ["name"], fromName);
  }
  const fromMetadata = getValueByPath(fromObject, ["metadata"]);
  if (fromMetadata != null) {
    setValueByPath(toObject, ["metadata"], fromMetadata);
  }
  const fromDone = getValueByPath(fromObject, ["done"]);
  if (fromDone != null) {
    setValueByPath(toObject, ["done"], fromDone);
  }
  const fromError = getValueByPath(fromObject, ["error"]);
  if (fromError != null) {
    setValueByPath(toObject, ["error"], fromError);
  }
  return toObject;
}
function tuningValidationDatasetToVertex(fromObject, _rootObject) {
  const toObject = {};
  const fromGcsUri = getValueByPath(fromObject, ["gcsUri"]);
  if (fromGcsUri != null) {
    setValueByPath(toObject, ["validationDatasetUri"], fromGcsUri);
  }
  const fromVertexDatasetResource = getValueByPath(fromObject, [
    "vertexDatasetResource"
  ]);
  if (fromVertexDatasetResource != null) {
    setValueByPath(toObject, ["validationDatasetUri"], fromVertexDatasetResource);
  }
  return toObject;
}
async function uploadBlob(file, uploadUrl, apiClient, httpOptions) {
  var _a2;
  const response = await uploadBlobInternal(file, uploadUrl, apiClient, httpOptions);
  const responseJson = await (response === null || response === void 0 ? void 0 : response.json());
  if (((_a2 = response === null || response === void 0 ? void 0 : response.headers) === null || _a2 === void 0 ? void 0 : _a2[X_GOOG_UPLOAD_STATUS_HEADER_FIELD]) !== "final") {
    throw new Error("Failed to upload file: Upload status is not finalized.");
  }
  return responseJson["file"];
}
async function uploadBlobToFileSearchStore(file, uploadUrl, apiClient, httpOptions) {
  var _a2;
  const response = await uploadBlobInternal(file, uploadUrl, apiClient, httpOptions);
  const responseJson = await (response === null || response === void 0 ? void 0 : response.json());
  if (((_a2 = response === null || response === void 0 ? void 0 : response.headers) === null || _a2 === void 0 ? void 0 : _a2[X_GOOG_UPLOAD_STATUS_HEADER_FIELD]) !== "final") {
    throw new Error("Failed to upload file: Upload status is not finalized.");
  }
  const resp = uploadToFileSearchStoreOperationFromMldev(responseJson);
  const typedResp = new UploadToFileSearchStoreOperation();
  Object.assign(typedResp, resp);
  return typedResp;
}
async function uploadBlobInternal(file, uploadUrl, apiClient, httpOptions) {
  var _a2, _b, _c;
  let finalUrl = uploadUrl;
  const effectiveBaseUrl = (httpOptions === null || httpOptions === void 0 ? void 0 : httpOptions.baseUrl) || ((_a2 = apiClient.clientOptions.httpOptions) === null || _a2 === void 0 ? void 0 : _a2.baseUrl);
  if (effectiveBaseUrl) {
    const baseUri = new URL(effectiveBaseUrl);
    const uploadUri = new URL(uploadUrl);
    uploadUri.protocol = baseUri.protocol;
    uploadUri.host = baseUri.host;
    uploadUri.port = baseUri.port;
    finalUrl = uploadUri.toString();
  }
  let fileSize = 0;
  let offset = 0;
  let response = new HttpResponse(new Response());
  let uploadCommand = "upload";
  fileSize = file.size;
  while (offset < fileSize) {
    const chunkSize = Math.min(MAX_CHUNK_SIZE, fileSize - offset);
    const chunk = file.slice(offset, offset + chunkSize);
    if (offset + chunkSize >= fileSize) {
      uploadCommand += ", finalize";
    }
    let retryCount = 0;
    let currentDelayMs = INITIAL_RETRY_DELAY_MS;
    while (retryCount < MAX_RETRY_COUNT) {
      const mergedHeaders = Object.assign(Object.assign({}, (httpOptions === null || httpOptions === void 0 ? void 0 : httpOptions.headers) || {}), { "X-Goog-Upload-Command": uploadCommand, "X-Goog-Upload-Offset": String(offset), "Content-Length": String(chunkSize) });
      response = await apiClient.request({
        path: "",
        body: chunk,
        httpMethod: "POST",
        httpOptions: Object.assign(Object.assign({}, httpOptions), { apiVersion: "", baseUrl: finalUrl, headers: mergedHeaders })
      });
      if ((_b = response === null || response === void 0 ? void 0 : response.headers) === null || _b === void 0 ? void 0 : _b[X_GOOG_UPLOAD_STATUS_HEADER_FIELD]) {
        break;
      }
      retryCount++;
      await sleep(currentDelayMs);
      currentDelayMs = currentDelayMs * DELAY_MULTIPLIER;
    }
    offset += chunkSize;
    if (((_c = response === null || response === void 0 ? void 0 : response.headers) === null || _c === void 0 ? void 0 : _c[X_GOOG_UPLOAD_STATUS_HEADER_FIELD]) !== "active") {
      break;
    }
    if (fileSize <= offset) {
      throw new Error("All content has been uploaded, but the upload status is not finalized.");
    }
  }
  return response;
}
async function getBlobStat(file) {
  const fileStat = { size: file.size, type: file.type };
  return fileStat;
}
function sleep(ms) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, ms));
}
var import_p_retry, _defaultBaseGeminiUrl, _defaultBaseVertexUrl, BaseModule, Language, Outcome, FunctionResponseScheduling, Type, PhishBlockThreshold, AuthType, HttpElementLocation, ApiSpec, Behavior, DynamicRetrievalConfigMode, FunctionCallingConfigMode, ThinkingLevel, PersonGeneration, HarmCategory, HarmBlockMethod, HarmBlockThreshold, FinishReason, HarmProbability, HarmSeverity, UrlRetrievalStatus, BlockedReason, TrafficType, Modality, MediaResolution, TuningMode, AdapterSize, JobState, TuningJobState, AggregationMetric, PairwiseChoice, TuningTask, PartMediaResolutionLevel, ToolType, ResourceScope, FeatureSelectionPreference, Environment, ProminentPeople, EmbeddingApiType, SafetyFilterLevel, ImagePromptLanguage, MaskReferenceMode, ControlReferenceType, SubjectReferenceType, EditMode, SegmentMode, VideoGenerationReferenceType, VideoGenerationMaskMode, VideoCompressionQuality, TuningMethod, DocumentState, FileState, FileSource, TurnCompleteReason, MediaModality, VadSignalType, VoiceActivityType, StartSensitivity, EndSensitivity, ActivityHandling, TurnCoverage, Scale, MusicGenerationMode, LiveMusicPlaybackControl, HttpResponse, GenerateContentResponse, EmbedContentResponse, GenerateImagesResponse, EditImageResponse, UpscaleImageResponse, RecontextImageResponse, SegmentImageResponse, ListModelsResponse, DeleteModelResponse, CountTokensResponse, ComputeTokensResponse, GenerateVideosOperation, ListTuningJobsResponse, CancelTuningJobResponse, DeleteCachedContentResponse, ListCachedContentsResponse, ListDocumentsResponse, ListFileSearchStoresResponse, UploadToFileSearchStoreResumableResponse, ImportFileOperation, ListFilesResponse, CreateFileResponse, DeleteFileResponse, RegisterFilesResponse, ListBatchJobsResponse, LiveServerMessage, LiveMusicServerMessage, UploadToFileSearchStoreOperation, PagedItem, Pager, Batches, Caches, Chats, Chat, ApiError, Files, CONTENT_TYPE_HEADER, SERVER_TIMEOUT_HEADER, USER_AGENT_HEADER, GOOGLE_API_CLIENT_HEADER, SDK_VERSION, LIBRARY_LABEL, VERTEX_AI_API_DEFAULT_VERSION, GOOGLE_AI_API_DEFAULT_VERSION, DEFAULT_RETRY_ATTEMPTS, DEFAULT_RETRY_HTTP_STATUS_CODES, ApiClient, MCP_LABEL, hasMcpToolUsageFromMcpToTool, McpCallableTool, LiveMusic, LiveMusicSession, FUNCTION_RESPONSE_REQUIRES_ID, Live, defaultLiveSendClientContentParamerters, Session, DEFAULT_MAX_REMOTE_CALLS, Models, Operations, Tokens, Documents, FileSearchStores, uuid4Internal, uuid4, castToError, GeminiNextGenAPIClientError, APIError, APIUserAbortError, APIConnectionError, APIConnectionTimeoutError, BadRequestError, AuthenticationError, PermissionDeniedError, NotFoundError, ConflictError, UnprocessableEntityError, RateLimitError, InternalServerError, startsWithSchemeRegexp, isAbsoluteURL, isArrayInternal, isArray, isReadonlyArrayInternal, isReadonlyArray, validatePositiveInteger, safeJSON, sleep$1, FallbackEncoder, VERSION, checkFileSupport, isAsyncIterable, isBlobLike, isFileLike, isResponseLike, APIResource, EMPTY, createPathTagFunction, path, BaseInteractions, Interactions, encodeUTF8_, decodeUTF8_, LineDecoder, levelNumbers, parseLogLevel, noopLogger, cachedLoggers, formatRequestDetails, Stream, SSEDecoder, APIPromise, brand_privateNullableHeaders, buildHeaders, readEnv, _a, BaseGeminiNextGenAPIClient, GeminiNextGenAPIClient, Tunings, BrowserDownloader, MAX_CHUNK_SIZE, MAX_RETRY_COUNT, INITIAL_RETRY_DELAY_MS, DELAY_MULTIPLIER, X_GOOG_UPLOAD_STATUS_HEADER_FIELD, BrowserUploader, BrowserWebSocketFactory, BrowserWebSocket, GOOGLE_API_KEY_HEADER, WebAuth, LANGUAGE_LABEL_PREFIX, GoogleGenAI;
var init_web = __esm({
  "../node_modules/@google/genai/dist/web/index.mjs"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    import_p_retry = __toESM(require_p_retry(), 1);
    _defaultBaseGeminiUrl = void 0;
    _defaultBaseVertexUrl = void 0;
    __name(getDefaultBaseUrls, "getDefaultBaseUrls");
    __name(getBaseUrl, "getBaseUrl");
    BaseModule = class {
      static {
        __name(this, "BaseModule");
      }
    };
    __name(formatMap, "formatMap");
    __name(setValueByPath, "setValueByPath");
    __name(getValueByPath, "getValueByPath");
    __name(moveValueByPath, "moveValueByPath");
    __name(_moveValueRecursive, "_moveValueRecursive");
    __name(tBytes$1, "tBytes$1");
    __name(fetchPredictOperationParametersToVertex, "fetchPredictOperationParametersToVertex");
    __name(generateVideosOperationFromMldev$1, "generateVideosOperationFromMldev$1");
    __name(generateVideosOperationFromVertex$1, "generateVideosOperationFromVertex$1");
    __name(generateVideosResponseFromMldev$1, "generateVideosResponseFromMldev$1");
    __name(generateVideosResponseFromVertex$1, "generateVideosResponseFromVertex$1");
    __name(generatedVideoFromMldev$1, "generatedVideoFromMldev$1");
    __name(generatedVideoFromVertex$1, "generatedVideoFromVertex$1");
    __name(getOperationParametersToMldev, "getOperationParametersToMldev");
    __name(getOperationParametersToVertex, "getOperationParametersToVertex");
    __name(importFileOperationFromMldev$1, "importFileOperationFromMldev$1");
    __name(importFileResponseFromMldev$1, "importFileResponseFromMldev$1");
    __name(uploadToFileSearchStoreOperationFromMldev, "uploadToFileSearchStoreOperationFromMldev");
    __name(uploadToFileSearchStoreResponseFromMldev, "uploadToFileSearchStoreResponseFromMldev");
    __name(videoFromMldev$1, "videoFromMldev$1");
    __name(videoFromVertex$1, "videoFromVertex$1");
    (function(Language2) {
      Language2["LANGUAGE_UNSPECIFIED"] = "LANGUAGE_UNSPECIFIED";
      Language2["PYTHON"] = "PYTHON";
    })(Language || (Language = {}));
    (function(Outcome2) {
      Outcome2["OUTCOME_UNSPECIFIED"] = "OUTCOME_UNSPECIFIED";
      Outcome2["OUTCOME_OK"] = "OUTCOME_OK";
      Outcome2["OUTCOME_FAILED"] = "OUTCOME_FAILED";
      Outcome2["OUTCOME_DEADLINE_EXCEEDED"] = "OUTCOME_DEADLINE_EXCEEDED";
    })(Outcome || (Outcome = {}));
    (function(FunctionResponseScheduling2) {
      FunctionResponseScheduling2["SCHEDULING_UNSPECIFIED"] = "SCHEDULING_UNSPECIFIED";
      FunctionResponseScheduling2["SILENT"] = "SILENT";
      FunctionResponseScheduling2["WHEN_IDLE"] = "WHEN_IDLE";
      FunctionResponseScheduling2["INTERRUPT"] = "INTERRUPT";
    })(FunctionResponseScheduling || (FunctionResponseScheduling = {}));
    (function(Type2) {
      Type2["TYPE_UNSPECIFIED"] = "TYPE_UNSPECIFIED";
      Type2["STRING"] = "STRING";
      Type2["NUMBER"] = "NUMBER";
      Type2["INTEGER"] = "INTEGER";
      Type2["BOOLEAN"] = "BOOLEAN";
      Type2["ARRAY"] = "ARRAY";
      Type2["OBJECT"] = "OBJECT";
      Type2["NULL"] = "NULL";
    })(Type || (Type = {}));
    (function(PhishBlockThreshold2) {
      PhishBlockThreshold2["PHISH_BLOCK_THRESHOLD_UNSPECIFIED"] = "PHISH_BLOCK_THRESHOLD_UNSPECIFIED";
      PhishBlockThreshold2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
      PhishBlockThreshold2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
      PhishBlockThreshold2["BLOCK_HIGH_AND_ABOVE"] = "BLOCK_HIGH_AND_ABOVE";
      PhishBlockThreshold2["BLOCK_HIGHER_AND_ABOVE"] = "BLOCK_HIGHER_AND_ABOVE";
      PhishBlockThreshold2["BLOCK_VERY_HIGH_AND_ABOVE"] = "BLOCK_VERY_HIGH_AND_ABOVE";
      PhishBlockThreshold2["BLOCK_ONLY_EXTREMELY_HIGH"] = "BLOCK_ONLY_EXTREMELY_HIGH";
    })(PhishBlockThreshold || (PhishBlockThreshold = {}));
    (function(AuthType2) {
      AuthType2["AUTH_TYPE_UNSPECIFIED"] = "AUTH_TYPE_UNSPECIFIED";
      AuthType2["NO_AUTH"] = "NO_AUTH";
      AuthType2["API_KEY_AUTH"] = "API_KEY_AUTH";
      AuthType2["HTTP_BASIC_AUTH"] = "HTTP_BASIC_AUTH";
      AuthType2["GOOGLE_SERVICE_ACCOUNT_AUTH"] = "GOOGLE_SERVICE_ACCOUNT_AUTH";
      AuthType2["OAUTH"] = "OAUTH";
      AuthType2["OIDC_AUTH"] = "OIDC_AUTH";
    })(AuthType || (AuthType = {}));
    (function(HttpElementLocation2) {
      HttpElementLocation2["HTTP_IN_UNSPECIFIED"] = "HTTP_IN_UNSPECIFIED";
      HttpElementLocation2["HTTP_IN_QUERY"] = "HTTP_IN_QUERY";
      HttpElementLocation2["HTTP_IN_HEADER"] = "HTTP_IN_HEADER";
      HttpElementLocation2["HTTP_IN_PATH"] = "HTTP_IN_PATH";
      HttpElementLocation2["HTTP_IN_BODY"] = "HTTP_IN_BODY";
      HttpElementLocation2["HTTP_IN_COOKIE"] = "HTTP_IN_COOKIE";
    })(HttpElementLocation || (HttpElementLocation = {}));
    (function(ApiSpec2) {
      ApiSpec2["API_SPEC_UNSPECIFIED"] = "API_SPEC_UNSPECIFIED";
      ApiSpec2["SIMPLE_SEARCH"] = "SIMPLE_SEARCH";
      ApiSpec2["ELASTIC_SEARCH"] = "ELASTIC_SEARCH";
    })(ApiSpec || (ApiSpec = {}));
    (function(Behavior2) {
      Behavior2["UNSPECIFIED"] = "UNSPECIFIED";
      Behavior2["BLOCKING"] = "BLOCKING";
      Behavior2["NON_BLOCKING"] = "NON_BLOCKING";
    })(Behavior || (Behavior = {}));
    (function(DynamicRetrievalConfigMode2) {
      DynamicRetrievalConfigMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
      DynamicRetrievalConfigMode2["MODE_DYNAMIC"] = "MODE_DYNAMIC";
    })(DynamicRetrievalConfigMode || (DynamicRetrievalConfigMode = {}));
    (function(FunctionCallingConfigMode2) {
      FunctionCallingConfigMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
      FunctionCallingConfigMode2["AUTO"] = "AUTO";
      FunctionCallingConfigMode2["ANY"] = "ANY";
      FunctionCallingConfigMode2["NONE"] = "NONE";
      FunctionCallingConfigMode2["VALIDATED"] = "VALIDATED";
    })(FunctionCallingConfigMode || (FunctionCallingConfigMode = {}));
    (function(ThinkingLevel2) {
      ThinkingLevel2["THINKING_LEVEL_UNSPECIFIED"] = "THINKING_LEVEL_UNSPECIFIED";
      ThinkingLevel2["LOW"] = "LOW";
      ThinkingLevel2["MEDIUM"] = "MEDIUM";
      ThinkingLevel2["HIGH"] = "HIGH";
      ThinkingLevel2["MINIMAL"] = "MINIMAL";
    })(ThinkingLevel || (ThinkingLevel = {}));
    (function(PersonGeneration2) {
      PersonGeneration2["DONT_ALLOW"] = "DONT_ALLOW";
      PersonGeneration2["ALLOW_ADULT"] = "ALLOW_ADULT";
      PersonGeneration2["ALLOW_ALL"] = "ALLOW_ALL";
    })(PersonGeneration || (PersonGeneration = {}));
    (function(HarmCategory2) {
      HarmCategory2["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
      HarmCategory2["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
      HarmCategory2["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
      HarmCategory2["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
      HarmCategory2["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
      HarmCategory2["HARM_CATEGORY_CIVIC_INTEGRITY"] = "HARM_CATEGORY_CIVIC_INTEGRITY";
      HarmCategory2["HARM_CATEGORY_IMAGE_HATE"] = "HARM_CATEGORY_IMAGE_HATE";
      HarmCategory2["HARM_CATEGORY_IMAGE_DANGEROUS_CONTENT"] = "HARM_CATEGORY_IMAGE_DANGEROUS_CONTENT";
      HarmCategory2["HARM_CATEGORY_IMAGE_HARASSMENT"] = "HARM_CATEGORY_IMAGE_HARASSMENT";
      HarmCategory2["HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT";
      HarmCategory2["HARM_CATEGORY_JAILBREAK"] = "HARM_CATEGORY_JAILBREAK";
    })(HarmCategory || (HarmCategory = {}));
    (function(HarmBlockMethod2) {
      HarmBlockMethod2["HARM_BLOCK_METHOD_UNSPECIFIED"] = "HARM_BLOCK_METHOD_UNSPECIFIED";
      HarmBlockMethod2["SEVERITY"] = "SEVERITY";
      HarmBlockMethod2["PROBABILITY"] = "PROBABILITY";
    })(HarmBlockMethod || (HarmBlockMethod = {}));
    (function(HarmBlockThreshold2) {
      HarmBlockThreshold2["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
      HarmBlockThreshold2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
      HarmBlockThreshold2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
      HarmBlockThreshold2["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
      HarmBlockThreshold2["BLOCK_NONE"] = "BLOCK_NONE";
      HarmBlockThreshold2["OFF"] = "OFF";
    })(HarmBlockThreshold || (HarmBlockThreshold = {}));
    (function(FinishReason2) {
      FinishReason2["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
      FinishReason2["STOP"] = "STOP";
      FinishReason2["MAX_TOKENS"] = "MAX_TOKENS";
      FinishReason2["SAFETY"] = "SAFETY";
      FinishReason2["RECITATION"] = "RECITATION";
      FinishReason2["LANGUAGE"] = "LANGUAGE";
      FinishReason2["OTHER"] = "OTHER";
      FinishReason2["BLOCKLIST"] = "BLOCKLIST";
      FinishReason2["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
      FinishReason2["SPII"] = "SPII";
      FinishReason2["MALFORMED_FUNCTION_CALL"] = "MALFORMED_FUNCTION_CALL";
      FinishReason2["IMAGE_SAFETY"] = "IMAGE_SAFETY";
      FinishReason2["UNEXPECTED_TOOL_CALL"] = "UNEXPECTED_TOOL_CALL";
      FinishReason2["IMAGE_PROHIBITED_CONTENT"] = "IMAGE_PROHIBITED_CONTENT";
      FinishReason2["NO_IMAGE"] = "NO_IMAGE";
      FinishReason2["IMAGE_RECITATION"] = "IMAGE_RECITATION";
      FinishReason2["IMAGE_OTHER"] = "IMAGE_OTHER";
    })(FinishReason || (FinishReason = {}));
    (function(HarmProbability2) {
      HarmProbability2["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
      HarmProbability2["NEGLIGIBLE"] = "NEGLIGIBLE";
      HarmProbability2["LOW"] = "LOW";
      HarmProbability2["MEDIUM"] = "MEDIUM";
      HarmProbability2["HIGH"] = "HIGH";
    })(HarmProbability || (HarmProbability = {}));
    (function(HarmSeverity2) {
      HarmSeverity2["HARM_SEVERITY_UNSPECIFIED"] = "HARM_SEVERITY_UNSPECIFIED";
      HarmSeverity2["HARM_SEVERITY_NEGLIGIBLE"] = "HARM_SEVERITY_NEGLIGIBLE";
      HarmSeverity2["HARM_SEVERITY_LOW"] = "HARM_SEVERITY_LOW";
      HarmSeverity2["HARM_SEVERITY_MEDIUM"] = "HARM_SEVERITY_MEDIUM";
      HarmSeverity2["HARM_SEVERITY_HIGH"] = "HARM_SEVERITY_HIGH";
    })(HarmSeverity || (HarmSeverity = {}));
    (function(UrlRetrievalStatus2) {
      UrlRetrievalStatus2["URL_RETRIEVAL_STATUS_UNSPECIFIED"] = "URL_RETRIEVAL_STATUS_UNSPECIFIED";
      UrlRetrievalStatus2["URL_RETRIEVAL_STATUS_SUCCESS"] = "URL_RETRIEVAL_STATUS_SUCCESS";
      UrlRetrievalStatus2["URL_RETRIEVAL_STATUS_ERROR"] = "URL_RETRIEVAL_STATUS_ERROR";
      UrlRetrievalStatus2["URL_RETRIEVAL_STATUS_PAYWALL"] = "URL_RETRIEVAL_STATUS_PAYWALL";
      UrlRetrievalStatus2["URL_RETRIEVAL_STATUS_UNSAFE"] = "URL_RETRIEVAL_STATUS_UNSAFE";
    })(UrlRetrievalStatus || (UrlRetrievalStatus = {}));
    (function(BlockedReason2) {
      BlockedReason2["BLOCKED_REASON_UNSPECIFIED"] = "BLOCKED_REASON_UNSPECIFIED";
      BlockedReason2["SAFETY"] = "SAFETY";
      BlockedReason2["OTHER"] = "OTHER";
      BlockedReason2["BLOCKLIST"] = "BLOCKLIST";
      BlockedReason2["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
      BlockedReason2["IMAGE_SAFETY"] = "IMAGE_SAFETY";
      BlockedReason2["MODEL_ARMOR"] = "MODEL_ARMOR";
      BlockedReason2["JAILBREAK"] = "JAILBREAK";
    })(BlockedReason || (BlockedReason = {}));
    (function(TrafficType2) {
      TrafficType2["TRAFFIC_TYPE_UNSPECIFIED"] = "TRAFFIC_TYPE_UNSPECIFIED";
      TrafficType2["ON_DEMAND"] = "ON_DEMAND";
      TrafficType2["ON_DEMAND_PRIORITY"] = "ON_DEMAND_PRIORITY";
      TrafficType2["ON_DEMAND_FLEX"] = "ON_DEMAND_FLEX";
      TrafficType2["PROVISIONED_THROUGHPUT"] = "PROVISIONED_THROUGHPUT";
    })(TrafficType || (TrafficType = {}));
    (function(Modality2) {
      Modality2["MODALITY_UNSPECIFIED"] = "MODALITY_UNSPECIFIED";
      Modality2["TEXT"] = "TEXT";
      Modality2["IMAGE"] = "IMAGE";
      Modality2["AUDIO"] = "AUDIO";
    })(Modality || (Modality = {}));
    (function(MediaResolution2) {
      MediaResolution2["MEDIA_RESOLUTION_UNSPECIFIED"] = "MEDIA_RESOLUTION_UNSPECIFIED";
      MediaResolution2["MEDIA_RESOLUTION_LOW"] = "MEDIA_RESOLUTION_LOW";
      MediaResolution2["MEDIA_RESOLUTION_MEDIUM"] = "MEDIA_RESOLUTION_MEDIUM";
      MediaResolution2["MEDIA_RESOLUTION_HIGH"] = "MEDIA_RESOLUTION_HIGH";
    })(MediaResolution || (MediaResolution = {}));
    (function(TuningMode2) {
      TuningMode2["TUNING_MODE_UNSPECIFIED"] = "TUNING_MODE_UNSPECIFIED";
      TuningMode2["TUNING_MODE_FULL"] = "TUNING_MODE_FULL";
      TuningMode2["TUNING_MODE_PEFT_ADAPTER"] = "TUNING_MODE_PEFT_ADAPTER";
    })(TuningMode || (TuningMode = {}));
    (function(AdapterSize2) {
      AdapterSize2["ADAPTER_SIZE_UNSPECIFIED"] = "ADAPTER_SIZE_UNSPECIFIED";
      AdapterSize2["ADAPTER_SIZE_ONE"] = "ADAPTER_SIZE_ONE";
      AdapterSize2["ADAPTER_SIZE_TWO"] = "ADAPTER_SIZE_TWO";
      AdapterSize2["ADAPTER_SIZE_FOUR"] = "ADAPTER_SIZE_FOUR";
      AdapterSize2["ADAPTER_SIZE_EIGHT"] = "ADAPTER_SIZE_EIGHT";
      AdapterSize2["ADAPTER_SIZE_SIXTEEN"] = "ADAPTER_SIZE_SIXTEEN";
      AdapterSize2["ADAPTER_SIZE_THIRTY_TWO"] = "ADAPTER_SIZE_THIRTY_TWO";
    })(AdapterSize || (AdapterSize = {}));
    (function(JobState2) {
      JobState2["JOB_STATE_UNSPECIFIED"] = "JOB_STATE_UNSPECIFIED";
      JobState2["JOB_STATE_QUEUED"] = "JOB_STATE_QUEUED";
      JobState2["JOB_STATE_PENDING"] = "JOB_STATE_PENDING";
      JobState2["JOB_STATE_RUNNING"] = "JOB_STATE_RUNNING";
      JobState2["JOB_STATE_SUCCEEDED"] = "JOB_STATE_SUCCEEDED";
      JobState2["JOB_STATE_FAILED"] = "JOB_STATE_FAILED";
      JobState2["JOB_STATE_CANCELLING"] = "JOB_STATE_CANCELLING";
      JobState2["JOB_STATE_CANCELLED"] = "JOB_STATE_CANCELLED";
      JobState2["JOB_STATE_PAUSED"] = "JOB_STATE_PAUSED";
      JobState2["JOB_STATE_EXPIRED"] = "JOB_STATE_EXPIRED";
      JobState2["JOB_STATE_UPDATING"] = "JOB_STATE_UPDATING";
      JobState2["JOB_STATE_PARTIALLY_SUCCEEDED"] = "JOB_STATE_PARTIALLY_SUCCEEDED";
    })(JobState || (JobState = {}));
    (function(TuningJobState2) {
      TuningJobState2["TUNING_JOB_STATE_UNSPECIFIED"] = "TUNING_JOB_STATE_UNSPECIFIED";
      TuningJobState2["TUNING_JOB_STATE_WAITING_FOR_QUOTA"] = "TUNING_JOB_STATE_WAITING_FOR_QUOTA";
      TuningJobState2["TUNING_JOB_STATE_PROCESSING_DATASET"] = "TUNING_JOB_STATE_PROCESSING_DATASET";
      TuningJobState2["TUNING_JOB_STATE_WAITING_FOR_CAPACITY"] = "TUNING_JOB_STATE_WAITING_FOR_CAPACITY";
      TuningJobState2["TUNING_JOB_STATE_TUNING"] = "TUNING_JOB_STATE_TUNING";
      TuningJobState2["TUNING_JOB_STATE_POST_PROCESSING"] = "TUNING_JOB_STATE_POST_PROCESSING";
    })(TuningJobState || (TuningJobState = {}));
    (function(AggregationMetric2) {
      AggregationMetric2["AGGREGATION_METRIC_UNSPECIFIED"] = "AGGREGATION_METRIC_UNSPECIFIED";
      AggregationMetric2["AVERAGE"] = "AVERAGE";
      AggregationMetric2["MODE"] = "MODE";
      AggregationMetric2["STANDARD_DEVIATION"] = "STANDARD_DEVIATION";
      AggregationMetric2["VARIANCE"] = "VARIANCE";
      AggregationMetric2["MINIMUM"] = "MINIMUM";
      AggregationMetric2["MAXIMUM"] = "MAXIMUM";
      AggregationMetric2["MEDIAN"] = "MEDIAN";
      AggregationMetric2["PERCENTILE_P90"] = "PERCENTILE_P90";
      AggregationMetric2["PERCENTILE_P95"] = "PERCENTILE_P95";
      AggregationMetric2["PERCENTILE_P99"] = "PERCENTILE_P99";
    })(AggregationMetric || (AggregationMetric = {}));
    (function(PairwiseChoice2) {
      PairwiseChoice2["PAIRWISE_CHOICE_UNSPECIFIED"] = "PAIRWISE_CHOICE_UNSPECIFIED";
      PairwiseChoice2["BASELINE"] = "BASELINE";
      PairwiseChoice2["CANDIDATE"] = "CANDIDATE";
      PairwiseChoice2["TIE"] = "TIE";
    })(PairwiseChoice || (PairwiseChoice = {}));
    (function(TuningTask2) {
      TuningTask2["TUNING_TASK_UNSPECIFIED"] = "TUNING_TASK_UNSPECIFIED";
      TuningTask2["TUNING_TASK_I2V"] = "TUNING_TASK_I2V";
      TuningTask2["TUNING_TASK_T2V"] = "TUNING_TASK_T2V";
      TuningTask2["TUNING_TASK_R2V"] = "TUNING_TASK_R2V";
    })(TuningTask || (TuningTask = {}));
    (function(PartMediaResolutionLevel2) {
      PartMediaResolutionLevel2["MEDIA_RESOLUTION_UNSPECIFIED"] = "MEDIA_RESOLUTION_UNSPECIFIED";
      PartMediaResolutionLevel2["MEDIA_RESOLUTION_LOW"] = "MEDIA_RESOLUTION_LOW";
      PartMediaResolutionLevel2["MEDIA_RESOLUTION_MEDIUM"] = "MEDIA_RESOLUTION_MEDIUM";
      PartMediaResolutionLevel2["MEDIA_RESOLUTION_HIGH"] = "MEDIA_RESOLUTION_HIGH";
      PartMediaResolutionLevel2["MEDIA_RESOLUTION_ULTRA_HIGH"] = "MEDIA_RESOLUTION_ULTRA_HIGH";
    })(PartMediaResolutionLevel || (PartMediaResolutionLevel = {}));
    (function(ToolType2) {
      ToolType2["TOOL_TYPE_UNSPECIFIED"] = "TOOL_TYPE_UNSPECIFIED";
      ToolType2["GOOGLE_SEARCH_WEB"] = "GOOGLE_SEARCH_WEB";
      ToolType2["GOOGLE_SEARCH_IMAGE"] = "GOOGLE_SEARCH_IMAGE";
      ToolType2["URL_CONTEXT"] = "URL_CONTEXT";
      ToolType2["GOOGLE_MAPS"] = "GOOGLE_MAPS";
      ToolType2["FILE_SEARCH"] = "FILE_SEARCH";
    })(ToolType || (ToolType = {}));
    (function(ResourceScope2) {
      ResourceScope2["COLLECTION"] = "COLLECTION";
    })(ResourceScope || (ResourceScope = {}));
    (function(FeatureSelectionPreference2) {
      FeatureSelectionPreference2["FEATURE_SELECTION_PREFERENCE_UNSPECIFIED"] = "FEATURE_SELECTION_PREFERENCE_UNSPECIFIED";
      FeatureSelectionPreference2["PRIORITIZE_QUALITY"] = "PRIORITIZE_QUALITY";
      FeatureSelectionPreference2["BALANCED"] = "BALANCED";
      FeatureSelectionPreference2["PRIORITIZE_COST"] = "PRIORITIZE_COST";
    })(FeatureSelectionPreference || (FeatureSelectionPreference = {}));
    (function(Environment2) {
      Environment2["ENVIRONMENT_UNSPECIFIED"] = "ENVIRONMENT_UNSPECIFIED";
      Environment2["ENVIRONMENT_BROWSER"] = "ENVIRONMENT_BROWSER";
    })(Environment || (Environment = {}));
    (function(ProminentPeople2) {
      ProminentPeople2["PROMINENT_PEOPLE_UNSPECIFIED"] = "PROMINENT_PEOPLE_UNSPECIFIED";
      ProminentPeople2["ALLOW_PROMINENT_PEOPLE"] = "ALLOW_PROMINENT_PEOPLE";
      ProminentPeople2["BLOCK_PROMINENT_PEOPLE"] = "BLOCK_PROMINENT_PEOPLE";
    })(ProminentPeople || (ProminentPeople = {}));
    (function(EmbeddingApiType2) {
      EmbeddingApiType2["PREDICT"] = "PREDICT";
      EmbeddingApiType2["EMBED_CONTENT"] = "EMBED_CONTENT";
    })(EmbeddingApiType || (EmbeddingApiType = {}));
    (function(SafetyFilterLevel2) {
      SafetyFilterLevel2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
      SafetyFilterLevel2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
      SafetyFilterLevel2["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
      SafetyFilterLevel2["BLOCK_NONE"] = "BLOCK_NONE";
    })(SafetyFilterLevel || (SafetyFilterLevel = {}));
    (function(ImagePromptLanguage2) {
      ImagePromptLanguage2["auto"] = "auto";
      ImagePromptLanguage2["en"] = "en";
      ImagePromptLanguage2["ja"] = "ja";
      ImagePromptLanguage2["ko"] = "ko";
      ImagePromptLanguage2["hi"] = "hi";
      ImagePromptLanguage2["zh"] = "zh";
      ImagePromptLanguage2["pt"] = "pt";
      ImagePromptLanguage2["es"] = "es";
    })(ImagePromptLanguage || (ImagePromptLanguage = {}));
    (function(MaskReferenceMode2) {
      MaskReferenceMode2["MASK_MODE_DEFAULT"] = "MASK_MODE_DEFAULT";
      MaskReferenceMode2["MASK_MODE_USER_PROVIDED"] = "MASK_MODE_USER_PROVIDED";
      MaskReferenceMode2["MASK_MODE_BACKGROUND"] = "MASK_MODE_BACKGROUND";
      MaskReferenceMode2["MASK_MODE_FOREGROUND"] = "MASK_MODE_FOREGROUND";
      MaskReferenceMode2["MASK_MODE_SEMANTIC"] = "MASK_MODE_SEMANTIC";
    })(MaskReferenceMode || (MaskReferenceMode = {}));
    (function(ControlReferenceType2) {
      ControlReferenceType2["CONTROL_TYPE_DEFAULT"] = "CONTROL_TYPE_DEFAULT";
      ControlReferenceType2["CONTROL_TYPE_CANNY"] = "CONTROL_TYPE_CANNY";
      ControlReferenceType2["CONTROL_TYPE_SCRIBBLE"] = "CONTROL_TYPE_SCRIBBLE";
      ControlReferenceType2["CONTROL_TYPE_FACE_MESH"] = "CONTROL_TYPE_FACE_MESH";
    })(ControlReferenceType || (ControlReferenceType = {}));
    (function(SubjectReferenceType2) {
      SubjectReferenceType2["SUBJECT_TYPE_DEFAULT"] = "SUBJECT_TYPE_DEFAULT";
      SubjectReferenceType2["SUBJECT_TYPE_PERSON"] = "SUBJECT_TYPE_PERSON";
      SubjectReferenceType2["SUBJECT_TYPE_ANIMAL"] = "SUBJECT_TYPE_ANIMAL";
      SubjectReferenceType2["SUBJECT_TYPE_PRODUCT"] = "SUBJECT_TYPE_PRODUCT";
    })(SubjectReferenceType || (SubjectReferenceType = {}));
    (function(EditMode2) {
      EditMode2["EDIT_MODE_DEFAULT"] = "EDIT_MODE_DEFAULT";
      EditMode2["EDIT_MODE_INPAINT_REMOVAL"] = "EDIT_MODE_INPAINT_REMOVAL";
      EditMode2["EDIT_MODE_INPAINT_INSERTION"] = "EDIT_MODE_INPAINT_INSERTION";
      EditMode2["EDIT_MODE_OUTPAINT"] = "EDIT_MODE_OUTPAINT";
      EditMode2["EDIT_MODE_CONTROLLED_EDITING"] = "EDIT_MODE_CONTROLLED_EDITING";
      EditMode2["EDIT_MODE_STYLE"] = "EDIT_MODE_STYLE";
      EditMode2["EDIT_MODE_BGSWAP"] = "EDIT_MODE_BGSWAP";
      EditMode2["EDIT_MODE_PRODUCT_IMAGE"] = "EDIT_MODE_PRODUCT_IMAGE";
    })(EditMode || (EditMode = {}));
    (function(SegmentMode2) {
      SegmentMode2["FOREGROUND"] = "FOREGROUND";
      SegmentMode2["BACKGROUND"] = "BACKGROUND";
      SegmentMode2["PROMPT"] = "PROMPT";
      SegmentMode2["SEMANTIC"] = "SEMANTIC";
      SegmentMode2["INTERACTIVE"] = "INTERACTIVE";
    })(SegmentMode || (SegmentMode = {}));
    (function(VideoGenerationReferenceType2) {
      VideoGenerationReferenceType2["ASSET"] = "ASSET";
      VideoGenerationReferenceType2["STYLE"] = "STYLE";
    })(VideoGenerationReferenceType || (VideoGenerationReferenceType = {}));
    (function(VideoGenerationMaskMode2) {
      VideoGenerationMaskMode2["INSERT"] = "INSERT";
      VideoGenerationMaskMode2["REMOVE"] = "REMOVE";
      VideoGenerationMaskMode2["REMOVE_STATIC"] = "REMOVE_STATIC";
      VideoGenerationMaskMode2["OUTPAINT"] = "OUTPAINT";
    })(VideoGenerationMaskMode || (VideoGenerationMaskMode = {}));
    (function(VideoCompressionQuality2) {
      VideoCompressionQuality2["OPTIMIZED"] = "OPTIMIZED";
      VideoCompressionQuality2["LOSSLESS"] = "LOSSLESS";
    })(VideoCompressionQuality || (VideoCompressionQuality = {}));
    (function(TuningMethod2) {
      TuningMethod2["SUPERVISED_FINE_TUNING"] = "SUPERVISED_FINE_TUNING";
      TuningMethod2["PREFERENCE_TUNING"] = "PREFERENCE_TUNING";
      TuningMethod2["DISTILLATION"] = "DISTILLATION";
    })(TuningMethod || (TuningMethod = {}));
    (function(DocumentState2) {
      DocumentState2["STATE_UNSPECIFIED"] = "STATE_UNSPECIFIED";
      DocumentState2["STATE_PENDING"] = "STATE_PENDING";
      DocumentState2["STATE_ACTIVE"] = "STATE_ACTIVE";
      DocumentState2["STATE_FAILED"] = "STATE_FAILED";
    })(DocumentState || (DocumentState = {}));
    (function(FileState2) {
      FileState2["STATE_UNSPECIFIED"] = "STATE_UNSPECIFIED";
      FileState2["PROCESSING"] = "PROCESSING";
      FileState2["ACTIVE"] = "ACTIVE";
      FileState2["FAILED"] = "FAILED";
    })(FileState || (FileState = {}));
    (function(FileSource2) {
      FileSource2["SOURCE_UNSPECIFIED"] = "SOURCE_UNSPECIFIED";
      FileSource2["UPLOADED"] = "UPLOADED";
      FileSource2["GENERATED"] = "GENERATED";
      FileSource2["REGISTERED"] = "REGISTERED";
    })(FileSource || (FileSource = {}));
    (function(TurnCompleteReason2) {
      TurnCompleteReason2["TURN_COMPLETE_REASON_UNSPECIFIED"] = "TURN_COMPLETE_REASON_UNSPECIFIED";
      TurnCompleteReason2["MALFORMED_FUNCTION_CALL"] = "MALFORMED_FUNCTION_CALL";
      TurnCompleteReason2["RESPONSE_REJECTED"] = "RESPONSE_REJECTED";
      TurnCompleteReason2["NEED_MORE_INPUT"] = "NEED_MORE_INPUT";
    })(TurnCompleteReason || (TurnCompleteReason = {}));
    (function(MediaModality2) {
      MediaModality2["MODALITY_UNSPECIFIED"] = "MODALITY_UNSPECIFIED";
      MediaModality2["TEXT"] = "TEXT";
      MediaModality2["IMAGE"] = "IMAGE";
      MediaModality2["VIDEO"] = "VIDEO";
      MediaModality2["AUDIO"] = "AUDIO";
      MediaModality2["DOCUMENT"] = "DOCUMENT";
    })(MediaModality || (MediaModality = {}));
    (function(VadSignalType2) {
      VadSignalType2["VAD_SIGNAL_TYPE_UNSPECIFIED"] = "VAD_SIGNAL_TYPE_UNSPECIFIED";
      VadSignalType2["VAD_SIGNAL_TYPE_SOS"] = "VAD_SIGNAL_TYPE_SOS";
      VadSignalType2["VAD_SIGNAL_TYPE_EOS"] = "VAD_SIGNAL_TYPE_EOS";
    })(VadSignalType || (VadSignalType = {}));
    (function(VoiceActivityType2) {
      VoiceActivityType2["TYPE_UNSPECIFIED"] = "TYPE_UNSPECIFIED";
      VoiceActivityType2["ACTIVITY_START"] = "ACTIVITY_START";
      VoiceActivityType2["ACTIVITY_END"] = "ACTIVITY_END";
    })(VoiceActivityType || (VoiceActivityType = {}));
    (function(StartSensitivity2) {
      StartSensitivity2["START_SENSITIVITY_UNSPECIFIED"] = "START_SENSITIVITY_UNSPECIFIED";
      StartSensitivity2["START_SENSITIVITY_HIGH"] = "START_SENSITIVITY_HIGH";
      StartSensitivity2["START_SENSITIVITY_LOW"] = "START_SENSITIVITY_LOW";
    })(StartSensitivity || (StartSensitivity = {}));
    (function(EndSensitivity2) {
      EndSensitivity2["END_SENSITIVITY_UNSPECIFIED"] = "END_SENSITIVITY_UNSPECIFIED";
      EndSensitivity2["END_SENSITIVITY_HIGH"] = "END_SENSITIVITY_HIGH";
      EndSensitivity2["END_SENSITIVITY_LOW"] = "END_SENSITIVITY_LOW";
    })(EndSensitivity || (EndSensitivity = {}));
    (function(ActivityHandling2) {
      ActivityHandling2["ACTIVITY_HANDLING_UNSPECIFIED"] = "ACTIVITY_HANDLING_UNSPECIFIED";
      ActivityHandling2["START_OF_ACTIVITY_INTERRUPTS"] = "START_OF_ACTIVITY_INTERRUPTS";
      ActivityHandling2["NO_INTERRUPTION"] = "NO_INTERRUPTION";
    })(ActivityHandling || (ActivityHandling = {}));
    (function(TurnCoverage2) {
      TurnCoverage2["TURN_COVERAGE_UNSPECIFIED"] = "TURN_COVERAGE_UNSPECIFIED";
      TurnCoverage2["TURN_INCLUDES_ONLY_ACTIVITY"] = "TURN_INCLUDES_ONLY_ACTIVITY";
      TurnCoverage2["TURN_INCLUDES_ALL_INPUT"] = "TURN_INCLUDES_ALL_INPUT";
    })(TurnCoverage || (TurnCoverage = {}));
    (function(Scale2) {
      Scale2["SCALE_UNSPECIFIED"] = "SCALE_UNSPECIFIED";
      Scale2["C_MAJOR_A_MINOR"] = "C_MAJOR_A_MINOR";
      Scale2["D_FLAT_MAJOR_B_FLAT_MINOR"] = "D_FLAT_MAJOR_B_FLAT_MINOR";
      Scale2["D_MAJOR_B_MINOR"] = "D_MAJOR_B_MINOR";
      Scale2["E_FLAT_MAJOR_C_MINOR"] = "E_FLAT_MAJOR_C_MINOR";
      Scale2["E_MAJOR_D_FLAT_MINOR"] = "E_MAJOR_D_FLAT_MINOR";
      Scale2["F_MAJOR_D_MINOR"] = "F_MAJOR_D_MINOR";
      Scale2["G_FLAT_MAJOR_E_FLAT_MINOR"] = "G_FLAT_MAJOR_E_FLAT_MINOR";
      Scale2["G_MAJOR_E_MINOR"] = "G_MAJOR_E_MINOR";
      Scale2["A_FLAT_MAJOR_F_MINOR"] = "A_FLAT_MAJOR_F_MINOR";
      Scale2["A_MAJOR_G_FLAT_MINOR"] = "A_MAJOR_G_FLAT_MINOR";
      Scale2["B_FLAT_MAJOR_G_MINOR"] = "B_FLAT_MAJOR_G_MINOR";
      Scale2["B_MAJOR_A_FLAT_MINOR"] = "B_MAJOR_A_FLAT_MINOR";
    })(Scale || (Scale = {}));
    (function(MusicGenerationMode2) {
      MusicGenerationMode2["MUSIC_GENERATION_MODE_UNSPECIFIED"] = "MUSIC_GENERATION_MODE_UNSPECIFIED";
      MusicGenerationMode2["QUALITY"] = "QUALITY";
      MusicGenerationMode2["DIVERSITY"] = "DIVERSITY";
      MusicGenerationMode2["VOCALIZATION"] = "VOCALIZATION";
    })(MusicGenerationMode || (MusicGenerationMode = {}));
    (function(LiveMusicPlaybackControl2) {
      LiveMusicPlaybackControl2["PLAYBACK_CONTROL_UNSPECIFIED"] = "PLAYBACK_CONTROL_UNSPECIFIED";
      LiveMusicPlaybackControl2["PLAY"] = "PLAY";
      LiveMusicPlaybackControl2["PAUSE"] = "PAUSE";
      LiveMusicPlaybackControl2["STOP"] = "STOP";
      LiveMusicPlaybackControl2["RESET_CONTEXT"] = "RESET_CONTEXT";
    })(LiveMusicPlaybackControl || (LiveMusicPlaybackControl = {}));
    HttpResponse = class {
      static {
        __name(this, "HttpResponse");
      }
      constructor(response) {
        const headers = {};
        for (const pair of response.headers.entries()) {
          headers[pair[0]] = pair[1];
        }
        this.headers = headers;
        this.responseInternal = response;
      }
      json() {
        return this.responseInternal.json();
      }
    };
    GenerateContentResponse = class {
      static {
        __name(this, "GenerateContentResponse");
      }
      /**
       * Returns the concatenation of all text parts from the first candidate in the response.
       *
       * @remarks
       * If there are multiple candidates in the response, the text from the first
       * one will be returned.
       * If there are non-text parts in the response, the concatenation of all text
       * parts will be returned, and a warning will be logged.
       * If there are thought parts in the response, the concatenation of all text
       * parts excluding the thought parts will be returned.
       *
       * @example
       * ```ts
       * const response = await ai.models.generateContent({
       *   model: 'gemini-2.0-flash',
       *   contents:
       *     'Why is the sky blue?',
       * });
       *
       * console.debug(response.text);
       * ```
       */
      get text() {
        var _a2, _b, _c, _d, _e, _f, _g, _h;
        if (((_d = (_c = (_b = (_a2 = this.candidates) === null || _a2 === void 0 ? void 0 : _a2[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d.length) === 0) {
          return void 0;
        }
        if (this.candidates && this.candidates.length > 1) {
          console.warn("there are multiple candidates in the response, returning text from the first one.");
        }
        let text = "";
        let anyTextPartText = false;
        const nonTextParts = [];
        for (const part of (_h = (_g = (_f = (_e = this.candidates) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.content) === null || _g === void 0 ? void 0 : _g.parts) !== null && _h !== void 0 ? _h : []) {
          for (const [fieldName, fieldValue] of Object.entries(part)) {
            if (fieldName !== "text" && fieldName !== "thought" && fieldName !== "thoughtSignature" && (fieldValue !== null || fieldValue !== void 0)) {
              nonTextParts.push(fieldName);
            }
          }
          if (typeof part.text === "string") {
            if (typeof part.thought === "boolean" && part.thought) {
              continue;
            }
            anyTextPartText = true;
            text += part.text;
          }
        }
        if (nonTextParts.length > 0) {
          console.warn(`there are non-text parts ${nonTextParts} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`);
        }
        return anyTextPartText ? text : void 0;
      }
      /**
       * Returns the concatenation of all inline data parts from the first candidate
       * in the response.
       *
       * @remarks
       * If there are multiple candidates in the response, the inline data from the
       * first one will be returned. If there are non-inline data parts in the
       * response, the concatenation of all inline data parts will be returned, and
       * a warning will be logged.
       */
      get data() {
        var _a2, _b, _c, _d, _e, _f, _g, _h;
        if (((_d = (_c = (_b = (_a2 = this.candidates) === null || _a2 === void 0 ? void 0 : _a2[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d.length) === 0) {
          return void 0;
        }
        if (this.candidates && this.candidates.length > 1) {
          console.warn("there are multiple candidates in the response, returning data from the first one.");
        }
        let data = "";
        const nonDataParts = [];
        for (const part of (_h = (_g = (_f = (_e = this.candidates) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.content) === null || _g === void 0 ? void 0 : _g.parts) !== null && _h !== void 0 ? _h : []) {
          for (const [fieldName, fieldValue] of Object.entries(part)) {
            if (fieldName !== "inlineData" && (fieldValue !== null || fieldValue !== void 0)) {
              nonDataParts.push(fieldName);
            }
          }
          if (part.inlineData && typeof part.inlineData.data === "string") {
            data += atob(part.inlineData.data);
          }
        }
        if (nonDataParts.length > 0) {
          console.warn(`there are non-data parts ${nonDataParts} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`);
        }
        return data.length > 0 ? btoa(data) : void 0;
      }
      /**
       * Returns the function calls from the first candidate in the response.
       *
       * @remarks
       * If there are multiple candidates in the response, the function calls from
       * the first one will be returned.
       * If there are no function calls in the response, undefined will be returned.
       *
       * @example
       * ```ts
       * const controlLightFunctionDeclaration: FunctionDeclaration = {
       *   name: 'controlLight',
       *   parameters: {
       *   type: Type.OBJECT,
       *   description: 'Set the brightness and color temperature of a room light.',
       *   properties: {
       *     brightness: {
       *       type: Type.NUMBER,
       *       description:
       *         'Light level from 0 to 100. Zero is off and 100 is full brightness.',
       *     },
       *     colorTemperature: {
       *       type: Type.STRING,
       *       description:
       *         'Color temperature of the light fixture which can be `daylight`, `cool` or `warm`.',
       *     },
       *   },
       *   required: ['brightness', 'colorTemperature'],
       *  };
       *  const response = await ai.models.generateContent({
       *     model: 'gemini-2.0-flash',
       *     contents: 'Dim the lights so the room feels cozy and warm.',
       *     config: {
       *       tools: [{functionDeclarations: [controlLightFunctionDeclaration]}],
       *       toolConfig: {
       *         functionCallingConfig: {
       *           mode: FunctionCallingConfigMode.ANY,
       *           allowedFunctionNames: ['controlLight'],
       *         },
       *       },
       *     },
       *   });
       *  console.debug(JSON.stringify(response.functionCalls));
       * ```
       */
      get functionCalls() {
        var _a2, _b, _c, _d, _e, _f, _g, _h;
        if (((_d = (_c = (_b = (_a2 = this.candidates) === null || _a2 === void 0 ? void 0 : _a2[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d.length) === 0) {
          return void 0;
        }
        if (this.candidates && this.candidates.length > 1) {
          console.warn("there are multiple candidates in the response, returning function calls from the first one.");
        }
        const functionCalls = (_h = (_g = (_f = (_e = this.candidates) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.content) === null || _g === void 0 ? void 0 : _g.parts) === null || _h === void 0 ? void 0 : _h.filter((part) => part.functionCall).map((part) => part.functionCall).filter((functionCall) => functionCall !== void 0);
        if ((functionCalls === null || functionCalls === void 0 ? void 0 : functionCalls.length) === 0) {
          return void 0;
        }
        return functionCalls;
      }
      /**
       * Returns the first executable code from the first candidate in the response.
       *
       * @remarks
       * If there are multiple candidates in the response, the executable code from
       * the first one will be returned.
       * If there are no executable code in the response, undefined will be
       * returned.
       *
       * @example
       * ```ts
       * const response = await ai.models.generateContent({
       *   model: 'gemini-2.0-flash',
       *   contents:
       *     'What is the sum of the first 50 prime numbers? Generate and run code for the calculation, and make sure you get all 50.'
       *   config: {
       *     tools: [{codeExecution: {}}],
       *   },
       * });
       *
       * console.debug(response.executableCode);
       * ```
       */
      get executableCode() {
        var _a2, _b, _c, _d, _e, _f, _g, _h, _j;
        if (((_d = (_c = (_b = (_a2 = this.candidates) === null || _a2 === void 0 ? void 0 : _a2[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d.length) === 0) {
          return void 0;
        }
        if (this.candidates && this.candidates.length > 1) {
          console.warn("there are multiple candidates in the response, returning executable code from the first one.");
        }
        const executableCode = (_h = (_g = (_f = (_e = this.candidates) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.content) === null || _g === void 0 ? void 0 : _g.parts) === null || _h === void 0 ? void 0 : _h.filter((part) => part.executableCode).map((part) => part.executableCode).filter((executableCode2) => executableCode2 !== void 0);
        if ((executableCode === null || executableCode === void 0 ? void 0 : executableCode.length) === 0) {
          return void 0;
        }
        return (_j = executableCode === null || executableCode === void 0 ? void 0 : executableCode[0]) === null || _j === void 0 ? void 0 : _j.code;
      }
      /**
       * Returns the first code execution result from the first candidate in the response.
       *
       * @remarks
       * If there are multiple candidates in the response, the code execution result from
       * the first one will be returned.
       * If there are no code execution result in the response, undefined will be returned.
       *
       * @example
       * ```ts
       * const response = await ai.models.generateContent({
       *   model: 'gemini-2.0-flash',
       *   contents:
       *     'What is the sum of the first 50 prime numbers? Generate and run code for the calculation, and make sure you get all 50.'
       *   config: {
       *     tools: [{codeExecution: {}}],
       *   },
       * });
       *
       * console.debug(response.codeExecutionResult);
       * ```
       */
      get codeExecutionResult() {
        var _a2, _b, _c, _d, _e, _f, _g, _h, _j;
        if (((_d = (_c = (_b = (_a2 = this.candidates) === null || _a2 === void 0 ? void 0 : _a2[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d.length) === 0) {
          return void 0;
        }
        if (this.candidates && this.candidates.length > 1) {
          console.warn("there are multiple candidates in the response, returning code execution result from the first one.");
        }
        const codeExecutionResult = (_h = (_g = (_f = (_e = this.candidates) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.content) === null || _g === void 0 ? void 0 : _g.parts) === null || _h === void 0 ? void 0 : _h.filter((part) => part.codeExecutionResult).map((part) => part.codeExecutionResult).filter((codeExecutionResult2) => codeExecutionResult2 !== void 0);
        if ((codeExecutionResult === null || codeExecutionResult === void 0 ? void 0 : codeExecutionResult.length) === 0) {
          return void 0;
        }
        return (_j = codeExecutionResult === null || codeExecutionResult === void 0 ? void 0 : codeExecutionResult[0]) === null || _j === void 0 ? void 0 : _j.output;
      }
    };
    EmbedContentResponse = class {
      static {
        __name(this, "EmbedContentResponse");
      }
    };
    GenerateImagesResponse = class {
      static {
        __name(this, "GenerateImagesResponse");
      }
    };
    EditImageResponse = class {
      static {
        __name(this, "EditImageResponse");
      }
    };
    UpscaleImageResponse = class {
      static {
        __name(this, "UpscaleImageResponse");
      }
    };
    RecontextImageResponse = class {
      static {
        __name(this, "RecontextImageResponse");
      }
    };
    SegmentImageResponse = class {
      static {
        __name(this, "SegmentImageResponse");
      }
    };
    ListModelsResponse = class {
      static {
        __name(this, "ListModelsResponse");
      }
    };
    DeleteModelResponse = class {
      static {
        __name(this, "DeleteModelResponse");
      }
    };
    CountTokensResponse = class {
      static {
        __name(this, "CountTokensResponse");
      }
    };
    ComputeTokensResponse = class {
      static {
        __name(this, "ComputeTokensResponse");
      }
    };
    GenerateVideosOperation = class _GenerateVideosOperation {
      static {
        __name(this, "GenerateVideosOperation");
      }
      /**
       * Instantiates an Operation of the same type as the one being called with the fields set from the API response.
       * @internal
       */
      _fromAPIResponse({ apiResponse, _isVertexAI }) {
        const operation = new _GenerateVideosOperation();
        let response;
        const op = apiResponse;
        if (_isVertexAI) {
          response = generateVideosOperationFromVertex$1(op);
        } else {
          response = generateVideosOperationFromMldev$1(op);
        }
        Object.assign(operation, response);
        return operation;
      }
    };
    ListTuningJobsResponse = class {
      static {
        __name(this, "ListTuningJobsResponse");
      }
    };
    CancelTuningJobResponse = class {
      static {
        __name(this, "CancelTuningJobResponse");
      }
    };
    DeleteCachedContentResponse = class {
      static {
        __name(this, "DeleteCachedContentResponse");
      }
    };
    ListCachedContentsResponse = class {
      static {
        __name(this, "ListCachedContentsResponse");
      }
    };
    ListDocumentsResponse = class {
      static {
        __name(this, "ListDocumentsResponse");
      }
    };
    ListFileSearchStoresResponse = class {
      static {
        __name(this, "ListFileSearchStoresResponse");
      }
    };
    UploadToFileSearchStoreResumableResponse = class {
      static {
        __name(this, "UploadToFileSearchStoreResumableResponse");
      }
    };
    ImportFileOperation = class _ImportFileOperation {
      static {
        __name(this, "ImportFileOperation");
      }
      /**
       * Instantiates an Operation of the same type as the one being called with the fields set from the API response.
       * @internal
       */
      _fromAPIResponse({ apiResponse, _isVertexAI }) {
        const operation = new _ImportFileOperation();
        const op = apiResponse;
        const response = importFileOperationFromMldev$1(op);
        Object.assign(operation, response);
        return operation;
      }
    };
    ListFilesResponse = class {
      static {
        __name(this, "ListFilesResponse");
      }
    };
    CreateFileResponse = class {
      static {
        __name(this, "CreateFileResponse");
      }
    };
    DeleteFileResponse = class {
      static {
        __name(this, "DeleteFileResponse");
      }
    };
    RegisterFilesResponse = class {
      static {
        __name(this, "RegisterFilesResponse");
      }
    };
    ListBatchJobsResponse = class {
      static {
        __name(this, "ListBatchJobsResponse");
      }
    };
    LiveServerMessage = class {
      static {
        __name(this, "LiveServerMessage");
      }
      /**
       * Returns the concatenation of all text parts from the server content if present.
       *
       * @remarks
       * If there are non-text parts in the response, the concatenation of all text
       * parts will be returned, and a warning will be logged.
       */
      get text() {
        var _a2, _b, _c;
        let text = "";
        let anyTextPartFound = false;
        const nonTextParts = [];
        for (const part of (_c = (_b = (_a2 = this.serverContent) === null || _a2 === void 0 ? void 0 : _a2.modelTurn) === null || _b === void 0 ? void 0 : _b.parts) !== null && _c !== void 0 ? _c : []) {
          for (const [fieldName, fieldValue] of Object.entries(part)) {
            if (fieldName !== "text" && fieldName !== "thought" && fieldValue !== null) {
              nonTextParts.push(fieldName);
            }
          }
          if (typeof part.text === "string") {
            if (typeof part.thought === "boolean" && part.thought) {
              continue;
            }
            anyTextPartFound = true;
            text += part.text;
          }
        }
        if (nonTextParts.length > 0) {
          console.warn(`there are non-text parts ${nonTextParts} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`);
        }
        return anyTextPartFound ? text : void 0;
      }
      /**
       * Returns the concatenation of all inline data parts from the server content if present.
       *
       * @remarks
       * If there are non-inline data parts in the
       * response, the concatenation of all inline data parts will be returned, and
       * a warning will be logged.
       */
      get data() {
        var _a2, _b, _c;
        let data = "";
        const nonDataParts = [];
        for (const part of (_c = (_b = (_a2 = this.serverContent) === null || _a2 === void 0 ? void 0 : _a2.modelTurn) === null || _b === void 0 ? void 0 : _b.parts) !== null && _c !== void 0 ? _c : []) {
          for (const [fieldName, fieldValue] of Object.entries(part)) {
            if (fieldName !== "inlineData" && fieldValue !== null) {
              nonDataParts.push(fieldName);
            }
          }
          if (part.inlineData && typeof part.inlineData.data === "string") {
            data += atob(part.inlineData.data);
          }
        }
        if (nonDataParts.length > 0) {
          console.warn(`there are non-data parts ${nonDataParts} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`);
        }
        return data.length > 0 ? btoa(data) : void 0;
      }
    };
    LiveMusicServerMessage = class {
      static {
        __name(this, "LiveMusicServerMessage");
      }
      /**
       * Returns the first audio chunk from the server content, if present.
       *
       * @remarks
       * If there are no audio chunks in the response, undefined will be returned.
       */
      get audioChunk() {
        if (this.serverContent && this.serverContent.audioChunks && this.serverContent.audioChunks.length > 0) {
          return this.serverContent.audioChunks[0];
        }
        return void 0;
      }
    };
    UploadToFileSearchStoreOperation = class _UploadToFileSearchStoreOperation {
      static {
        __name(this, "UploadToFileSearchStoreOperation");
      }
      /**
       * Instantiates an Operation of the same type as the one being called with the fields set from the API response.
       * @internal
       */
      _fromAPIResponse({ apiResponse, _isVertexAI }) {
        const operation = new _UploadToFileSearchStoreOperation();
        const op = apiResponse;
        const response = uploadToFileSearchStoreOperationFromMldev(op);
        Object.assign(operation, response);
        return operation;
      }
    };
    __name(tModel, "tModel");
    __name(tCachesModel, "tCachesModel");
    __name(tBlobs, "tBlobs");
    __name(tBlob, "tBlob");
    __name(tImageBlob, "tImageBlob");
    __name(tAudioBlob, "tAudioBlob");
    __name(tPart, "tPart");
    __name(tParts, "tParts");
    __name(_isContent, "_isContent");
    __name(_isFunctionCallPart, "_isFunctionCallPart");
    __name(_isFunctionResponsePart, "_isFunctionResponsePart");
    __name(tContent, "tContent");
    __name(tContentsForEmbed, "tContentsForEmbed");
    __name(tContents, "tContents");
    __name(flattenTypeArrayToAnyOf, "flattenTypeArrayToAnyOf");
    __name(processJsonSchema, "processJsonSchema");
    __name(tSchema, "tSchema");
    __name(tSpeechConfig, "tSpeechConfig");
    __name(tLiveSpeechConfig, "tLiveSpeechConfig");
    __name(tTool, "tTool");
    __name(tTools, "tTools");
    __name(resourceName, "resourceName");
    __name(tCachedContentName, "tCachedContentName");
    __name(tTuningJobStatus, "tTuningJobStatus");
    __name(tBytes, "tBytes");
    __name(_isFile, "_isFile");
    __name(isGeneratedVideo, "isGeneratedVideo");
    __name(isVideo, "isVideo");
    __name(tFileName, "tFileName");
    __name(tModelsUrl, "tModelsUrl");
    __name(tExtractModels, "tExtractModels");
    __name(hasField, "hasField");
    __name(mcpToGeminiTool, "mcpToGeminiTool");
    __name(mcpToolsToGeminiTool, "mcpToolsToGeminiTool");
    __name(tBatchJobSource, "tBatchJobSource");
    __name(tBatchJobDestination, "tBatchJobDestination");
    __name(tRecvBatchJobDestination, "tRecvBatchJobDestination");
    __name(tBatchJobName, "tBatchJobName");
    __name(tJobState, "tJobState");
    __name(tIsVertexEmbedContentModel, "tIsVertexEmbedContentModel");
    __name(authConfigToMldev$4, "authConfigToMldev$4");
    __name(batchJobDestinationFromMldev, "batchJobDestinationFromMldev");
    __name(batchJobDestinationFromVertex, "batchJobDestinationFromVertex");
    __name(batchJobDestinationToVertex, "batchJobDestinationToVertex");
    __name(batchJobFromMldev, "batchJobFromMldev");
    __name(batchJobFromVertex, "batchJobFromVertex");
    __name(batchJobSourceFromVertex, "batchJobSourceFromVertex");
    __name(batchJobSourceToMldev, "batchJobSourceToMldev");
    __name(batchJobSourceToVertex, "batchJobSourceToVertex");
    __name(blobToMldev$4, "blobToMldev$4");
    __name(cancelBatchJobParametersToMldev, "cancelBatchJobParametersToMldev");
    __name(cancelBatchJobParametersToVertex, "cancelBatchJobParametersToVertex");
    __name(candidateFromMldev$1, "candidateFromMldev$1");
    __name(citationMetadataFromMldev$1, "citationMetadataFromMldev$1");
    __name(contentToMldev$4, "contentToMldev$4");
    __name(createBatchJobConfigToMldev, "createBatchJobConfigToMldev");
    __name(createBatchJobConfigToVertex, "createBatchJobConfigToVertex");
    __name(createBatchJobParametersToMldev, "createBatchJobParametersToMldev");
    __name(createBatchJobParametersToVertex, "createBatchJobParametersToVertex");
    __name(createEmbeddingsBatchJobConfigToMldev, "createEmbeddingsBatchJobConfigToMldev");
    __name(createEmbeddingsBatchJobParametersToMldev, "createEmbeddingsBatchJobParametersToMldev");
    __name(deleteBatchJobParametersToMldev, "deleteBatchJobParametersToMldev");
    __name(deleteBatchJobParametersToVertex, "deleteBatchJobParametersToVertex");
    __name(deleteResourceJobFromMldev, "deleteResourceJobFromMldev");
    __name(deleteResourceJobFromVertex, "deleteResourceJobFromVertex");
    __name(embedContentBatchToMldev, "embedContentBatchToMldev");
    __name(embedContentConfigToMldev$1, "embedContentConfigToMldev$1");
    __name(embeddingsBatchJobSourceToMldev, "embeddingsBatchJobSourceToMldev");
    __name(fileDataToMldev$4, "fileDataToMldev$4");
    __name(functionCallToMldev$4, "functionCallToMldev$4");
    __name(functionCallingConfigToMldev$2, "functionCallingConfigToMldev$2");
    __name(generateContentConfigToMldev$1, "generateContentConfigToMldev$1");
    __name(generateContentResponseFromMldev$1, "generateContentResponseFromMldev$1");
    __name(getBatchJobParametersToMldev, "getBatchJobParametersToMldev");
    __name(getBatchJobParametersToVertex, "getBatchJobParametersToVertex");
    __name(googleMapsToMldev$4, "googleMapsToMldev$4");
    __name(googleSearchToMldev$4, "googleSearchToMldev$4");
    __name(imageConfigToMldev$1, "imageConfigToMldev$1");
    __name(inlinedRequestToMldev, "inlinedRequestToMldev");
    __name(inlinedResponseFromMldev, "inlinedResponseFromMldev");
    __name(listBatchJobsConfigToMldev, "listBatchJobsConfigToMldev");
    __name(listBatchJobsConfigToVertex, "listBatchJobsConfigToVertex");
    __name(listBatchJobsParametersToMldev, "listBatchJobsParametersToMldev");
    __name(listBatchJobsParametersToVertex, "listBatchJobsParametersToVertex");
    __name(listBatchJobsResponseFromMldev, "listBatchJobsResponseFromMldev");
    __name(listBatchJobsResponseFromVertex, "listBatchJobsResponseFromVertex");
    __name(partToMldev$4, "partToMldev$4");
    __name(safetySettingToMldev$1, "safetySettingToMldev$1");
    __name(toolConfigToMldev$2, "toolConfigToMldev$2");
    __name(toolToMldev$4, "toolToMldev$4");
    (function(PagedItem2) {
      PagedItem2["PAGED_ITEM_BATCH_JOBS"] = "batchJobs";
      PagedItem2["PAGED_ITEM_MODELS"] = "models";
      PagedItem2["PAGED_ITEM_TUNING_JOBS"] = "tuningJobs";
      PagedItem2["PAGED_ITEM_FILES"] = "files";
      PagedItem2["PAGED_ITEM_CACHED_CONTENTS"] = "cachedContents";
      PagedItem2["PAGED_ITEM_FILE_SEARCH_STORES"] = "fileSearchStores";
      PagedItem2["PAGED_ITEM_DOCUMENTS"] = "documents";
    })(PagedItem || (PagedItem = {}));
    Pager = class {
      static {
        __name(this, "Pager");
      }
      constructor(name, request, response, params) {
        this.pageInternal = [];
        this.paramsInternal = {};
        this.requestInternal = request;
        this.init(name, response, params);
      }
      init(name, response, params) {
        var _a2, _b;
        this.nameInternal = name;
        this.pageInternal = response[this.nameInternal] || [];
        this.sdkHttpResponseInternal = response === null || response === void 0 ? void 0 : response.sdkHttpResponse;
        this.idxInternal = 0;
        let requestParams = { config: {} };
        if (!params || Object.keys(params).length === 0) {
          requestParams = { config: {} };
        } else if (typeof params === "object") {
          requestParams = Object.assign({}, params);
        } else {
          requestParams = params;
        }
        if (requestParams["config"]) {
          requestParams["config"]["pageToken"] = response["nextPageToken"];
        }
        this.paramsInternal = requestParams;
        this.pageInternalSize = (_b = (_a2 = requestParams["config"]) === null || _a2 === void 0 ? void 0 : _a2["pageSize"]) !== null && _b !== void 0 ? _b : this.pageInternal.length;
      }
      initNextPage(response) {
        this.init(this.nameInternal, response, this.paramsInternal);
      }
      /**
       * Returns the current page, which is a list of items.
       *
       * @remarks
       * The first page is retrieved when the pager is created. The returned list of
       * items could be a subset of the entire list.
       */
      get page() {
        return this.pageInternal;
      }
      /**
       * Returns the type of paged item (for example, ``batch_jobs``).
       */
      get name() {
        return this.nameInternal;
      }
      /**
       * Returns the length of the page fetched each time by this pager.
       *
       * @remarks
       * The number of items in the page is less than or equal to the page length.
       */
      get pageSize() {
        return this.pageInternalSize;
      }
      /**
       * Returns the headers of the API response.
       */
      get sdkHttpResponse() {
        return this.sdkHttpResponseInternal;
      }
      /**
       * Returns the parameters when making the API request for the next page.
       *
       * @remarks
       * Parameters contain a set of optional configs that can be
       * used to customize the API request. For example, the `pageToken` parameter
       * contains the token to request the next page.
       */
      get params() {
        return this.paramsInternal;
      }
      /**
       * Returns the total number of items in the current page.
       */
      get pageLength() {
        return this.pageInternal.length;
      }
      /**
       * Returns the item at the given index.
       */
      getItem(index) {
        return this.pageInternal[index];
      }
      /**
       * Returns an async iterator that support iterating through all items
       * retrieved from the API.
       *
       * @remarks
       * The iterator will automatically fetch the next page if there are more items
       * to fetch from the API.
       *
       * @example
       *
       * ```ts
       * const pager = await ai.files.list({config: {pageSize: 10}});
       * for await (const file of pager) {
       *   console.log(file.name);
       * }
       * ```
       */
      [Symbol.asyncIterator]() {
        return {
          next: /* @__PURE__ */ __name(async () => {
            if (this.idxInternal >= this.pageLength) {
              if (this.hasNextPage()) {
                await this.nextPage();
              } else {
                return { value: void 0, done: true };
              }
            }
            const item = this.getItem(this.idxInternal);
            this.idxInternal += 1;
            return { value: item, done: false };
          }, "next"),
          return: /* @__PURE__ */ __name(async () => {
            return { value: void 0, done: true };
          }, "return")
        };
      }
      /**
       * Fetches the next page of items. This makes a new API request.
       *
       * @throws {Error} If there are no more pages to fetch.
       *
       * @example
       *
       * ```ts
       * const pager = await ai.files.list({config: {pageSize: 10}});
       * let page = pager.page;
       * while (true) {
       *   for (const file of page) {
       *     console.log(file.name);
       *   }
       *   if (!pager.hasNextPage()) {
       *     break;
       *   }
       *   page = await pager.nextPage();
       * }
       * ```
       */
      async nextPage() {
        if (!this.hasNextPage()) {
          throw new Error("No more pages to fetch.");
        }
        const response = await this.requestInternal(this.params);
        this.initNextPage(response);
        return this.page;
      }
      /**
       * Returns true if there are more pages to fetch from the API.
       */
      hasNextPage() {
        var _a2;
        if (((_a2 = this.params["config"]) === null || _a2 === void 0 ? void 0 : _a2["pageToken"]) !== void 0) {
          return true;
        }
        return false;
      }
    };
    Batches = class extends BaseModule {
      static {
        __name(this, "Batches");
      }
      constructor(apiClient) {
        super();
        this.apiClient = apiClient;
        this.list = async (params = {}) => {
          return new Pager(PagedItem.PAGED_ITEM_BATCH_JOBS, (x) => this.listInternal(x), await this.listInternal(params), params);
        };
        this.create = async (params) => {
          if (this.apiClient.isVertexAI()) {
            params.config = this.formatDestination(params.src, params.config);
          }
          return this.createInternal(params);
        };
        this.createEmbeddings = async (params) => {
          console.warn("batches.createEmbeddings() is experimental and may change without notice.");
          if (this.apiClient.isVertexAI()) {
            throw new Error("Vertex AI does not support batches.createEmbeddings.");
          }
          return this.createEmbeddingsInternal(params);
        };
      }
      // Helper function to handle inlined generate content requests
      createInlinedGenerateContentRequest(params) {
        const body = createBatchJobParametersToMldev(
          this.apiClient,
          // Use instance apiClient
          params
        );
        const urlParams = body["_url"];
        const path2 = formatMap("{model}:batchGenerateContent", urlParams);
        const batch = body["batch"];
        const inputConfig = batch["inputConfig"];
        const requestsWrapper = inputConfig["requests"];
        const requests = requestsWrapper["requests"];
        const newRequests = [];
        for (const request of requests) {
          const requestDict = Object.assign({}, request);
          if (requestDict["systemInstruction"]) {
            const systemInstructionValue = requestDict["systemInstruction"];
            delete requestDict["systemInstruction"];
            const requestContent = requestDict["request"];
            requestContent["systemInstruction"] = systemInstructionValue;
            requestDict["request"] = requestContent;
          }
          newRequests.push(requestDict);
        }
        requestsWrapper["requests"] = newRequests;
        delete body["config"];
        delete body["_url"];
        delete body["_query"];
        return { path: path2, body };
      }
      // Helper function to get the first GCS URI
      getGcsUri(src) {
        if (typeof src === "string") {
          return src.startsWith("gs://") ? src : void 0;
        }
        if (!Array.isArray(src) && src.gcsUri && src.gcsUri.length > 0) {
          return src.gcsUri[0];
        }
        return void 0;
      }
      // Helper function to get the BigQuery URI
      getBigqueryUri(src) {
        if (typeof src === "string") {
          return src.startsWith("bq://") ? src : void 0;
        }
        if (!Array.isArray(src)) {
          return src.bigqueryUri;
        }
        return void 0;
      }
      // Function to format the destination configuration for Vertex AI
      formatDestination(src, config) {
        const newConfig = config ? Object.assign({}, config) : {};
        const timestampStr = Date.now().toString();
        if (!newConfig.displayName) {
          newConfig.displayName = `genaiBatchJob_${timestampStr}`;
        }
        if (newConfig.dest === void 0) {
          const gcsUri = this.getGcsUri(src);
          const bigqueryUri = this.getBigqueryUri(src);
          if (gcsUri) {
            if (gcsUri.endsWith(".jsonl")) {
              newConfig.dest = `${gcsUri.slice(0, -6)}/dest`;
            } else {
              newConfig.dest = `${gcsUri}_dest_${timestampStr}`;
            }
          } else if (bigqueryUri) {
            newConfig.dest = `${bigqueryUri}_dest_${timestampStr}`;
          } else {
            throw new Error("Unsupported source for Vertex AI: No GCS or BigQuery URI found.");
          }
        }
        return newConfig;
      }
      /**
       * Internal method to create batch job.
       *
       * @param params - The parameters for create batch job request.
       * @return The created batch job.
       *
       */
      async createInternal(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = createBatchJobParametersToVertex(this.apiClient, params);
          path2 = formatMap("batchPredictionJobs", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = batchJobFromVertex(apiResponse);
            return resp;
          });
        } else {
          const body = createBatchJobParametersToMldev(this.apiClient, params);
          path2 = formatMap("{model}:batchGenerateContent", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = batchJobFromMldev(apiResponse);
            return resp;
          });
        }
      }
      /**
       * Internal method to create batch job.
       *
       * @param params - The parameters for create batch job request.
       * @return The created batch job.
       *
       */
      async createEmbeddingsInternal(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("This method is only supported by the Gemini Developer API.");
        } else {
          const body = createEmbeddingsBatchJobParametersToMldev(this.apiClient, params);
          path2 = formatMap("{model}:asyncBatchEmbedContent", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = batchJobFromMldev(apiResponse);
            return resp;
          });
        }
      }
      /**
       * Gets batch job configurations.
       *
       * @param params - The parameters for the get request.
       * @return The batch job.
       *
       * @example
       * ```ts
       * await ai.batches.get({name: '...'}); // The server-generated resource name.
       * ```
       */
      async get(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = getBatchJobParametersToVertex(this.apiClient, params);
          path2 = formatMap("batchPredictionJobs/{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = batchJobFromVertex(apiResponse);
            return resp;
          });
        } else {
          const body = getBatchJobParametersToMldev(this.apiClient, params);
          path2 = formatMap("batches/{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = batchJobFromMldev(apiResponse);
            return resp;
          });
        }
      }
      /**
       * Cancels a batch job.
       *
       * @param params - The parameters for the cancel request.
       * @return The empty response returned by the API.
       *
       * @example
       * ```ts
       * await ai.batches.cancel({name: '...'}); // The server-generated resource name.
       * ```
       */
      async cancel(params) {
        var _a2, _b, _c, _d;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = cancelBatchJobParametersToVertex(this.apiClient, params);
          path2 = formatMap("batchPredictionJobs/{name}:cancel", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          await this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          });
        } else {
          const body = cancelBatchJobParametersToMldev(this.apiClient, params);
          path2 = formatMap("batches/{name}:cancel", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          await this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          });
        }
      }
      async listInternal(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = listBatchJobsParametersToVertex(params);
          path2 = formatMap("batchPredictionJobs", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = listBatchJobsResponseFromVertex(apiResponse);
            const typedResp = new ListBatchJobsResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          const body = listBatchJobsParametersToMldev(params);
          path2 = formatMap("batches", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = listBatchJobsResponseFromMldev(apiResponse);
            const typedResp = new ListBatchJobsResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
      /**
       * Deletes a batch job.
       *
       * @param params - The parameters for the delete request.
       * @return The empty response returned by the API.
       *
       * @example
       * ```ts
       * await ai.batches.delete({name: '...'}); // The server-generated resource name.
       * ```
       */
      async delete(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = deleteBatchJobParametersToVertex(this.apiClient, params);
          path2 = formatMap("batchPredictionJobs/{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "DELETE",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = deleteResourceJobFromVertex(apiResponse);
            return resp;
          });
        } else {
          const body = deleteBatchJobParametersToMldev(this.apiClient, params);
          path2 = formatMap("batches/{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "DELETE",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = deleteResourceJobFromMldev(apiResponse);
            return resp;
          });
        }
      }
    };
    __name(authConfigToMldev$3, "authConfigToMldev$3");
    __name(blobToMldev$3, "blobToMldev$3");
    __name(contentToMldev$3, "contentToMldev$3");
    __name(contentToVertex$2, "contentToVertex$2");
    __name(createCachedContentConfigToMldev, "createCachedContentConfigToMldev");
    __name(createCachedContentConfigToVertex, "createCachedContentConfigToVertex");
    __name(createCachedContentParametersToMldev, "createCachedContentParametersToMldev");
    __name(createCachedContentParametersToVertex, "createCachedContentParametersToVertex");
    __name(deleteCachedContentParametersToMldev, "deleteCachedContentParametersToMldev");
    __name(deleteCachedContentParametersToVertex, "deleteCachedContentParametersToVertex");
    __name(deleteCachedContentResponseFromMldev, "deleteCachedContentResponseFromMldev");
    __name(deleteCachedContentResponseFromVertex, "deleteCachedContentResponseFromVertex");
    __name(fileDataToMldev$3, "fileDataToMldev$3");
    __name(functionCallToMldev$3, "functionCallToMldev$3");
    __name(functionCallingConfigToMldev$1, "functionCallingConfigToMldev$1");
    __name(functionDeclarationToVertex$2, "functionDeclarationToVertex$2");
    __name(getCachedContentParametersToMldev, "getCachedContentParametersToMldev");
    __name(getCachedContentParametersToVertex, "getCachedContentParametersToVertex");
    __name(googleMapsToMldev$3, "googleMapsToMldev$3");
    __name(googleSearchToMldev$3, "googleSearchToMldev$3");
    __name(listCachedContentsConfigToMldev, "listCachedContentsConfigToMldev");
    __name(listCachedContentsConfigToVertex, "listCachedContentsConfigToVertex");
    __name(listCachedContentsParametersToMldev, "listCachedContentsParametersToMldev");
    __name(listCachedContentsParametersToVertex, "listCachedContentsParametersToVertex");
    __name(listCachedContentsResponseFromMldev, "listCachedContentsResponseFromMldev");
    __name(listCachedContentsResponseFromVertex, "listCachedContentsResponseFromVertex");
    __name(partToMldev$3, "partToMldev$3");
    __name(partToVertex$2, "partToVertex$2");
    __name(toolConfigToMldev$1, "toolConfigToMldev$1");
    __name(toolConfigToVertex$1, "toolConfigToVertex$1");
    __name(toolToMldev$3, "toolToMldev$3");
    __name(toolToVertex$2, "toolToVertex$2");
    __name(updateCachedContentConfigToMldev, "updateCachedContentConfigToMldev");
    __name(updateCachedContentConfigToVertex, "updateCachedContentConfigToVertex");
    __name(updateCachedContentParametersToMldev, "updateCachedContentParametersToMldev");
    __name(updateCachedContentParametersToVertex, "updateCachedContentParametersToVertex");
    Caches = class extends BaseModule {
      static {
        __name(this, "Caches");
      }
      constructor(apiClient) {
        super();
        this.apiClient = apiClient;
        this.list = async (params = {}) => {
          return new Pager(PagedItem.PAGED_ITEM_CACHED_CONTENTS, (x) => this.listInternal(x), await this.listInternal(params), params);
        };
      }
      /**
       * Creates a cached contents resource.
       *
       * @remarks
       * Context caching is only supported for specific models. See [Gemini
       * Developer API reference](https://ai.google.dev/gemini-api/docs/caching?lang=node/context-cac)
       * and [Vertex AI reference](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-overview#supported_models)
       * for more information.
       *
       * @param params - The parameters for the create request.
       * @return The created cached content.
       *
       * @example
       * ```ts
       * const contents = ...; // Initialize the content to cache.
       * const response = await ai.caches.create({
       *   model: 'gemini-2.0-flash-001',
       *   config: {
       *    'contents': contents,
       *    'displayName': 'test cache',
       *    'systemInstruction': 'What is the sum of the two pdfs?',
       *    'ttl': '86400s',
       *  }
       * });
       * ```
       */
      async create(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = createCachedContentParametersToVertex(this.apiClient, params);
          path2 = formatMap("cachedContents", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((resp) => {
            return resp;
          });
        } else {
          const body = createCachedContentParametersToMldev(this.apiClient, params);
          path2 = formatMap("cachedContents", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((resp) => {
            return resp;
          });
        }
      }
      /**
       * Gets cached content configurations.
       *
       * @param params - The parameters for the get request.
       * @return The cached content.
       *
       * @example
       * ```ts
       * await ai.caches.get({name: '...'}); // The server-generated resource name.
       * ```
       */
      async get(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = getCachedContentParametersToVertex(this.apiClient, params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((resp) => {
            return resp;
          });
        } else {
          const body = getCachedContentParametersToMldev(this.apiClient, params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((resp) => {
            return resp;
          });
        }
      }
      /**
       * Deletes cached content.
       *
       * @param params - The parameters for the delete request.
       * @return The empty response returned by the API.
       *
       * @example
       * ```ts
       * await ai.caches.delete({name: '...'}); // The server-generated resource name.
       * ```
       */
      async delete(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = deleteCachedContentParametersToVertex(this.apiClient, params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "DELETE",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = deleteCachedContentResponseFromVertex(apiResponse);
            const typedResp = new DeleteCachedContentResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          const body = deleteCachedContentParametersToMldev(this.apiClient, params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "DELETE",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = deleteCachedContentResponseFromMldev(apiResponse);
            const typedResp = new DeleteCachedContentResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
      /**
       * Updates cached content configurations.
       *
       * @param params - The parameters for the update request.
       * @return The updated cached content.
       *
       * @example
       * ```ts
       * const response = await ai.caches.update({
       *   name: '...',  // The server-generated resource name.
       *   config: {'ttl': '7600s'}
       * });
       * ```
       */
      async update(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = updateCachedContentParametersToVertex(this.apiClient, params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "PATCH",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((resp) => {
            return resp;
          });
        } else {
          const body = updateCachedContentParametersToMldev(this.apiClient, params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "PATCH",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((resp) => {
            return resp;
          });
        }
      }
      async listInternal(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = listCachedContentsParametersToVertex(params);
          path2 = formatMap("cachedContents", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = listCachedContentsResponseFromVertex(apiResponse);
            const typedResp = new ListCachedContentsResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          const body = listCachedContentsParametersToMldev(params);
          path2 = formatMap("cachedContents", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = listCachedContentsResponseFromMldev(apiResponse);
            const typedResp = new ListCachedContentsResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
    };
    __name(__rest, "__rest");
    __name(__values, "__values");
    __name(__await, "__await");
    __name(__asyncGenerator, "__asyncGenerator");
    __name(__asyncValues, "__asyncValues");
    __name(isValidResponse, "isValidResponse");
    __name(isValidContent, "isValidContent");
    __name(validateHistory, "validateHistory");
    __name(extractCuratedHistory, "extractCuratedHistory");
    Chats = class {
      static {
        __name(this, "Chats");
      }
      constructor(modelsModule, apiClient) {
        this.modelsModule = modelsModule;
        this.apiClient = apiClient;
      }
      /**
       * Creates a new chat session.
       *
       * @remarks
       * The config in the params will be used for all requests within the chat
       * session unless overridden by a per-request `config` in
       * @see {@link types.SendMessageParameters#config}.
       *
       * @param params - Parameters for creating a chat session.
       * @returns A new chat session.
       *
       * @example
       * ```ts
       * const chat = ai.chats.create({
       *   model: 'gemini-2.0-flash'
       *   config: {
       *     temperature: 0.5,
       *     maxOutputTokens: 1024,
       *   }
       * });
       * ```
       */
      create(params) {
        return new Chat(
          this.apiClient,
          this.modelsModule,
          params.model,
          params.config,
          // Deep copy the history to avoid mutating the history outside of the
          // chat session.
          structuredClone(params.history)
        );
      }
    };
    Chat = class {
      static {
        __name(this, "Chat");
      }
      constructor(apiClient, modelsModule, model, config = {}, history = []) {
        this.apiClient = apiClient;
        this.modelsModule = modelsModule;
        this.model = model;
        this.config = config;
        this.history = history;
        this.sendPromise = Promise.resolve();
        validateHistory(history);
      }
      /**
       * Sends a message to the model and returns the response.
       *
       * @remarks
       * This method will wait for the previous message to be processed before
       * sending the next message.
       *
       * @see {@link Chat#sendMessageStream} for streaming method.
       * @param params - parameters for sending messages within a chat session.
       * @returns The model's response.
       *
       * @example
       * ```ts
       * const chat = ai.chats.create({model: 'gemini-2.0-flash'});
       * const response = await chat.sendMessage({
       *   message: 'Why is the sky blue?'
       * });
       * console.log(response.text);
       * ```
       */
      async sendMessage(params) {
        var _a2;
        await this.sendPromise;
        const inputContent = tContent(params.message);
        const responsePromise = this.modelsModule.generateContent({
          model: this.model,
          contents: this.getHistory(true).concat(inputContent),
          config: (_a2 = params.config) !== null && _a2 !== void 0 ? _a2 : this.config
        });
        this.sendPromise = (async () => {
          var _a3, _b, _c;
          const response = await responsePromise;
          const outputContent = (_b = (_a3 = response.candidates) === null || _a3 === void 0 ? void 0 : _a3[0]) === null || _b === void 0 ? void 0 : _b.content;
          const fullAutomaticFunctionCallingHistory = response.automaticFunctionCallingHistory;
          const index = this.getHistory(true).length;
          let automaticFunctionCallingHistory = [];
          if (fullAutomaticFunctionCallingHistory != null) {
            automaticFunctionCallingHistory = (_c = fullAutomaticFunctionCallingHistory.slice(index)) !== null && _c !== void 0 ? _c : [];
          }
          const modelOutput = outputContent ? [outputContent] : [];
          this.recordHistory(inputContent, modelOutput, automaticFunctionCallingHistory);
          return;
        })();
        await this.sendPromise.catch(() => {
          this.sendPromise = Promise.resolve();
        });
        return responsePromise;
      }
      /**
       * Sends a message to the model and returns the response in chunks.
       *
       * @remarks
       * This method will wait for the previous message to be processed before
       * sending the next message.
       *
       * @see {@link Chat#sendMessage} for non-streaming method.
       * @param params - parameters for sending the message.
       * @return The model's response.
       *
       * @example
       * ```ts
       * const chat = ai.chats.create({model: 'gemini-2.0-flash'});
       * const response = await chat.sendMessageStream({
       *   message: 'Why is the sky blue?'
       * });
       * for await (const chunk of response) {
       *   console.log(chunk.text);
       * }
       * ```
       */
      async sendMessageStream(params) {
        var _a2;
        await this.sendPromise;
        const inputContent = tContent(params.message);
        const streamResponse = this.modelsModule.generateContentStream({
          model: this.model,
          contents: this.getHistory(true).concat(inputContent),
          config: (_a2 = params.config) !== null && _a2 !== void 0 ? _a2 : this.config
        });
        this.sendPromise = streamResponse.then(() => void 0).catch(() => void 0);
        const response = await streamResponse;
        const result = this.processStreamResponse(response, inputContent);
        return result;
      }
      /**
       * Returns the chat history.
       *
       * @remarks
       * The history is a list of contents alternating between user and model.
       *
       * There are two types of history:
       * - The `curated history` contains only the valid turns between user and
       * model, which will be included in the subsequent requests sent to the model.
       * - The `comprehensive history` contains all turns, including invalid or
       *   empty model outputs, providing a complete record of the history.
       *
       * The history is updated after receiving the response from the model,
       * for streaming response, it means receiving the last chunk of the response.
       *
       * The `comprehensive history` is returned by default. To get the `curated
       * history`, set the `curated` parameter to `true`.
       *
       * @param curated - whether to return the curated history or the comprehensive
       *     history.
       * @return History contents alternating between user and model for the entire
       *     chat session.
       */
      getHistory(curated = false) {
        const history = curated ? extractCuratedHistory(this.history) : this.history;
        return structuredClone(history);
      }
      processStreamResponse(streamResponse, inputContent) {
        return __asyncGenerator(this, arguments, /* @__PURE__ */ __name(function* processStreamResponse_1() {
          var _a2, e_1, _b, _c;
          var _d, _e;
          const outputContent = [];
          try {
            for (var _f = true, streamResponse_1 = __asyncValues(streamResponse), streamResponse_1_1; streamResponse_1_1 = yield __await(streamResponse_1.next()), _a2 = streamResponse_1_1.done, !_a2; _f = true) {
              _c = streamResponse_1_1.value;
              _f = false;
              const chunk = _c;
              if (isValidResponse(chunk)) {
                const content = (_e = (_d = chunk.candidates) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.content;
                if (content !== void 0) {
                  outputContent.push(content);
                }
              }
              yield yield __await(chunk);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (!_f && !_a2 && (_b = streamResponse_1.return)) yield __await(_b.call(streamResponse_1));
            } finally {
              if (e_1) throw e_1.error;
            }
          }
          this.recordHistory(inputContent, outputContent);
        }, "processStreamResponse_1"));
      }
      recordHistory(userInput, modelOutput, automaticFunctionCallingHistory) {
        let outputContents = [];
        if (modelOutput.length > 0 && modelOutput.every((content) => content.role !== void 0)) {
          outputContents = modelOutput;
        } else {
          outputContents.push({
            role: "model",
            parts: []
          });
        }
        if (automaticFunctionCallingHistory && automaticFunctionCallingHistory.length > 0) {
          this.history.push(...extractCuratedHistory(automaticFunctionCallingHistory));
        } else {
          this.history.push(userInput);
        }
        this.history.push(...outputContents);
      }
    };
    ApiError = class _ApiError extends Error {
      static {
        __name(this, "ApiError");
      }
      constructor(options) {
        super(options.message);
        this.name = "ApiError";
        this.status = options.status;
        Object.setPrototypeOf(this, _ApiError.prototype);
      }
    };
    __name(createFileParametersToMldev, "createFileParametersToMldev");
    __name(createFileResponseFromMldev, "createFileResponseFromMldev");
    __name(deleteFileParametersToMldev, "deleteFileParametersToMldev");
    __name(deleteFileResponseFromMldev, "deleteFileResponseFromMldev");
    __name(getFileParametersToMldev, "getFileParametersToMldev");
    __name(internalRegisterFilesParametersToMldev, "internalRegisterFilesParametersToMldev");
    __name(listFilesConfigToMldev, "listFilesConfigToMldev");
    __name(listFilesParametersToMldev, "listFilesParametersToMldev");
    __name(listFilesResponseFromMldev, "listFilesResponseFromMldev");
    __name(registerFilesResponseFromMldev, "registerFilesResponseFromMldev");
    Files = class extends BaseModule {
      static {
        __name(this, "Files");
      }
      constructor(apiClient) {
        super();
        this.apiClient = apiClient;
        this.list = async (params = {}) => {
          return new Pager(PagedItem.PAGED_ITEM_FILES, (x) => this.listInternal(x), await this.listInternal(params), params);
        };
      }
      /**
       * Uploads a file asynchronously to the Gemini API.
       * This method is not available in Vertex AI.
       * Supported upload sources:
       * - Node.js: File path (string) or Blob object.
       * - Browser: Blob object (e.g., File).
       *
       * @remarks
       * The `mimeType` can be specified in the `config` parameter. If omitted:
       *  - For file path (string) inputs, the `mimeType` will be inferred from the
       *     file extension.
       *  - For Blob object inputs, the `mimeType` will be set to the Blob's `type`
       *     property.
       * Somex eamples for file extension to mimeType mapping:
       * .txt -> text/plain
       * .json -> application/json
       * .jpg  -> image/jpeg
       * .png -> image/png
       * .mp3 -> audio/mpeg
       * .mp4 -> video/mp4
       *
       * This section can contain multiple paragraphs and code examples.
       *
       * @param params - Optional parameters specified in the
       *        `types.UploadFileParameters` interface.
       *         @see {@link types.UploadFileParameters#config} for the optional
       *         config in the parameters.
       * @return A promise that resolves to a `types.File` object.
       * @throws An error if called on a Vertex AI client.
       * @throws An error if the `mimeType` is not provided and can not be inferred,
       * the `mimeType` can be provided in the `params.config` parameter.
       * @throws An error occurs if a suitable upload location cannot be established.
       *
       * @example
       * The following code uploads a file to Gemini API.
       *
       * ```ts
       * const file = await ai.files.upload({file: 'file.txt', config: {
       *   mimeType: 'text/plain',
       * }});
       * console.log(file.name);
       * ```
       */
      async upload(params) {
        if (this.apiClient.isVertexAI()) {
          throw new Error("Vertex AI does not support uploading files. You can share files through a GCS bucket.");
        }
        return this.apiClient.uploadFile(params.file, params.config).then((resp) => {
          return resp;
        });
      }
      /**
       * Downloads a remotely stored file asynchronously to a location specified in
       * the `params` object. This method only works on Node environment, to
       * download files in the browser, use a browser compliant method like an <a>
       * tag.
       *
       * @param params - The parameters for the download request.
       *
       * @example
       * The following code downloads an example file named "files/mehozpxf877d" as
       * "file.txt".
       *
       * ```ts
       * await ai.files.download({file: file.name, downloadPath: 'file.txt'});
       * ```
       */
      async download(params) {
        await this.apiClient.downloadFile(params);
      }
      /**
       * Registers Google Cloud Storage files for use with the API.
       * This method is only available in Node.js environments.
       */
      async registerFiles(params) {
        throw new Error("registerFiles is only supported in Node.js environments.");
      }
      async _registerFiles(params) {
        return this.registerFilesInternal(params);
      }
      async listInternal(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("This method is only supported by the Gemini Developer API.");
        } else {
          const body = listFilesParametersToMldev(params);
          path2 = formatMap("files", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = listFilesResponseFromMldev(apiResponse);
            const typedResp = new ListFilesResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
      async createInternal(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("This method is only supported by the Gemini Developer API.");
        } else {
          const body = createFileParametersToMldev(params);
          path2 = formatMap("upload/v1beta/files", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = createFileResponseFromMldev(apiResponse);
            const typedResp = new CreateFileResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
      /**
       * Retrieves the file information from the service.
       *
       * @param params - The parameters for the get request
       * @return The Promise that resolves to the types.File object requested.
       *
       * @example
       * ```ts
       * const config: GetFileParameters = {
       *   name: fileName,
       * };
       * file = await ai.files.get(config);
       * console.log(file.name);
       * ```
       */
      async get(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("This method is only supported by the Gemini Developer API.");
        } else {
          const body = getFileParametersToMldev(params);
          path2 = formatMap("files/{file}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((resp) => {
            return resp;
          });
        }
      }
      /**
       * Deletes a remotely stored file.
       *
       * @param params - The parameters for the delete request.
       * @return The DeleteFileResponse, the response for the delete method.
       *
       * @example
       * The following code deletes an example file named "files/mehozpxf877d".
       *
       * ```ts
       * await ai.files.delete({name: file.name});
       * ```
       */
      async delete(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("This method is only supported by the Gemini Developer API.");
        } else {
          const body = deleteFileParametersToMldev(params);
          path2 = formatMap("files/{file}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "DELETE",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = deleteFileResponseFromMldev(apiResponse);
            const typedResp = new DeleteFileResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
      async registerFilesInternal(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("This method is only supported by the Gemini Developer API.");
        } else {
          const body = internalRegisterFilesParametersToMldev(params);
          path2 = formatMap("files:register", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = registerFilesResponseFromMldev(apiResponse);
            const typedResp = new RegisterFilesResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
    };
    __name(audioTranscriptionConfigToMldev$1, "audioTranscriptionConfigToMldev$1");
    __name(authConfigToMldev$2, "authConfigToMldev$2");
    __name(blobToMldev$2, "blobToMldev$2");
    __name(contentToMldev$2, "contentToMldev$2");
    __name(contentToVertex$1, "contentToVertex$1");
    __name(fileDataToMldev$2, "fileDataToMldev$2");
    __name(functionCallToMldev$2, "functionCallToMldev$2");
    __name(functionDeclarationToVertex$1, "functionDeclarationToVertex$1");
    __name(generationConfigToVertex$1, "generationConfigToVertex$1");
    __name(googleMapsToMldev$2, "googleMapsToMldev$2");
    __name(googleSearchToMldev$2, "googleSearchToMldev$2");
    __name(liveConnectConfigToMldev$1, "liveConnectConfigToMldev$1");
    __name(liveConnectConfigToVertex, "liveConnectConfigToVertex");
    __name(liveConnectParametersToMldev, "liveConnectParametersToMldev");
    __name(liveConnectParametersToVertex, "liveConnectParametersToVertex");
    __name(liveMusicSetConfigParametersToMldev, "liveMusicSetConfigParametersToMldev");
    __name(liveMusicSetWeightedPromptsParametersToMldev, "liveMusicSetWeightedPromptsParametersToMldev");
    __name(liveSendRealtimeInputParametersToMldev, "liveSendRealtimeInputParametersToMldev");
    __name(liveSendRealtimeInputParametersToVertex, "liveSendRealtimeInputParametersToVertex");
    __name(liveServerMessageFromVertex, "liveServerMessageFromVertex");
    __name(partToMldev$2, "partToMldev$2");
    __name(partToVertex$1, "partToVertex$1");
    __name(sessionResumptionConfigToMldev$1, "sessionResumptionConfigToMldev$1");
    __name(toolToMldev$2, "toolToMldev$2");
    __name(toolToVertex$1, "toolToVertex$1");
    __name(usageMetadataFromVertex, "usageMetadataFromVertex");
    __name(voiceActivityFromVertex, "voiceActivityFromVertex");
    __name(authConfigToMldev$1, "authConfigToMldev$1");
    __name(blobToMldev$1, "blobToMldev$1");
    __name(candidateFromMldev, "candidateFromMldev");
    __name(citationMetadataFromMldev, "citationMetadataFromMldev");
    __name(computeTokensParametersToVertex, "computeTokensParametersToVertex");
    __name(computeTokensResponseFromVertex, "computeTokensResponseFromVertex");
    __name(contentEmbeddingFromVertex, "contentEmbeddingFromVertex");
    __name(contentEmbeddingStatisticsFromVertex, "contentEmbeddingStatisticsFromVertex");
    __name(contentToMldev$1, "contentToMldev$1");
    __name(contentToVertex, "contentToVertex");
    __name(controlReferenceConfigToVertex, "controlReferenceConfigToVertex");
    __name(countTokensConfigToMldev, "countTokensConfigToMldev");
    __name(countTokensConfigToVertex, "countTokensConfigToVertex");
    __name(countTokensParametersToMldev, "countTokensParametersToMldev");
    __name(countTokensParametersToVertex, "countTokensParametersToVertex");
    __name(countTokensResponseFromMldev, "countTokensResponseFromMldev");
    __name(countTokensResponseFromVertex, "countTokensResponseFromVertex");
    __name(deleteModelParametersToMldev, "deleteModelParametersToMldev");
    __name(deleteModelParametersToVertex, "deleteModelParametersToVertex");
    __name(deleteModelResponseFromMldev, "deleteModelResponseFromMldev");
    __name(deleteModelResponseFromVertex, "deleteModelResponseFromVertex");
    __name(editImageConfigToVertex, "editImageConfigToVertex");
    __name(editImageParametersInternalToVertex, "editImageParametersInternalToVertex");
    __name(editImageResponseFromVertex, "editImageResponseFromVertex");
    __name(embedContentConfigToMldev, "embedContentConfigToMldev");
    __name(embedContentConfigToVertex, "embedContentConfigToVertex");
    __name(embedContentParametersPrivateToMldev, "embedContentParametersPrivateToMldev");
    __name(embedContentParametersPrivateToVertex, "embedContentParametersPrivateToVertex");
    __name(embedContentResponseFromMldev, "embedContentResponseFromMldev");
    __name(embedContentResponseFromVertex, "embedContentResponseFromVertex");
    __name(endpointFromVertex, "endpointFromVertex");
    __name(fileDataToMldev$1, "fileDataToMldev$1");
    __name(functionCallToMldev$1, "functionCallToMldev$1");
    __name(functionCallingConfigToMldev, "functionCallingConfigToMldev");
    __name(functionDeclarationToVertex, "functionDeclarationToVertex");
    __name(generateContentConfigToMldev, "generateContentConfigToMldev");
    __name(generateContentConfigToVertex, "generateContentConfigToVertex");
    __name(generateContentParametersToMldev, "generateContentParametersToMldev");
    __name(generateContentParametersToVertex, "generateContentParametersToVertex");
    __name(generateContentResponseFromMldev, "generateContentResponseFromMldev");
    __name(generateContentResponseFromVertex, "generateContentResponseFromVertex");
    __name(generateImagesConfigToMldev, "generateImagesConfigToMldev");
    __name(generateImagesConfigToVertex, "generateImagesConfigToVertex");
    __name(generateImagesParametersToMldev, "generateImagesParametersToMldev");
    __name(generateImagesParametersToVertex, "generateImagesParametersToVertex");
    __name(generateImagesResponseFromMldev, "generateImagesResponseFromMldev");
    __name(generateImagesResponseFromVertex, "generateImagesResponseFromVertex");
    __name(generateVideosConfigToMldev, "generateVideosConfigToMldev");
    __name(generateVideosConfigToVertex, "generateVideosConfigToVertex");
    __name(generateVideosOperationFromMldev, "generateVideosOperationFromMldev");
    __name(generateVideosOperationFromVertex, "generateVideosOperationFromVertex");
    __name(generateVideosParametersToMldev, "generateVideosParametersToMldev");
    __name(generateVideosParametersToVertex, "generateVideosParametersToVertex");
    __name(generateVideosResponseFromMldev, "generateVideosResponseFromMldev");
    __name(generateVideosResponseFromVertex, "generateVideosResponseFromVertex");
    __name(generateVideosSourceToMldev, "generateVideosSourceToMldev");
    __name(generateVideosSourceToVertex, "generateVideosSourceToVertex");
    __name(generatedImageFromMldev, "generatedImageFromMldev");
    __name(generatedImageFromVertex, "generatedImageFromVertex");
    __name(generatedImageMaskFromVertex, "generatedImageMaskFromVertex");
    __name(generatedVideoFromMldev, "generatedVideoFromMldev");
    __name(generatedVideoFromVertex, "generatedVideoFromVertex");
    __name(generationConfigToVertex, "generationConfigToVertex");
    __name(getModelParametersToMldev, "getModelParametersToMldev");
    __name(getModelParametersToVertex, "getModelParametersToVertex");
    __name(googleMapsToMldev$1, "googleMapsToMldev$1");
    __name(googleSearchToMldev$1, "googleSearchToMldev$1");
    __name(imageConfigToMldev, "imageConfigToMldev");
    __name(imageConfigToVertex, "imageConfigToVertex");
    __name(imageFromMldev, "imageFromMldev");
    __name(imageFromVertex, "imageFromVertex");
    __name(imageToMldev, "imageToMldev");
    __name(imageToVertex, "imageToVertex");
    __name(listModelsConfigToMldev, "listModelsConfigToMldev");
    __name(listModelsConfigToVertex, "listModelsConfigToVertex");
    __name(listModelsParametersToMldev, "listModelsParametersToMldev");
    __name(listModelsParametersToVertex, "listModelsParametersToVertex");
    __name(listModelsResponseFromMldev, "listModelsResponseFromMldev");
    __name(listModelsResponseFromVertex, "listModelsResponseFromVertex");
    __name(maskReferenceConfigToVertex, "maskReferenceConfigToVertex");
    __name(modelFromMldev, "modelFromMldev");
    __name(modelFromVertex, "modelFromVertex");
    __name(partToMldev$1, "partToMldev$1");
    __name(partToVertex, "partToVertex");
    __name(productImageToVertex, "productImageToVertex");
    __name(recontextImageConfigToVertex, "recontextImageConfigToVertex");
    __name(recontextImageParametersToVertex, "recontextImageParametersToVertex");
    __name(recontextImageResponseFromVertex, "recontextImageResponseFromVertex");
    __name(recontextImageSourceToVertex, "recontextImageSourceToVertex");
    __name(referenceImageAPIInternalToVertex, "referenceImageAPIInternalToVertex");
    __name(safetyAttributesFromMldev, "safetyAttributesFromMldev");
    __name(safetyAttributesFromVertex, "safetyAttributesFromVertex");
    __name(safetySettingToMldev, "safetySettingToMldev");
    __name(scribbleImageToVertex, "scribbleImageToVertex");
    __name(segmentImageConfigToVertex, "segmentImageConfigToVertex");
    __name(segmentImageParametersToVertex, "segmentImageParametersToVertex");
    __name(segmentImageResponseFromVertex, "segmentImageResponseFromVertex");
    __name(segmentImageSourceToVertex, "segmentImageSourceToVertex");
    __name(toolConfigToMldev, "toolConfigToMldev");
    __name(toolConfigToVertex, "toolConfigToVertex");
    __name(toolToMldev$1, "toolToMldev$1");
    __name(toolToVertex, "toolToVertex");
    __name(tunedModelInfoFromMldev, "tunedModelInfoFromMldev");
    __name(tunedModelInfoFromVertex, "tunedModelInfoFromVertex");
    __name(updateModelConfigToMldev, "updateModelConfigToMldev");
    __name(updateModelConfigToVertex, "updateModelConfigToVertex");
    __name(updateModelParametersToMldev, "updateModelParametersToMldev");
    __name(updateModelParametersToVertex, "updateModelParametersToVertex");
    __name(upscaleImageAPIConfigInternalToVertex, "upscaleImageAPIConfigInternalToVertex");
    __name(upscaleImageAPIParametersInternalToVertex, "upscaleImageAPIParametersInternalToVertex");
    __name(upscaleImageResponseFromVertex, "upscaleImageResponseFromVertex");
    __name(videoFromMldev, "videoFromMldev");
    __name(videoFromVertex, "videoFromVertex");
    __name(videoGenerationMaskToVertex, "videoGenerationMaskToVertex");
    __name(videoGenerationReferenceImageToMldev, "videoGenerationReferenceImageToMldev");
    __name(videoGenerationReferenceImageToVertex, "videoGenerationReferenceImageToVertex");
    __name(videoToMldev, "videoToMldev");
    __name(videoToVertex, "videoToVertex");
    __name(createFileSearchStoreConfigToMldev, "createFileSearchStoreConfigToMldev");
    __name(createFileSearchStoreParametersToMldev, "createFileSearchStoreParametersToMldev");
    __name(deleteFileSearchStoreConfigToMldev, "deleteFileSearchStoreConfigToMldev");
    __name(deleteFileSearchStoreParametersToMldev, "deleteFileSearchStoreParametersToMldev");
    __name(getFileSearchStoreParametersToMldev, "getFileSearchStoreParametersToMldev");
    __name(importFileConfigToMldev, "importFileConfigToMldev");
    __name(importFileOperationFromMldev, "importFileOperationFromMldev");
    __name(importFileParametersToMldev, "importFileParametersToMldev");
    __name(importFileResponseFromMldev, "importFileResponseFromMldev");
    __name(listFileSearchStoresConfigToMldev, "listFileSearchStoresConfigToMldev");
    __name(listFileSearchStoresParametersToMldev, "listFileSearchStoresParametersToMldev");
    __name(listFileSearchStoresResponseFromMldev, "listFileSearchStoresResponseFromMldev");
    __name(uploadToFileSearchStoreConfigToMldev, "uploadToFileSearchStoreConfigToMldev");
    __name(uploadToFileSearchStoreParametersToMldev, "uploadToFileSearchStoreParametersToMldev");
    __name(uploadToFileSearchStoreResumableResponseFromMldev, "uploadToFileSearchStoreResumableResponseFromMldev");
    CONTENT_TYPE_HEADER = "Content-Type";
    SERVER_TIMEOUT_HEADER = "X-Server-Timeout";
    USER_AGENT_HEADER = "User-Agent";
    GOOGLE_API_CLIENT_HEADER = "x-goog-api-client";
    SDK_VERSION = "1.46.0";
    LIBRARY_LABEL = `google-genai-sdk/${SDK_VERSION}`;
    VERTEX_AI_API_DEFAULT_VERSION = "v1beta1";
    GOOGLE_AI_API_DEFAULT_VERSION = "v1beta";
    DEFAULT_RETRY_ATTEMPTS = 5;
    DEFAULT_RETRY_HTTP_STATUS_CODES = [
      408,
      // Request timeout
      429,
      // Too many requests
      500,
      // Internal server error
      502,
      // Bad gateway
      503,
      // Service unavailable
      504
      // Gateway timeout
    ];
    ApiClient = class {
      static {
        __name(this, "ApiClient");
      }
      constructor(opts) {
        var _a2, _b, _c;
        this.clientOptions = Object.assign({}, opts);
        this.customBaseUrl = (_a2 = opts.httpOptions) === null || _a2 === void 0 ? void 0 : _a2.baseUrl;
        if (this.clientOptions.vertexai) {
          if (this.clientOptions.project && this.clientOptions.location) {
            this.clientOptions.apiKey = void 0;
          } else if (this.clientOptions.apiKey) {
            this.clientOptions.project = void 0;
            this.clientOptions.location = void 0;
          }
        }
        const initHttpOptions = {};
        if (this.clientOptions.vertexai) {
          if (!this.clientOptions.location && !this.clientOptions.apiKey && !this.customBaseUrl) {
            this.clientOptions.location = "global";
          }
          const hasSufficientAuth = this.clientOptions.project && this.clientOptions.location || this.clientOptions.apiKey;
          if (!hasSufficientAuth && !this.customBaseUrl) {
            throw new Error("Authentication is not set up. Please provide either a project and location, or an API key, or a custom base URL.");
          }
          const hasConstructorAuth = opts.project && opts.location || !!opts.apiKey;
          if (this.customBaseUrl && !hasConstructorAuth) {
            initHttpOptions.baseUrl = this.customBaseUrl;
            this.clientOptions.project = void 0;
            this.clientOptions.location = void 0;
          } else if (this.clientOptions.apiKey || this.clientOptions.location === "global") {
            initHttpOptions.baseUrl = "https://aiplatform.googleapis.com/";
          } else if (this.clientOptions.project && this.clientOptions.location) {
            initHttpOptions.baseUrl = `https://${this.clientOptions.location}-aiplatform.googleapis.com/`;
          }
          initHttpOptions.apiVersion = (_b = this.clientOptions.apiVersion) !== null && _b !== void 0 ? _b : VERTEX_AI_API_DEFAULT_VERSION;
        } else {
          if (!this.clientOptions.apiKey) {
            console.warn("API key should be set when using the Gemini API.");
          }
          initHttpOptions.apiVersion = (_c = this.clientOptions.apiVersion) !== null && _c !== void 0 ? _c : GOOGLE_AI_API_DEFAULT_VERSION;
          initHttpOptions.baseUrl = `https://generativelanguage.googleapis.com/`;
        }
        initHttpOptions.headers = this.getDefaultHeaders();
        this.clientOptions.httpOptions = initHttpOptions;
        if (opts.httpOptions) {
          this.clientOptions.httpOptions = this.patchHttpOptions(initHttpOptions, opts.httpOptions);
        }
      }
      isVertexAI() {
        var _a2;
        return (_a2 = this.clientOptions.vertexai) !== null && _a2 !== void 0 ? _a2 : false;
      }
      getProject() {
        return this.clientOptions.project;
      }
      getLocation() {
        return this.clientOptions.location;
      }
      getCustomBaseUrl() {
        return this.customBaseUrl;
      }
      async getAuthHeaders() {
        const headers = new Headers();
        await this.clientOptions.auth.addAuthHeaders(headers);
        return headers;
      }
      getApiVersion() {
        if (this.clientOptions.httpOptions && this.clientOptions.httpOptions.apiVersion !== void 0) {
          return this.clientOptions.httpOptions.apiVersion;
        }
        throw new Error("API version is not set.");
      }
      getBaseUrl() {
        if (this.clientOptions.httpOptions && this.clientOptions.httpOptions.baseUrl !== void 0) {
          return this.clientOptions.httpOptions.baseUrl;
        }
        throw new Error("Base URL is not set.");
      }
      getRequestUrl() {
        return this.getRequestUrlInternal(this.clientOptions.httpOptions);
      }
      getHeaders() {
        if (this.clientOptions.httpOptions && this.clientOptions.httpOptions.headers !== void 0) {
          return this.clientOptions.httpOptions.headers;
        } else {
          throw new Error("Headers are not set.");
        }
      }
      getRequestUrlInternal(httpOptions) {
        if (!httpOptions || httpOptions.baseUrl === void 0 || httpOptions.apiVersion === void 0) {
          throw new Error("HTTP options are not correctly set.");
        }
        const baseUrl = httpOptions.baseUrl.endsWith("/") ? httpOptions.baseUrl.slice(0, -1) : httpOptions.baseUrl;
        const urlElement = [baseUrl];
        if (httpOptions.apiVersion && httpOptions.apiVersion !== "") {
          urlElement.push(httpOptions.apiVersion);
        }
        return urlElement.join("/");
      }
      getBaseResourcePath() {
        return `projects/${this.clientOptions.project}/locations/${this.clientOptions.location}`;
      }
      getApiKey() {
        return this.clientOptions.apiKey;
      }
      getWebsocketBaseUrl() {
        const baseUrl = this.getBaseUrl();
        const urlParts = new URL(baseUrl);
        urlParts.protocol = urlParts.protocol == "http:" ? "ws" : "wss";
        return urlParts.toString();
      }
      setBaseUrl(url) {
        if (this.clientOptions.httpOptions) {
          this.clientOptions.httpOptions.baseUrl = url;
        } else {
          throw new Error("HTTP options are not correctly set.");
        }
      }
      constructUrl(path2, httpOptions, prependProjectLocation) {
        const urlElement = [this.getRequestUrlInternal(httpOptions)];
        if (prependProjectLocation) {
          urlElement.push(this.getBaseResourcePath());
        }
        if (path2 !== "") {
          urlElement.push(path2);
        }
        const url = new URL(`${urlElement.join("/")}`);
        return url;
      }
      shouldPrependVertexProjectPath(request, httpOptions) {
        if (httpOptions.baseUrl && httpOptions.baseUrlResourceScope === ResourceScope.COLLECTION) {
          return false;
        }
        if (this.clientOptions.apiKey) {
          return false;
        }
        if (!this.clientOptions.vertexai) {
          return false;
        }
        if (request.path.startsWith("projects/")) {
          return false;
        }
        if (request.httpMethod === "GET" && request.path.startsWith("publishers/google/models")) {
          return false;
        }
        return true;
      }
      async request(request) {
        let patchedHttpOptions = this.clientOptions.httpOptions;
        if (request.httpOptions) {
          patchedHttpOptions = this.patchHttpOptions(this.clientOptions.httpOptions, request.httpOptions);
        }
        const prependProjectLocation = this.shouldPrependVertexProjectPath(request, patchedHttpOptions);
        const url = this.constructUrl(request.path, patchedHttpOptions, prependProjectLocation);
        if (request.queryParams) {
          for (const [key, value] of Object.entries(request.queryParams)) {
            url.searchParams.append(key, String(value));
          }
        }
        let requestInit = {};
        if (request.httpMethod === "GET") {
          if (request.body && request.body !== "{}") {
            throw new Error("Request body should be empty for GET request, but got non empty request body");
          }
        } else {
          requestInit.body = request.body;
        }
        requestInit = await this.includeExtraHttpOptionsToRequestInit(requestInit, patchedHttpOptions, url.toString(), request.abortSignal);
        return this.unaryApiCall(url, requestInit, request.httpMethod);
      }
      patchHttpOptions(baseHttpOptions, requestHttpOptions) {
        const patchedHttpOptions = JSON.parse(JSON.stringify(baseHttpOptions));
        for (const [key, value] of Object.entries(requestHttpOptions)) {
          if (typeof value === "object") {
            patchedHttpOptions[key] = Object.assign(Object.assign({}, patchedHttpOptions[key]), value);
          } else if (value !== void 0) {
            patchedHttpOptions[key] = value;
          }
        }
        return patchedHttpOptions;
      }
      async requestStream(request) {
        let patchedHttpOptions = this.clientOptions.httpOptions;
        if (request.httpOptions) {
          patchedHttpOptions = this.patchHttpOptions(this.clientOptions.httpOptions, request.httpOptions);
        }
        const prependProjectLocation = this.shouldPrependVertexProjectPath(request, patchedHttpOptions);
        const url = this.constructUrl(request.path, patchedHttpOptions, prependProjectLocation);
        if (!url.searchParams.has("alt") || url.searchParams.get("alt") !== "sse") {
          url.searchParams.set("alt", "sse");
        }
        let requestInit = {};
        requestInit.body = request.body;
        requestInit = await this.includeExtraHttpOptionsToRequestInit(requestInit, patchedHttpOptions, url.toString(), request.abortSignal);
        return this.streamApiCall(url, requestInit, request.httpMethod);
      }
      async includeExtraHttpOptionsToRequestInit(requestInit, httpOptions, url, abortSignal) {
        if (httpOptions && httpOptions.timeout || abortSignal) {
          const abortController = new AbortController();
          const signal = abortController.signal;
          if (httpOptions.timeout && (httpOptions === null || httpOptions === void 0 ? void 0 : httpOptions.timeout) > 0) {
            const timeoutHandle = setTimeout(() => abortController.abort(), httpOptions.timeout);
            if (timeoutHandle && typeof timeoutHandle.unref === "function") {
              timeoutHandle.unref();
            }
          }
          if (abortSignal) {
            abortSignal.addEventListener("abort", () => {
              abortController.abort();
            });
          }
          requestInit.signal = signal;
        }
        if (httpOptions && httpOptions.extraBody !== null) {
          includeExtraBodyToRequestInit(requestInit, httpOptions.extraBody);
        }
        requestInit.headers = await this.getHeadersInternal(httpOptions, url);
        return requestInit;
      }
      async unaryApiCall(url, requestInit, httpMethod) {
        return this.apiCall(url.toString(), Object.assign(Object.assign({}, requestInit), { method: httpMethod })).then(async (response) => {
          await throwErrorIfNotOK(response);
          return new HttpResponse(response);
        }).catch((e) => {
          if (e instanceof Error) {
            throw e;
          } else {
            throw new Error(JSON.stringify(e));
          }
        });
      }
      async streamApiCall(url, requestInit, httpMethod) {
        return this.apiCall(url.toString(), Object.assign(Object.assign({}, requestInit), { method: httpMethod })).then(async (response) => {
          await throwErrorIfNotOK(response);
          return this.processStreamResponse(response);
        }).catch((e) => {
          if (e instanceof Error) {
            throw e;
          } else {
            throw new Error(JSON.stringify(e));
          }
        });
      }
      processStreamResponse(response) {
        return __asyncGenerator(this, arguments, /* @__PURE__ */ __name(function* processStreamResponse_1() {
          var _a2;
          const reader = (_a2 = response === null || response === void 0 ? void 0 : response.body) === null || _a2 === void 0 ? void 0 : _a2.getReader();
          const decoder = new TextDecoder("utf-8");
          if (!reader) {
            throw new Error("Response body is empty");
          }
          try {
            let buffer = "";
            const dataPrefix = "data:";
            const delimiters = ["\n\n", "\r\r", "\r\n\r\n"];
            while (true) {
              const { done, value } = yield __await(reader.read());
              if (done) {
                if (buffer.trim().length > 0) {
                  throw new Error("Incomplete JSON segment at the end");
                }
                break;
              }
              const chunkString = decoder.decode(value, { stream: true });
              try {
                const chunkJson = JSON.parse(chunkString);
                if ("error" in chunkJson) {
                  const errorJson = JSON.parse(JSON.stringify(chunkJson["error"]));
                  const status = errorJson["status"];
                  const code = errorJson["code"];
                  const errorMessage = `got status: ${status}. ${JSON.stringify(chunkJson)}`;
                  if (code >= 400 && code < 600) {
                    const apiError = new ApiError({
                      message: errorMessage,
                      status: code
                    });
                    throw apiError;
                  }
                }
              } catch (e) {
                const error = e;
                if (error.name === "ApiError") {
                  throw e;
                }
              }
              buffer += chunkString;
              let delimiterIndex = -1;
              let delimiterLength = 0;
              while (true) {
                delimiterIndex = -1;
                delimiterLength = 0;
                for (const delimiter of delimiters) {
                  const index = buffer.indexOf(delimiter);
                  if (index !== -1 && (delimiterIndex === -1 || index < delimiterIndex)) {
                    delimiterIndex = index;
                    delimiterLength = delimiter.length;
                  }
                }
                if (delimiterIndex === -1) {
                  break;
                }
                const eventString = buffer.substring(0, delimiterIndex);
                buffer = buffer.substring(delimiterIndex + delimiterLength);
                const trimmedEvent = eventString.trim();
                if (trimmedEvent.startsWith(dataPrefix)) {
                  const processedChunkString = trimmedEvent.substring(dataPrefix.length).trim();
                  try {
                    const partialResponse = new Response(processedChunkString, {
                      headers: response === null || response === void 0 ? void 0 : response.headers,
                      status: response === null || response === void 0 ? void 0 : response.status,
                      statusText: response === null || response === void 0 ? void 0 : response.statusText
                    });
                    yield yield __await(new HttpResponse(partialResponse));
                  } catch (e) {
                    throw new Error(`exception parsing stream chunk ${processedChunkString}. ${e}`);
                  }
                }
              }
            }
          } finally {
            reader.releaseLock();
          }
        }, "processStreamResponse_1"));
      }
      async apiCall(url, requestInit) {
        var _a2;
        if (!this.clientOptions.httpOptions || !this.clientOptions.httpOptions.retryOptions) {
          return fetch(url, requestInit);
        }
        const retryOptions = this.clientOptions.httpOptions.retryOptions;
        const runFetch = /* @__PURE__ */ __name(async () => {
          const response = await fetch(url, requestInit);
          if (response.ok) {
            return response;
          }
          if (DEFAULT_RETRY_HTTP_STATUS_CODES.includes(response.status)) {
            throw new Error(`Retryable HTTP Error: ${response.statusText}`);
          }
          throw new import_p_retry.AbortError(`Non-retryable exception ${response.statusText} sending request`);
        }, "runFetch");
        return (0, import_p_retry.default)(runFetch, {
          // Retry attempts is one less than the number of total attempts.
          retries: ((_a2 = retryOptions.attempts) !== null && _a2 !== void 0 ? _a2 : DEFAULT_RETRY_ATTEMPTS) - 1
        });
      }
      getDefaultHeaders() {
        const headers = {};
        const versionHeaderValue = LIBRARY_LABEL + " " + this.clientOptions.userAgentExtra;
        headers[USER_AGENT_HEADER] = versionHeaderValue;
        headers[GOOGLE_API_CLIENT_HEADER] = versionHeaderValue;
        headers[CONTENT_TYPE_HEADER] = "application/json";
        return headers;
      }
      async getHeadersInternal(httpOptions, url) {
        const headers = new Headers();
        if (httpOptions && httpOptions.headers) {
          for (const [key, value] of Object.entries(httpOptions.headers)) {
            headers.append(key, value);
          }
          if (httpOptions.timeout && httpOptions.timeout > 0) {
            headers.append(SERVER_TIMEOUT_HEADER, String(Math.ceil(httpOptions.timeout / 1e3)));
          }
        }
        await this.clientOptions.auth.addAuthHeaders(headers, url);
        return headers;
      }
      getFileName(file) {
        var _a2;
        let fileName = "";
        if (typeof file === "string") {
          fileName = file.replace(/[/\\]+$/, "");
          fileName = (_a2 = fileName.split(/[/\\]/).pop()) !== null && _a2 !== void 0 ? _a2 : "";
        }
        return fileName;
      }
      /**
       * Uploads a file asynchronously using Gemini API only, this is not supported
       * in Vertex AI.
       *
       * @param file The string path to the file to be uploaded or a Blob object.
       * @param config Optional parameters specified in the `UploadFileConfig`
       *     interface. @see {@link types.UploadFileConfig}
       * @return A promise that resolves to a `File` object.
       * @throws An error if called on a Vertex AI client.
       * @throws An error if the `mimeType` is not provided and can not be inferred,
       */
      async uploadFile(file, config) {
        var _a2;
        const fileToUpload = {};
        if (config != null) {
          fileToUpload.mimeType = config.mimeType;
          fileToUpload.name = config.name;
          fileToUpload.displayName = config.displayName;
        }
        if (fileToUpload.name && !fileToUpload.name.startsWith("files/")) {
          fileToUpload.name = `files/${fileToUpload.name}`;
        }
        const uploader = this.clientOptions.uploader;
        const fileStat = await uploader.stat(file);
        fileToUpload.sizeBytes = String(fileStat.size);
        const mimeType = (_a2 = config === null || config === void 0 ? void 0 : config.mimeType) !== null && _a2 !== void 0 ? _a2 : fileStat.type;
        if (mimeType === void 0 || mimeType === "") {
          throw new Error("Can not determine mimeType. Please provide mimeType in the config.");
        }
        fileToUpload.mimeType = mimeType;
        const body = {
          file: fileToUpload
        };
        const fileName = this.getFileName(file);
        const path2 = formatMap("upload/v1beta/files", body["_url"]);
        const uploadUrl = await this.fetchUploadUrl(path2, fileToUpload.sizeBytes, fileToUpload.mimeType, fileName, body, config === null || config === void 0 ? void 0 : config.httpOptions);
        return uploader.upload(file, uploadUrl, this);
      }
      /**
       * Uploads a file to a given file search store asynchronously using Gemini API only, this is not supported
       * in Vertex AI.
       *
       * @param fileSearchStoreName The name of the file search store to upload the file to.
       * @param file The string path to the file to be uploaded or a Blob object.
       * @param config Optional parameters specified in the `UploadFileConfig`
       *     interface. @see {@link UploadFileConfig}
       * @return A promise that resolves to a `File` object.
       * @throws An error if called on a Vertex AI client.
       * @throws An error if the `mimeType` is not provided and can not be inferred,
       */
      async uploadFileToFileSearchStore(fileSearchStoreName, file, config) {
        var _a2;
        const uploader = this.clientOptions.uploader;
        const fileStat = await uploader.stat(file);
        const sizeBytes = String(fileStat.size);
        const mimeType = (_a2 = config === null || config === void 0 ? void 0 : config.mimeType) !== null && _a2 !== void 0 ? _a2 : fileStat.type;
        if (mimeType === void 0 || mimeType === "") {
          throw new Error("Can not determine mimeType. Please provide mimeType in the config.");
        }
        const path2 = `upload/v1beta/${fileSearchStoreName}:uploadToFileSearchStore`;
        const fileName = this.getFileName(file);
        const body = {};
        if (config != null) {
          uploadToFileSearchStoreConfigToMldev(config, body);
        }
        const uploadUrl = await this.fetchUploadUrl(path2, sizeBytes, mimeType, fileName, body, config === null || config === void 0 ? void 0 : config.httpOptions);
        return uploader.uploadToFileSearchStore(file, uploadUrl, this);
      }
      /**
       * Downloads a file asynchronously to the specified path.
       *
       * @params params - The parameters for the download request, see {@link
       * types.DownloadFileParameters}
       */
      async downloadFile(params) {
        const downloader = this.clientOptions.downloader;
        await downloader.download(params, this);
      }
      async fetchUploadUrl(path2, sizeBytes, mimeType, fileName, body, configHttpOptions) {
        var _a2;
        let httpOptions = {};
        if (configHttpOptions) {
          httpOptions = configHttpOptions;
        } else {
          httpOptions = {
            apiVersion: "",
            // api-version is set in the path.
            headers: Object.assign({ "Content-Type": "application/json", "X-Goog-Upload-Protocol": "resumable", "X-Goog-Upload-Command": "start", "X-Goog-Upload-Header-Content-Length": `${sizeBytes}`, "X-Goog-Upload-Header-Content-Type": `${mimeType}` }, fileName ? { "X-Goog-Upload-File-Name": fileName } : {})
          };
        }
        const httpResponse = await this.request({
          path: path2,
          body: JSON.stringify(body),
          httpMethod: "POST",
          httpOptions
        });
        if (!httpResponse || !(httpResponse === null || httpResponse === void 0 ? void 0 : httpResponse.headers)) {
          throw new Error("Server did not return an HttpResponse or the returned HttpResponse did not have headers.");
        }
        const uploadUrl = (_a2 = httpResponse === null || httpResponse === void 0 ? void 0 : httpResponse.headers) === null || _a2 === void 0 ? void 0 : _a2["x-goog-upload-url"];
        if (uploadUrl === void 0) {
          throw new Error("Failed to get upload url. Server did not return the x-google-upload-url in the headers");
        }
        return uploadUrl;
      }
    };
    __name(throwErrorIfNotOK, "throwErrorIfNotOK");
    __name(includeExtraBodyToRequestInit, "includeExtraBodyToRequestInit");
    MCP_LABEL = "mcp_used/unknown";
    hasMcpToolUsageFromMcpToTool = false;
    __name(hasMcpToolUsage, "hasMcpToolUsage");
    __name(setMcpUsageHeader, "setMcpUsageHeader");
    __name(isMcpCallableTool, "isMcpCallableTool");
    __name(listAllTools, "listAllTools");
    McpCallableTool = class _McpCallableTool {
      static {
        __name(this, "McpCallableTool");
      }
      constructor(mcpClients = [], config) {
        this.mcpTools = [];
        this.functionNameToMcpClient = {};
        this.mcpClients = mcpClients;
        this.config = config;
      }
      /**
       * Creates a McpCallableTool.
       */
      static create(mcpClients, config) {
        return new _McpCallableTool(mcpClients, config);
      }
      /**
       * Validates the function names are not duplicate and initialize the function
       * name to MCP client mapping.
       *
       * @throws {Error} if the MCP tools from the MCP clients have duplicate tool
       *     names.
       */
      async initialize() {
        var _a2, e_1, _b, _c;
        if (this.mcpTools.length > 0) {
          return;
        }
        const functionMap = {};
        const mcpTools = [];
        for (const mcpClient of this.mcpClients) {
          try {
            for (var _d = true, _e = (e_1 = void 0, __asyncValues(listAllTools(mcpClient))), _f; _f = await _e.next(), _a2 = _f.done, !_a2; _d = true) {
              _c = _f.value;
              _d = false;
              const mcpTool = _c;
              mcpTools.push(mcpTool);
              const mcpToolName = mcpTool.name;
              if (functionMap[mcpToolName]) {
                throw new Error(`Duplicate function name ${mcpToolName} found in MCP tools. Please ensure function names are unique.`);
              }
              functionMap[mcpToolName] = mcpClient;
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (!_d && !_a2 && (_b = _e.return)) await _b.call(_e);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }
        this.mcpTools = mcpTools;
        this.functionNameToMcpClient = functionMap;
      }
      async tool() {
        await this.initialize();
        return mcpToolsToGeminiTool(this.mcpTools, this.config);
      }
      async callTool(functionCalls) {
        await this.initialize();
        const functionCallResponseParts = [];
        for (const functionCall of functionCalls) {
          if (functionCall.name in this.functionNameToMcpClient) {
            const mcpClient = this.functionNameToMcpClient[functionCall.name];
            let requestOptions = void 0;
            if (this.config.timeout) {
              requestOptions = {
                timeout: this.config.timeout
              };
            }
            const callToolResponse = await mcpClient.callTool(
              {
                name: functionCall.name,
                arguments: functionCall.args
              },
              // Set the result schema to undefined to allow MCP to rely on the
              // default schema.
              void 0,
              requestOptions
            );
            functionCallResponseParts.push({
              functionResponse: {
                name: functionCall.name,
                response: callToolResponse.isError ? { error: callToolResponse } : callToolResponse
              }
            });
          }
        }
        return functionCallResponseParts;
      }
    };
    __name(handleWebSocketMessage$1, "handleWebSocketMessage$1");
    LiveMusic = class {
      static {
        __name(this, "LiveMusic");
      }
      constructor(apiClient, auth, webSocketFactory) {
        this.apiClient = apiClient;
        this.auth = auth;
        this.webSocketFactory = webSocketFactory;
      }
      /**
           Establishes a connection to the specified model and returns a
           LiveMusicSession object representing that connection.
      
           @experimental
      
           @remarks
      
           @param params - The parameters for establishing a connection to the model.
           @return A live session.
      
           @example
           ```ts
           let model = 'models/lyria-realtime-exp';
           const session = await ai.live.music.connect({
             model: model,
             callbacks: {
               onmessage: (e: MessageEvent) => {
                 console.log('Received message from the server: %s\n', debug(e.data));
               },
               onerror: (e: ErrorEvent) => {
                 console.log('Error occurred: %s\n', debug(e.error));
               },
               onclose: (e: CloseEvent) => {
                 console.log('Connection closed.');
               },
             },
           });
           ```
          */
      async connect(params) {
        var _a2, _b;
        if (this.apiClient.isVertexAI()) {
          throw new Error("Live music is not supported for Vertex AI.");
        }
        console.warn("Live music generation is experimental and may change in future versions.");
        const websocketBaseUrl = this.apiClient.getWebsocketBaseUrl();
        const apiVersion = this.apiClient.getApiVersion();
        const headers = mapToHeaders$1(this.apiClient.getDefaultHeaders());
        const apiKey = this.apiClient.getApiKey();
        const url = `${websocketBaseUrl}/ws/google.ai.generativelanguage.${apiVersion}.GenerativeService.BidiGenerateMusic?key=${apiKey}`;
        let onopenResolve = /* @__PURE__ */ __name(() => {
        }, "onopenResolve");
        const onopenPromise = new Promise((resolve) => {
          onopenResolve = resolve;
        });
        const callbacks = params.callbacks;
        const onopenAwaitedCallback = /* @__PURE__ */ __name(function() {
          onopenResolve({});
        }, "onopenAwaitedCallback");
        const apiClient = this.apiClient;
        const websocketCallbacks = {
          onopen: onopenAwaitedCallback,
          onmessage: /* @__PURE__ */ __name((event) => {
            void handleWebSocketMessage$1(apiClient, callbacks.onmessage, event);
          }, "onmessage"),
          onerror: (_a2 = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onerror) !== null && _a2 !== void 0 ? _a2 : function(e) {
          },
          onclose: (_b = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onclose) !== null && _b !== void 0 ? _b : function(e) {
          }
        };
        const conn = this.webSocketFactory.create(url, headersToMap$1(headers), websocketCallbacks);
        conn.connect();
        await onopenPromise;
        const model = tModel(this.apiClient, params.model);
        const setup = { model };
        const clientMessage = { setup };
        conn.send(JSON.stringify(clientMessage));
        return new LiveMusicSession(conn, this.apiClient);
      }
    };
    LiveMusicSession = class {
      static {
        __name(this, "LiveMusicSession");
      }
      constructor(conn, apiClient) {
        this.conn = conn;
        this.apiClient = apiClient;
      }
      /**
          Sets inputs to steer music generation. Updates the session's current
          weighted prompts.
      
          @param params - Contains one property, `weightedPrompts`.
      
            - `weightedPrompts` to send to the model; weights are normalized to
              sum to 1.0.
      
          @experimental
         */
      async setWeightedPrompts(params) {
        if (!params.weightedPrompts || Object.keys(params.weightedPrompts).length === 0) {
          throw new Error("Weighted prompts must be set and contain at least one entry.");
        }
        const clientContent = liveMusicSetWeightedPromptsParametersToMldev(params);
        this.conn.send(JSON.stringify({ clientContent }));
      }
      /**
          Sets a configuration to the model. Updates the session's current
          music generation config.
      
          @param params - Contains one property, `musicGenerationConfig`.
      
            - `musicGenerationConfig` to set in the model. Passing an empty or
          undefined config to the model will reset the config to defaults.
      
          @experimental
         */
      async setMusicGenerationConfig(params) {
        if (!params.musicGenerationConfig) {
          params.musicGenerationConfig = {};
        }
        const setConfigParameters = liveMusicSetConfigParametersToMldev(params);
        this.conn.send(JSON.stringify(setConfigParameters));
      }
      sendPlaybackControl(playbackControl) {
        const clientMessage = { playbackControl };
        this.conn.send(JSON.stringify(clientMessage));
      }
      /**
       * Start the music stream.
       *
       * @experimental
       */
      play() {
        this.sendPlaybackControl(LiveMusicPlaybackControl.PLAY);
      }
      /**
       * Temporarily halt the music stream. Use `play` to resume from the current
       * position.
       *
       * @experimental
       */
      pause() {
        this.sendPlaybackControl(LiveMusicPlaybackControl.PAUSE);
      }
      /**
       * Stop the music stream and reset the state. Retains the current prompts
       * and config.
       *
       * @experimental
       */
      stop() {
        this.sendPlaybackControl(LiveMusicPlaybackControl.STOP);
      }
      /**
       * Resets the context of the music generation without stopping it.
       * Retains the current prompts and config.
       *
       * @experimental
       */
      resetContext() {
        this.sendPlaybackControl(LiveMusicPlaybackControl.RESET_CONTEXT);
      }
      /**
           Terminates the WebSocket connection.
      
           @experimental
         */
      close() {
        this.conn.close();
      }
    };
    __name(headersToMap$1, "headersToMap$1");
    __name(mapToHeaders$1, "mapToHeaders$1");
    FUNCTION_RESPONSE_REQUIRES_ID = "FunctionResponse request must have an `id` field from the response of a ToolCall.FunctionalCalls in Google AI.";
    __name(handleWebSocketMessage, "handleWebSocketMessage");
    Live = class {
      static {
        __name(this, "Live");
      }
      constructor(apiClient, auth, webSocketFactory) {
        this.apiClient = apiClient;
        this.auth = auth;
        this.webSocketFactory = webSocketFactory;
        this.music = new LiveMusic(this.apiClient, this.auth, this.webSocketFactory);
      }
      /**
           Establishes a connection to the specified model with the given
           configuration and returns a Session object representing that connection.
      
           @experimental Built-in MCP support is an experimental feature, may change in
           future versions.
      
           @remarks
      
           @param params - The parameters for establishing a connection to the model.
           @return A live session.
      
           @example
           ```ts
           let model: string;
           if (GOOGLE_GENAI_USE_VERTEXAI) {
             model = 'gemini-2.0-flash-live-preview-04-09';
           } else {
             model = 'gemini-live-2.5-flash-preview';
           }
           const session = await ai.live.connect({
             model: model,
             config: {
               responseModalities: [Modality.AUDIO],
             },
             callbacks: {
               onopen: () => {
                 console.log('Connected to the socket.');
               },
               onmessage: (e: MessageEvent) => {
                 console.log('Received message from the server: %s\n', debug(e.data));
               },
               onerror: (e: ErrorEvent) => {
                 console.log('Error occurred: %s\n', debug(e.error));
               },
               onclose: (e: CloseEvent) => {
                 console.log('Connection closed.');
               },
             },
           });
           ```
          */
      async connect(params) {
        var _a2, _b, _c, _d, _e, _f;
        if (params.config && params.config.httpOptions) {
          throw new Error("The Live module does not support httpOptions at request-level in LiveConnectConfig yet. Please use the client-level httpOptions configuration instead.");
        }
        const websocketBaseUrl = this.apiClient.getWebsocketBaseUrl();
        const apiVersion = this.apiClient.getApiVersion();
        let url;
        const clientHeaders = this.apiClient.getHeaders();
        if (params.config && params.config.tools && hasMcpToolUsage(params.config.tools)) {
          setMcpUsageHeader(clientHeaders);
        }
        const headers = mapToHeaders(clientHeaders);
        if (this.apiClient.isVertexAI()) {
          const project = this.apiClient.getProject();
          const location = this.apiClient.getLocation();
          const apiKey = this.apiClient.getApiKey();
          const hasStandardAuth = !!project && !!location || !!apiKey;
          if (this.apiClient.getCustomBaseUrl() && !hasStandardAuth) {
            url = websocketBaseUrl;
          } else {
            url = `${websocketBaseUrl}/ws/google.cloud.aiplatform.${apiVersion}.LlmBidiService/BidiGenerateContent`;
            await this.auth.addAuthHeaders(headers, url);
          }
        } else {
          const apiKey = this.apiClient.getApiKey();
          let method = "BidiGenerateContent";
          let keyName = "key";
          if (apiKey === null || apiKey === void 0 ? void 0 : apiKey.startsWith("auth_tokens/")) {
            console.warn("Warning: Ephemeral token support is experimental and may change in future versions.");
            if (apiVersion !== "v1alpha") {
              console.warn("Warning: The SDK's ephemeral token support is in v1alpha only. Please use const ai = new GoogleGenAI({apiKey: token.name, httpOptions: { apiVersion: 'v1alpha' }}); before session connection.");
            }
            method = "BidiGenerateContentConstrained";
            keyName = "access_token";
          }
          url = `${websocketBaseUrl}/ws/google.ai.generativelanguage.${apiVersion}.GenerativeService.${method}?${keyName}=${apiKey}`;
        }
        let onopenResolve = /* @__PURE__ */ __name(() => {
        }, "onopenResolve");
        const onopenPromise = new Promise((resolve) => {
          onopenResolve = resolve;
        });
        const callbacks = params.callbacks;
        const onopenAwaitedCallback = /* @__PURE__ */ __name(function() {
          var _a3;
          (_a3 = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onopen) === null || _a3 === void 0 ? void 0 : _a3.call(callbacks);
          onopenResolve({});
        }, "onopenAwaitedCallback");
        const apiClient = this.apiClient;
        const websocketCallbacks = {
          onopen: onopenAwaitedCallback,
          onmessage: /* @__PURE__ */ __name((event) => {
            void handleWebSocketMessage(apiClient, callbacks.onmessage, event);
          }, "onmessage"),
          onerror: (_a2 = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onerror) !== null && _a2 !== void 0 ? _a2 : function(e) {
          },
          onclose: (_b = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onclose) !== null && _b !== void 0 ? _b : function(e) {
          }
        };
        const conn = this.webSocketFactory.create(url, headersToMap(headers), websocketCallbacks);
        conn.connect();
        await onopenPromise;
        let transformedModel = tModel(this.apiClient, params.model);
        if (this.apiClient.isVertexAI() && transformedModel.startsWith("publishers/")) {
          const project = this.apiClient.getProject();
          const location = this.apiClient.getLocation();
          if (project && location) {
            transformedModel = `projects/${project}/locations/${location}/` + transformedModel;
          }
        }
        let clientMessage = {};
        if (this.apiClient.isVertexAI() && ((_c = params.config) === null || _c === void 0 ? void 0 : _c.responseModalities) === void 0) {
          if (params.config === void 0) {
            params.config = { responseModalities: [Modality.AUDIO] };
          } else {
            params.config.responseModalities = [Modality.AUDIO];
          }
        }
        if ((_d = params.config) === null || _d === void 0 ? void 0 : _d.generationConfig) {
          console.warn("Setting `LiveConnectConfig.generation_config` is deprecated, please set the fields on `LiveConnectConfig` directly. This will become an error in a future version (not before Q3 2025).");
        }
        const inputTools = (_f = (_e = params.config) === null || _e === void 0 ? void 0 : _e.tools) !== null && _f !== void 0 ? _f : [];
        const convertedTools = [];
        for (const tool of inputTools) {
          if (this.isCallableTool(tool)) {
            const callableTool = tool;
            convertedTools.push(await callableTool.tool());
          } else {
            convertedTools.push(tool);
          }
        }
        if (convertedTools.length > 0) {
          params.config.tools = convertedTools;
        }
        const liveConnectParameters = {
          model: transformedModel,
          config: params.config,
          callbacks: params.callbacks
        };
        if (this.apiClient.isVertexAI()) {
          clientMessage = liveConnectParametersToVertex(this.apiClient, liveConnectParameters);
        } else {
          clientMessage = liveConnectParametersToMldev(this.apiClient, liveConnectParameters);
        }
        delete clientMessage["config"];
        conn.send(JSON.stringify(clientMessage));
        return new Session(conn, this.apiClient);
      }
      // TODO: b/416041229 - Abstract this method to a common place.
      isCallableTool(tool) {
        return "callTool" in tool && typeof tool.callTool === "function";
      }
    };
    defaultLiveSendClientContentParamerters = {
      turnComplete: true
    };
    Session = class {
      static {
        __name(this, "Session");
      }
      constructor(conn, apiClient) {
        this.conn = conn;
        this.apiClient = apiClient;
      }
      tLiveClientContent(apiClient, params) {
        if (params.turns !== null && params.turns !== void 0) {
          let contents = [];
          try {
            contents = tContents(params.turns);
            if (!apiClient.isVertexAI()) {
              contents = contents.map((item) => contentToMldev$1(item));
            }
          } catch (_a2) {
            throw new Error(`Failed to parse client content "turns", type: '${typeof params.turns}'`);
          }
          return {
            clientContent: { turns: contents, turnComplete: params.turnComplete }
          };
        }
        return {
          clientContent: { turnComplete: params.turnComplete }
        };
      }
      tLiveClienttToolResponse(apiClient, params) {
        let functionResponses = [];
        if (params.functionResponses == null) {
          throw new Error("functionResponses is required.");
        }
        if (!Array.isArray(params.functionResponses)) {
          functionResponses = [params.functionResponses];
        } else {
          functionResponses = params.functionResponses;
        }
        if (functionResponses.length === 0) {
          throw new Error("functionResponses is required.");
        }
        for (const functionResponse of functionResponses) {
          if (typeof functionResponse !== "object" || functionResponse === null || !("name" in functionResponse) || !("response" in functionResponse)) {
            throw new Error(`Could not parse function response, type '${typeof functionResponse}'.`);
          }
          if (!apiClient.isVertexAI() && !("id" in functionResponse)) {
            throw new Error(FUNCTION_RESPONSE_REQUIRES_ID);
          }
        }
        const clientMessage = {
          toolResponse: { "functionResponses": functionResponses }
        };
        return clientMessage;
      }
      /**
          Send a message over the established connection.
      
          @param params - Contains two **optional** properties, `turns` and
              `turnComplete`.
      
            - `turns` will be converted to a `Content[]`
            - `turnComplete: true` [default] indicates that you are done sending
              content and expect a response. If `turnComplete: false`, the server
              will wait for additional messages before starting generation.
      
          @experimental
      
          @remarks
          There are two ways to send messages to the live API:
          `sendClientContent` and `sendRealtimeInput`.
      
          `sendClientContent` messages are added to the model context **in order**.
          Having a conversation using `sendClientContent` messages is roughly
          equivalent to using the `Chat.sendMessageStream`, except that the state of
          the `chat` history is stored on the API server instead of locally.
      
          Because of `sendClientContent`'s order guarantee, the model cannot respons
          as quickly to `sendClientContent` messages as to `sendRealtimeInput`
          messages. This makes the biggest difference when sending objects that have
          significant preprocessing time (typically images).
      
          The `sendClientContent` message sends a `Content[]`
          which has more options than the `Blob` sent by `sendRealtimeInput`.
      
          So the main use-cases for `sendClientContent` over `sendRealtimeInput` are:
      
          - Sending anything that can't be represented as a `Blob` (text,
          `sendClientContent({turns="Hello?"}`)).
          - Managing turns when not using audio input and voice activity detection.
            (`sendClientContent({turnComplete:true})` or the short form
          `sendClientContent()`)
          - Prefilling a conversation context
            ```
            sendClientContent({
                turns: [
                  Content({role:user, parts:...}),
                  Content({role:user, parts:...}),
                  ...
                ]
            })
            ```
          @experimental
         */
      sendClientContent(params) {
        params = Object.assign(Object.assign({}, defaultLiveSendClientContentParamerters), params);
        const clientMessage = this.tLiveClientContent(this.apiClient, params);
        this.conn.send(JSON.stringify(clientMessage));
      }
      /**
          Send a realtime message over the established connection.
      
          @param params - Contains one property, `media`.
      
            - `media` will be converted to a `Blob`
      
          @experimental
      
          @remarks
          Use `sendRealtimeInput` for realtime audio chunks and video frames (images).
      
          With `sendRealtimeInput` the api will respond to audio automatically
          based on voice activity detection (VAD).
      
          `sendRealtimeInput` is optimized for responsivness at the expense of
          deterministic ordering guarantees. Audio and video tokens are to the
          context when they become available.
      
          Note: The Call signature expects a `Blob` object, but only a subset
          of audio and image mimetypes are allowed.
         */
      sendRealtimeInput(params) {
        let clientMessage = {};
        if (this.apiClient.isVertexAI()) {
          clientMessage = {
            "realtimeInput": liveSendRealtimeInputParametersToVertex(params)
          };
        } else {
          clientMessage = {
            "realtimeInput": liveSendRealtimeInputParametersToMldev(params)
          };
        }
        this.conn.send(JSON.stringify(clientMessage));
      }
      /**
          Send a function response message over the established connection.
      
          @param params - Contains property `functionResponses`.
      
            - `functionResponses` will be converted to a `functionResponses[]`
      
          @remarks
          Use `sendFunctionResponse` to reply to `LiveServerToolCall` from the server.
      
          Use {@link types.LiveConnectConfig#tools} to configure the callable functions.
      
          @experimental
         */
      sendToolResponse(params) {
        if (params.functionResponses == null) {
          throw new Error("Tool response parameters are required.");
        }
        const clientMessage = this.tLiveClienttToolResponse(this.apiClient, params);
        this.conn.send(JSON.stringify(clientMessage));
      }
      /**
           Terminates the WebSocket connection.
      
           @experimental
      
           @example
           ```ts
           let model: string;
           if (GOOGLE_GENAI_USE_VERTEXAI) {
             model = 'gemini-2.0-flash-live-preview-04-09';
           } else {
             model = 'gemini-live-2.5-flash-preview';
           }
           const session = await ai.live.connect({
             model: model,
             config: {
               responseModalities: [Modality.AUDIO],
             }
           });
      
           session.close();
           ```
         */
      close() {
        this.conn.close();
      }
    };
    __name(headersToMap, "headersToMap");
    __name(mapToHeaders, "mapToHeaders");
    DEFAULT_MAX_REMOTE_CALLS = 10;
    __name(shouldDisableAfc, "shouldDisableAfc");
    __name(isCallableTool, "isCallableTool");
    __name(hasCallableTools, "hasCallableTools");
    __name(findAfcIncompatibleToolIndexes, "findAfcIncompatibleToolIndexes");
    __name(shouldAppendAfcHistory, "shouldAppendAfcHistory");
    Models = class extends BaseModule {
      static {
        __name(this, "Models");
      }
      constructor(apiClient) {
        super();
        this.apiClient = apiClient;
        this.embedContent = async (params) => {
          if (!this.apiClient.isVertexAI()) {
            return await this.embedContentInternal(params);
          }
          const isVertexEmbedContentModel = params.model.includes("gemini") && params.model !== "gemini-embedding-001" || params.model.includes("maas");
          if (isVertexEmbedContentModel) {
            const contents = tContents(params.contents);
            if (contents.length > 1) {
              throw new Error("The embedContent API for this model only supports one content at a time.");
            }
            const paramsPrivate = Object.assign(Object.assign({}, params), { content: contents[0], embeddingApiType: EmbeddingApiType.EMBED_CONTENT });
            return await this.embedContentInternal(paramsPrivate);
          } else {
            const paramsPrivate = Object.assign(Object.assign({}, params), { embeddingApiType: EmbeddingApiType.PREDICT });
            return await this.embedContentInternal(paramsPrivate);
          }
        };
        this.generateContent = async (params) => {
          var _a2, _b, _c, _d, _e;
          const transformedParams = await this.processParamsMaybeAddMcpUsage(params);
          this.maybeMoveToResponseJsonSchem(params);
          if (!hasCallableTools(params) || shouldDisableAfc(params.config)) {
            return await this.generateContentInternal(transformedParams);
          }
          const incompatibleToolIndexes = findAfcIncompatibleToolIndexes(params);
          if (incompatibleToolIndexes.length > 0) {
            const formattedIndexes = incompatibleToolIndexes.map((index) => `tools[${index}]`).join(", ");
            throw new Error(`Automatic function calling with CallableTools (or MCP objects) and basic FunctionDeclarations is not yet supported. Incompatible tools found at ${formattedIndexes}.`);
          }
          let response;
          let functionResponseContent;
          const automaticFunctionCallingHistory = tContents(transformedParams.contents);
          const maxRemoteCalls = (_c = (_b = (_a2 = transformedParams.config) === null || _a2 === void 0 ? void 0 : _a2.automaticFunctionCalling) === null || _b === void 0 ? void 0 : _b.maximumRemoteCalls) !== null && _c !== void 0 ? _c : DEFAULT_MAX_REMOTE_CALLS;
          let remoteCalls = 0;
          while (remoteCalls < maxRemoteCalls) {
            response = await this.generateContentInternal(transformedParams);
            if (!response.functionCalls || response.functionCalls.length === 0) {
              break;
            }
            const responseContent = response.candidates[0].content;
            const functionResponseParts = [];
            for (const tool of (_e = (_d = params.config) === null || _d === void 0 ? void 0 : _d.tools) !== null && _e !== void 0 ? _e : []) {
              if (isCallableTool(tool)) {
                const callableTool = tool;
                const parts = await callableTool.callTool(response.functionCalls);
                functionResponseParts.push(...parts);
              }
            }
            remoteCalls++;
            functionResponseContent = {
              role: "user",
              parts: functionResponseParts
            };
            transformedParams.contents = tContents(transformedParams.contents);
            transformedParams.contents.push(responseContent);
            transformedParams.contents.push(functionResponseContent);
            if (shouldAppendAfcHistory(transformedParams.config)) {
              automaticFunctionCallingHistory.push(responseContent);
              automaticFunctionCallingHistory.push(functionResponseContent);
            }
          }
          if (shouldAppendAfcHistory(transformedParams.config)) {
            response.automaticFunctionCallingHistory = automaticFunctionCallingHistory;
          }
          return response;
        };
        this.generateContentStream = async (params) => {
          var _a2, _b, _c, _d, _e;
          this.maybeMoveToResponseJsonSchem(params);
          if (shouldDisableAfc(params.config)) {
            const transformedParams = await this.processParamsMaybeAddMcpUsage(params);
            return await this.generateContentStreamInternal(transformedParams);
          }
          const incompatibleToolIndexes = findAfcIncompatibleToolIndexes(params);
          if (incompatibleToolIndexes.length > 0) {
            const formattedIndexes = incompatibleToolIndexes.map((index) => `tools[${index}]`).join(", ");
            throw new Error(`Incompatible tools found at ${formattedIndexes}. Automatic function calling with CallableTools (or MCP objects) and basic FunctionDeclarations" is not yet supported.`);
          }
          const streamFunctionCall = (_c = (_b = (_a2 = params === null || params === void 0 ? void 0 : params.config) === null || _a2 === void 0 ? void 0 : _a2.toolConfig) === null || _b === void 0 ? void 0 : _b.functionCallingConfig) === null || _c === void 0 ? void 0 : _c.streamFunctionCallArguments;
          const disableAfc = (_e = (_d = params === null || params === void 0 ? void 0 : params.config) === null || _d === void 0 ? void 0 : _d.automaticFunctionCalling) === null || _e === void 0 ? void 0 : _e.disable;
          if (streamFunctionCall && !disableAfc) {
            throw new Error("Running in streaming mode with 'streamFunctionCallArguments' enabled, this feature is not compatible with automatic function calling (AFC). Please set 'config.automaticFunctionCalling.disable' to true to disable AFC or leave 'config.toolConfig.functionCallingConfig.streamFunctionCallArguments' to be undefined or set to false to disable streaming function call arguments feature.");
          }
          return await this.processAfcStream(params);
        };
        this.generateImages = async (params) => {
          return await this.generateImagesInternal(params).then((apiResponse) => {
            var _a2;
            let positivePromptSafetyAttributes;
            const generatedImages = [];
            if (apiResponse === null || apiResponse === void 0 ? void 0 : apiResponse.generatedImages) {
              for (const generatedImage of apiResponse.generatedImages) {
                if (generatedImage && (generatedImage === null || generatedImage === void 0 ? void 0 : generatedImage.safetyAttributes) && ((_a2 = generatedImage === null || generatedImage === void 0 ? void 0 : generatedImage.safetyAttributes) === null || _a2 === void 0 ? void 0 : _a2.contentType) === "Positive Prompt") {
                  positivePromptSafetyAttributes = generatedImage === null || generatedImage === void 0 ? void 0 : generatedImage.safetyAttributes;
                } else {
                  generatedImages.push(generatedImage);
                }
              }
            }
            let response;
            if (positivePromptSafetyAttributes) {
              response = {
                generatedImages,
                positivePromptSafetyAttributes,
                sdkHttpResponse: apiResponse.sdkHttpResponse
              };
            } else {
              response = {
                generatedImages,
                sdkHttpResponse: apiResponse.sdkHttpResponse
              };
            }
            return response;
          });
        };
        this.list = async (params) => {
          var _a2;
          const defaultConfig = {
            queryBase: true
          };
          const actualConfig = Object.assign(Object.assign({}, defaultConfig), params === null || params === void 0 ? void 0 : params.config);
          const actualParams = {
            config: actualConfig
          };
          if (this.apiClient.isVertexAI()) {
            if (!actualParams.config.queryBase) {
              if ((_a2 = actualParams.config) === null || _a2 === void 0 ? void 0 : _a2.filter) {
                throw new Error("Filtering tuned models list for Vertex AI is not currently supported");
              } else {
                actualParams.config.filter = "labels.tune-type:*";
              }
            }
          }
          return new Pager(PagedItem.PAGED_ITEM_MODELS, (x) => this.listInternal(x), await this.listInternal(actualParams), actualParams);
        };
        this.editImage = async (params) => {
          const paramsInternal = {
            model: params.model,
            prompt: params.prompt,
            referenceImages: [],
            config: params.config
          };
          if (params.referenceImages) {
            if (params.referenceImages) {
              paramsInternal.referenceImages = params.referenceImages.map((img) => img.toReferenceImageAPI());
            }
          }
          return await this.editImageInternal(paramsInternal);
        };
        this.upscaleImage = async (params) => {
          let apiConfig = {
            numberOfImages: 1,
            mode: "upscale"
          };
          if (params.config) {
            apiConfig = Object.assign(Object.assign({}, apiConfig), params.config);
          }
          const apiParams = {
            model: params.model,
            image: params.image,
            upscaleFactor: params.upscaleFactor,
            config: apiConfig
          };
          return await this.upscaleImageInternal(apiParams);
        };
        this.generateVideos = async (params) => {
          var _a2, _b, _c, _d, _e, _f;
          if ((params.prompt || params.image || params.video) && params.source) {
            throw new Error("Source and prompt/image/video are mutually exclusive. Please only use source.");
          }
          if (!this.apiClient.isVertexAI()) {
            if (((_a2 = params.video) === null || _a2 === void 0 ? void 0 : _a2.uri) && ((_b = params.video) === null || _b === void 0 ? void 0 : _b.videoBytes)) {
              params.video = {
                uri: params.video.uri,
                mimeType: params.video.mimeType
              };
            } else if (((_d = (_c = params.source) === null || _c === void 0 ? void 0 : _c.video) === null || _d === void 0 ? void 0 : _d.uri) && ((_f = (_e = params.source) === null || _e === void 0 ? void 0 : _e.video) === null || _f === void 0 ? void 0 : _f.videoBytes)) {
              params.source.video = {
                uri: params.source.video.uri,
                mimeType: params.source.video.mimeType
              };
            }
          }
          return await this.generateVideosInternal(params);
        };
      }
      /**
       * This logic is needed for GenerateContentConfig only.
       * Previously we made GenerateContentConfig.responseSchema field to accept
       * unknown. Since v1.9.0, we switch to use backend JSON schema support.
       * To maintain backward compatibility, we move the data that was treated as
       * JSON schema from the responseSchema field to the responseJsonSchema field.
       */
      maybeMoveToResponseJsonSchem(params) {
        if (params.config && params.config.responseSchema) {
          if (!params.config.responseJsonSchema) {
            if (Object.keys(params.config.responseSchema).includes("$schema")) {
              params.config.responseJsonSchema = params.config.responseSchema;
              delete params.config.responseSchema;
            }
          }
        }
        return;
      }
      /**
       * Transforms the CallableTools in the parameters to be simply Tools, it
       * copies the params into a new object and replaces the tools, it does not
       * modify the original params. Also sets the MCP usage header if there are
       * MCP tools in the parameters.
       */
      async processParamsMaybeAddMcpUsage(params) {
        var _a2, _b, _c;
        const tools = (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.tools;
        if (!tools) {
          return params;
        }
        const transformedTools = await Promise.all(tools.map(async (tool) => {
          if (isCallableTool(tool)) {
            const callableTool = tool;
            return await callableTool.tool();
          }
          return tool;
        }));
        const newParams = {
          model: params.model,
          contents: params.contents,
          config: Object.assign(Object.assign({}, params.config), { tools: transformedTools })
        };
        newParams.config.tools = transformedTools;
        if (params.config && params.config.tools && hasMcpToolUsage(params.config.tools)) {
          const headers = (_c = (_b = params.config.httpOptions) === null || _b === void 0 ? void 0 : _b.headers) !== null && _c !== void 0 ? _c : {};
          let newHeaders = Object.assign({}, headers);
          if (Object.keys(newHeaders).length === 0) {
            newHeaders = this.apiClient.getDefaultHeaders();
          }
          setMcpUsageHeader(newHeaders);
          newParams.config.httpOptions = Object.assign(Object.assign({}, params.config.httpOptions), { headers: newHeaders });
        }
        return newParams;
      }
      async initAfcToolsMap(params) {
        var _a2, _b, _c;
        const afcTools = /* @__PURE__ */ new Map();
        for (const tool of (_b = (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.tools) !== null && _b !== void 0 ? _b : []) {
          if (isCallableTool(tool)) {
            const callableTool = tool;
            const toolDeclaration = await callableTool.tool();
            for (const declaration of (_c = toolDeclaration.functionDeclarations) !== null && _c !== void 0 ? _c : []) {
              if (!declaration.name) {
                throw new Error("Function declaration name is required.");
              }
              if (afcTools.has(declaration.name)) {
                throw new Error(`Duplicate tool declaration name: ${declaration.name}`);
              }
              afcTools.set(declaration.name, callableTool);
            }
          }
        }
        return afcTools;
      }
      async processAfcStream(params) {
        var _a2, _b, _c;
        const maxRemoteCalls = (_c = (_b = (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.automaticFunctionCalling) === null || _b === void 0 ? void 0 : _b.maximumRemoteCalls) !== null && _c !== void 0 ? _c : DEFAULT_MAX_REMOTE_CALLS;
        let wereFunctionsCalled = false;
        let remoteCallCount = 0;
        const afcToolsMap = await this.initAfcToolsMap(params);
        return (function(models, afcTools, params2) {
          return __asyncGenerator(this, arguments, function* () {
            var _a3, e_1, _b2, _c2;
            var _d, _e;
            while (remoteCallCount < maxRemoteCalls) {
              if (wereFunctionsCalled) {
                remoteCallCount++;
                wereFunctionsCalled = false;
              }
              const transformedParams = yield __await(models.processParamsMaybeAddMcpUsage(params2));
              const response = yield __await(models.generateContentStreamInternal(transformedParams));
              const functionResponses = [];
              const responseContents = [];
              try {
                for (var _f = true, response_1 = (e_1 = void 0, __asyncValues(response)), response_1_1; response_1_1 = yield __await(response_1.next()), _a3 = response_1_1.done, !_a3; _f = true) {
                  _c2 = response_1_1.value;
                  _f = false;
                  const chunk = _c2;
                  yield yield __await(chunk);
                  if (chunk.candidates && ((_d = chunk.candidates[0]) === null || _d === void 0 ? void 0 : _d.content)) {
                    responseContents.push(chunk.candidates[0].content);
                    for (const part of (_e = chunk.candidates[0].content.parts) !== null && _e !== void 0 ? _e : []) {
                      if (remoteCallCount < maxRemoteCalls && part.functionCall) {
                        if (!part.functionCall.name) {
                          throw new Error("Function call name was not returned by the model.");
                        }
                        if (!afcTools.has(part.functionCall.name)) {
                          throw new Error(`Automatic function calling was requested, but not all the tools the model used implement the CallableTool interface. Available tools: ${afcTools.keys()}, mising tool: ${part.functionCall.name}`);
                        } else {
                          const responseParts = yield __await(afcTools.get(part.functionCall.name).callTool([part.functionCall]));
                          functionResponses.push(...responseParts);
                        }
                      }
                    }
                  }
                }
              } catch (e_1_1) {
                e_1 = { error: e_1_1 };
              } finally {
                try {
                  if (!_f && !_a3 && (_b2 = response_1.return)) yield __await(_b2.call(response_1));
                } finally {
                  if (e_1) throw e_1.error;
                }
              }
              if (functionResponses.length > 0) {
                wereFunctionsCalled = true;
                const typedResponseChunk = new GenerateContentResponse();
                typedResponseChunk.candidates = [
                  {
                    content: {
                      role: "user",
                      parts: functionResponses
                    }
                  }
                ];
                yield yield __await(typedResponseChunk);
                const newContents = [];
                newContents.push(...responseContents);
                newContents.push({
                  role: "user",
                  parts: functionResponses
                });
                const updatedContents = tContents(params2.contents).concat(newContents);
                params2.contents = updatedContents;
              } else {
                break;
              }
            }
          });
        })(this, afcToolsMap, params);
      }
      async generateContentInternal(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = generateContentParametersToVertex(this.apiClient, params);
          path2 = formatMap("{model}:generateContent", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = generateContentResponseFromVertex(apiResponse);
            const typedResp = new GenerateContentResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          const body = generateContentParametersToMldev(this.apiClient, params);
          path2 = formatMap("{model}:generateContent", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = generateContentResponseFromMldev(apiResponse);
            const typedResp = new GenerateContentResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
      async generateContentStreamInternal(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = generateContentParametersToVertex(this.apiClient, params);
          path2 = formatMap("{model}:streamGenerateContent?alt=sse", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          const apiClient = this.apiClient;
          response = apiClient.requestStream({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          });
          return response.then(function(apiResponse) {
            return __asyncGenerator(this, arguments, function* () {
              var _a3, e_2, _b2, _c2;
              try {
                for (var _d2 = true, apiResponse_1 = __asyncValues(apiResponse), apiResponse_1_1; apiResponse_1_1 = yield __await(apiResponse_1.next()), _a3 = apiResponse_1_1.done, !_a3; _d2 = true) {
                  _c2 = apiResponse_1_1.value;
                  _d2 = false;
                  const chunk = _c2;
                  const resp = generateContentResponseFromVertex(yield __await(chunk.json()), params);
                  resp["sdkHttpResponse"] = {
                    headers: chunk.headers
                  };
                  const typedResp = new GenerateContentResponse();
                  Object.assign(typedResp, resp);
                  yield yield __await(typedResp);
                }
              } catch (e_2_1) {
                e_2 = { error: e_2_1 };
              } finally {
                try {
                  if (!_d2 && !_a3 && (_b2 = apiResponse_1.return)) yield __await(_b2.call(apiResponse_1));
                } finally {
                  if (e_2) throw e_2.error;
                }
              }
            });
          });
        } else {
          const body = generateContentParametersToMldev(this.apiClient, params);
          path2 = formatMap("{model}:streamGenerateContent?alt=sse", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          const apiClient = this.apiClient;
          response = apiClient.requestStream({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          });
          return response.then(function(apiResponse) {
            return __asyncGenerator(this, arguments, function* () {
              var _a3, e_3, _b2, _c2;
              try {
                for (var _d2 = true, apiResponse_2 = __asyncValues(apiResponse), apiResponse_2_1; apiResponse_2_1 = yield __await(apiResponse_2.next()), _a3 = apiResponse_2_1.done, !_a3; _d2 = true) {
                  _c2 = apiResponse_2_1.value;
                  _d2 = false;
                  const chunk = _c2;
                  const resp = generateContentResponseFromMldev(yield __await(chunk.json()), params);
                  resp["sdkHttpResponse"] = {
                    headers: chunk.headers
                  };
                  const typedResp = new GenerateContentResponse();
                  Object.assign(typedResp, resp);
                  yield yield __await(typedResp);
                }
              } catch (e_3_1) {
                e_3 = { error: e_3_1 };
              } finally {
                try {
                  if (!_d2 && !_a3 && (_b2 = apiResponse_2.return)) yield __await(_b2.call(apiResponse_2));
                } finally {
                  if (e_3) throw e_3.error;
                }
              }
            });
          });
        }
      }
      /**
       * Calculates embeddings for the given contents. Only text is supported.
       *
       * @param params - The parameters for embedding contents.
       * @return The response from the API.
       *
       * @example
       * ```ts
       * const response = await ai.models.embedContent({
       *  model: 'text-embedding-004',
       *  contents: [
       *    'What is your name?',
       *    'What is your favorite color?',
       *  ],
       *  config: {
       *    outputDimensionality: 64,
       *  },
       * });
       * console.log(response);
       * ```
       */
      async embedContentInternal(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = embedContentParametersPrivateToVertex(this.apiClient, params, params);
          const endpointUrl = tIsVertexEmbedContentModel(params.model) ? "{model}:embedContent" : "{model}:predict";
          path2 = formatMap(endpointUrl, body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = embedContentResponseFromVertex(apiResponse, params);
            const typedResp = new EmbedContentResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          const body = embedContentParametersPrivateToMldev(this.apiClient, params);
          path2 = formatMap("{model}:batchEmbedContents", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = embedContentResponseFromMldev(apiResponse);
            const typedResp = new EmbedContentResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
      /**
       * Private method for generating images.
       */
      async generateImagesInternal(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = generateImagesParametersToVertex(this.apiClient, params);
          path2 = formatMap("{model}:predict", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = generateImagesResponseFromVertex(apiResponse);
            const typedResp = new GenerateImagesResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          const body = generateImagesParametersToMldev(this.apiClient, params);
          path2 = formatMap("{model}:predict", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = generateImagesResponseFromMldev(apiResponse);
            const typedResp = new GenerateImagesResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
      /**
       * Private method for editing an image.
       */
      async editImageInternal(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = editImageParametersInternalToVertex(this.apiClient, params);
          path2 = formatMap("{model}:predict", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = editImageResponseFromVertex(apiResponse);
            const typedResp = new EditImageResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          throw new Error("This method is only supported by the Vertex AI.");
        }
      }
      /**
       * Private method for upscaling an image.
       */
      async upscaleImageInternal(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = upscaleImageAPIParametersInternalToVertex(this.apiClient, params);
          path2 = formatMap("{model}:predict", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = upscaleImageResponseFromVertex(apiResponse);
            const typedResp = new UpscaleImageResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          throw new Error("This method is only supported by the Vertex AI.");
        }
      }
      /**
       * Recontextualizes an image.
       *
       * There are two types of recontextualization currently supported:
       * 1) Imagen Product Recontext - Generate images of products in new scenes
       *    and contexts.
       * 2) Virtual Try-On: Generate images of persons modeling fashion products.
       *
       * @param params - The parameters for recontextualizing an image.
       * @return The response from the API.
       *
       * @example
       * ```ts
       * const response1 = await ai.models.recontextImage({
       *  model: 'imagen-product-recontext-preview-06-30',
       *  source: {
       *    prompt: 'In a modern kitchen setting.',
       *    productImages: [productImage],
       *  },
       *  config: {
       *    numberOfImages: 1,
       *  },
       * });
       * console.log(response1?.generatedImages?.[0]?.image?.imageBytes);
       *
       * const response2 = await ai.models.recontextImage({
       *  model: 'virtual-try-on-001',
       *  source: {
       *    personImage: personImage,
       *    productImages: [productImage],
       *  },
       *  config: {
       *    numberOfImages: 1,
       *  },
       * });
       * console.log(response2?.generatedImages?.[0]?.image?.imageBytes);
       * ```
       */
      async recontextImage(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = recontextImageParametersToVertex(this.apiClient, params);
          path2 = formatMap("{model}:predict", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = recontextImageResponseFromVertex(apiResponse);
            const typedResp = new RecontextImageResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          throw new Error("This method is only supported by the Vertex AI.");
        }
      }
      /**
       * Segments an image, creating a mask of a specified area.
       *
       * @param params - The parameters for segmenting an image.
       * @return The response from the API.
       *
       * @example
       * ```ts
       * const response = await ai.models.segmentImage({
       *  model: 'image-segmentation-001',
       *  source: {
       *    image: image,
       *  },
       *  config: {
       *    mode: 'foreground',
       *  },
       * });
       * console.log(response?.generatedMasks?.[0]?.mask?.imageBytes);
       * ```
       */
      async segmentImage(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = segmentImageParametersToVertex(this.apiClient, params);
          path2 = formatMap("{model}:predict", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = segmentImageResponseFromVertex(apiResponse);
            const typedResp = new SegmentImageResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          throw new Error("This method is only supported by the Vertex AI.");
        }
      }
      /**
       * Fetches information about a model by name.
       *
       * @example
       * ```ts
       * const modelInfo = await ai.models.get({model: 'gemini-2.0-flash'});
       * ```
       */
      async get(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = getModelParametersToVertex(this.apiClient, params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = modelFromVertex(apiResponse);
            return resp;
          });
        } else {
          const body = getModelParametersToMldev(this.apiClient, params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = modelFromMldev(apiResponse);
            return resp;
          });
        }
      }
      async listInternal(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = listModelsParametersToVertex(this.apiClient, params);
          path2 = formatMap("{models_url}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = listModelsResponseFromVertex(apiResponse);
            const typedResp = new ListModelsResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          const body = listModelsParametersToMldev(this.apiClient, params);
          path2 = formatMap("{models_url}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = listModelsResponseFromMldev(apiResponse);
            const typedResp = new ListModelsResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
      /**
       * Updates a tuned model by its name.
       *
       * @param params - The parameters for updating the model.
       * @return The response from the API.
       *
       * @example
       * ```ts
       * const response = await ai.models.update({
       *   model: 'tuned-model-name',
       *   config: {
       *     displayName: 'New display name',
       *     description: 'New description',
       *   },
       * });
       * ```
       */
      async update(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = updateModelParametersToVertex(this.apiClient, params);
          path2 = formatMap("{model}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "PATCH",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = modelFromVertex(apiResponse);
            return resp;
          });
        } else {
          const body = updateModelParametersToMldev(this.apiClient, params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "PATCH",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = modelFromMldev(apiResponse);
            return resp;
          });
        }
      }
      /**
       * Deletes a tuned model by its name.
       *
       * @param params - The parameters for deleting the model.
       * @return The response from the API.
       *
       * @example
       * ```ts
       * const response = await ai.models.delete({model: 'tuned-model-name'});
       * ```
       */
      async delete(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = deleteModelParametersToVertex(this.apiClient, params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "DELETE",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = deleteModelResponseFromVertex(apiResponse);
            const typedResp = new DeleteModelResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          const body = deleteModelParametersToMldev(this.apiClient, params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "DELETE",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = deleteModelResponseFromMldev(apiResponse);
            const typedResp = new DeleteModelResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
      /**
       * Counts the number of tokens in the given contents. Multimodal input is
       * supported for Gemini models.
       *
       * @param params - The parameters for counting tokens.
       * @return The response from the API.
       *
       * @example
       * ```ts
       * const response = await ai.models.countTokens({
       *  model: 'gemini-2.0-flash',
       *  contents: 'The quick brown fox jumps over the lazy dog.'
       * });
       * console.log(response);
       * ```
       */
      async countTokens(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = countTokensParametersToVertex(this.apiClient, params);
          path2 = formatMap("{model}:countTokens", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = countTokensResponseFromVertex(apiResponse);
            const typedResp = new CountTokensResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          const body = countTokensParametersToMldev(this.apiClient, params);
          path2 = formatMap("{model}:countTokens", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = countTokensResponseFromMldev(apiResponse);
            const typedResp = new CountTokensResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
      /**
       * Given a list of contents, returns a corresponding TokensInfo containing
       * the list of tokens and list of token ids.
       *
       * This method is not supported by the Gemini Developer API.
       *
       * @param params - The parameters for computing tokens.
       * @return The response from the API.
       *
       * @example
       * ```ts
       * const response = await ai.models.computeTokens({
       *  model: 'gemini-2.0-flash',
       *  contents: 'What is your name?'
       * });
       * console.log(response);
       * ```
       */
      async computeTokens(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = computeTokensParametersToVertex(this.apiClient, params);
          path2 = formatMap("{model}:computeTokens", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = computeTokensResponseFromVertex(apiResponse);
            const typedResp = new ComputeTokensResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          throw new Error("This method is only supported by the Vertex AI.");
        }
      }
      /**
       * Private method for generating videos.
       */
      async generateVideosInternal(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = generateVideosParametersToVertex(this.apiClient, params);
          path2 = formatMap("{model}:predictLongRunning", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = generateVideosOperationFromVertex(apiResponse);
            const typedResp = new GenerateVideosOperation();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          const body = generateVideosParametersToMldev(this.apiClient, params);
          path2 = formatMap("{model}:predictLongRunning", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = generateVideosOperationFromMldev(apiResponse);
            const typedResp = new GenerateVideosOperation();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
    };
    Operations = class extends BaseModule {
      static {
        __name(this, "Operations");
      }
      constructor(apiClient) {
        super();
        this.apiClient = apiClient;
      }
      /**
       * Gets the status of a long-running operation.
       *
       * @param parameters The parameters for the get operation request.
       * @return The updated Operation object, with the latest status or result.
       */
      async getVideosOperation(parameters) {
        const operation = parameters.operation;
        const config = parameters.config;
        if (operation.name === void 0 || operation.name === "") {
          throw new Error("Operation name is required.");
        }
        if (this.apiClient.isVertexAI()) {
          const resourceName2 = operation.name.split("/operations/")[0];
          let httpOptions = void 0;
          if (config && "httpOptions" in config) {
            httpOptions = config.httpOptions;
          }
          const rawOperation = await this.fetchPredictVideosOperationInternal({
            operationName: operation.name,
            resourceName: resourceName2,
            config: { httpOptions }
          });
          return operation._fromAPIResponse({
            apiResponse: rawOperation,
            _isVertexAI: true
          });
        } else {
          const rawOperation = await this.getVideosOperationInternal({
            operationName: operation.name,
            config
          });
          return operation._fromAPIResponse({
            apiResponse: rawOperation,
            _isVertexAI: false
          });
        }
      }
      /**
       * Gets the status of a long-running operation.
       *
       * @param parameters The parameters for the get operation request.
       * @return The updated Operation object, with the latest status or result.
       */
      async get(parameters) {
        const operation = parameters.operation;
        const config = parameters.config;
        if (operation.name === void 0 || operation.name === "") {
          throw new Error("Operation name is required.");
        }
        if (this.apiClient.isVertexAI()) {
          const resourceName2 = operation.name.split("/operations/")[0];
          let httpOptions = void 0;
          if (config && "httpOptions" in config) {
            httpOptions = config.httpOptions;
          }
          const rawOperation = await this.fetchPredictVideosOperationInternal({
            operationName: operation.name,
            resourceName: resourceName2,
            config: { httpOptions }
          });
          return operation._fromAPIResponse({
            apiResponse: rawOperation,
            _isVertexAI: true
          });
        } else {
          const rawOperation = await this.getVideosOperationInternal({
            operationName: operation.name,
            config
          });
          return operation._fromAPIResponse({
            apiResponse: rawOperation,
            _isVertexAI: false
          });
        }
      }
      async getVideosOperationInternal(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = getOperationParametersToVertex(params);
          path2 = formatMap("{operationName}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response;
        } else {
          const body = getOperationParametersToMldev(params);
          path2 = formatMap("{operationName}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response;
        }
      }
      async fetchPredictVideosOperationInternal(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = fetchPredictOperationParametersToVertex(params);
          path2 = formatMap("{resourceName}:fetchPredictOperation", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response;
        } else {
          throw new Error("This method is only supported by the Vertex AI.");
        }
      }
    };
    __name(audioTranscriptionConfigToMldev, "audioTranscriptionConfigToMldev");
    __name(authConfigToMldev, "authConfigToMldev");
    __name(blobToMldev, "blobToMldev");
    __name(contentToMldev, "contentToMldev");
    __name(createAuthTokenConfigToMldev, "createAuthTokenConfigToMldev");
    __name(createAuthTokenParametersToMldev, "createAuthTokenParametersToMldev");
    __name(fileDataToMldev, "fileDataToMldev");
    __name(functionCallToMldev, "functionCallToMldev");
    __name(googleMapsToMldev, "googleMapsToMldev");
    __name(googleSearchToMldev, "googleSearchToMldev");
    __name(liveConnectConfigToMldev, "liveConnectConfigToMldev");
    __name(liveConnectConstraintsToMldev, "liveConnectConstraintsToMldev");
    __name(partToMldev, "partToMldev");
    __name(sessionResumptionConfigToMldev, "sessionResumptionConfigToMldev");
    __name(toolToMldev, "toolToMldev");
    __name(getFieldMasks, "getFieldMasks");
    __name(convertBidiSetupToTokenSetup, "convertBidiSetupToTokenSetup");
    Tokens = class extends BaseModule {
      static {
        __name(this, "Tokens");
      }
      constructor(apiClient) {
        super();
        this.apiClient = apiClient;
      }
      /**
       * Creates an ephemeral auth token resource.
       *
       * @experimental
       *
       * @remarks
       * Ephemeral auth tokens is only supported in the Gemini Developer API.
       * It can be used for the session connection to the Live constrained API.
       * Support in v1alpha only.
       *
       * @param params - The parameters for the create request.
       * @return The created auth token.
       *
       * @example
       * ```ts
       * const ai = new GoogleGenAI({
       *     apiKey: token.name,
       *     httpOptions: { apiVersion: 'v1alpha' }  // Support in v1alpha only.
       * });
       *
       * // Case 1: If LiveEphemeralParameters is unset, unlock LiveConnectConfig
       * // when using the token in Live API sessions. Each session connection can
       * // use a different configuration.
       * const config: CreateAuthTokenConfig = {
       *     uses: 3,
       *     expireTime: '2025-05-01T00:00:00Z',
       * }
       * const token = await ai.tokens.create(config);
       *
       * // Case 2: If LiveEphemeralParameters is set, lock all fields in
       * // LiveConnectConfig when using the token in Live API sessions. For
       * // example, changing `outputAudioTranscription` in the Live API
       * // connection will be ignored by the API.
       * const config: CreateAuthTokenConfig =
       *     uses: 3,
       *     expireTime: '2025-05-01T00:00:00Z',
       *     LiveEphemeralParameters: {
       *        model: 'gemini-2.0-flash-001',
       *        config: {
       *           'responseModalities': ['AUDIO'],
       *           'systemInstruction': 'Always answer in English.',
       *        }
       *     }
       * }
       * const token = await ai.tokens.create(config);
       *
       * // Case 3: If LiveEphemeralParameters is set and lockAdditionalFields is
       * // set, lock LiveConnectConfig with set and additional fields (e.g.
       * // responseModalities, systemInstruction, temperature in this example) when
       * // using the token in Live API sessions.
       * const config: CreateAuthTokenConfig =
       *     uses: 3,
       *     expireTime: '2025-05-01T00:00:00Z',
       *     LiveEphemeralParameters: {
       *        model: 'gemini-2.0-flash-001',
       *        config: {
       *           'responseModalities': ['AUDIO'],
       *           'systemInstruction': 'Always answer in English.',
       *        }
       *     },
       *     lockAdditionalFields: ['temperature'],
       * }
       * const token = await ai.tokens.create(config);
       *
       * // Case 4: If LiveEphemeralParameters is set and lockAdditionalFields is
       * // empty array, lock LiveConnectConfig with set fields (e.g.
       * // responseModalities, systemInstruction in this example) when using the
       * // token in Live API sessions.
       * const config: CreateAuthTokenConfig =
       *     uses: 3,
       *     expireTime: '2025-05-01T00:00:00Z',
       *     LiveEphemeralParameters: {
       *        model: 'gemini-2.0-flash-001',
       *        config: {
       *           'responseModalities': ['AUDIO'],
       *           'systemInstruction': 'Always answer in English.',
       *        }
       *     },
       *     lockAdditionalFields: [],
       * }
       * const token = await ai.tokens.create(config);
       * ```
       */
      async create(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("The client.tokens.create method is only supported by the Gemini Developer API.");
        } else {
          const body = createAuthTokenParametersToMldev(this.apiClient, params);
          path2 = formatMap("auth_tokens", body["_url"]);
          queryParams = body["_query"];
          delete body["config"];
          delete body["_url"];
          delete body["_query"];
          const transformedBody = convertBidiSetupToTokenSetup(body, params.config);
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(transformedBody),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((resp) => {
            return resp;
          });
        }
      }
    };
    __name(deleteDocumentConfigToMldev, "deleteDocumentConfigToMldev");
    __name(deleteDocumentParametersToMldev, "deleteDocumentParametersToMldev");
    __name(getDocumentParametersToMldev, "getDocumentParametersToMldev");
    __name(listDocumentsConfigToMldev, "listDocumentsConfigToMldev");
    __name(listDocumentsParametersToMldev, "listDocumentsParametersToMldev");
    __name(listDocumentsResponseFromMldev, "listDocumentsResponseFromMldev");
    Documents = class extends BaseModule {
      static {
        __name(this, "Documents");
      }
      constructor(apiClient) {
        super();
        this.apiClient = apiClient;
        this.list = async (params) => {
          return new Pager(PagedItem.PAGED_ITEM_DOCUMENTS, (x) => this.listInternal({ parent: params.parent, config: x.config }), await this.listInternal(params), params);
        };
      }
      /**
       * Gets a Document.
       *
       * @param params - The parameters for getting a document.
       * @return Document.
       */
      async get(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("This method is only supported by the Gemini Developer API.");
        } else {
          const body = getDocumentParametersToMldev(params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((resp) => {
            return resp;
          });
        }
      }
      /**
       * Deletes a Document.
       *
       * @param params - The parameters for deleting a document.
       */
      async delete(params) {
        var _a2, _b;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("This method is only supported by the Gemini Developer API.");
        } else {
          const body = deleteDocumentParametersToMldev(params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          await this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "DELETE",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          });
        }
      }
      async listInternal(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("This method is only supported by the Gemini Developer API.");
        } else {
          const body = listDocumentsParametersToMldev(params);
          path2 = formatMap("{parent}/documents", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = listDocumentsResponseFromMldev(apiResponse);
            const typedResp = new ListDocumentsResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
    };
    FileSearchStores = class extends BaseModule {
      static {
        __name(this, "FileSearchStores");
      }
      constructor(apiClient, documents = new Documents(apiClient)) {
        super();
        this.apiClient = apiClient;
        this.documents = documents;
        this.list = async (params = {}) => {
          return new Pager(PagedItem.PAGED_ITEM_FILE_SEARCH_STORES, (x) => this.listInternal(x), await this.listInternal(params), params);
        };
      }
      /**
       * Uploads a file asynchronously to a given File Search Store.
       * This method is not available in Vertex AI.
       * Supported upload sources:
       * - Node.js: File path (string) or Blob object.
       * - Browser: Blob object (e.g., File).
       *
       * @remarks
       * The `mimeType` can be specified in the `config` parameter. If omitted:
       *  - For file path (string) inputs, the `mimeType` will be inferred from the
       *     file extension.
       *  - For Blob object inputs, the `mimeType` will be set to the Blob's `type`
       *     property.
       *
       * This section can contain multiple paragraphs and code examples.
       *
       * @param params - Optional parameters specified in the
       *        `types.UploadToFileSearchStoreParameters` interface.
       *         @see {@link types.UploadToFileSearchStoreParameters#config} for the optional
       *         config in the parameters.
       * @return A promise that resolves to a long running operation.
       * @throws An error if called on a Vertex AI client.
       * @throws An error if the `mimeType` is not provided and can not be inferred,
       * the `mimeType` can be provided in the `params.config` parameter.
       * @throws An error occurs if a suitable upload location cannot be established.
       *
       * @example
       * The following code uploads a file to a given file search store.
       *
       * ```ts
       * const operation = await ai.fileSearchStores.upload({fileSearchStoreName: 'fileSearchStores/foo-bar', file: 'file.txt', config: {
       *   mimeType: 'text/plain',
       * }});
       * console.log(operation.name);
       * ```
       */
      async uploadToFileSearchStore(params) {
        if (this.apiClient.isVertexAI()) {
          throw new Error("Vertex AI does not support uploading files to a file search store.");
        }
        return this.apiClient.uploadFileToFileSearchStore(params.fileSearchStoreName, params.file, params.config);
      }
      /**
       * Creates a File Search Store.
       *
       * @param params - The parameters for creating a File Search Store.
       * @return FileSearchStore.
       */
      async create(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("This method is only supported by the Gemini Developer API.");
        } else {
          const body = createFileSearchStoreParametersToMldev(params);
          path2 = formatMap("fileSearchStores", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((resp) => {
            return resp;
          });
        }
      }
      /**
       * Gets a File Search Store.
       *
       * @param params - The parameters for getting a File Search Store.
       * @return FileSearchStore.
       */
      async get(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("This method is only supported by the Gemini Developer API.");
        } else {
          const body = getFileSearchStoreParametersToMldev(params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((resp) => {
            return resp;
          });
        }
      }
      /**
       * Deletes a File Search Store.
       *
       * @param params - The parameters for deleting a File Search Store.
       */
      async delete(params) {
        var _a2, _b;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("This method is only supported by the Gemini Developer API.");
        } else {
          const body = deleteFileSearchStoreParametersToMldev(params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          await this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "DELETE",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          });
        }
      }
      async listInternal(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("This method is only supported by the Gemini Developer API.");
        } else {
          const body = listFileSearchStoresParametersToMldev(params);
          path2 = formatMap("fileSearchStores", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = listFileSearchStoresResponseFromMldev(apiResponse);
            const typedResp = new ListFileSearchStoresResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
      async uploadToFileSearchStoreInternal(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("This method is only supported by the Gemini Developer API.");
        } else {
          const body = uploadToFileSearchStoreParametersToMldev(params);
          path2 = formatMap("upload/v1beta/{file_search_store_name}:uploadToFileSearchStore", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = uploadToFileSearchStoreResumableResponseFromMldev(apiResponse);
            const typedResp = new UploadToFileSearchStoreResumableResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
      /**
       * Imports a File from File Service to a FileSearchStore.
       *
       * This is a long-running operation, see aip.dev/151
       *
       * @param params - The parameters for importing a file to a file search store.
       * @return ImportFileOperation.
       */
      async importFile(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("This method is only supported by the Gemini Developer API.");
        } else {
          const body = importFileParametersToMldev(params);
          path2 = formatMap("{file_search_store_name}:importFile", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json();
          });
          return response.then((apiResponse) => {
            const resp = importFileOperationFromMldev(apiResponse);
            const typedResp = new ImportFileOperation();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
    };
    uuid4Internal = /* @__PURE__ */ __name(function() {
      const { crypto } = globalThis;
      if (crypto === null || crypto === void 0 ? void 0 : crypto.randomUUID) {
        uuid4Internal = crypto.randomUUID.bind(crypto);
        return crypto.randomUUID();
      }
      const u8 = new Uint8Array(1);
      const randomByte = crypto ? () => crypto.getRandomValues(u8)[0] : () => Math.random() * 255 & 255;
      return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => (+c ^ randomByte() & 15 >> +c / 4).toString(16));
    }, "uuid4Internal");
    uuid4 = /* @__PURE__ */ __name(() => uuid4Internal(), "uuid4");
    __name(isAbortError, "isAbortError");
    castToError = /* @__PURE__ */ __name((err) => {
      if (err instanceof Error)
        return err;
      if (typeof err === "object" && err !== null) {
        try {
          if (Object.prototype.toString.call(err) === "[object Error]") {
            const error = new Error(err.message, err.cause ? { cause: err.cause } : {});
            if (err.stack)
              error.stack = err.stack;
            if (err.cause && !error.cause)
              error.cause = err.cause;
            if (err.name)
              error.name = err.name;
            return error;
          }
        } catch (_a2) {
        }
        try {
          return new Error(JSON.stringify(err));
        } catch (_b) {
        }
      }
      return new Error(err);
    }, "castToError");
    GeminiNextGenAPIClientError = class extends Error {
      static {
        __name(this, "GeminiNextGenAPIClientError");
      }
    };
    APIError = class _APIError extends GeminiNextGenAPIClientError {
      static {
        __name(this, "APIError");
      }
      constructor(status, error, message, headers) {
        super(`${_APIError.makeMessage(status, error, message)}`);
        this.status = status;
        this.headers = headers;
        this.error = error;
      }
      static makeMessage(status, error, message) {
        const msg = (error === null || error === void 0 ? void 0 : error.message) ? typeof error.message === "string" ? error.message : JSON.stringify(error.message) : error ? JSON.stringify(error) : message;
        if (status && msg) {
          return `${status} ${msg}`;
        }
        if (status) {
          return `${status} status code (no body)`;
        }
        if (msg) {
          return msg;
        }
        return "(no status code or body)";
      }
      static generate(status, errorResponse, message, headers) {
        if (!status || !headers) {
          return new APIConnectionError({ message, cause: castToError(errorResponse) });
        }
        const error = errorResponse;
        if (status === 400) {
          return new BadRequestError(status, error, message, headers);
        }
        if (status === 401) {
          return new AuthenticationError(status, error, message, headers);
        }
        if (status === 403) {
          return new PermissionDeniedError(status, error, message, headers);
        }
        if (status === 404) {
          return new NotFoundError(status, error, message, headers);
        }
        if (status === 409) {
          return new ConflictError(status, error, message, headers);
        }
        if (status === 422) {
          return new UnprocessableEntityError(status, error, message, headers);
        }
        if (status === 429) {
          return new RateLimitError(status, error, message, headers);
        }
        if (status >= 500) {
          return new InternalServerError(status, error, message, headers);
        }
        return new _APIError(status, error, message, headers);
      }
    };
    APIUserAbortError = class extends APIError {
      static {
        __name(this, "APIUserAbortError");
      }
      constructor({ message } = {}) {
        super(void 0, void 0, message || "Request was aborted.", void 0);
      }
    };
    APIConnectionError = class extends APIError {
      static {
        __name(this, "APIConnectionError");
      }
      constructor({ message, cause }) {
        super(void 0, void 0, message || "Connection error.", void 0);
        if (cause)
          this.cause = cause;
      }
    };
    APIConnectionTimeoutError = class extends APIConnectionError {
      static {
        __name(this, "APIConnectionTimeoutError");
      }
      constructor({ message } = {}) {
        super({ message: message !== null && message !== void 0 ? message : "Request timed out." });
      }
    };
    BadRequestError = class extends APIError {
      static {
        __name(this, "BadRequestError");
      }
    };
    AuthenticationError = class extends APIError {
      static {
        __name(this, "AuthenticationError");
      }
    };
    PermissionDeniedError = class extends APIError {
      static {
        __name(this, "PermissionDeniedError");
      }
    };
    NotFoundError = class extends APIError {
      static {
        __name(this, "NotFoundError");
      }
    };
    ConflictError = class extends APIError {
      static {
        __name(this, "ConflictError");
      }
    };
    UnprocessableEntityError = class extends APIError {
      static {
        __name(this, "UnprocessableEntityError");
      }
    };
    RateLimitError = class extends APIError {
      static {
        __name(this, "RateLimitError");
      }
    };
    InternalServerError = class extends APIError {
      static {
        __name(this, "InternalServerError");
      }
    };
    startsWithSchemeRegexp = /^[a-z][a-z0-9+.-]*:/i;
    isAbsoluteURL = /* @__PURE__ */ __name((url) => {
      return startsWithSchemeRegexp.test(url);
    }, "isAbsoluteURL");
    isArrayInternal = /* @__PURE__ */ __name((val) => (isArrayInternal = Array.isArray, isArrayInternal(val)), "isArrayInternal");
    isArray = isArrayInternal;
    isReadonlyArrayInternal = isArray;
    isReadonlyArray = isReadonlyArrayInternal;
    __name(isEmptyObj, "isEmptyObj");
    __name(hasOwn, "hasOwn");
    validatePositiveInteger = /* @__PURE__ */ __name((name, n) => {
      if (typeof n !== "number" || !Number.isInteger(n)) {
        throw new GeminiNextGenAPIClientError(`${name} must be an integer`);
      }
      if (n < 0) {
        throw new GeminiNextGenAPIClientError(`${name} must be a positive integer`);
      }
      return n;
    }, "validatePositiveInteger");
    safeJSON = /* @__PURE__ */ __name((text) => {
      try {
        return JSON.parse(text);
      } catch (err) {
        return void 0;
      }
    }, "safeJSON");
    sleep$1 = /* @__PURE__ */ __name((ms) => new Promise((resolve) => setTimeout(resolve, ms)), "sleep$1");
    __name(getDefaultFetch, "getDefaultFetch");
    __name(makeReadableStream, "makeReadableStream");
    __name(ReadableStreamFrom, "ReadableStreamFrom");
    __name(ReadableStreamToAsyncIterable, "ReadableStreamToAsyncIterable");
    __name(CancelReadableStream, "CancelReadableStream");
    FallbackEncoder = /* @__PURE__ */ __name(({ headers, body }) => {
      return {
        bodyHeaders: {
          "content-type": "application/json"
        },
        body: JSON.stringify(body)
      };
    }, "FallbackEncoder");
    __name(stringifyQuery, "stringifyQuery");
    VERSION = "0.0.1";
    checkFileSupport = /* @__PURE__ */ __name(() => {
      var _a2;
      if (typeof File === "undefined") {
        const { process: process2 } = globalThis;
        const isOldNode = typeof ((_a2 = process2 === null || process2 === void 0 ? void 0 : process2.versions) === null || _a2 === void 0 ? void 0 : _a2.node) === "string" && parseInt(process2.versions.node.split(".")) < 20;
        throw new Error("`File` is not defined as a global, which is required for file uploads." + (isOldNode ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ""));
      }
    }, "checkFileSupport");
    __name(makeFile, "makeFile");
    __name(getName, "getName");
    isAsyncIterable = /* @__PURE__ */ __name((value) => value != null && typeof value === "object" && typeof value[Symbol.asyncIterator] === "function", "isAsyncIterable");
    isBlobLike = /* @__PURE__ */ __name((value) => value != null && typeof value === "object" && typeof value.size === "number" && typeof value.type === "string" && typeof value.text === "function" && typeof value.slice === "function" && typeof value.arrayBuffer === "function", "isBlobLike");
    isFileLike = /* @__PURE__ */ __name((value) => value != null && typeof value === "object" && typeof value.name === "string" && typeof value.lastModified === "number" && isBlobLike(value), "isFileLike");
    isResponseLike = /* @__PURE__ */ __name((value) => value != null && typeof value === "object" && typeof value.url === "string" && typeof value.blob === "function", "isResponseLike");
    __name(toFile, "toFile");
    __name(getBytes, "getBytes");
    __name(propsForError, "propsForError");
    APIResource = class {
      static {
        __name(this, "APIResource");
      }
      constructor(client) {
        this._client = client;
      }
    };
    APIResource._key = [];
    __name(encodeURIPath, "encodeURIPath");
    EMPTY = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.create(null));
    createPathTagFunction = /* @__PURE__ */ __name((pathEncoder = encodeURIPath) => /* @__PURE__ */ __name((function path2(statics, ...params) {
      if (statics.length === 1)
        return statics[0];
      let postPath = false;
      const invalidSegments = [];
      const path3 = statics.reduce((previousValue, currentValue, index) => {
        var _a2, _b, _c;
        if (/[?#]/.test(currentValue)) {
          postPath = true;
        }
        const value = params[index];
        let encoded = (postPath ? encodeURIComponent : pathEncoder)("" + value);
        if (index !== params.length && (value == null || typeof value === "object" && // handle values from other realms
        value.toString === ((_c = Object.getPrototypeOf((_b = Object.getPrototypeOf((_a2 = value.hasOwnProperty) !== null && _a2 !== void 0 ? _a2 : EMPTY)) !== null && _b !== void 0 ? _b : EMPTY)) === null || _c === void 0 ? void 0 : _c.toString))) {
          encoded = value + "";
          invalidSegments.push({
            start: previousValue.length + currentValue.length,
            length: encoded.length,
            error: `Value of type ${Object.prototype.toString.call(value).slice(8, -1)} is not a valid path parameter`
          });
        }
        return previousValue + currentValue + (index === params.length ? "" : encoded);
      }, "");
      const pathOnly = path3.split(/[?#]/, 1)[0];
      const invalidSegmentPattern = /(^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi;
      let match3;
      while ((match3 = invalidSegmentPattern.exec(pathOnly)) !== null) {
        const hasLeadingSlash = match3[0].startsWith("/");
        const offset = hasLeadingSlash ? 1 : 0;
        const cleanMatch = hasLeadingSlash ? match3[0].slice(1) : match3[0];
        invalidSegments.push({
          start: match3.index + offset,
          length: cleanMatch.length,
          error: `Value "${cleanMatch}" can't be safely passed as a path parameter`
        });
      }
      invalidSegments.sort((a, b) => a.start - b.start);
      if (invalidSegments.length > 0) {
        let lastEnd = 0;
        const underline = invalidSegments.reduce((acc, segment) => {
          const spaces = " ".repeat(segment.start - lastEnd);
          const arrows = "^".repeat(segment.length);
          lastEnd = segment.start + segment.length;
          return acc + spaces + arrows;
        }, "");
        throw new GeminiNextGenAPIClientError(`Path parameters result in path with invalid segments:
${invalidSegments.map((e) => e.error).join("\n")}
${path3}
${underline}`);
      }
      return path3;
    }), "path"), "createPathTagFunction");
    path = /* @__PURE__ */ createPathTagFunction(encodeURIPath);
    BaseInteractions = class extends APIResource {
      static {
        __name(this, "BaseInteractions");
      }
      create(params, options) {
        var _a2;
        const { api_version = this._client.apiVersion } = params, body = __rest(params, ["api_version"]);
        if ("model" in body && "agent_config" in body) {
          throw new GeminiNextGenAPIClientError(`Invalid request: specified \`model\` and \`agent_config\`. If specifying \`model\`, use \`generation_config\`.`);
        }
        if ("agent" in body && "generation_config" in body) {
          throw new GeminiNextGenAPIClientError(`Invalid request: specified \`agent\` and \`generation_config\`. If specifying \`agent\`, use \`agent_config\`.`);
        }
        return this._client.post(path`/${api_version}/interactions`, Object.assign(Object.assign({ body }, options), { stream: (_a2 = params.stream) !== null && _a2 !== void 0 ? _a2 : false }));
      }
      /**
       * Deletes the interaction by id.
       *
       * @example
       * ```ts
       * const interaction = await client.interactions.delete('id', {
       *   api_version: 'api_version',
       * });
       * ```
       */
      delete(id, params = {}, options) {
        const { api_version = this._client.apiVersion } = params !== null && params !== void 0 ? params : {};
        return this._client.delete(path`/${api_version}/interactions/${id}`, options);
      }
      /**
       * Cancels an interaction by id. This only applies to background interactions that are still running.
       *
       * @example
       * ```ts
       * const interaction = await client.interactions.cancel('id', {
       *   api_version: 'api_version',
       * });
       * ```
       */
      cancel(id, params = {}, options) {
        const { api_version = this._client.apiVersion } = params !== null && params !== void 0 ? params : {};
        return this._client.post(path`/${api_version}/interactions/${id}/cancel`, options);
      }
      get(id, params = {}, options) {
        var _a2;
        const _b = params !== null && params !== void 0 ? params : {}, { api_version = this._client.apiVersion } = _b, query = __rest(_b, ["api_version"]);
        return this._client.get(path`/${api_version}/interactions/${id}`, Object.assign(Object.assign({ query }, options), { stream: (_a2 = params === null || params === void 0 ? void 0 : params.stream) !== null && _a2 !== void 0 ? _a2 : false }));
      }
    };
    BaseInteractions._key = Object.freeze(["interactions"]);
    Interactions = class extends BaseInteractions {
      static {
        __name(this, "Interactions");
      }
    };
    __name(concatBytes, "concatBytes");
    __name(encodeUTF8, "encodeUTF8");
    __name(decodeUTF8, "decodeUTF8");
    LineDecoder = class {
      static {
        __name(this, "LineDecoder");
      }
      constructor() {
        this.buffer = new Uint8Array();
        this.carriageReturnIndex = null;
        this.searchIndex = 0;
      }
      decode(chunk) {
        var _a2;
        if (chunk == null) {
          return [];
        }
        const binaryChunk = chunk instanceof ArrayBuffer ? new Uint8Array(chunk) : typeof chunk === "string" ? encodeUTF8(chunk) : chunk;
        this.buffer = concatBytes([this.buffer, binaryChunk]);
        const lines = [];
        let patternIndex;
        while ((patternIndex = findNewlineIndex(this.buffer, (_a2 = this.carriageReturnIndex) !== null && _a2 !== void 0 ? _a2 : this.searchIndex)) != null) {
          if (patternIndex.carriage && this.carriageReturnIndex == null) {
            this.carriageReturnIndex = patternIndex.index;
            continue;
          }
          if (this.carriageReturnIndex != null && (patternIndex.index !== this.carriageReturnIndex + 1 || patternIndex.carriage)) {
            lines.push(decodeUTF8(this.buffer.subarray(0, this.carriageReturnIndex - 1)));
            this.buffer = this.buffer.subarray(this.carriageReturnIndex);
            this.carriageReturnIndex = null;
            this.searchIndex = 0;
            continue;
          }
          const endIndex = this.carriageReturnIndex !== null ? patternIndex.preceding - 1 : patternIndex.preceding;
          const line = decodeUTF8(this.buffer.subarray(0, endIndex));
          lines.push(line);
          this.buffer = this.buffer.subarray(patternIndex.index);
          this.carriageReturnIndex = null;
          this.searchIndex = 0;
        }
        this.searchIndex = Math.max(0, this.buffer.length - 1);
        return lines;
      }
      flush() {
        if (!this.buffer.length) {
          return [];
        }
        return this.decode("\n");
      }
    };
    LineDecoder.NEWLINE_CHARS = /* @__PURE__ */ new Set(["\n", "\r"]);
    LineDecoder.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
    __name(findNewlineIndex, "findNewlineIndex");
    levelNumbers = {
      off: 0,
      error: 200,
      warn: 300,
      info: 400,
      debug: 500
    };
    parseLogLevel = /* @__PURE__ */ __name((maybeLevel, sourceName, client) => {
      if (!maybeLevel) {
        return void 0;
      }
      if (hasOwn(levelNumbers, maybeLevel)) {
        return maybeLevel;
      }
      loggerFor(client).warn(`${sourceName} was set to ${JSON.stringify(maybeLevel)}, expected one of ${JSON.stringify(Object.keys(levelNumbers))}`);
      return void 0;
    }, "parseLogLevel");
    __name(noop, "noop");
    __name(makeLogFn, "makeLogFn");
    noopLogger = {
      error: noop,
      warn: noop,
      info: noop,
      debug: noop
    };
    cachedLoggers = /* @__PURE__ */ new WeakMap();
    __name(loggerFor, "loggerFor");
    formatRequestDetails = /* @__PURE__ */ __name((details) => {
      if (details.options) {
        details.options = Object.assign({}, details.options);
        delete details.options["headers"];
      }
      if (details.headers) {
        details.headers = Object.fromEntries((details.headers instanceof Headers ? [...details.headers] : Object.entries(details.headers)).map(([name, value]) => [
          name,
          name.toLowerCase() === "x-goog-api-key" || name.toLowerCase() === "authorization" || name.toLowerCase() === "cookie" || name.toLowerCase() === "set-cookie" ? "***" : value
        ]));
      }
      if ("retryOfRequestLogID" in details) {
        if (details.retryOfRequestLogID) {
          details.retryOf = details.retryOfRequestLogID;
        }
        delete details.retryOfRequestLogID;
      }
      return details;
    }, "formatRequestDetails");
    Stream = class _Stream {
      static {
        __name(this, "Stream");
      }
      constructor(iterator, controller, client) {
        this.iterator = iterator;
        this.controller = controller;
        this.client = client;
      }
      static fromSSEResponse(response, controller, client) {
        let consumed = false;
        const logger = client ? loggerFor(client) : console;
        function iterator() {
          return __asyncGenerator(this, arguments, /* @__PURE__ */ __name(function* iterator_1() {
            var _a2, e_1, _b, _c;
            if (consumed) {
              throw new GeminiNextGenAPIClientError("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
            }
            consumed = true;
            let done = false;
            try {
              try {
                for (var _d = true, _e = __asyncValues(_iterSSEMessages(response, controller)), _f; _f = yield __await(_e.next()), _a2 = _f.done, !_a2; _d = true) {
                  _c = _f.value;
                  _d = false;
                  const sse = _c;
                  if (done)
                    continue;
                  if (sse.data.startsWith("[DONE]")) {
                    done = true;
                    continue;
                  } else {
                    try {
                      yield yield __await(JSON.parse(sse.data));
                    } catch (e) {
                      logger.error(`Could not parse message into JSON:`, sse.data);
                      logger.error(`From chunk:`, sse.raw);
                      throw e;
                    }
                  }
                }
              } catch (e_1_1) {
                e_1 = { error: e_1_1 };
              } finally {
                try {
                  if (!_d && !_a2 && (_b = _e.return)) yield __await(_b.call(_e));
                } finally {
                  if (e_1) throw e_1.error;
                }
              }
              done = true;
            } catch (e) {
              if (isAbortError(e))
                return yield __await(void 0);
              throw e;
            } finally {
              if (!done)
                controller.abort();
            }
          }, "iterator_1"));
        }
        __name(iterator, "iterator");
        return new _Stream(iterator, controller, client);
      }
      /**
       * Generates a Stream from a newline-separated ReadableStream
       * where each item is a JSON value.
       */
      static fromReadableStream(readableStream, controller, client) {
        let consumed = false;
        function iterLines() {
          return __asyncGenerator(this, arguments, /* @__PURE__ */ __name(function* iterLines_1() {
            var _a2, e_2, _b, _c;
            const lineDecoder = new LineDecoder();
            const iter = ReadableStreamToAsyncIterable(readableStream);
            try {
              for (var _d = true, iter_1 = __asyncValues(iter), iter_1_1; iter_1_1 = yield __await(iter_1.next()), _a2 = iter_1_1.done, !_a2; _d = true) {
                _c = iter_1_1.value;
                _d = false;
                const chunk = _c;
                for (const line of lineDecoder.decode(chunk)) {
                  yield yield __await(line);
                }
              }
            } catch (e_2_1) {
              e_2 = { error: e_2_1 };
            } finally {
              try {
                if (!_d && !_a2 && (_b = iter_1.return)) yield __await(_b.call(iter_1));
              } finally {
                if (e_2) throw e_2.error;
              }
            }
            for (const line of lineDecoder.flush()) {
              yield yield __await(line);
            }
          }, "iterLines_1"));
        }
        __name(iterLines, "iterLines");
        function iterator() {
          return __asyncGenerator(this, arguments, /* @__PURE__ */ __name(function* iterator_2() {
            var _a2, e_3, _b, _c;
            if (consumed) {
              throw new GeminiNextGenAPIClientError("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
            }
            consumed = true;
            let done = false;
            try {
              try {
                for (var _d = true, _e = __asyncValues(iterLines()), _f; _f = yield __await(_e.next()), _a2 = _f.done, !_a2; _d = true) {
                  _c = _f.value;
                  _d = false;
                  const line = _c;
                  if (done)
                    continue;
                  if (line)
                    yield yield __await(JSON.parse(line));
                }
              } catch (e_3_1) {
                e_3 = { error: e_3_1 };
              } finally {
                try {
                  if (!_d && !_a2 && (_b = _e.return)) yield __await(_b.call(_e));
                } finally {
                  if (e_3) throw e_3.error;
                }
              }
              done = true;
            } catch (e) {
              if (isAbortError(e))
                return yield __await(void 0);
              throw e;
            } finally {
              if (!done)
                controller.abort();
            }
          }, "iterator_2"));
        }
        __name(iterator, "iterator");
        return new _Stream(iterator, controller, client);
      }
      [Symbol.asyncIterator]() {
        return this.iterator();
      }
      /**
       * Splits the stream into two streams which can be
       * independently read from at different speeds.
       */
      tee() {
        const left = [];
        const right = [];
        const iterator = this.iterator();
        const teeIterator = /* @__PURE__ */ __name((queue) => {
          return {
            next: /* @__PURE__ */ __name(() => {
              if (queue.length === 0) {
                const result = iterator.next();
                left.push(result);
                right.push(result);
              }
              return queue.shift();
            }, "next")
          };
        }, "teeIterator");
        return [
          new _Stream(() => teeIterator(left), this.controller, this.client),
          new _Stream(() => teeIterator(right), this.controller, this.client)
        ];
      }
      /**
       * Converts this stream to a newline-separated ReadableStream of
       * JSON stringified values in the stream
       * which can be turned back into a Stream with `Stream.fromReadableStream()`.
       */
      toReadableStream() {
        const self = this;
        let iter;
        return makeReadableStream({
          async start() {
            iter = self[Symbol.asyncIterator]();
          },
          async pull(ctrl) {
            try {
              const { value, done } = await iter.next();
              if (done)
                return ctrl.close();
              const bytes = encodeUTF8(JSON.stringify(value) + "\n");
              ctrl.enqueue(bytes);
            } catch (err) {
              ctrl.error(err);
            }
          },
          async cancel() {
            var _a2;
            await ((_a2 = iter.return) === null || _a2 === void 0 ? void 0 : _a2.call(iter));
          }
        });
      }
    };
    __name(_iterSSEMessages, "_iterSSEMessages");
    __name(iterBinaryChunks, "iterBinaryChunks");
    SSEDecoder = class {
      static {
        __name(this, "SSEDecoder");
      }
      constructor() {
        this.event = null;
        this.data = [];
        this.chunks = [];
      }
      decode(line) {
        if (line.endsWith("\r")) {
          line = line.substring(0, line.length - 1);
        }
        if (!line) {
          if (!this.event && !this.data.length)
            return null;
          const sse = {
            event: this.event,
            data: this.data.join("\n"),
            raw: this.chunks
          };
          this.event = null;
          this.data = [];
          this.chunks = [];
          return sse;
        }
        this.chunks.push(line);
        if (line.startsWith(":")) {
          return null;
        }
        let [fieldname, _, value] = partition(line, ":");
        if (value.startsWith(" ")) {
          value = value.substring(1);
        }
        if (fieldname === "event") {
          this.event = value;
        } else if (fieldname === "data") {
          this.data.push(value);
        }
        return null;
      }
    };
    __name(partition, "partition");
    __name(defaultParseResponse, "defaultParseResponse");
    APIPromise = class _APIPromise extends Promise {
      static {
        __name(this, "APIPromise");
      }
      constructor(client, responsePromise, parseResponse = defaultParseResponse) {
        super((resolve) => {
          resolve(null);
        });
        this.responsePromise = responsePromise;
        this.parseResponse = parseResponse;
        this.client = client;
      }
      _thenUnwrap(transform) {
        return new _APIPromise(this.client, this.responsePromise, async (client, props) => transform(await this.parseResponse(client, props), props));
      }
      /**
       * Gets the raw `Response` instance instead of parsing the response
       * data.
       *
       * If you want to parse the response body but still get the `Response`
       * instance, you can use {@link withResponse()}.
       *
       * 👋 Getting the wrong TypeScript type for `Response`?
       * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
       * to your `tsconfig.json`.
       */
      asResponse() {
        return this.responsePromise.then((p) => p.response);
      }
      /**
       * Gets the parsed response data and the raw `Response` instance.
       *
       * If you just want to get the raw `Response` instance without parsing it,
       * you can use {@link asResponse()}.
       *
       * 👋 Getting the wrong TypeScript type for `Response`?
       * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
       * to your `tsconfig.json`.
       */
      async withResponse() {
        const [data, response] = await Promise.all([this.parse(), this.asResponse()]);
        return { data, response };
      }
      parse() {
        if (!this.parsedPromise) {
          this.parsedPromise = this.responsePromise.then((data) => this.parseResponse(this.client, data));
        }
        return this.parsedPromise;
      }
      then(onfulfilled, onrejected) {
        return this.parse().then(onfulfilled, onrejected);
      }
      catch(onrejected) {
        return this.parse().catch(onrejected);
      }
      finally(onfinally) {
        return this.parse().finally(onfinally);
      }
    };
    brand_privateNullableHeaders = /* @__PURE__ */ Symbol("brand.privateNullableHeaders");
    __name(iterateHeaders, "iterateHeaders");
    buildHeaders = /* @__PURE__ */ __name((newHeaders) => {
      const targetHeaders = new Headers();
      const nullHeaders = /* @__PURE__ */ new Set();
      for (const headers of newHeaders) {
        const seenHeaders = /* @__PURE__ */ new Set();
        for (const [name, value] of iterateHeaders(headers)) {
          const lowerName = name.toLowerCase();
          if (!seenHeaders.has(lowerName)) {
            targetHeaders.delete(name);
            seenHeaders.add(lowerName);
          }
          if (value === null) {
            targetHeaders.delete(name);
            nullHeaders.add(lowerName);
          } else {
            targetHeaders.append(name, value);
            nullHeaders.delete(lowerName);
          }
        }
      }
      return { [brand_privateNullableHeaders]: true, values: targetHeaders, nulls: nullHeaders };
    }, "buildHeaders");
    readEnv = /* @__PURE__ */ __name((env2) => {
      var _a2, _b, _c, _d, _e, _f;
      if (typeof globalThis.process !== "undefined") {
        return (_c = (_b = (_a2 = globalThis.process.env) === null || _a2 === void 0 ? void 0 : _a2[env2]) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : void 0;
      }
      if (typeof globalThis.Deno !== "undefined") {
        return (_f = (_e = (_d = globalThis.Deno.env) === null || _d === void 0 ? void 0 : _d.get) === null || _e === void 0 ? void 0 : _e.call(_d, env2)) === null || _f === void 0 ? void 0 : _f.trim();
      }
      return void 0;
    }, "readEnv");
    BaseGeminiNextGenAPIClient = class _BaseGeminiNextGenAPIClient {
      static {
        __name(this, "BaseGeminiNextGenAPIClient");
      }
      /**
       * API Client for interfacing with the Gemini Next Gen API API.
       *
       * @param {string | null | undefined} [opts.apiKey=process.env['GEMINI_API_KEY'] ?? null]
       * @param {string | undefined} [opts.apiVersion=v1beta]
       * @param {string} [opts.baseURL=process.env['GEMINI_NEXT_GEN_API_BASE_URL'] ?? https://generativelanguage.googleapis.com] - Override the default base URL for the API.
       * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
       * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
       * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
       * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
       * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
       * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
       */
      constructor(_b) {
        var _c, _d, _e, _f, _g, _h, _j;
        var { baseURL = readEnv("GEMINI_NEXT_GEN_API_BASE_URL"), apiKey = (_c = readEnv("GEMINI_API_KEY")) !== null && _c !== void 0 ? _c : null, apiVersion = "v1beta" } = _b, opts = __rest(_b, ["baseURL", "apiKey", "apiVersion"]);
        const options = Object.assign(Object.assign({
          apiKey,
          apiVersion
        }, opts), { baseURL: baseURL || `https://generativelanguage.googleapis.com` });
        this.baseURL = options.baseURL;
        this.timeout = (_d = options.timeout) !== null && _d !== void 0 ? _d : _BaseGeminiNextGenAPIClient.DEFAULT_TIMEOUT;
        this.logger = (_e = options.logger) !== null && _e !== void 0 ? _e : console;
        const defaultLogLevel = "warn";
        this.logLevel = defaultLogLevel;
        this.logLevel = (_g = (_f = parseLogLevel(options.logLevel, "ClientOptions.logLevel", this)) !== null && _f !== void 0 ? _f : parseLogLevel(readEnv("GEMINI_NEXT_GEN_API_LOG"), "process.env['GEMINI_NEXT_GEN_API_LOG']", this)) !== null && _g !== void 0 ? _g : defaultLogLevel;
        this.fetchOptions = options.fetchOptions;
        this.maxRetries = (_h = options.maxRetries) !== null && _h !== void 0 ? _h : 2;
        this.fetch = (_j = options.fetch) !== null && _j !== void 0 ? _j : getDefaultFetch();
        this.encoder = FallbackEncoder;
        this._options = options;
        this.apiKey = apiKey;
        this.apiVersion = apiVersion;
        this.clientAdapter = options.clientAdapter;
      }
      /**
       * Create a new client instance re-using the same options given to the current client with optional overriding.
       */
      withOptions(options) {
        const client = new this.constructor(Object.assign(Object.assign(Object.assign({}, this._options), { baseURL: this.baseURL, maxRetries: this.maxRetries, timeout: this.timeout, logger: this.logger, logLevel: this.logLevel, fetch: this.fetch, fetchOptions: this.fetchOptions, apiKey: this.apiKey, apiVersion: this.apiVersion }), options));
        return client;
      }
      /**
       * Check whether the base URL is set to its default.
       */
      baseURLOverridden() {
        return this.baseURL !== "https://generativelanguage.googleapis.com";
      }
      defaultQuery() {
        return this._options.defaultQuery;
      }
      validateHeaders({ values, nulls }) {
        if (values.has("authorization") || values.has("x-goog-api-key")) {
          return;
        }
        if (this.apiKey && values.get("x-goog-api-key")) {
          return;
        }
        if (nulls.has("x-goog-api-key")) {
          return;
        }
        throw new Error('Could not resolve authentication method. Expected the apiKey to be set. Or for the "x-goog-api-key" headers to be explicitly omitted');
      }
      async authHeaders(opts) {
        const existingHeaders = buildHeaders([opts.headers]);
        if (existingHeaders.values.has("authorization") || existingHeaders.values.has("x-goog-api-key")) {
          return void 0;
        }
        if (this.apiKey) {
          return buildHeaders([{ "x-goog-api-key": this.apiKey }]);
        }
        if (this.clientAdapter.isVertexAI()) {
          return buildHeaders([await this.clientAdapter.getAuthHeaders()]);
        }
        return void 0;
      }
      /**
       * Basic re-implementation of `qs.stringify` for primitive types.
       */
      stringifyQuery(query) {
        return stringifyQuery(query);
      }
      getUserAgent() {
        return `${this.constructor.name}/JS ${VERSION}`;
      }
      defaultIdempotencyKey() {
        return `stainless-node-retry-${uuid4()}`;
      }
      makeStatusError(status, error, message, headers) {
        return APIError.generate(status, error, message, headers);
      }
      buildURL(path2, query, defaultBaseURL) {
        const baseURL = !this.baseURLOverridden() && defaultBaseURL || this.baseURL;
        const url = isAbsoluteURL(path2) ? new URL(path2) : new URL(baseURL + (baseURL.endsWith("/") && path2.startsWith("/") ? path2.slice(1) : path2));
        const defaultQuery = this.defaultQuery();
        const pathQuery = Object.fromEntries(url.searchParams);
        if (!isEmptyObj(defaultQuery) || !isEmptyObj(pathQuery)) {
          query = Object.assign(Object.assign(Object.assign({}, pathQuery), defaultQuery), query);
        }
        if (typeof query === "object" && query && !Array.isArray(query)) {
          url.search = this.stringifyQuery(query);
        }
        return url.toString();
      }
      /**
         * Used as a callback for mutating the given `FinalRequestOptions` object.
      
         */
      async prepareOptions(options) {
        if (this.clientAdapter && this.clientAdapter.isVertexAI() && !options.path.startsWith(`/${this.apiVersion}/projects/`)) {
          const oldPath = options.path.slice(this.apiVersion.length + 1);
          options.path = `/${this.apiVersion}/projects/${this.clientAdapter.getProject()}/locations/${this.clientAdapter.getLocation()}${oldPath}`;
        }
      }
      /**
       * Used as a callback for mutating the given `RequestInit` object.
       *
       * This is useful for cases where you want to add certain headers based off of
       * the request properties, e.g. `method` or `url`.
       */
      async prepareRequest(request, { url, options }) {
      }
      get(path2, opts) {
        return this.methodRequest("get", path2, opts);
      }
      post(path2, opts) {
        return this.methodRequest("post", path2, opts);
      }
      patch(path2, opts) {
        return this.methodRequest("patch", path2, opts);
      }
      put(path2, opts) {
        return this.methodRequest("put", path2, opts);
      }
      delete(path2, opts) {
        return this.methodRequest("delete", path2, opts);
      }
      methodRequest(method, path2, opts) {
        return this.request(Promise.resolve(opts).then((opts2) => {
          return Object.assign({ method, path: path2 }, opts2);
        }));
      }
      request(options, remainingRetries = null) {
        return new APIPromise(this, this.makeRequest(options, remainingRetries, void 0));
      }
      async makeRequest(optionsInput, retriesRemaining, retryOfRequestLogID) {
        var _b, _c, _d;
        const options = await optionsInput;
        const maxRetries = (_b = options.maxRetries) !== null && _b !== void 0 ? _b : this.maxRetries;
        if (retriesRemaining == null) {
          retriesRemaining = maxRetries;
        }
        await this.prepareOptions(options);
        const { req, url, timeout } = await this.buildRequest(options, {
          retryCount: maxRetries - retriesRemaining
        });
        await this.prepareRequest(req, { url, options });
        const requestLogID = "log_" + (Math.random() * (1 << 24) | 0).toString(16).padStart(6, "0");
        const retryLogStr = retryOfRequestLogID === void 0 ? "" : `, retryOf: ${retryOfRequestLogID}`;
        const startTime = Date.now();
        loggerFor(this).debug(`[${requestLogID}] sending request`, formatRequestDetails({
          retryOfRequestLogID,
          method: options.method,
          url,
          options,
          headers: req.headers
        }));
        if ((_c = options.signal) === null || _c === void 0 ? void 0 : _c.aborted) {
          throw new APIUserAbortError();
        }
        const controller = new AbortController();
        const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
        const headersTime = Date.now();
        if (response instanceof globalThis.Error) {
          const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
          if ((_d = options.signal) === null || _d === void 0 ? void 0 : _d.aborted) {
            throw new APIUserAbortError();
          }
          const isTimeout = isAbortError(response) || /timed? ?out/i.test(String(response) + ("cause" in response ? String(response.cause) : ""));
          if (retriesRemaining) {
            loggerFor(this).info(`[${requestLogID}] connection ${isTimeout ? "timed out" : "failed"} - ${retryMessage}`);
            loggerFor(this).debug(`[${requestLogID}] connection ${isTimeout ? "timed out" : "failed"} (${retryMessage})`, formatRequestDetails({
              retryOfRequestLogID,
              url,
              durationMs: headersTime - startTime,
              message: response.message
            }));
            return this.retryRequest(options, retriesRemaining, retryOfRequestLogID !== null && retryOfRequestLogID !== void 0 ? retryOfRequestLogID : requestLogID);
          }
          loggerFor(this).info(`[${requestLogID}] connection ${isTimeout ? "timed out" : "failed"} - error; no more retries left`);
          loggerFor(this).debug(`[${requestLogID}] connection ${isTimeout ? "timed out" : "failed"} (error; no more retries left)`, formatRequestDetails({
            retryOfRequestLogID,
            url,
            durationMs: headersTime - startTime,
            message: response.message
          }));
          if (isTimeout) {
            throw new APIConnectionTimeoutError();
          }
          throw new APIConnectionError({ cause: response });
        }
        const responseInfo = `[${requestLogID}${retryLogStr}] ${req.method} ${url} ${response.ok ? "succeeded" : "failed"} with status ${response.status} in ${headersTime - startTime}ms`;
        if (!response.ok) {
          const shouldRetry = await this.shouldRetry(response);
          if (retriesRemaining && shouldRetry) {
            const retryMessage2 = `retrying, ${retriesRemaining} attempts remaining`;
            await CancelReadableStream(response.body);
            loggerFor(this).info(`${responseInfo} - ${retryMessage2}`);
            loggerFor(this).debug(`[${requestLogID}] response error (${retryMessage2})`, formatRequestDetails({
              retryOfRequestLogID,
              url: response.url,
              status: response.status,
              headers: response.headers,
              durationMs: headersTime - startTime
            }));
            return this.retryRequest(options, retriesRemaining, retryOfRequestLogID !== null && retryOfRequestLogID !== void 0 ? retryOfRequestLogID : requestLogID, response.headers);
          }
          const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;
          loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
          const errText = await response.text().catch((err2) => castToError(err2).message);
          const errJSON = safeJSON(errText);
          const errMessage = errJSON ? void 0 : errText;
          loggerFor(this).debug(`[${requestLogID}] response error (${retryMessage})`, formatRequestDetails({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            message: errMessage,
            durationMs: Date.now() - startTime
          }));
          const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
          throw err;
        }
        loggerFor(this).info(responseInfo);
        loggerFor(this).debug(`[${requestLogID}] response start`, formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          durationMs: headersTime - startTime
        }));
        return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
      }
      async fetchWithTimeout(url, init, ms, controller) {
        const _b = init || {}, { signal, method } = _b, options = __rest(_b, ["signal", "method"]);
        const abort = this._makeAbort(controller);
        if (signal)
          signal.addEventListener("abort", abort, { once: true });
        const timeout = setTimeout(abort, ms);
        const isReadableBody = globalThis.ReadableStream && options.body instanceof globalThis.ReadableStream || typeof options.body === "object" && options.body !== null && Symbol.asyncIterator in options.body;
        const fetchOptions = Object.assign(Object.assign(Object.assign({ signal: controller.signal }, isReadableBody ? { duplex: "half" } : {}), { method: "GET" }), options);
        if (method) {
          fetchOptions.method = method.toUpperCase();
        }
        try {
          return await this.fetch.call(void 0, url, fetchOptions);
        } finally {
          clearTimeout(timeout);
        }
      }
      async shouldRetry(response) {
        const shouldRetryHeader = response.headers.get("x-should-retry");
        if (shouldRetryHeader === "true")
          return true;
        if (shouldRetryHeader === "false")
          return false;
        if (response.status === 408)
          return true;
        if (response.status === 409)
          return true;
        if (response.status === 429)
          return true;
        if (response.status >= 500)
          return true;
        return false;
      }
      async retryRequest(options, retriesRemaining, requestLogID, responseHeaders) {
        var _b;
        let timeoutMillis;
        const retryAfterMillisHeader = responseHeaders === null || responseHeaders === void 0 ? void 0 : responseHeaders.get("retry-after-ms");
        if (retryAfterMillisHeader) {
          const timeoutMs = parseFloat(retryAfterMillisHeader);
          if (!Number.isNaN(timeoutMs)) {
            timeoutMillis = timeoutMs;
          }
        }
        const retryAfterHeader = responseHeaders === null || responseHeaders === void 0 ? void 0 : responseHeaders.get("retry-after");
        if (retryAfterHeader && !timeoutMillis) {
          const timeoutSeconds = parseFloat(retryAfterHeader);
          if (!Number.isNaN(timeoutSeconds)) {
            timeoutMillis = timeoutSeconds * 1e3;
          } else {
            timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
          }
        }
        if (timeoutMillis === void 0) {
          const maxRetries = (_b = options.maxRetries) !== null && _b !== void 0 ? _b : this.maxRetries;
          timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
        }
        await sleep$1(timeoutMillis);
        return this.makeRequest(options, retriesRemaining - 1, requestLogID);
      }
      calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries) {
        const initialRetryDelay = 0.5;
        const maxRetryDelay = 8;
        const numRetries = maxRetries - retriesRemaining;
        const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);
        const jitter = 1 - Math.random() * 0.25;
        return sleepSeconds * jitter * 1e3;
      }
      async buildRequest(inputOptions, { retryCount = 0 } = {}) {
        var _b, _c, _d;
        const options = Object.assign({}, inputOptions);
        const { method, path: path2, query, defaultBaseURL } = options;
        const url = this.buildURL(path2, query, defaultBaseURL);
        if ("timeout" in options)
          validatePositiveInteger("timeout", options.timeout);
        options.timeout = (_b = options.timeout) !== null && _b !== void 0 ? _b : this.timeout;
        const { bodyHeaders, body } = this.buildBody({ options });
        const reqHeaders = await this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });
        const req = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ method, headers: reqHeaders }, options.signal && { signal: options.signal }), globalThis.ReadableStream && body instanceof globalThis.ReadableStream && { duplex: "half" }), body && { body }), (_c = this.fetchOptions) !== null && _c !== void 0 ? _c : {}), (_d = options.fetchOptions) !== null && _d !== void 0 ? _d : {});
        return { req, url, timeout: options.timeout };
      }
      async buildHeaders({ options, method, bodyHeaders, retryCount }) {
        let idempotencyHeaders = {};
        if (this.idempotencyHeader && method !== "get") {
          if (!options.idempotencyKey)
            options.idempotencyKey = this.defaultIdempotencyKey();
          idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
        }
        const authHeaders = await this.authHeaders(options);
        let headers = buildHeaders([
          idempotencyHeaders,
          { Accept: "application/json", "User-Agent": this.getUserAgent() },
          this._options.defaultHeaders,
          bodyHeaders,
          options.headers,
          authHeaders
        ]);
        this.validateHeaders(headers);
        return headers.values;
      }
      _makeAbort(controller) {
        return () => controller.abort();
      }
      buildBody({ options: { body, headers: rawHeaders } }) {
        if (!body) {
          return { bodyHeaders: void 0, body: void 0 };
        }
        const headers = buildHeaders([rawHeaders]);
        if (
          // Pass raw type verbatim
          ArrayBuffer.isView(body) || body instanceof ArrayBuffer || body instanceof DataView || typeof body === "string" && // Preserve legacy string encoding behavior for now
          headers.values.has("content-type") || // `Blob` is superset of `File`
          globalThis.Blob && body instanceof globalThis.Blob || // `FormData` -> `multipart/form-data`
          body instanceof FormData || // `URLSearchParams` -> `application/x-www-form-urlencoded`
          body instanceof URLSearchParams || // Send chunked stream (each chunk has own `length`)
          globalThis.ReadableStream && body instanceof globalThis.ReadableStream
        ) {
          return { bodyHeaders: void 0, body };
        } else if (typeof body === "object" && (Symbol.asyncIterator in body || Symbol.iterator in body && "next" in body && typeof body.next === "function")) {
          return { bodyHeaders: void 0, body: ReadableStreamFrom(body) };
        } else if (typeof body === "object" && headers.values.get("content-type") === "application/x-www-form-urlencoded") {
          return {
            bodyHeaders: { "content-type": "application/x-www-form-urlencoded" },
            body: this.stringifyQuery(body)
          };
        } else {
          return this.encoder({ body, headers });
        }
      }
    };
    BaseGeminiNextGenAPIClient.DEFAULT_TIMEOUT = 6e4;
    GeminiNextGenAPIClient = class extends BaseGeminiNextGenAPIClient {
      static {
        __name(this, "GeminiNextGenAPIClient");
      }
      constructor() {
        super(...arguments);
        this.interactions = new Interactions(this);
      }
    };
    _a = GeminiNextGenAPIClient;
    GeminiNextGenAPIClient.GeminiNextGenAPIClient = _a;
    GeminiNextGenAPIClient.GeminiNextGenAPIClientError = GeminiNextGenAPIClientError;
    GeminiNextGenAPIClient.APIError = APIError;
    GeminiNextGenAPIClient.APIConnectionError = APIConnectionError;
    GeminiNextGenAPIClient.APIConnectionTimeoutError = APIConnectionTimeoutError;
    GeminiNextGenAPIClient.APIUserAbortError = APIUserAbortError;
    GeminiNextGenAPIClient.NotFoundError = NotFoundError;
    GeminiNextGenAPIClient.ConflictError = ConflictError;
    GeminiNextGenAPIClient.RateLimitError = RateLimitError;
    GeminiNextGenAPIClient.BadRequestError = BadRequestError;
    GeminiNextGenAPIClient.AuthenticationError = AuthenticationError;
    GeminiNextGenAPIClient.InternalServerError = InternalServerError;
    GeminiNextGenAPIClient.PermissionDeniedError = PermissionDeniedError;
    GeminiNextGenAPIClient.UnprocessableEntityError = UnprocessableEntityError;
    GeminiNextGenAPIClient.toFile = toFile;
    GeminiNextGenAPIClient.Interactions = Interactions;
    __name(cancelTuningJobParametersToMldev, "cancelTuningJobParametersToMldev");
    __name(cancelTuningJobParametersToVertex, "cancelTuningJobParametersToVertex");
    __name(cancelTuningJobResponseFromMldev, "cancelTuningJobResponseFromMldev");
    __name(cancelTuningJobResponseFromVertex, "cancelTuningJobResponseFromVertex");
    __name(createTuningJobConfigToMldev, "createTuningJobConfigToMldev");
    __name(createTuningJobConfigToVertex, "createTuningJobConfigToVertex");
    __name(createTuningJobParametersPrivateToMldev, "createTuningJobParametersPrivateToMldev");
    __name(createTuningJobParametersPrivateToVertex, "createTuningJobParametersPrivateToVertex");
    __name(getTuningJobParametersToMldev, "getTuningJobParametersToMldev");
    __name(getTuningJobParametersToVertex, "getTuningJobParametersToVertex");
    __name(listTuningJobsConfigToMldev, "listTuningJobsConfigToMldev");
    __name(listTuningJobsConfigToVertex, "listTuningJobsConfigToVertex");
    __name(listTuningJobsParametersToMldev, "listTuningJobsParametersToMldev");
    __name(listTuningJobsParametersToVertex, "listTuningJobsParametersToVertex");
    __name(listTuningJobsResponseFromMldev, "listTuningJobsResponseFromMldev");
    __name(listTuningJobsResponseFromVertex, "listTuningJobsResponseFromVertex");
    __name(tunedModelFromMldev, "tunedModelFromMldev");
    __name(tuningDatasetToMldev, "tuningDatasetToMldev");
    __name(tuningDatasetToVertex, "tuningDatasetToVertex");
    __name(tuningJobFromMldev, "tuningJobFromMldev");
    __name(tuningJobFromVertex, "tuningJobFromVertex");
    __name(tuningOperationFromMldev, "tuningOperationFromMldev");
    __name(tuningValidationDatasetToVertex, "tuningValidationDatasetToVertex");
    Tunings = class extends BaseModule {
      static {
        __name(this, "Tunings");
      }
      constructor(apiClient) {
        super();
        this.apiClient = apiClient;
        this.list = async (params = {}) => {
          return new Pager(PagedItem.PAGED_ITEM_TUNING_JOBS, (x) => this.listInternal(x), await this.listInternal(params), params);
        };
        this.get = async (params) => {
          return await this.getInternal(params);
        };
        this.tune = async (params) => {
          var _a2;
          if (this.apiClient.isVertexAI()) {
            if (params.baseModel.startsWith("projects/")) {
              const preTunedModel = {
                tunedModelName: params.baseModel
              };
              if ((_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.preTunedModelCheckpointId) {
                preTunedModel.checkpointId = params.config.preTunedModelCheckpointId;
              }
              const paramsPrivate = Object.assign(Object.assign({}, params), { preTunedModel });
              paramsPrivate.baseModel = void 0;
              return await this.tuneInternal(paramsPrivate);
            } else {
              const paramsPrivate = Object.assign({}, params);
              return await this.tuneInternal(paramsPrivate);
            }
          } else {
            const paramsPrivate = Object.assign({}, params);
            const operation = await this.tuneMldevInternal(paramsPrivate);
            let tunedModelName = "";
            if (operation["metadata"] !== void 0 && operation["metadata"]["tunedModel"] !== void 0) {
              tunedModelName = operation["metadata"]["tunedModel"];
            } else if (operation["name"] !== void 0 && operation["name"].includes("/operations/")) {
              tunedModelName = operation["name"].split("/operations/")[0];
            }
            const tuningJob = {
              name: tunedModelName,
              state: JobState.JOB_STATE_QUEUED
            };
            return tuningJob;
          }
        };
      }
      async getInternal(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = getTuningJobParametersToVertex(params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = tuningJobFromVertex(apiResponse);
            return resp;
          });
        } else {
          const body = getTuningJobParametersToMldev(params);
          path2 = formatMap("{name}", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = tuningJobFromMldev(apiResponse);
            return resp;
          });
        }
      }
      async listInternal(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = listTuningJobsParametersToVertex(params);
          path2 = formatMap("tuningJobs", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = listTuningJobsResponseFromVertex(apiResponse);
            const typedResp = new ListTuningJobsResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          const body = listTuningJobsParametersToMldev(params);
          path2 = formatMap("tunedModels", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "GET",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = listTuningJobsResponseFromMldev(apiResponse);
            const typedResp = new ListTuningJobsResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
      /**
       * Cancels a tuning job.
       *
       * @param params - The parameters for the cancel request.
       * @return The empty response returned by the API.
       *
       * @example
       * ```ts
       * await ai.tunings.cancel({name: '...'}); // The server-generated resource name.
       * ```
       */
      async cancel(params) {
        var _a2, _b, _c, _d;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = cancelTuningJobParametersToVertex(params);
          path2 = formatMap("{name}:cancel", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = cancelTuningJobResponseFromVertex(apiResponse);
            const typedResp = new CancelTuningJobResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        } else {
          const body = cancelTuningJobParametersToMldev(params);
          path2 = formatMap("{name}:cancel", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_c = params.config) === null || _c === void 0 ? void 0 : _c.httpOptions,
            abortSignal: (_d = params.config) === null || _d === void 0 ? void 0 : _d.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = cancelTuningJobResponseFromMldev(apiResponse);
            const typedResp = new CancelTuningJobResponse();
            Object.assign(typedResp, resp);
            return typedResp;
          });
        }
      }
      async tuneInternal(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          const body = createTuningJobParametersPrivateToVertex(params, params);
          path2 = formatMap("tuningJobs", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = tuningJobFromVertex(apiResponse);
            return resp;
          });
        } else {
          throw new Error("This method is only supported by the Vertex AI.");
        }
      }
      async tuneMldevInternal(params) {
        var _a2, _b;
        let response;
        let path2 = "";
        let queryParams = {};
        if (this.apiClient.isVertexAI()) {
          throw new Error("This method is only supported by the Gemini Developer API.");
        } else {
          const body = createTuningJobParametersPrivateToMldev(params);
          path2 = formatMap("tunedModels", body["_url"]);
          queryParams = body["_query"];
          delete body["_url"];
          delete body["_query"];
          response = this.apiClient.request({
            path: path2,
            queryParams,
            body: JSON.stringify(body),
            httpMethod: "POST",
            httpOptions: (_a2 = params.config) === null || _a2 === void 0 ? void 0 : _a2.httpOptions,
            abortSignal: (_b = params.config) === null || _b === void 0 ? void 0 : _b.abortSignal
          }).then((httpResponse) => {
            return httpResponse.json().then((jsonResponse) => {
              const response2 = jsonResponse;
              response2.sdkHttpResponse = {
                headers: httpResponse.headers
              };
              return response2;
            });
          });
          return response.then((apiResponse) => {
            const resp = tuningOperationFromMldev(apiResponse);
            return resp;
          });
        }
      }
    };
    BrowserDownloader = class {
      static {
        __name(this, "BrowserDownloader");
      }
      async download(_params, _apiClient) {
        throw new Error("Download to file is not supported in the browser, please use a browser compliant download like an <a> tag.");
      }
    };
    MAX_CHUNK_SIZE = 1024 * 1024 * 8;
    MAX_RETRY_COUNT = 3;
    INITIAL_RETRY_DELAY_MS = 1e3;
    DELAY_MULTIPLIER = 2;
    X_GOOG_UPLOAD_STATUS_HEADER_FIELD = "x-goog-upload-status";
    __name(uploadBlob, "uploadBlob");
    __name(uploadBlobToFileSearchStore, "uploadBlobToFileSearchStore");
    __name(uploadBlobInternal, "uploadBlobInternal");
    __name(getBlobStat, "getBlobStat");
    __name(sleep, "sleep");
    BrowserUploader = class {
      static {
        __name(this, "BrowserUploader");
      }
      async upload(file, uploadUrl, apiClient, httpOptions) {
        if (typeof file === "string") {
          throw new Error("File path is not supported in browser uploader.");
        }
        return await uploadBlob(file, uploadUrl, apiClient, httpOptions);
      }
      async uploadToFileSearchStore(file, uploadUrl, apiClient, httpOptions) {
        if (typeof file === "string") {
          throw new Error("File path is not supported in browser uploader.");
        }
        return await uploadBlobToFileSearchStore(file, uploadUrl, apiClient, httpOptions);
      }
      async stat(file) {
        if (typeof file === "string") {
          throw new Error("File path is not supported in browser uploader.");
        } else {
          return await getBlobStat(file);
        }
      }
    };
    BrowserWebSocketFactory = class {
      static {
        __name(this, "BrowserWebSocketFactory");
      }
      create(url, headers, callbacks) {
        return new BrowserWebSocket(url, headers, callbacks);
      }
    };
    BrowserWebSocket = class {
      static {
        __name(this, "BrowserWebSocket");
      }
      constructor(url, headers, callbacks) {
        this.url = url;
        this.headers = headers;
        this.callbacks = callbacks;
      }
      connect() {
        this.ws = new WebSocket(this.url);
        this.ws.onopen = this.callbacks.onopen;
        this.ws.onerror = this.callbacks.onerror;
        this.ws.onclose = this.callbacks.onclose;
        this.ws.onmessage = this.callbacks.onmessage;
      }
      send(message) {
        if (this.ws === void 0) {
          throw new Error("WebSocket is not connected");
        }
        this.ws.send(message);
      }
      close() {
        if (this.ws === void 0) {
          throw new Error("WebSocket is not connected");
        }
        this.ws.close();
      }
    };
    GOOGLE_API_KEY_HEADER = "x-goog-api-key";
    WebAuth = class {
      static {
        __name(this, "WebAuth");
      }
      constructor(apiKey) {
        this.apiKey = apiKey;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async addAuthHeaders(headers, url) {
        if (headers.get(GOOGLE_API_KEY_HEADER) !== null) {
          return;
        }
        if (this.apiKey.startsWith("auth_tokens/")) {
          throw new Error("Ephemeral tokens are only supported by the live API.");
        }
        if (!this.apiKey) {
          throw new Error("API key is missing. Please provide a valid API key.");
        }
        headers.append(GOOGLE_API_KEY_HEADER, this.apiKey);
      }
    };
    LANGUAGE_LABEL_PREFIX = "gl-node/";
    GoogleGenAI = class {
      static {
        __name(this, "GoogleGenAI");
      }
      get interactions() {
        var _a2;
        if (this._interactions !== void 0) {
          return this._interactions;
        }
        console.warn("GoogleGenAI.interactions: Interactions usage is experimental and may change in future versions.");
        const httpOpts = this.httpOptions;
        if (httpOpts === null || httpOpts === void 0 ? void 0 : httpOpts.extraBody) {
          console.warn("GoogleGenAI.interactions: Client level httpOptions.extraBody is not supported by the interactions client and will be ignored.");
        }
        const nextGenClient = new GeminiNextGenAPIClient({
          baseURL: this.apiClient.getBaseUrl(),
          apiKey: this.apiKey,
          apiVersion: this.apiClient.getApiVersion(),
          clientAdapter: this.apiClient,
          defaultHeaders: this.apiClient.getDefaultHeaders(),
          timeout: httpOpts === null || httpOpts === void 0 ? void 0 : httpOpts.timeout,
          maxRetries: (_a2 = httpOpts === null || httpOpts === void 0 ? void 0 : httpOpts.retryOptions) === null || _a2 === void 0 ? void 0 : _a2.attempts
        });
        this._interactions = nextGenClient.interactions;
        return this._interactions;
      }
      constructor(options) {
        var _a2;
        if (options.apiKey == null) {
          throw new Error("An API Key must be set when running in a browser");
        }
        if (options.project || options.location) {
          throw new Error("Vertex AI project based authentication is not supported on browser runtimes. Please do not provide a project or location.");
        }
        this.vertexai = (_a2 = options.vertexai) !== null && _a2 !== void 0 ? _a2 : false;
        this.apiKey = options.apiKey;
        const baseUrl = getBaseUrl(
          options.httpOptions,
          options.vertexai,
          /*vertexBaseUrlFromEnv*/
          void 0,
          /*geminiBaseUrlFromEnv*/
          void 0
        );
        if (baseUrl) {
          if (options.httpOptions) {
            options.httpOptions.baseUrl = baseUrl;
          } else {
            options.httpOptions = { baseUrl };
          }
        }
        this.apiVersion = options.apiVersion;
        this.httpOptions = options.httpOptions;
        const auth = new WebAuth(this.apiKey);
        this.apiClient = new ApiClient({
          auth,
          apiVersion: this.apiVersion,
          apiKey: this.apiKey,
          vertexai: this.vertexai,
          httpOptions: this.httpOptions,
          userAgentExtra: LANGUAGE_LABEL_PREFIX + "web",
          uploader: new BrowserUploader(),
          downloader: new BrowserDownloader()
        });
        this.models = new Models(this.apiClient);
        this.live = new Live(this.apiClient, auth, new BrowserWebSocketFactory());
        this.batches = new Batches(this.apiClient);
        this.chats = new Chats(this.models, this.apiClient);
        this.caches = new Caches(this.apiClient);
        this.files = new Files(this.apiClient);
        this.operations = new Operations(this.apiClient);
        this.authTokens = new Tokens(this.apiClient);
        this.tunings = new Tunings(this.apiClient);
        this.fileSearchStores = new FileSearchStores(this.apiClient);
      }
    };
  }
});

// ../node_modules/hono/dist/utils/stream.js
var StreamingApi;
var init_stream = __esm({
  "../node_modules/hono/dist/utils/stream.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    StreamingApi = class {
      static {
        __name(this, "StreamingApi");
      }
      writer;
      encoder;
      writable;
      abortSubscribers = [];
      responseReadable;
      /**
       * Whether the stream has been aborted.
       */
      aborted = false;
      /**
       * Whether the stream has been closed normally.
       */
      closed = false;
      constructor(writable, _readable) {
        this.writable = writable;
        this.writer = writable.getWriter();
        this.encoder = new TextEncoder();
        const reader = _readable.getReader();
        this.abortSubscribers.push(async () => {
          await reader.cancel();
        });
        this.responseReadable = new ReadableStream({
          async pull(controller) {
            const { done, value } = await reader.read();
            done ? controller.close() : controller.enqueue(value);
          },
          cancel: /* @__PURE__ */ __name(() => {
            this.abort();
          }, "cancel")
        });
      }
      async write(input) {
        try {
          if (typeof input === "string") {
            input = this.encoder.encode(input);
          }
          await this.writer.write(input);
        } catch {
        }
        return this;
      }
      async writeln(input) {
        await this.write(input + "\n");
        return this;
      }
      sleep(ms) {
        return new Promise((res) => setTimeout(res, ms));
      }
      async close() {
        try {
          await this.writer.close();
        } catch {
        }
        this.closed = true;
      }
      async pipe(body) {
        this.writer.releaseLock();
        await body.pipeTo(this.writable, { preventClose: true });
        this.writer = this.writable.getWriter();
      }
      onAbort(listener) {
        this.abortSubscribers.push(listener);
      }
      /**
       * Abort the stream.
       * You can call this method when stream is aborted by external event.
       */
      abort() {
        if (!this.aborted) {
          this.aborted = true;
          this.abortSubscribers.forEach((subscriber) => subscriber());
        }
      }
    };
  }
});

// ../node_modules/hono/dist/helper/streaming/utils.js
var isOldBunVersion;
var init_utils = __esm({
  "../node_modules/hono/dist/helper/streaming/utils.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    isOldBunVersion = /* @__PURE__ */ __name(() => {
      const version = typeof Bun !== "undefined" ? Bun.version : void 0;
      if (version === void 0) {
        return false;
      }
      const result = version.startsWith("1.1") || version.startsWith("1.0") || version.startsWith("0.");
      isOldBunVersion = /* @__PURE__ */ __name(() => result, "isOldBunVersion");
      return result;
    }, "isOldBunVersion");
  }
});

// ../node_modules/hono/dist/helper/streaming/stream.js
var init_stream2 = __esm({
  "../node_modules/hono/dist/helper/streaming/stream.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_stream();
    init_utils();
  }
});

// ../node_modules/hono/dist/helper/streaming/sse.js
var SSEStreamingApi, run, contextStash, streamSSE;
var init_sse = __esm({
  "../node_modules/hono/dist/helper/streaming/sse.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_html();
    init_stream();
    init_utils();
    SSEStreamingApi = class extends StreamingApi {
      static {
        __name(this, "SSEStreamingApi");
      }
      constructor(writable, readable) {
        super(writable, readable);
      }
      async writeSSE(message) {
        const data = await resolveCallback(message.data, HtmlEscapedCallbackPhase.Stringify, false, {});
        const dataLines = data.split(/\r\n|\r|\n/).map((line) => {
          return `data: ${line}`;
        }).join("\n");
        for (const key of ["event", "id", "retry"]) {
          if (message[key] && /[\r\n]/.test(message[key])) {
            throw new Error(`${key} must not contain "\\r" or "\\n"`);
          }
        }
        const sseData = [
          message.event && `event: ${message.event}`,
          dataLines,
          message.id && `id: ${message.id}`,
          message.retry && `retry: ${message.retry}`
        ].filter(Boolean).join("\n") + "\n\n";
        await this.write(sseData);
      }
    };
    run = /* @__PURE__ */ __name(async (stream2, cb, onError) => {
      try {
        await cb(stream2);
      } catch (e) {
        if (e instanceof Error && onError) {
          await onError(e, stream2);
          await stream2.writeSSE({
            event: "error",
            data: e.message
          });
        } else {
          console.error(e);
        }
      } finally {
        stream2.close();
      }
    }, "run");
    contextStash = /* @__PURE__ */ new WeakMap();
    streamSSE = /* @__PURE__ */ __name((c, cb, onError) => {
      const { readable, writable } = new TransformStream();
      const stream2 = new SSEStreamingApi(writable, readable);
      if (isOldBunVersion()) {
        c.req.raw.signal.addEventListener("abort", () => {
          if (!stream2.closed) {
            stream2.abort();
          }
        });
      }
      contextStash.set(stream2.responseReadable, c);
      c.header("Transfer-Encoding", "chunked");
      c.header("Content-Type", "text/event-stream");
      c.header("Cache-Control", "no-cache");
      c.header("Connection", "keep-alive");
      run(stream2, cb, onError);
      return c.newResponse(stream2.responseReadable);
    }, "streamSSE");
  }
});

// ../node_modules/hono/dist/helper/streaming/text.js
var init_text = __esm({
  "../node_modules/hono/dist/helper/streaming/text.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_context();
    init_streaming();
  }
});

// ../node_modules/hono/dist/helper/streaming/index.js
var init_streaming = __esm({
  "../node_modules/hono/dist/helper/streaming/index.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_stream2();
    init_sse();
    init_text();
  }
});

// ../node_modules/hono/dist/helper/adapter/index.js
var adapter_exports = {};
__export(adapter_exports, {
  checkUserAgentEquals: () => checkUserAgentEquals,
  env: () => env,
  getRuntimeKey: () => getRuntimeKey,
  knownUserAgents: () => knownUserAgents
});
var env, knownUserAgents, getRuntimeKey, checkUserAgentEquals;
var init_adapter = __esm({
  "../node_modules/hono/dist/helper/adapter/index.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    env = /* @__PURE__ */ __name((c, runtime) => {
      const global = globalThis;
      const globalEnv = global?.process?.env;
      runtime ??= getRuntimeKey();
      const runtimeEnvHandlers = {
        bun: /* @__PURE__ */ __name(() => globalEnv, "bun"),
        node: /* @__PURE__ */ __name(() => globalEnv, "node"),
        "edge-light": /* @__PURE__ */ __name(() => globalEnv, "edge-light"),
        deno: /* @__PURE__ */ __name(() => {
          return Deno.env.toObject();
        }, "deno"),
        workerd: /* @__PURE__ */ __name(() => c.env, "workerd"),
        // On Fastly Compute, you can use the ConfigStore to manage user-defined data.
        fastly: /* @__PURE__ */ __name(() => ({}), "fastly"),
        other: /* @__PURE__ */ __name(() => ({}), "other")
      };
      return runtimeEnvHandlers[runtime]();
    }, "env");
    knownUserAgents = {
      deno: "Deno",
      bun: "Bun",
      workerd: "Cloudflare-Workers",
      node: "Node.js"
    };
    getRuntimeKey = /* @__PURE__ */ __name(() => {
      const global = globalThis;
      const userAgentSupported = typeof navigator !== "undefined" && true;
      if (userAgentSupported) {
        for (const [runtimeKey, userAgent] of Object.entries(knownUserAgents)) {
          if (checkUserAgentEquals(userAgent)) {
            return runtimeKey;
          }
        }
      }
      if (typeof global?.EdgeRuntime === "string") {
        return "edge-light";
      }
      if (global?.fastly !== void 0) {
        return "fastly";
      }
      if (global?.process?.release?.name === "node") {
        return "node";
      }
      return "other";
    }, "getRuntimeKey");
    checkUserAgentEquals = /* @__PURE__ */ __name((platform) => {
      const userAgent = "Cloudflare-Workers";
      return userAgent.startsWith(platform);
    }, "checkUserAgentEquals");
  }
});

// ../server/validation.js
function validateMessages(messages) {
  if (!Array.isArray(messages)) {
    throw Object.assign(new Error("messages must be an array"), { status: 400 });
  }
  if (messages.length === 0) {
    throw Object.assign(new Error("messages array is empty"), { status: 400 });
  }
  if (messages.length > MAX_MESSAGES) {
    throw Object.assign(
      new Error(`messages array exceeds the maximum of ${MAX_MESSAGES} entries`),
      { status: 400 }
    );
  }
  return messages.map((msg, i) => {
    if (typeof msg !== "object" || msg === null) {
      throw Object.assign(new Error(`messages[${i}] is not an object`), { status: 400 });
    }
    const role = msg.role;
    if (typeof role !== "string" || !ALLOWED_ROLES.has(role)) {
      throw Object.assign(
        new Error(`messages[${i}].role must be one of: ${[...ALLOWED_ROLES].join(", ")}`),
        { status: 400 }
      );
    }
    const content = msg.content;
    if (typeof content !== "string") {
      throw Object.assign(new Error(`messages[${i}].content must be a string`), { status: 400 });
    }
    if (content.length > MAX_MSG_LENGTH) {
      throw Object.assign(
        new Error(`messages[${i}].content exceeds maximum length of ${MAX_MSG_LENGTH} characters`),
        { status: 400 }
      );
    }
    return { role, content: content.trim() };
  });
}
function validateModelId(modelId) {
  if (typeof modelId !== "string" || !MODEL_ID_RE.test(modelId)) {
    throw Object.assign(
      new Error("Invalid modelId. Use alphanumeric characters, dots, colons, hyphens, underscores, or slashes only."),
      { status: 400 }
    );
  }
  return modelId;
}
var ALLOWED_ROLES, MAX_MESSAGES, MAX_MSG_LENGTH, MODEL_ID_RE;
var init_validation = __esm({
  "../server/validation.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    ALLOWED_ROLES = /* @__PURE__ */ new Set(["user", "assistant", "system"]);
    MAX_MESSAGES = 50;
    MAX_MSG_LENGTH = 8e3;
    MODEL_ID_RE = /^[a-zA-Z0-9_.:\-/]{1,120}$/;
    __name(validateMessages, "validateMessages");
    __name(validateModelId, "validateModelId");
  }
});

// ../server/db.js
async function getApiKey(c, keyName) {
  let key = null;
  try {
    const contextEnv = c ? env(c) : {};
    const upperName = keyName.toUpperCase();
    key = contextEnv[upperName] || contextEnv[keyName] || process.env[upperName] || process.env[keyName];
    if (key && typeof key === "string") {
      key = key.trim();
      if (!key.includes("(Replace this")) return key;
    }
  } catch (error) {
    console.warn(`Error resolving API key environment variables for ${keyName}`);
  }
  return null;
}
var init_db = __esm({
  "../server/db.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_adapter();
    __name(getApiKey, "getApiKey");
  }
});

// ../server/routes/gemini.js
var chatGemini;
var init_gemini = __esm({
  "../server/routes/gemini.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_web();
    init_streaming();
    init_adapter();
    init_validation();
    init_db();
    chatGemini = /* @__PURE__ */ __name(async (c) => {
      try {
        const body = await c.req.json().catch(() => null);
        if (!body || !body.messages) {
          return c.json({ error: "Missing messages in request body" }, 400);
        }
        const apiKey = await getApiKey(c, "gemini_api_key");
        console.log(`
--- GEMINI API KEY DIAGNOSTICS ---`);
        console.log(`Type: ${typeof apiKey}`);
        console.log(`Is Null/Undefined: ${!apiKey}`);
        if (typeof apiKey === "string") {
          console.log(`Length: ${apiKey.length}`);
          console.log(`Matches 'AIza': ${apiKey.startsWith("AIza")}`);
          console.log(`Has whitespace: ${apiKey !== apiKey.trim()}`);
        }
        console.log(`----------------------------------
`);
        if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
          return c.json({ error: "Database configuration error: gemini_api_key is missing or empty" }, 503);
        }
        const messages = validateMessages(body.messages);
        const modelId = validateModelId(body.modelId || "gemini-2.0-flash");
        const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
        const contents = messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        }));
        const isThinkingModel = modelId.includes("thinking") || modelId.includes("flash-preview");
        const result = await ai.models.generateContentStream({
          model: modelId,
          contents,
          ...isThinkingModel && {
            config: {
              thinkingConfig: { includeThoughts: true }
            }
          }
        });
        return streamSSE(c, async (stream2) => {
          const gStream = result.stream || result;
          for await (const chunk of gStream) {
            if (!chunk.candidates?.[0]?.content?.parts) continue;
            for (const part of chunk.candidates[0].content.parts) {
              let text = "";
              if (part.text) text = part.text;
              else if (part.executableCode) text = `
\`\`\`${part.executableCode.language || ""}
${part.executableCode.code}
\`\`\`
`;
              else if (part.codeExecutionResult) text = `
**Output:**
\`\`\`
${part.codeExecutionResult.output}
\`\`\`
`;
              else if (part.thought) text = `
> *Thinking...*
${part.thought}
`;
              if (text) {
                await stream2.writeSSE({ data: JSON.stringify({ content: text }) });
              }
            }
          }
          await stream2.writeSSE({ data: "[DONE]" });
        });
      } catch (error) {
        console.error("[Gemini Route Error]", error);
        const msg = error.message || "AI service error";
        return c.json({ error: msg }, error.status || 500);
      }
    }, "chatGemini");
  }
});

// ../server/routes/openrouter.js
var FALLBACK_MODELS, chatOpenRouter;
var init_openrouter = __esm({
  "../server/routes/openrouter.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_streaming();
    init_adapter();
    init_validation();
    init_db();
    FALLBACK_MODELS = [
      "google/gemini-2.0-flash-lite:free",
      "meta-llama/llama-3.3-70b-instruct:free",
      "qwen/qwen-2.5-72b-instruct:free"
    ];
    chatOpenRouter = /* @__PURE__ */ __name(async (c) => {
      try {
        const apiKey = await getApiKey(c, "openrouter_api_key");
        if (!apiKey) {
          return c.json({ error: "Database configuration error: openrouter_api_key is not set in api_keys table" }, 503);
        }
        const body = await c.req.json().catch(() => ({}));
        const messages = validateMessages(body.messages);
        const modelId = validateModelId(body.modelId || "google/gemini-2.0-flash-lite:free");
        const triedModels = /* @__PURE__ */ new Set([modelId]);
        let currentModel = modelId;
        let attempts = 0;
        const MAX_ATTEMPTS = 3;
        let successResponse = null;
        while (attempts < MAX_ATTEMPTS) {
          try {
            attempts++;
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "HTTP-Referer": "https://murjan-ai.com",
                "X-Title": "Murjan AI",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ model: currentModel, messages, stream: true, temperature: 0.7 })
            });
            if (!response.ok) {
              let msg = `HTTP ${response.status}`;
              try {
                const d = await response.json();
                msg = d.error?.message || msg;
              } catch (_) {
              }
              throw Object.assign(new Error(msg), { status: response.status });
            }
            successResponse = response;
            break;
          } catch (err) {
            console.warn(`[OpenRouter] attempt ${attempts} failed (${currentModel}):`, err.message);
            if (err.message.includes("guardrail") || err.message.includes("data policy") || err.message.includes("User not found") || err.message.includes("OPENROUTER_ACCOUNT")) {
              throw err;
            }
            if (attempts < MAX_ATTEMPTS) {
              const next = FALLBACK_MODELS.find((m) => !triedModels.has(m));
              if (next) {
                currentModel = next;
                triedModels.add(next);
                continue;
              }
            }
            throw err;
          }
        }
        if (!successResponse) return c.json({ error: "Failed to connect to OpenRouter" }, 500);
        return streamSSE(c, async (stream2) => {
          const reader = successResponse.body.getReader();
          const decoder = new TextDecoder();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const lines = decoder.decode(value).split("\n");
            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const raw2 = line.slice(6);
              if (raw2 === "[DONE]") continue;
              let parsed;
              try {
                parsed = JSON.parse(raw2);
              } catch (_) {
                continue;
              }
              if (parsed.error) throw new Error(parsed.error.message || "Provider error");
              const content = parsed.choices?.[0]?.delta?.content || "";
              if (content) {
                await stream2.writeSSE({ data: JSON.stringify({ content }) });
              }
            }
          }
          await stream2.writeSSE({ data: "[DONE]" });
        });
      } catch (error) {
        console.error("[OpenRouter Route]", error.message);
        return c.json({ error: error.message }, error.status || 500);
      }
    }, "chatOpenRouter");
  }
});

// ../server/routes/ollama.js
var chatOllama;
var init_ollama = __esm({
  "../server/routes/ollama.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_streaming();
    init_adapter();
    init_validation();
    chatOllama = /* @__PURE__ */ __name(async (c) => {
      try {
        const processEnv = env(c);
        const OLLAMA_BASE = processEnv.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
        const body = await c.req.json().catch(() => ({}));
        const messages = validateMessages(body.messages);
        const model = validateModelId(body.modelId || "qwen2.5:7b");
        const response = await fetch(`${OLLAMA_BASE}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model, messages, stream: true })
        });
        if (!response.ok) {
          if (response.status === 404) {
            throw Object.assign(
              new Error(`Model '${model}' not found. Run: ollama pull ${model}`),
              { status: 404 }
            );
          }
          const err = await response.json().catch(() => ({}));
          throw Object.assign(
            new Error(err.error || `Ollama HTTP ${response.status}`),
            { status: response.status }
          );
        }
        return streamSSE(c, async (stream2) => {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const lines = decoder.decode(value, { stream: true }).split("\n");
            for (const line of lines) {
              if (!line.trim()) continue;
              let data;
              try {
                data = JSON.parse(line);
              } catch (_) {
                continue;
              }
              if (data.message?.content) {
                await stream2.writeSSE({ data: JSON.stringify({ content: data.message.content }) });
              }
              if (data.done) break;
            }
          }
          await stream2.writeSSE({ data: "[DONE]" });
        });
      } catch (error) {
        console.error("[Ollama Route]", error.message);
        return c.json({ error: error.message }, error.status || 500);
      }
    }, "chatOllama");
  }
});

// ../server/app.js
var app, app_default;
var init_app = __esm({
  "../server/app.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_dist();
    init_cors();
    init_gemini();
    init_openrouter();
    init_ollama();
    app = new Hono2();
    app.use(
      "*",
      cors({
        origin: /* @__PURE__ */ __name((origin) => origin || "*", "origin"),
        allowMethods: ["GET", "POST", "OPTIONS"],
        allowHeaders: ["Content-Type"]
      })
    );
    app.get("/health", (c) => c.json({ status: "ok" }));
    app.get("/tags", async (c) => {
      try {
        const { env: env2 } = await Promise.resolve().then(() => (init_adapter(), adapter_exports));
        const processEnv = env2(c);
        const OLLAMA_BASE = processEnv.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
        const response = await fetch(`${OLLAMA_BASE}/api/tags`);
        if (!response.ok) return c.json({ error: "Ollama offline" }, response.status);
        return c.json(await response.json());
      } catch (_) {
        return c.json({ error: "Ollama offline" }, 503);
      }
    });
    app.post("/chat/gemini", chatGemini);
    app.post("/chat/openrouter", chatOpenRouter);
    app.post("/chat/ollama", chatOllama);
    app.onError((err, c) => {
      console.error("[Server Error]", err.message);
      return c.json({ error: err.message || "Internal server error" }, err.status || 500);
    });
    app_default = app;
  }
});

// api/hello.js
function onRequest(context) {
  return new Response("Hello, Murjan is ready for AI!");
}
var init_hello = __esm({
  "api/hello.js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_cloudflare_pages();
    init_app();
    __name(onRequest, "onRequest");
  }
});

// api/[[route]].js
var pagedApp, onRequest2;
var init_route = __esm({
  "api/[[route]].js"() {
    init_functionsRoutes_0_3130692565895674();
    init_checked_fetch();
    init_cloudflare_pages();
    init_dist();
    init_app();
    pagedApp = new Hono2().basePath("/api");
    pagedApp.route("/", app_default);
    onRequest2 = handle(pagedApp);
  }
});

// ../.wrangler/tmp/pages-Fp6Laq/functionsRoutes-0.3130692565895674.mjs
var routes;
var init_functionsRoutes_0_3130692565895674 = __esm({
  "../.wrangler/tmp/pages-Fp6Laq/functionsRoutes-0.3130692565895674.mjs"() {
    init_hello();
    init_route();
    routes = [
      {
        routePath: "/api/hello",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest]
      },
      {
        routePath: "/api/:route*",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest2]
      }
    ];
  }
});

// ../.wrangler/tmp/bundle-QPkCtR/middleware-loader.entry.ts
init_functionsRoutes_0_3130692565895674();
init_checked_fetch();

// ../.wrangler/tmp/bundle-QPkCtR/middleware-insertion-facade.js
init_functionsRoutes_0_3130692565895674();
init_checked_fetch();

// ../node_modules/wrangler/templates/pages-template-worker.ts
init_functionsRoutes_0_3130692565895674();
init_checked_fetch();

// ../node_modules/path-to-regexp/dist.es2015/index.js
init_functionsRoutes_0_3130692565895674();
init_checked_fetch();
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a2 = options.prefixes, prefixes = _a2 === void 0 ? "./" : _a2, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path2 = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a3 = tokens[i], nextType = _a3.type, index = _a3.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path2 += prefix;
        prefix = "";
      }
      if (path2) {
        result.push(path2);
        path2 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path2 += value;
      continue;
    }
    if (path2) {
      result.push(path2);
      path2 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match2(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match2, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a2 = options.decode, decode = _a2 === void 0 ? function(x) {
    return x;
  } : _a2;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path2 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path2, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path2, keys) {
  if (!keys)
    return path2;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path2.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path2.source);
  }
  return path2;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path2) {
    return pathToRegexp(path2, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path2, keys, options) {
  return tokensToRegexp(parse(path2, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a2 = options.strict, strict = _a2 === void 0 ? false : _a2, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path2, keys, options) {
  if (path2 instanceof RegExp)
    return regexpToRegexp(path2, keys);
  if (Array.isArray(path2))
    return arrayToRegexp(path2, keys, options);
  return stringToRegexp(path2, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match2(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match2(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match2(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match2(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env2, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path: path2 } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path2,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env: env2,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env2["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env2["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_functionsRoutes_0_3130692565895674();
init_checked_fetch();
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_functionsRoutes_0_3130692565895674();
init_checked_fetch();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-QPkCtR/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;

// ../node_modules/wrangler/templates/middleware/common.ts
init_functionsRoutes_0_3130692565895674();
init_checked_fetch();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-QPkCtR/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*! Bundled license information:

@google/genai/dist/web/index.mjs:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=functionsWorker-0.09687394510669889.mjs.map
