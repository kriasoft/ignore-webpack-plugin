/* SPDX-FileCopyrightText: 2021-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

const { readFileSync } = require("fs");
const { webpack } = require("webpack");
const config = require("./webpack.config");

test("bundle", function (done) {
  const compiler = webpack(config, function (err, stats) {
    expect(err).toBeNull();
    expect(stats.compilation.errors).toMatchInlineSnapshot(`Array []`);

    const bundle = readFileSync("./test/app.bundle.js", "utf-8");
    expect(bundle.includes("external")).toBe(false);
    expect(bundle.includes("Promise.resolve({})")).toBe(true);

    done();
  });
});
