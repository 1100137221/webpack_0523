
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// 這邊使用 HtmlWebpackPlugin，將 bundle 好的 <script> 插入到 body。${__dirname} 為 ES6 語法對應到 __dirname  
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/index.html`,
  filename: 'index.html',
  inject: 'body',
});

const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包

module.exports = {
    entry: {
        app: './src/app.js',
        vendor: ['react', 'react-dom']
    },
    output: {
        path: __dirname + '/dist',
        filename: "[name].js",
    },
     module: {
         loaders: [
             {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
         ]
    },
    // devServer 則是 webpack-dev-server 設定
    devServer: {
        inline: true,
        port: 8008,
    },
    // plugins 放置所使用的外掛
    plugins: [HTMLWebpackPluginConfig],
};
