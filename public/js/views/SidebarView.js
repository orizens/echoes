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
			
		},

		onSidebarToggle: function(ev) {
			ev.preventDefault();
			this.$el.toggleClass('opened');
			$('#sidebar').toggleClass('closed');
		}
	});
   
    return SidebarView; 
});