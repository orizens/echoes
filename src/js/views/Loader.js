var Backbone = require('backbonejs');
	
var Loader = Backbone.View.extend({
	el: '#loader',

	initialize: function() {
		this.listenTo(this.model.youtube, 'request', this.show);
		this.listenTo(this.model.youtube, 'sync', this.hide);
		this.listenTo(Backbone, 'app:loader-start', this.show);
		this.listenTo(Backbone, 'app:loader-end', this.hide);
	},

	show: function () {
		this.$el.removeClass('hidden');
	},

	hide: function(){
		this.$el.addClass('hidden');
	}
});

module.exports = Loader;