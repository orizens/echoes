define([
	'jquery',
	'underscore',
	'backbone',
	'views/player_app',
	'safe'
], function($, _, Backbone, PlayerApp, s) {
   
    var AppRouter = Backbone.Router.extend({

		routes: {
			'': 'showExplore',
			'explore': 'showExplore',
			'history': 'showHistory',
			'settings': 'showSettings'
		},

		initialize: function() {
			this.appView = new PlayerApp();
		},

		showExplore: function() {
			this.appView.renderExplore();
			this.markNav('explore');
		},

		showHistory: function() {
			this.appView.renderHistory();
			this.markNav('history');
		},

		showSettings: function() {
			console.log('in progress...');
			this.navigate('explore', {trigger: true});
		},

		markNav: function(route) {
			$('.navbar .nav li')
				.removeClass('active')
				.find('a[href=#' + route + ']').parent().addClass('active');
		}
	});
   
    return AppRouter; 
});