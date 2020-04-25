const path = require('path');
const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');
const context = __dirname;
const title = 'App';

module.exports = (options = {}, argv) => {
    options = {
        libs: false,
        style: false,
        test: false,
        coverage: false,
        mode: argv.mode ? argv.mode : 'development',
        debug: false,
        ...options,
        get prod() {
            return this.mode === 'production';
        },
        get minimize() {
            return this.prod;
        },
        get devtool() {
            return 'webpack_devtool' in process.env
                ? process.env.webpack_devtool
                : 'cheap-source-map';
        },
        get sourceMap() {
            const devtool = this.devtool;
            return !devtool || devtool === '0' ? false : true;
        },
    };
    for (const [key, value] of Object.entries(options)) process.stdout.write(`${key}:${value} `);
    let config = {
        context,
        entry: {
            app: `${sourcePath}/index.tsx`,
        },
        output: {
            path: buildPath,
            chunkFilename: `[name]${options.prod ? '-[hash:6]' : ''}.js`,
            filename: `[name]${options.prod ? '-[hash:6]' : ''}.js`,
        },
        mode: options.mode,
        devtool: (() => {
            if (options.test) return 'inline-source-map';
            if (options.prod) return 'source-map';
            return options.devtool;
        })(),
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
            plugins: (() => {
                const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
                return [new TsconfigPathsPlugin()];
            })(),
        },
        devServer: {
            contentBase: [buildPath],
            overlay: false,
            disableHostCheck: true,
        },

        module: {
            rules: [
                { parser: { amd: false } },
                {
                    test: /\.(js|css)$/,
                    exclude: sourcePath,
                    enforce: 'pre',
                    use: 'source-map-loader',
                },
                {
                    test: (() => {
                        const testTranspileModule = (() => {
                            const transpileModules = [
                                'pupa',
                                ['1-liners', 'module'].join(path.sep),
                            ];
                            return (file) =>
                                Boolean(transpileModules.find((name) => name.includes(file)));
                        })();
                        return function testTranspileTypeScript(file) {
                            if (file.slice(-4) === '.tsx') return true;
                            if (file.slice(-3) === '.ts') return true;
                            return testTranspileModule(file);
                        };
                    })(),
                    use: {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            compilerOptions: {
                                declaration: false,
                                declarationMap: false,
                            },
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    oneOf: [
                        {
                            test: /style\.css$/i,
                            use: [
                                { loader: 'style-loader/url', options: { hmr: false } },
                                {
                                    loader: 'file-loader',
                                    options: {
                                        name: `[name]${options.prod ? '-[hash:6]' : ''}.[ext]`,
                                    },
                                },
                            ],
                        },
                        { use: 'css-loader' },
                    ],
                },
                {
                    test: /\.html$/,
                    use: [{ loader: 'html-loader', options: { minimize: false } }],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|png|jpg|gif|svg)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: `i/[name]${options.prod ? '-[hash:6]' : ''}.[ext]`,
                        },
                    },
                },
                options.coverage
                    ? {
                          enforce: 'post',
                          test: /\.tsx?$/,
                          loader: 'istanbul-instrumenter-loader',
                          options: { esModules: true },
                          exclude: [/\.spec\.tsx?$/, /node_modules/, /src[\\/]app[\\/]testing/],
                      }
                    : undefined,
            ].filter(Boolean),
        },

        plugins: [
            (() => {
                const HtmlWebpackPlugin = require('html-webpack-plugin');
                return new HtmlWebpackPlugin({
                    template: './src/index.html',
                    inject: true,
                    config: { ...options },
                    title,
                });
            })(),
            ...(!options.libs && !options.prod
                ? () => {
                      const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
                      const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
                      const fs = require('fs');
                      const libs = `${buildPath}/libs.json`;
                      if (!fs.existsSync(libs)) {
                          console.log(`\nCannot link '${libs}', creating libs...`);
                          const { execFileSync } = require('child_process');
                          execFileSync(
                              'node',
                              [require.resolve('webpack/bin/webpack'), '--env.libs'],
                              { stdio: 'inherit' },
                          );
                      }
                      return [
                          new DllReferencePlugin({
                              context,
                              manifest: require(libs),
                          }),
                          new AddAssetHtmlPlugin({
                              filepath: `${buildPath}/libs.js`,
                              typeOfAsset: 'js',
                          }),
                      ];
                  }
                : () => [])(),
        ].filter(Boolean),

        optimization: {
            namedModules: !options.prod || options.debug ? true : false,
            namedChunks: !options.prod || options.debug ? true : false,
            minimizer: [
                (options.minimize
                    ? () => {
                          const TerserPlugin = require('terser-webpack-plugin');
                          return new TerserPlugin({
                              terserOptions: {
                                  output: {
                                      comments: false,
                                  },
                              },
                          });
                      }
                    : () => undefined)(),
            ].filter(Boolean),
        },
    };

    // Make config for libs build.
    if (options.libs) {
        config = {
            ...config,
            ...{
                entry: (() => {
                    const readPkgUp = require('read-pkg-up');
                    let dependencies = readPkgUp.sync().packageJson.dependencies;
                    dependencies = Object.keys(dependencies);
                    return [
                        ...dependencies,
                        'ansi-html',
                        'events/events',
                        'html-entities',
                        'loglevel/lib/loglevel',
                        'node-libs-browser/node_modules/punycode/punycode',
                        'strip-ansi',
                        'webpack/hot/emitter',
                        'webpack/hot/log',
                        'webpack/hot/log-apply-result',
                        'querystring-es3',
                        'sockjs-client/dist/sockjs',
                        'url/url',
                        'url/util',
                        'webpack-dev-server/client/overlay',
                        'webpack-dev-server/client/clients/BaseClient',
                        'webpack-dev-server/client/clients/SockJSClient',
                        'webpack-dev-server/client/utils/reloadApp',
                        'webpack-dev-server/client/utils/sendMessage',
                        'webpack-dev-server/client/utils/createSocketUrl',
                    ];
                })(),
                devtool: 'source-map',
                output: {
                    path: buildPath,
                    filename: 'libs.js',
                    library: 'libs',
                },
                plugins: [
                    (() => {
                        const DllPlugin = require('webpack/lib/DllPlugin');
                        return new DllPlugin({
                            name: 'libs',
                            path: `${buildPath}/libs.json`,
                        });
                    })(),
                ].filter(Boolean),
            },
        };
    }

    return config;
};
