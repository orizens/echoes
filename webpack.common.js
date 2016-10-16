const path = require('path');
const webpack = require('webpack');
// const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const getPath = (pathToFile) => path.resolve(__dirname, pathToFile);
const env = process.env.NODE_ENV || 'development';
// const envConfig = require('./config/environment/' + env + '.env');
const APP_NAME = 'echoes';

module.exports = {
  entry: {
    app: [
      getPath('./src/app.js'),
      getPath('./src/config/' + env + '.config.js')
    ],
    vendors: [
      'angular',
      'angular-ui-router',
      'angular-animate',
      'angular-sanitize',
      'angular-ui-bootstrap',
      'angular-local-storage'
    ]
  },
  output: {
    path: getPath('./dist'),
    filename: '[name].[hash].bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loaders: ['babel']
    }, {
      test: /\.html$/,
      loader: 'ngtemplate!html',
      exclude: /(index)/
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('css?sourceMap!less?sourceMap')
    },
    // FONTS
    {
      test: /\.woff$/,
      loader: 'url?limit=100000&name=./fonts/[name]/[hash].[ext]'
    }, {
      test: /\.eot$/,
      loader: 'file'
    }, {
      test: /\.svg$/,
      loader: 'url?limit=100000&name=./fonts/[name]/[hash].[ext]'
    },
    // the url-loader uses DataUrls.
    // the file-loader emits files.
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file'
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'APP_NAME': JSON.stringify(APP_NAME)
    }),
    // new webpack.DefinePlugin({
    //   'APP_ENV': JSON.stringify(envConfig)
    // }),
    new webpack.optimize.CommonsChunkPlugin('vendors',
    '[name].[hash].js'),
    new webpack.optimize.AggressiveMergingPlugin({}),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new ExtractTextPlugin('[name].[hash].style.css'),
    // HtmlWebpackPlugin
    // See: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: 'html!./src/index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ])
  ]
};
