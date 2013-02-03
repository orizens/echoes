define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {

	var TrackInfo = Backbone.View.extend({

		initialize: function() {
			this.$title = this.$('.yt-media-title');
			this.$info = this.$('.track-info');
			this.listenTo(this.model, 'change:title', this.render);
		},

		render: function(model, title) {
			var desc = model.get('description');
			// try to parse multiline tracks
			desc = desc.replace(/([0-9][0-9]:[0-9][0-9])/gim, "\n$1", "gim");
			this.$title.html(title);
			this.$info.html(desc);
		}
	});

	return TrackInfo;
});