var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './demo/main.js',
    output: {
        path: path.resolve(__dirname, '../demo/dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                postcss: [require('postcss-cssnext')({
                    features: {
                        rem: false
                    }
                }), require('postcss-pxtorem')({
                    rootValue: 20,
                    propWhiteList: []
                })]
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                limit: 10000,
                name: '[name].[ext]?[hash]'
            }
        }, {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    resolveLoader: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        },
        modules: [
            path.resolve(__dirname, "src"),
            "node_modules"
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../demo'),
        historyApiFallback: true,
        noInfo: true,
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 8081
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        })
    ])
}