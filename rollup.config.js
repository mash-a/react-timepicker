import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';

import { main, module } from './package.json';

const path = require('path');
const projectRootDir = path.resolve(__dirname);


export default {
  input: 'src/index.js',
  external: ['react', 'react-dom', /@babel\/runtime/],
  output: [
    {
      file: main,
      format: 'cjs',
      sourcemap: true,
      name: 'TimePicker',
    },
    {
      file: module,
      format: 'esm',
      sourcemap: true,
      name: 'TimePicker',
    },
  ],
  plugins: [
    peerDepsExternal(),
    alias({
      entries: [
        { find: 'src', replacement: path.resolve(projectRootDir, 'src') },
        { find: 'utils', replacement: path.resolve(projectRootDir, 'utils') },
        { find: "Components", replacement: path.resolve(projectRootDir, 'src/Components')}
      ]
    }),
    postcss({
      extensions: [".css"],
    }),
    nodeResolve({ extensions: [".js"] }),
    babel({ 
      exclude: 'node_modules/**', 
      presets: ["@babel/preset-react", "@babel/preset-env"], 
      babelHelpers: 'runtime', 
      "plugins": [
        "@babel/plugin-transform-runtime",
      ] 
    }),
    commonjs(),
    terser(),
  ],
};
