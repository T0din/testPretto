module.exports = function(api) {
    api.cache(true);

    const presets = [
        [
            '@babel/env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
    ];
    const plugins = ['@babel/plugin-proposal-class-properties'];

    const babelrcRoots = ['.', './apps/*'];

    return {
        babelrcRoots,
        presets,
        plugins,
    };
};
