# Ignore Webpack Plugin &middot; [![npm package][npm-v]][npm] [![npm package][npm-dm]][npm] [![Discord][discord-badge]][discord]

This [Webpack](https://webpack.js.org/) plugin excludes dynamically imported
dependencies from the output bundle. This is often used for scenarios such as
server-side rendering / pre-rendering (SSR).

## Usage Example

#### `webpack.config.js`

```js
const { IgnoreAsyncImportsPlugin } = require("ignore-webpack-plugin");

module.exports = [
  // The core application bundle for browsers.
  {
    name: "app",
    entry: "./src/index",
    /* ... other settings ... */
  },
  // Additional (reverse proxy) bundle for Cloudflare Workers.
  {
    name: "proxy",
    entry: "./src/proxy",
    output: { filename: "proxy.js" },
    target: "browserslist:last 2 Chrome versions",
    /* ... other settings ... */
    plugins: [new IgnoreAsyncImportsPlugin()],
  },
];
```

All the `import(...)` expressions within the "proxy" bundle in the example above
will be replaced with `Promise.resolve(...)`.

## Related Projects

- [GraphQL API and Relay Starter Kit](https://github.com/kriasoft/graphql-starter) - Monorepo template pre-configured with GraphQL API, React, and Relay.
- [Node.js API Starter Kit](https://github.com/kriasoft/node-starter-kit) - Project template pre-configured with PostgreSQL, OAuth, emails, and unit tests.

## Copyright

Copyright © 2021-present Kriasoft. This source code is licensed under the MIT license found in the
[LICENSE](https://github.com/kriasoft/ignore-webpack-plugin/blob/main/LICENSE) file.

---

<sup>Made with ♥&nbsp; by Konstantin Tarkus ([@koistya](https://twitter.com/koistya), [blog](https://medium.com/@koistya))
and [contributors](https://github.com/kriasoft/ignore-webpack-plugin/graphs/contributors).</sup>

[npm]: https://www.npmjs.org/package/ignore-webpack-plugin
[npm-v]: https://img.shields.io/npm/v/ignore-webpack-plugin?style=flat-square
[npm-dm]: https://img.shields.io/npm/dm/ignore-webpack-plugin?style=flat-square
[discord]: https://discord.gg/bSsv7XM
[discord-badge]: https://img.shields.io/static/v1?logo=discord&label=&message=Join+us+on+Discord!&color=033&style=flat-square
