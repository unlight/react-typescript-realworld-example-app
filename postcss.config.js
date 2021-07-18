module.exports = ({ env, cwd }) => {
    const isProduction = env === 'production';
    const plugins = [
        // https://github.com/postcss/postcss-custom-properties for ie11
        require('tailwindcss')(),
        require('autoprefixer')(),
        isProduction
            ? require('cssnano')({
                  preset: [
                      'default',
                      {
                          discardComments: {
                              removeAll: true,
                          },
                      },
                  ],
              })
            : false,
    ];

    return {
        plugins,
    };
};
