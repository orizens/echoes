require.config({
	deps: ['js/main.js'],
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

		'backbonesrc': {
			deps: [ 'underscore', 'jquery'],
			exports: 'Backbone'
		}

		'facebook' : {
			exports: 'FB'
		}
	},


	paths: {
		jquery: 'libs/jquery/jquery',
		jqueryui: 'libs/jquery/jquery-ui',
		// jquery: 'libs/zepto/zepto',
		bootstrap: 'libs/bootstrap/bootstrap.min',
		underscore: 'libs/underscore/underscore',
		backbonesrc: 'libs/backbone/backbone',
		backbone: 'libs/backbone/backbonepkg',
		vars: 'libs/environmentVars',
		
		// backbone plugins
		safe: 'libs/backbone/backbone.safe',
		collectionView: 'libs/backbone/backbone.CollectionView',
		switcher: 'libs/backbone/backbone.switcher',
		transition: 'libs/backbone/backbone.view-transition',
		beamer: 'libs/backbone/backbone.beamer',

		text: 'libs/require/text',
		utils: 'libs/utils',

		templates: '../templates',
		facebook: 'http://connect.facebook.net/en_US/all'
	},

	map: {
		// '*': {
		// 	'jquery': 'jQuery',
		// 	'underscore': 'underscore',
		// 	'backbone': 'backbone',
		// 	'safe': 'safe',
		// 	'switcher': 'switcher'
		// },

		'underscore': {
			'utils': 'utils'
		}
	}
});