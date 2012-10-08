// 1. Install nodejs (it will automatically installs requirejs)

//- assuming the folder structure for your app is:
// app
// 		css
// 		img
// 		js
// 		main.js
// 		index.html
// build
// 		app.build.js
// 		r.js (downloaded from requirejs website)

// 2. the command line to run:
// $ node r.js -o app.build.js
// 

({
	//- paths are relative to this app.build.js file
	appDir: "../../echoes",
	baseUrl: "js",
	//- this is the directory that the new files will be. it will be created if it doesn't exist
	dir: "../production",
	shim: {
		'bootstrap': {
			deps: [ 'jquery' ],
			exports: 'jQuery'
		},

		'underscore': {
			exports: '_'
		},

		'backbone': {
			deps: [ 'underscore', 'jquery' ],
			exports: 'Backbone'
		},

		'storage': {
			deps: [ 'underscore', 'backbone' ],
			exports: 'Backbone.localStorage'
		},

		'safe': {
			deps: [ 'underscore', 'backbone' ],
			exports: 'Backbone.Safe'
		}

	},

	paths: {
		jquery: 'libs/jquery/jquery',
		bootstrap: 'libs/bootstrap/bootstrap',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		safe: 'libs/backbone/backbone.safe',
		text: 'libs/require/text',
		utils: 'libs/utils',

		templates: '../templates'
	},
	optimizeCss: "standard.keepLines",
	modules: [
		{
			name: "main"
		}
	],
	fileExclusionRegExp: /\.git/
})
