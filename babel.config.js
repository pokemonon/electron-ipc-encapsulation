module.exports = {
    presets: [
        '@babel/preset-typescript',
        ['@pokemonon/babel-preset-common', {
            useBuiltIns: false,
        }],
    ],
};