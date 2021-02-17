/**
 * @copyright 2021-present Kriasoft (https://git.io/JtoKE)
 *
 * @typedef {import("webpack").Compiler} Compiler
 * @typedef {import("webpack").javascript.JavascriptParser} JavascriptParser
 */

const path = require("path");
const webpack = require("webpack");

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

    // Exclude dynamically imported dependencies.
    parser.hooks.importCall.tap(this.name, () => {
      return false;
    });
  }
}

module.exports = { IgnoreAsyncImportsPlugin };
