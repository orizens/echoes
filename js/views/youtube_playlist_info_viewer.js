define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_item',
	'models/youtube_item',
	'models/youtube_playlist_info_provider',
	'text!templates/youtube_playlist_info_viewer.html'
], function($, _, Backbone, 
	YoutubeItemView, 
	YoutubeItemModel,
	YoutubePlaylistInfoProvider,
	YoutubePlaylistInfoViewerTpl) {
	var playlist = Backbone.Collection.extend({
		model: YoutubeItemModel
	});
	var itemView = YoutubeItemView.extend({
		initialize: function(){
			this.listen();
		},
		render: function () {
			var video = this.model.toJSON().video;
			// video.isPlaying = this.model.get('isPlaying');
			// video.isFavorite = this.model.get('isFavorite');
			// video.time = this.model.get('time');
			if (video.status && video.status.reason === 'suspended'
				|| video.status && video.status.value === 'restricted') {
				this.$el.hide();
				// video = this.model.toJSON();
			}
			// video.likeCountDisplay = this.model.get('likeCountDisplay');
			// the model saves the video's json data in the 'video'
			// property, so we need to apply the video json data
			// to the model, and then run digest on the model
			// to apply the 'likeCountDisplay' and 'time' convertions
			_.extend(this.model.attributes, video);
			video = this.model.digest().toJSON();
			this.$el.html(this.template(video));
			return this;
		}
	});

	var items = Backbone.View.extend({
		tagName: 'ul',
		className: 'clearfix unstyled ux-maker playlist-items',
		view: {
			type: itemView,
			collection: playlist,
			events: {
				'play-media': 'playMedia'
			}
		},

		playMedia: function(model){
			// unselect last played
			var lastPlayedIndex = this.model.get('player').get('index');
			var lastPlayedModel;
			if (lastPlayedIndex) {
				lastPlayedModel = this.collection.at(lastPlayedIndex);
				if (lastPlayedModel) {
					lastPlayedModel.set({ isPlaying: false });
				}
			}
			// play the new one
			this.model.playMedia({
				type: 'playlist',
				mediaId: this.options.info.get('id'),
				index: model.get('position') - 1
			});
		}
	});
	
	var info = Backbone.View.extend({
		template: YoutubePlaylistInfoViewerTpl,
		render: function(){
			this.$el.html(_.template(this.template, this.model.toJSON()));	
		}
	});

	var PlaylistInfoViewer = Backbone.View.extend({
		tagName: 'div',

		transition: {
			duration: 200,
			css: 'transition-in'
		},

		initialize: function() {
			this.info = new YoutubePlaylistInfoProvider();
			this.infoView = new info({
				model: this.info
			});
			this.items = new items({
				model: this.model,
				info: this.info
			});
			this.$el.append([this.infoView.el, this.items.el]);
			this.listenTo(this.model.youtube(), 'change:showPlaylistId', this.getPlaylistInfo);
			this.listenTo(Backbone, 'app:load-more', this.handleLoadMore);
			this.listenTo(this.info, 'done', this.renderItems);
			Backbone.trigger('app:show-loader');
			this.getPlaylistInfo();
		},
		
		getPlaylistInfo: function(){
			this.info.set('id', this.model.youtube().get('showPlaylistId'));
		},

		renderItems: function(items) {
			Backbone.trigger('app:hide-loader');
			this.items.collection.set(items);
			this.infoView.render();
		}
	});

    return PlaylistInfoViewer;
});