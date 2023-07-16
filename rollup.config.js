import meta from "./package.json" assert {type: "json"};
import terser from '@rollup/plugin-terser';
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const config = {
    input: 'src/index.js',
    output: {
        file: `dist/${meta.name}.js`,
        name: 'partition',
        format: 'umd',
        indent: false,
    },
    plugins: [
        nodeResolve({
            browser: true
        }),
        commonjs()
    ]
}

export default [
    config,
    {
        ...config,
        output: {
            ...config.output,
            file: `dist/${meta.name}.min.js`,
            format: 'cjs',
        },
        plugins: [
            terser(),
            nodeResolve(),
            commonjs()
        ]
    }
]
