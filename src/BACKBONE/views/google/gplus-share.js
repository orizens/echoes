var _ = require('underscore');
var Backbone = require('backbonejs');

var view = Backbone.View.extend({
	events: {
		'click': function(ev) {
			ev.preventDefault();
			var href = "https://plus.google.com/share?url=";
			var url = this.model.player.getShareUrl();
			window.open(href + encodeURIComponent(url), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
		}
	},

	initialize: function() {
		this.$link = this.$('a');
		this.listenTo(this.model.youtube.info, 'change:id', this.render);
	},

	render: function() {
		var url = this.model.player.getShareUrl();
		var href = "https://plus.google.com/share?url=" + url;
		this.$link.attr('href', href);
		return this;
	}
});

module.exports = view;