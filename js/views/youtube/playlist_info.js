define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/youtube_playlist_provider_item.html'
], function($, _, Backbone, PlaylistProviderItemTemplate) {

	var PlaylistInfo = Backbone.View.extend({

		template: _.template(PlaylistProviderItemTemplate),

		initialize: function() {
			this.playerModel = this.model.get('player');
			this.listenTo(this.model.youtube().get('playlist'), 'change:items', this.render);
			this.listenTo(this.playerModel, 'change:index', this.updateIndex);
			this.listenTo(this.model.youtube().get('info'), 'change:id', this.ensureSelectedIndex);
		},

		render: function(model, items) {
			this.playlistId = model.get('id');
			this.currentIndex = this.playerModel.get('index');
			var titles = _.map(items, this.makeListItem, this);
			console.log(titles);
			this.$el.html(titles.join(''));
		},

		makeListItem: function (item, index) {
			return this.template({
				id: item.video.id,
				title: item.video.title,
				index: index,
				position: item.position,
				playlistId: this.playlistId,
				current: (index === this.currentIndex ? 'active' : '')
			});
		},

		updateIndex: function(model, index) {
			this.currentIndex = index;
			this.$('.active').removeClass('active')
				.end().find('.track-' + index).addClass('active');
		},

		ensureSelectedIndex: function (infoModel) {
			this.$('.active').removeClass('active');
			this.$('.playlist-provider-item[data-videoid=' + infoModel.id + ']').addClass('active');
		}
	});

	return PlaylistInfo;
});