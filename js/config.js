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
		},

		'collectionView': {
			deps: [ 'backbonesrc', 'beamer' ],
			exports: 'Backbone'
		},

		'safe': {
			deps: [ 'underscore', 'backbonesrc' ],
			exports: 'Backbone.Safe'
		},

		'switcher': {
			deps: [ 'backbonesrc', 'beamer' ],
			exports: 'Backbone'
		},

		'transition': {
			deps: [ 'backbonesrc', 'collectionView', 'beamer' ],
			exports: 'Backbone'
		},

		'beamer': {
			deps: [ 'underscore', 'backbonesrc' ],
			exports: 'Backbone'
		}
	},


	paths: {
		jquery: '../bower_components/jquery/jquery.min',
		jqueryui: '../bower_components/jquery-ui/ui/minified/jquery-ui.min',
		bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
		underscore: '../bower_components/underscore/underscore-min',
		backbonesrc: '../bower_components/backbone/backbone-min',
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

		templates: '../templates'
	},

	map: {
		'underscore': {
			'utils': 'utils'
		}
	}
});