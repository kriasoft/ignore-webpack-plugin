declare module "index" {
    export type Compiler = any;
    export type JavascriptParser = any;
    /**
     * Excludes dynamically imported dependencies from the output bundle.
     */
    export class IgnoreAsyncImportsPlugin {
        /**
         * Creates a new instance of the plugin.
         *
         * @param {Object} config Ignore options.
         */
        constructor(config?: any);
        config: any;
        /**
         * @param {Compiler} compiler
         */
        apply(compiler: any): void;
        name: any;
        /**
         * @param {JavascriptParser} parser
         */
        handleParser(parser: any, parserOptions: any): void;
    }
}
