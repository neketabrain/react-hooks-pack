import path from "path";

import typescript from "rollup-plugin-typescript2";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

import pkg from "./package.json";

const globals = {
  react: "react",
};

export default {
  input: path.resolve(__dirname, "src", "index.ts"),
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      globals,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
      globals,
    },
    {
      name: "ReactHooksPack",
      file: pkg.browser,
      format: "umd",
      sourcemap: true,
      globals,
    },
  ],
  plugins: [
    nodeResolve({
      customResolveOptions: {
        moduleDirectory: "node_modules",
      },
    }),
    commonjs({
      include: "node_modules/**",
    }),
    typescript({
      typescript: require("typescript"),
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
      clean: true,
      rollupCommonJSResolveHack: true,
    }),
  ],
  external: ["react", "react-dom"],
};
