import path from "path";

import typescript from "rollup-plugin-typescript2";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { eslint } from "rollup-plugin-eslint";

import pkg from "./package.json";

const outputConfig = {
  sourcemap: true,
  exports: "named",
  globals: {
    react: "react",
  },
};

export default {
  input: path.resolve(__dirname, "src", "index.ts"),
  output: [
    {
      file: pkg.main,
      format: "cjs",
      ...outputConfig,
    },
    {
      file: pkg.module,
      format: "es",
      ...outputConfig,
    },
    {
      name: "ReactHooksPack",
      file: pkg.browser,
      format: "umd",
      ...outputConfig,
    },
  ],
  plugins: [
    eslint({
      cache: true,
      fix: true,
      throwOnError: true,
    }),
    nodeResolve(),
    commonjs(),
    typescript({
      typescript: require("typescript"),
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
      clean: true,
      rollupCommonJSResolveHack: true,
    }),
  ],
  external: ["react", "react-dom"],
};
