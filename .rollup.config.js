import path from 'path';
import pak from './package.json';
// import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';

export default {
  input: path.resolve(__dirname, pak.module),
  output: [
    {
      file: 'dist/bundle-esm.js',
      format: 'esm',
    },
    {
      file: 'dist/bundle-cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/bundle-iife.js',
      format: 'iife',
      name: 'HttpScheduler',
    },
    {
      file: 'dist/bundle-umd.js',
      format: 'umd',
      name: 'HttpScheduler',
    },
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('develop'),
    }),
    babel({
      rootMode: 'upward',
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    // terser(),
  ],
};
