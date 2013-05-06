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
		jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
		jqueryui: 'http://code.jquery.com/ui/1.10.3/jquery-ui',
		// jquery: 'libs/zepto/zepto',
		bootstrap: 'libs/bootstrap/bootstrap.min',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		
		// backbone plugins
		safe: 'libs/backbone/backbone.safe',
		collectionView: 'libs/backbone/backbone.collection_view',
		switcher: 'libs/backbone/backbone.switcher',

		text: 'libs/require/text',
		utils: 'libs/utils',

		templates: '../templates'
	},

	map: {
		'backbone': {
			'safe': 'safe',
			'switcher': 'switcher'
		},

		'underscore': {
			'utils': 'utils'
		}
	}
});