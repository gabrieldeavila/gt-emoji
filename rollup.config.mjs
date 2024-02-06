import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import babel from "rollup-plugin-babel";
import dts from "rollup-plugin-dts";
import sourcemaps from "rollup-plugin-sourcemaps";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/esm/index.js",
        format: "esm",
        sourcemap: true,
        sourcemapExcludeSources: true, // This is optional, but recommended for security reasons
      },
    ],
    external: ["react", "react-dom", "react-trigger-state", "styled-components"],
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
      resolve(),
      commonjs(),
      sourcemaps(),
      postcss(),
      terser(),
      babel({
        extensions: [".js", ".ts", ".tsx"],
        exclude: "node_modules/**",
        presets: [
          [
            "@babel/preset-env",
            {
              targets: "> 0.25%, not dead",
            },
          ],
          "@babel/preset-typescript",
        ],
        plugins: [
          [
            "babel-plugin-styled-components",
            {
              ssr: true,
            },
          ],
        ],
      }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
