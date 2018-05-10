const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const server = process.env.SERVER || 'dev';

module.exports = {
    entry: './src/app.ts',
    plugins: [
        //npm install --save-dev clean-webpack-plugin
        new CleanWebpackPlugin(['dist']),
        //npm install --save-dev html-webpack-plugin
        new HtmlWebpackPlugin({
            title: 'Sample ts',
            template: './src/index.html',
            inject: true
        }),
        // new MiniCssExtractPlugin({
        //     filename: '[name].[chunkhash].css',
        //     chunkFilename: '[id].[chunkhash].css'
        // }),
        new CopyWebpackPlugin([
            {from: './src/template', to: 'template'}
        ])
    ],
    devtool: 'inline-source-map',
    //npm install --save-dev webpack-dev-server
    devServer: {
        contentBase: './dist',
        public: 'local.iam0.com',
        host: '0.0.0.0',
        port: '9000'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            gnbConfig: 'stove-cafe-component/src/component/pc/GNB/config/stove.js',
            config: `stove-cafe-component/src/core/config/${server}.js`
        },
        modules: ['node_modules'],
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            //Loading TypeScript : npm install --save-dev ts-loader typescript
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            /*
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, 'src'),
                    /stove-cafe-component/
                ]
            },
            */
            /*
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {minimize: true}
                    }
                ]
            },
            */
            //Loading CSS : npm install --save-dev style-loader css-loader
            {
                test: /\.css$/,
                //use: [MiniCssExtractPlugin.loader, 'css-loader']
                use: ['style-loader', 'css-loader']
            },
            //Loading Images : npm install --save-dev file-loader
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    name: 'img/[name].[hash:7].[ext]',
                    limit: 10000
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'fonts/[name].[hash:7].[ext]',
                    limit: 10000
                }
            }
            
        ]
    }
};