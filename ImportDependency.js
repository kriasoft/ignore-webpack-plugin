/* SPDX-FileCopyrightText: 2021-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

"use strict";

const InitFragment = require("webpack/lib/InitFragment");
const Dependency = require("webpack/lib/Dependency");
const DependencyTemplate = require("webpack/lib/DependencyTemplate");

/** @typedef {import("webpack").sources.ReplaceSource} ReplaceSource */
/** @typedef {import("webpack").ChunkGraph} ChunkGraph */
/** @typedef {import("webpack").Dependency} Dependency */
/** @typedef {import("webpack").Dependency.UpdateHashContext} UpdateHashContext */
/** @typedef {import("webpack").util.Hash} Hash */

class ImportDependency extends Dependency {
  constructor(request, range) {
    super();
    this.request = request;
    this.range = range;
  }

  get type() {
    return "async import";
  }

  get category() {
    return "esm";
  }

  /**
   * Update the hash
   * @param {Hash} hash hash to be updated
   * @param {UpdateHashContext} context context
   * @returns {void}
   */
  updateHash(hash, context) {
    hash.update(this.request);
  }

  serialize(context) {
    const { write } = context;
    write(this.request);
    write(this.range);
    super.serialize(context);
  }

  deserialize(context) {
    const { read } = context;
    this.request = read();
    this.range = read();
    super.deserialize(context);
  }
}

class ImportDependencyTemplate extends DependencyTemplate {
  /**
   * @param {Dependency} dependency the dependency for which the template should be applied
   * @param {ReplaceSource} source the current replace source which can be modified
   * @returns {void}
   */
  apply(dependency, source) {
    const dep = /** @type {ImportDependency} */ (dependency);
    // TODO: Provide the requested chunk name
    source.replace(dep.range[0], dep.range[1] - 1, "Promise.resolve({})");
  }
}

ImportDependency.Template = ImportDependencyTemplate;

module.exports = ImportDependency;
