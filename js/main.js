require.config({
	shim: {
		'bootstrap': {
			deps: [ 'jquery' ],
			exports: 'jQuery'
		},

		'underscore': {
			exports: '_'
		},

		'backbone': {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		}
	},

	paths: {
		jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min',
		bootstrap: 'libs/bootstrap/bootstrap.min',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		text: 'libs/require/text',
		utils: 'libs/utils',

		templates: '../templates'
	}
});

require([
	'bootstrap',
	'routers/app_router'
], function( Bootstrap, AppRouter ) {
	// Initialize routing and start Backbone.history()
	// Within, Initialize the application view
	new AppRouter();
	Backbone.history.start();
});