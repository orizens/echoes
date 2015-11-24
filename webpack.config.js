var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, './src/app/app.js'),
	output: {
		path: path.resolve(__dirname, './.tmp'),
		filename: 'bundle-webpack.js'
	},
	module: {
		loaders: [
			{ 
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader'
			},
			{ test: /\.html$/, loader: 'raw' },
		]
	}
};