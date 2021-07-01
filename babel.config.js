const env = process.env.NODE_ENV;

module.exports = {
    presets: [
        ['@pokemonon/babel-preset-common', { env }],
    ],
};