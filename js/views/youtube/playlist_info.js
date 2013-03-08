define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {

	var PlaylistInfo = Backbone.View.extend({

		initialize: function() {
			this.listenTo(this.model.youtube().get('playlist'), 'change:items', this.render);
			this.listenTo(this.model, 'change:currentIndex', this.updateIndex);
		},

		render: function(model, items) {
			this.playlistId = model.get('id');
			var options = this.model.get('mediaOptions');
			this.currentPlayedIndex = options ? parseInt(options.index, 10) : 0;
			var titles = _.map(items, this.makeListItem, this);
			this.$el.html(titles.join(''));
		},

		makeListItem: function (item, index) {
			var html = '<li class="' + (index === this.currentIndex ? 'active' : '') + " track-" + index +
				'"><a class="ellipsis" href="#play/playlist/' + this.playlistId + '/' + index +
				'">' + (index +1) + 
				'. ' + item.video.title + '</a></li>';
			return html;
		},

		updateIndex: function(model, index) {
			this.$el.find('.active').removeClass('active')
				.end().find('.track-' + index).addClass('active');
		}
	});

	return PlaylistInfo;
});