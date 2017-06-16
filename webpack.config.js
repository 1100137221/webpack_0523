
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin'), //script 放置 html head 裡
      ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包

// 這邊使用 HtmlWebpackPlugin，將 bundle 好的 <script> 插入到 body。${__dirname} 為 ES6 語法對應到 __dirname  
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/index.html`,
  filename: 'index.html',
  inject: 'body',
});

const extractCss = new ExtractTextPlugin('[name].css'); //隨著import的檔名輸出css檔案



const webpackConfig = {
    entry: {
        //app: './src/index.js',
        app: './src/containers/App.js',
        vendor: ['react', 'react-dom']
    },
    output: {
        path: __dirname + '/dist',
        filename: "[name].js",
    },
     module: {
         //Version 1 寫法:
         /*loaders: [
             {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
         ],*/
         //Version 2 寫法:
          rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: extractCss.extract([ "css-loader"])//包裝loader以便輸出css，style-loader在此就要拿掉了，因為我們不需要在js裡面使用css了，不拿掉的話會出錯
            },
            {
                test: /\.scss$/,
                use: extractCss.extract(["css-loader", "sass-loader"])//包裝loader以便輸出css，style-loader在此就要拿掉了，因為我們不需要在js裡面使用css了，不拿掉的話會出錯
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[ext]' //小於10000byte的話，直接使用data url的方式，而不會下載檔案
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    },

    //方便追蹤程式碼(測試環境用)
    devtool: '#cheap-module-eval-source-map',

    // devServer 則是 webpack-dev-server 設定
    devServer: {
        inline: true, //會live reload
        port: 8008,
    },
    // plugins 放置所使用的外掛
    plugins: [HTMLWebpackPluginConfig,extractCss],
};

switch (process.env.NODE_ENV) {
    case 'dev':
        webpackConfig.plugins.push(new webpack.DefinePlugin({ //定義環境變數
            'process.env': {
                'API_URL': '"http://localhost"'
            }
        }));
        break;
    case 'prod':
        //rimraf(path.join(__dirname, 'dist'), () => console.log('success remove')); //移除檔案
         webpackConfig.devtool = "#source-map"; //方便追蹤程式碼,正式機用,會產生完整檔案
        webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({ //壓縮用的
            compress: {
                warnings: false
            }
        }));
        webpackConfig.plugins.push(new webpack.DefinePlugin({ //定義環境變數
            'process.env': {
                'API_URL': '"http://google"'
            }
        }));
        

        
        break;
}

module.exports = webpackConfig;