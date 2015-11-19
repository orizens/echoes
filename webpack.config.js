var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'src/app/app.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle-webpack.js'
	},
	module: {
		loaders: [
			{ 
				test: /\.js$/,
				exclude: [/node_modules/],
				loader: 'babel',
				query: {
			        presets: ['es2015']
			    }
			}
		]
	}
};