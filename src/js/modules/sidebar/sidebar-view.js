var $ = require('jquery');
var Backbone = require('backbonejs');
   
var SidebarView = Backbone.View.extend({
	el: "#sidebar-menu-toggler",

	events: {
		'click': 'onSidebarToggle'
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

module.exports = {
	create: function(model){
		return new SidebarView({ model: model });
	}
}; 