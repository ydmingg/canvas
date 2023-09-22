import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import rolljson from "@rollup/plugin-json"
// 代码转换和压塑
import { babel } from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
// 注入变量
import replace from '@rollup/plugin-replace'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
// 别名配置
import alias from '@rollup/plugin-alias'
// 获取当前版本号
const version = process.env.npm_package_version.replaceAll('.', '')
// 别名配置解析器
const customResolver = nodeResolve({
    extensions: ['.mjs', '.js', '.jsx', '.json']
});
let override = { compilerOptions: { declaration: false, target: "es5" } };
// 获取当前环境变量
const NODE_ENV = process.env.NODE_ENV
// 环境变量: production
const isProduction = NODE_ENV === ''
// 插件
const plugins = [
    // 别名
    alias({
        entries: [
            { find: '@src', replacement: './src' }
        ],
        customResolver
    }),
    // es6/es7 转 es5
    babel({
        // polyfill
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
    }),
    // 处理TS
    typescript({
        tsconfig: './tsconfig.json',
        tsconfigOverride: override,
    }),
    nodeResolve({
        browser: true,
        preferBuiltins: false,
    }),
    commonjs(),
    rolljson(),
    // 环境变量
    replace({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        preventAssignment: true,
        // delimiters: ["fx-pages/pages/login", "https://static.funxdata.com/login.js"]
    }),
]
// 打包配置项
let config = ''
// 生成环境为true，开发环境为flase
if (isProduction) {
    // 生产环境下删除debug代码
    plugins.push(terser({
        mangle: { toplevel: true },
        compress: {
            module: true,
            toplevel: true,
            unsafe_arrows: true,
            drop_console: true,
            drop_debugger: true,
        },
        output: { comments: false }
    }))
    // 打包配置
    config = [
        // 打包Element
        {
            // 入口
            input: './src/pages/index.ts',
            // 出口
            output: {
                format: 'es',
                file:'lib/index.js'
            },
            plugins: plugins
        },
    ]
    
} else {
    // 开发环境下配置
    const extraPlugins = [
        serve({
            host: '192.168.5.235',
            port: 8062,
            // open: true,
            contentBase: './',
        }),
        livereload()
    ]
    // 加入插件数组
    plugins.push(...extraPlugins)
    // 打包配置
    config = [{
        // 入口
        input: './src/index.ts',
        // 出口
        output: {
            format: 'es',
            file: `./lib/index.js`
        },
        plugins: plugins
    },]
}

export default config;