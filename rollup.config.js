import path from "path";

import pkg from "./package.json";

import typescript from "rollup-plugin-typescript2";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: path.resolve(__dirname, "src", "index.ts"),
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
    {
      file: pkg.browser,
      format: "iife",
      name: "ReactHooksPack",
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    nodeResolve(),
    typescript({
      typescript: require("typescript"),
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
      clean: true,
      rollupCommonJSResolveHack: true,
    }),
    commonjs(),
  ],
};
