const path = require('path');

const { dependencies } = require('./package.json');

const resolve = (...p) => path.resolve(__dirname, ...p);

module.exports = {
    presets: '@packbag/cli-rollup-preset-common',
    chainConfig() {
        const external = [
            ...Object.keys(dependencies),
            'electron',
        ];
        const baseOpt = {
            format: 'cjs',
            exports: 'auto',
        };
        return [
            {
                input: resolve('src/main.ts'),
                output: {
                    ...baseOpt,
                    file: 'dist/main.js',
                },
                external,
            },
            {
                input: resolve('src/renderer.ts'),
                output: {
                    ...baseOpt,
                    file: 'dist/renderer.js',
                },
                external,
            },
        ];
    },
};
