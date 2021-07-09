import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from '@rollup/plugin-babel';
import { version, main, module } from './package.json';

const banner = `/*!
 * jquery-timepicker v${version} - A jQuery timepicker plugin inspired by Google Calendar. It supports both mouse and keyboard navigation.
 * Copyright (c) 2021 Jon Thornton - https://www.jonthornton.com/jquery-timepicker/
 * License: MIT
 */`;

export default {
  input: 'src/index.js',
  output: [
    {
      file: main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: module,
      format: 'esm',
      sourcemap: true,
    }
  ],
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    terser(),
    resolve(),
    commonjs(),
  ]
};