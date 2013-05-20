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
// RUN FROM PROJECT ROOT
// $ node ../build/r.js -o build/app.build.js
// 

({
	//- paths are relative to this app.build.js file
	appDir: "../../echoes",
	baseUrl: "js",
	//- this is the directory that the new files will be. it will be created if it doesn't exist
	dir: "../../build/echoes-production",
	shim: {
		'bootstrap': {
			deps: [ 'jquery', 'jqueryui' ],
			exports: 'jQuery'
		},

		'jqueryui': {
			deps: ['jquery'],
			exports: 'jQuery'
		},

		'underscore': {
			exports: '_'
		},

		'backbone': {
			deps: [ 'underscore', 'jquery' ],
			exports: 'Backbone'
		},

		'safe': {
			deps: [ 'underscore', 'backbone' ],
			exports: 'Backbone.Safe'
		},

		'switcher': {
			deps: [ 'underscore', 'backbone' ],
			exports: 'Backbone'
		}

	},

	paths: {
		jquery: 'libs/jquery/jquery',
		jqueryui: 'libs/jquery/jquery-ui',
		bootstrap: 'libs/bootstrap/bootstrap',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		safe: 'libs/backbone/backbone.safe',
		switcher: 'libs/backbone/backbone.switcher',
		collectionView: 'libs/backbone/backbone.collection_view',
		text: 'libs/require/text',
		utils: 'libs/utils',

		templates: '../templates'
	},

	optimize: "uglify",
	// generateSourceMaps: true,
	// preserveLicenseaComments: false,
	uglify: {
        toplevel: true
    },

	mainConfigFile: '../js/config.js',

	optimizeCss: "standard",
	modules: [
		{
			name: "config"
		}
	],
	removeCombined: false,
	fileExclusionRegExp: /(\.git)|(app.build.js)|(.sublime-)|(.md)/
})