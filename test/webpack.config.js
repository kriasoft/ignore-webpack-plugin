/* SPDX-FileCopyrightText: 2021-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

const { IgnoreAsyncImportsPlugin } = require("..");

module.exports = {
  entry: {
    main: "./app.main",
  },

  context: __dirname,

  output: {
    path: __dirname,
    filename: "app.bundle.js",
    chunkFilename: "app.bundle.[name].js",
  },

  optimization: {
    minimize: false,
  },

  plugins: [new IgnoreAsyncImportsPlugin()],
};
