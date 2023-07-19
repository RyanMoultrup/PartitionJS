import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import replace from '@rollup/plugin-replace';
// import alias from "@rollup/plugin-alias";
// import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
// import url from "rollup-plugin-url";

const nodeConfig = {
    input: 'src/index.js',
    output: {
        file: 'dist/partitionjs.node.js',
        format: 'cjs',
        exports: 'auto',
    },
    plugins: [
        // replace({
        //     preventAssignment: true,
        //     'IMPORT_WORKER_THREADS': "const { Worker } = require('worker_threads');",
        //     // 'WORKER_FILE_PATH': './workers/node.worker.js'
        // }),
        // alias({
        //     entries: [
        //         { find: './worker.js', replacement: './workers/node.worker.js' }
        //     ]
        // }),
        // url({
        //     include: ['**/*.worker.js']
        // }),
        nodeResolve({
            preferBuiltins: true,
        }),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: [
                ['@babel/preset-env', {
                    targets: {
                        node: 'current'
                    }
                }]
            ]
        }),
        // terser()
    ]
};

// const webConfig = {
//     input: 'src/index.js',
//     output: {
//         file: 'dist/partitionjs.web.js',
//         format: 'umd',
//         name: 'Partition',
//         exports: 'auto',
//     },
//     plugins: [
//         url({
//             include: ['**/*.worker.js']
//         }),
//         nodeResolve({
//             browser: true,
//             preferBuiltins: false,
//         }),
//         commonjs(),
//         replace({
//             preventAssignment: true,
//             'IMPORT_WORKER_THREADS': "const { Worker } = {};",
//             // 'WORKER_FILE_PATH': "'./workers/web.worker.js'"
//         }),
//         babel({
//             babelHelpers: 'bundled',
//             exclude: 'node_modules/**',
//             presets: [
//                 ['@babel/preset-env', {
//                     targets: {
//                         browsers: '> 0.25%, not dead'
//                     }
//                 }]
//             ]
//         }),
//         // terser()
//     ]
// };

// export default [nodeConfig, webConfig];
export default nodeConfig;
