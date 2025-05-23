module.exports = function babelConfig(api) {
    api.cache(true);
    return {
        presets: [
            '@babel/preset-typescript',
            '@babel/react',
            [
                '@babel/env',
                {
                    modules: false,
                    targets: {
                        node: '12',
                        browsers: ['last 2 versions'],
                    },
                },
            ],
        ],
        plugins: [
            '@babel/plugin-transform-class-properties',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-optional-chaining',
        ],
        ignore: [
            'node_modules',
            'build',
            '**/*.stories.*',
            '**/__tests__',
            '**/__mocks__',
            '**/test-utils',
        ],
    };
};