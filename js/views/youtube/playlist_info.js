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
			this.listenTo(this.model.youtube().playlist, 'done', this.render);
			this.listenTo(this.playerModel, 'change:index', this.updateIndex);
			this.listenTo(this.model.youtube().info, 'change:id', this.ensureSelectedIndex);
		},

		render: function(items, model) {
			// in case a playlist hasn't been loaded
			if (!items) {
				return;
			}
			this.playlistId = model.id;
			this.currentIndex = this.playerModel.get('index');
			var titles = _.map(items, this.makeListItem, this);
			this.$el.html(titles.join(''));
		},

		makeListItem: function (item, index) {
			var thumb = '';
			if (!item) {
				return;
			}
			thumb = item && item.video && item.video.thumbnail ? 
				item.video.thumbnail.hqDefault || item.video.thumbnail.sqDefault :
				'';
			var time = item && item.video ? item.video.duration : 0;
			return this.template({
				id: item.video.id,
				title: item.video.title,
				index: index,
				position: item.position,
				playlistId: this.playlistId,
				current: (index === this.currentIndex ? 'active' : ''),
				thumb: thumb,
				time: _(time).secondsToHms()
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