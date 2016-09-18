const path = require('path');
const webpack = require('webpack');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const getPath = (pathToFile) => path.resolve(__dirname, pathToFile);

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      getPath('./src/app.js'),
      getPath('./src/config/production.config.js')
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
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map'
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
    }
  ]},
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ngAnnotatePlugin({
      add: true
      // other ng-annotate options here
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors',
      'vendors.[hash].js'),
    new ExtractTextPlugin('[name].[hash].style.css'),
    // See: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: 'html!./src/index.html'
    }),
    new CopyWebpackPlugin([{
      from: 'gulp/dist-assets/CNAME'
    }, {
      from: 'gulp/dist-assets/manifest.json'
    }, {
      from: 'src/assets',
      to: 'assets'
    }])
  ]
};
