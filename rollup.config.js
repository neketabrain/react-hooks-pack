import path from "path";

import typescript from "rollup-plugin-typescript2";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import { eslint } from "rollup-plugin-eslint";

import pkg from "./package.json";

const outputConfig = {
  sourcemap: false,
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
      format: "esm",
      ...outputConfig,
    },
    {
      name: "reactHooksPack",
      file: "lib/index.js",
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
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    }),
  ],
  external: ["react", "react-dom"],
};
