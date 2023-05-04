export default {
  path: __dirname + '../',
  title: 'Plan',
  version: '1.0.0',
  tagIndex: 3,
  ignore: ['/swagger', '/docs', '/uploads/*'],
  snakeCase: true,
  preferredPutPatch: 'PUT', // if PUT/PATCH are provided for the same rout, prefer PUT
  common: {
    parameters: {}, // OpenAPI conform parameters that are commonly used
    headers: {}, // OpenAPI confomr headers that are commonly used
  },
}
