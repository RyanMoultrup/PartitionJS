import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from "@rollup/plugin-alias";
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';

const nodeConfig = {
    input: 'src/index.js',
    output: {
        file: 'dist/partitionjs.node.cjs',
        format: 'cjs',
        exports: 'auto',
    },
    plugins: [
        alias({
            entries: [
                {
                    find: './workers/web.worker.js',
                    replacement: './workers/node.worker.js'
                }
            ]
        }),
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
    ]
};

const webConfig = {
    input: 'src/index.js',
    output: {
        file: 'dist/partitionjs.web.cjs.js',
        format: 'cjs',
        name: 'Partition',
        exports: 'auto',
    },
    plugins: [
        commonjs(),
        nodeResolve()
    ]
};

const cdnConfig = {
    input: 'src/index.js',
    output: {
        file: 'dist/partitionjs.umd.min.js',
        format: 'umd',
        name: 'Partition',
        exports: 'auto',
    },
    plugins: [
        // alias({
        //     entries: [
        //         {
        //             find: 'worker:worker.js',
        //             replacement: './workers/web.worker.js'
        //         }
        //     ]
        // }),
        nodeResolve({
            browser: true,
            preferBuiltins: false,
        }),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: [
                ['@babel/preset-env', {
                    targets: {
                        browsers: '> 0.75%, not dead'
                    }
                }]
            ]
        }),
        terser()
    ]
};

export default [nodeConfig, webConfig, cdnConfig];
