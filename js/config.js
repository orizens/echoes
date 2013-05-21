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

		'backbone': {
			deps: [ 'underscore', 'jquery'],
			exports: 'Backbone'
		},

		'collectionView': {
			deps: [ 'underscore', 'backbone' ],
			exports: 'Backbone'
		},

		'safe': {
			deps: [ 'underscore', 'backbone' ],
			exports: 'Backbone.Safe'
		},

		'switcher': {
			deps: [ 'underscore', 'backbone' ],
			exports: 'Backbone'
		},

		'transition': {
			deps: [ 'underscore', 'backbone' ],
			exports: 'Backbone'
		},

		'xManager': {
			deps: [ 'underscore', 'backbone' ],
			exports: 'Backbone'
		}
	},


	paths: {
		jquery: 'libs/jquery/jquery',
		jqueryui: 'libs/jquery/jquery-ui',
		// jquery: 'libs/zepto/zepto',
		bootstrap: 'libs/bootstrap/bootstrap.min',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		
		// backbone plugins
		safe: 'libs/backbone/backbone.safe',
		collectionView: 'libs/backbone/backbone.CollectionView',
		switcher: 'libs/backbone/backbone.switcher',
		transition: 'libs/backbone/backbone.view-transition',
		xManager: 'libs/backbone/backbone.xManager',

		text: 'libs/require/text',
		utils: 'libs/utils',

		templates: '../templates'
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