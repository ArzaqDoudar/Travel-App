const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
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
        }),
        new CopyWebpackPlugin({ patterns: [{ from: 'src/client/media', to: 'media' }] }),
        new WorkboxPlugin.GenerateSW(),
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify('http://localhost:8000'),
        })
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all'
    }
}
