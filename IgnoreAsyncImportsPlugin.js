/**
 * @copyright 2021-present Kriasoft (https://git.io/JtoKE)
 *
 * @typedef {import("webpack").Compiler} Compiler
 * @typedef {import("webpack").javascript.JavascriptParser} JavascriptParser
 */

const path = require("path");
const webpack = require("webpack");
const ImportDependency = require("./ImportDependency");

/**
 * Excludes dynamically imported dependencies from the output bundle.
 */
class IgnoreAsyncImportsPlugin {
  /**
   * Creates a new instance of the plugin.
   *
   * @param {Object} config Ignore options.
   */
  constructor(config = {}) {
    this.config = config;
  }

  /**
   * @param {Compiler} compiler
   */
  apply(compiler) {
    this.name = this.constructor.name;
    const handleParser = this.handleParser.bind(this);

    compiler.hooks.compilation.tap(
      this.name,
      (compilation, { normalModuleFactory }) => {
        compilation.dependencyFactories.set(
          ImportDependency,
          normalModuleFactory
        );
        compilation.dependencyTemplates.set(
          ImportDependency,
          new ImportDependency.Template()
        );

        normalModuleFactory.hooks.parser
          .for("javascript/auto")
          .tap(this.name, handleParser);
        normalModuleFactory.hooks.parser
          .for("javascript/dynamic")
          .tap(this.name, handleParser);
        normalModuleFactory.hooks.parser
          .for("javascript/esm")
          .tap(this.name, handleParser);
      }
    );
  }

  /**
   * @param {JavascriptParser} parser
   */
  handleParser(parser, parserOptions) {
    if (parserOptions.import !== undefined && !parserOptions.import) {
      return;
    }

    // Replace import(...) calls with Promise.resolve(...)
    parser.hooks.importCall.tap(this.name, (expr) => {
      const dep = new ImportDependency(expr.source.value, expr.range);
      dep.loc = expr.loc;
      parser.state.module.addDependency(dep);
      return true;
    });
  }
}

module.exports = IgnoreAsyncImportsPlugin;
