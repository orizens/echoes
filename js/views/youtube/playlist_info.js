define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {

	var PlaylistInfo = Backbone.View.extend({

		initialize: function() {
			this.playerModel = this.model.get('player');
			this.listenTo(this.model.youtube().get('playlist'), 'change:items', this.render);
			this.listenTo(this.playerModel, 'change:index', this.updateIndex);
		},

		render: function(model, items) {
			this.playlistId = model.get('id');
			this.currentIndex = this.playerModel.get('index');
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
			this.currentIndex = index;
			this.$el.find('.active').removeClass('active')
				.end().find('.track-' + index).addClass('active');
		}
	});

	return PlaylistInfo;
});