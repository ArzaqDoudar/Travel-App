const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/client/index.js',
    // entry: {
    //     index: "./src/client/index.js",
    //     mytrip: "./src/client/mytrip.js",
    // },
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', {
                    loader: "sass-loader",
                    options: {
                        api: "modern-compiler",
                        sassOptions: {
                            // Your sass options
                        },
                    },
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
            chunks: ['main']
        }),
        new HtmlWebPackPlugin({
            template: "./src/client/views/mytrip.html",
            filename: "./mytip.html",
            chunks: ['mytrip']
        }),
        new CopyWebpackPlugin({ patterns: [{ from: 'src/client/media', to: 'media' }] }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify('http://localhost:8000')
        }),
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all'
    }
}
