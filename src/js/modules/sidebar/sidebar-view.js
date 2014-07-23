define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
   
    var SidebarView = Backbone.View.extend({
		el: "#sidebar-menu-toggler",

		events: {
			'click a': 'onSidebarToggle'
		},

		initialize: function() {
			$('.sidebar-backdrop').on('click', this.onSidebarToggle.bind(this));
		},

		onSidebarToggle: function(ev) {
			ev.preventDefault();
			this.$el.toggleClass('opened');
			$('#sidebar').toggleClass('closed');
		}
	});
   
    return {
    	create: function(model){
    		return new SidebarView({ model: model });
    	}
    }; 
});