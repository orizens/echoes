var path = require('path');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: path.resolve(__dirname, './src/app.js'),
	output: {
		path: path.resolve(__dirname, './src'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loaders: ['babel']
			},
			{ test: /\.html$/, loader: 'ngtemplate!html' },
			{
				test: /\.less$/,
				loader: 'style!css!less?sourceMap'
			},
			{
				test: /\.css$/, // Only .css files
				loader: 'style!css' // Run both loaders
			},

			// FONTS
			{
				test: /\.woff$/,
				loader: 'url?limit=100000&name=./fonts/[name]/[hash].[ext]'
			},
			{
				test: /\.eot$/,
				loader: 'file'
			},
			{
				test: /\.svg$/,
				loader: 'url?limit=100000&name=./fonts/[name]/[hash].[ext]'
			},
				// the url-loader uses DataUrls. 
			  // the file-loader emits files. 
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&minetype=application/font-woff" },
			{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file" }

		]
	},

	plugins: [
		new ngAnnotatePlugin({
			add: true
			// other ng-annotate options here
		})
	]
};