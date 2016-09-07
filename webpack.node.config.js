'use strict';
// adopted from http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    'app': [
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'src/app.js')
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
    path: path.join(__dirname, '/dist/'),
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[hash].js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ngAnnotatePlugin({
      add: true
      // other ng-annotate options here
    }),
    new ExtractTextPlugin('[name].[chunkhash].style.css'),
  ],
  module: {
    loaders: [{
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }, {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loaders: ['babel']
    }, {
      test: /\.html$/,
      loader: 'ngtemplate!html',
      exclude: /(index)/
    }, {
      test: /\.less$/,
      loader: 'css?sourceMap!less?sourceMap'
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
  }
};
