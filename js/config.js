require.config({
	deps: ['js/main.js'],
	shim: {
		// 'jquery': {
		// 	deps: [ 'libs/zepto/zepto' ],
		// 	exports: 'Zepto',
		// 	init: function(){
		// 		debugger;
		// 		window.jQuery = window.Zepto;
		// 		return window.$;
		// 	}
		// },

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

		'safe': {
			deps: [ 'underscore', 'backbone' ],
			exports: 'Backbone.Safe'
		}
	},

	paths: {
		jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min',
		// jquery: 'libs/zepto/zepto',
		bootstrap: 'libs/bootstrap/bootstrap.min',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		
		// backbone plugins
		safe: 'libs/backbone/backbone.safe',
		collectionView: 'libs/backbone/backbone.collection_view',

		text: 'libs/require/text',
		utils: 'libs/utils',

		templates: '../templates'
	}
});