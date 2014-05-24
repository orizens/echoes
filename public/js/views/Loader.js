define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
	
	var Loader = Backbone.View.extend({
		el: '#loader',

		initialize: function() {
			this.listenTo(this.model.youtube, 'request', this.show);
			this.listenTo(this.model.youtube, 'sync', this.hide);
			this.listenTo(Backbone, 'app:show-loader', this.show);
			this.listenTo(Backbone, 'app:hide-loader', this.hide);
		},

		show: function () {
			this.$el.removeClass('hidden');
		},

		hide: function(){
			this.$el.addClass('hidden');
		}
	});

	return Loader;
});