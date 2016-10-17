const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var webpackCommon = require('./webpack.common');
var webpackConfig = {
  devtool: 'source-map',
  plugins: [
    new ngAnnotatePlugin({
      add: true
    }),
    new CopyWebpackPlugin([{
      from: 'config/dist-assets/CNAME'
    }, {
      from: 'config/dist-assets/manifest.json'
    }, {
      from: 'src/assets',
      to: 'assets'
    }])
  ]
};
webpackCommon.devtool = webpackConfig.devtool;
webpackCommon.plugins = webpackCommon.plugins.concat(webpackConfig.plugins);
module.exports = webpackCommon;

// module.exports = {
//   devtool: 'source-map',
//   entry: {
//     app: [
//       getPath('./src/app.js'),
//       getPath('./src/config/production.config.js')
//     ],
//     vendors: [
//       'angular',
//       'angular-ui-router',
//       'angular-animate',
//       'angular-sanitize',
//       'angular-ui-bootstrap',
//       'angular-local-storage'
//     ]
//   },
//   output: {
//     path: getPath('./dist'),
//     filename: '[name].[chunkhash].bundle.js'
//   },
//   module: {
//     loaders: [{
//       test: /\.js$/,
//       exclude: /(node_modules)/,
//       loaders: ['babel']
//     }, {
//       test: /\.html$/,
//       loader: 'ngtemplate!html',
//       exclude: /(index)/
//     }, {
//       test: /\.less$/,
//       loader: ExtractTextPlugin.extract('css?sourceMap!less?sourceMap')
//     },
//     // FONTS
//     {
//       test: /\.woff$/,
//       loader: 'url?limit=100000&name=./fonts/[name]/[hash].[ext]'
//     }, {
//       test: /\.eot$/,
//       loader: 'file'
//     }, {
//       test: /\.svg$/,
//       loader: 'url?limit=100000&name=./fonts/[name]/[hash].[ext]'
//     },
//     // the url-loader uses DataUrls.
//     // the file-loader emits files.
//     {
//       test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//       loader: 'url?limit=10000&minetype=application/font-woff'
//     }, {
//       test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//       loader: 'file'
//     }
//   ]},
//   plugins: [
//     new ngAnnotatePlugin({
//       add: true
//       // other ng-annotate options here
//     }),
//     new webpack.optimize.CommonsChunkPlugin('vendors',
//       '[name].[chunkhash].vendors.js'),
//     new ExtractTextPlugin('[name].[chunkhash].style.css'),
//     // See: https://github.com/ampedandwired/html-webpack-plugin
//     new HtmlWebpackPlugin({
//       template: 'html!./src/index.html'
//     }),
//     new CopyWebpackPlugin([{
//       from: 'config/dist-assets/CNAME'
//     }, {
//       from: 'config/dist-assets/manifest.json'
//     }, {
//       from: 'src/assets',
//       to: 'assets'
//     }])
//   ]
// };