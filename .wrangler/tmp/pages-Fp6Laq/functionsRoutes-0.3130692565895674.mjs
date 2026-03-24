import { onRequest as __api_hello_js_onRequest } from "C:\\laragon\\www\\Murjan-AI\\functions\\api\\hello.js"
import { onRequest as __api___route___js_onRequest } from "C:\\laragon\\www\\Murjan-AI\\functions\\api\\[[route]].js"

export const routes = [
    {
      routePath: "/api/hello",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_hello_js_onRequest],
    },
  {
      routePath: "/api/:route*",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api___route___js_onRequest],
    },
  ]