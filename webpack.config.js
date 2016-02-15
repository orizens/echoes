var path = require('path');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, './src/app.js'),
	output: {
		path: path.resolve(__dirname, './.tmp'),
		filename: 'bundle-webpack.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loaders: ['babel']
			},
			{ test: /\.html$/, loader: 'html' },
			{
				test: /\.less$/,
				loader: 'less'
			}
		]
	},

	plugins: [
        new ngAnnotatePlugin({
            add: true
            // other ng-annotate options here
        })
    ]
};