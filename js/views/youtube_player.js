define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
   
	var YoutubePlayer = Backbone.View.extend({
		el: '#youtube-player-container',

		events: {
			'click .show-player': 'show',
			'click .pause': 'pause',
			'click .play': 'playVideo',
			'click .volume-down': 'decreaseVolume',
			'click .volume-up': 'increaseVolume',

			'mouseout .volume-down': 'hideVolume',
			'mouseout .volume-up': 'hideVolume',

			'mouseover .volume-down': 'showVolume',
			'mouseover .volume-up': 'showVolume',
			'mouseover .volume-meter': 'showVolume'
		},

		initialize: function() {
			this.model.on('change:play', this.play, this);
			this.model.on('change:mediaOptions', this.onMediaOptionsChange, this);
			this.model.youtube().get('info').on('change:title', this.renderTitle, this);
			this.model.youtube().get('playlist').on('change:items', this.renderPlaylistInfo, this);
			// @todo - should be a model attribute
			this.visibile = false;

			window.onYouTubeIframeAPIReady = _.bind(this.createPlayer, this);
			var res = require(['http://www.youtube.com/iframe_api?&ghost='], function(){});
			this.$title = this.$('.yt-media-title');
			this.$info = this.$('.track-info');
			// @todo should be a view with subviews
			this.$playlist = this.$('.playlist-info');
			// this.$playlist.on('click', 'a', _.bind(this.onPlaylistItemClick, this));
		},

		onPlaylistItemClick: function(ev) {
			ev.preventDefault();
			var indexToPlay = $(ev.target).data('index');
			this.$playlist.find('.active').removeClass('active');
			$(ev.target).parent().addClass('active');
			this.player.playVideoAt(indexToPlay);
		},

		createPlayer: function(){
			this.player = new YT.Player('player', {
				height: '270',
				width: '300',
				playlist: '',
				playerVars: { 'autoplay': 1, 'enablejsapi': 1 },
				events: {
					'onReady': $.proxy(this.onPlayerReady, this),
					'onStateChange': $.proxy(this.onPlayerStateChange, this)
				}
			});
		},
		
		renderPlaylistInfo: function(model, items) {
			var playlistId = model.get('id');
			this.mediaOptions = this.model.get('mediaOptions');
			var currentPlayedIndex = this.mediaOptions ? parseInt(this.mediaOptions.index, 10) : 0;
			var titles = _.map(items, function(item, index){
				var html = '<li class="' + (index === currentPlayedIndex ? 'active' : '') + " track-" + index +
					'"><a class="ellipsis" href="#play/playlist/' + playlistId + '/' + index +
					'">' + (index +1) + 
					'. ' + item.video.title + '</a></li>';
				return html;
			});
			this.$playlist.html(titles.join(''));
		},

		renderTitle: function(model) {
			var desc = model.get('description');
			// try to parse multiline tracks
			desc = desc.replace(/([0-9][0-9]:[0-9][0-9])/gim, "\n$1", "gim");
			this.$title.html(model.get('title'));
			this.$info.html(desc);
		},

		onPlayerReady: function(){
			if (this.queue) {
				this.play(this.queue);
			}
		},

		onPlayerStateChange: function(ev){
			// TODO mediaOptions is null at first time
			// should creat a player model
			var isPlaylist = this.model.get('mediaOptions').type === 'playlist' || false,
				currentPlaylistIndex;
			if (ev.data === YT.PlayerState.PAUSED) {
				this.toggleNowPlaying(false);
			}

			if (ev.data === YT.PlayerState.PLAYING) {
				// TODO add support for playlist items titles
				if (isPlaylist) {
					currentPlaylistIndex = this.player.getPlaylistIndex();
					this.model.set('mediaId', this.player.getPlaylist()[currentPlaylistIndex]);
					this.model.fetchPlaylistInfo();
					this.updateIndex(currentPlaylistIndex);
				}
				this.model.fetchCurrentMediaInfo();
				this.toggleNowPlaying(true);
			}
		},

		play: function(model) {
			var mediaData = model.get('mediaId');
			var options = model.get('mediaOptions');
			if (!this.player || !this.player.loadVideoById) {
				this.show();
				this.queue = model;
				return;
			}
			this.player.stopVideo();
			if (this.player.clearVideo) { this.player.clearVideo(); }
			this.playMedia(mediaData, options);
			// this.render();
			this.$el.addClass('yt-playing');
			this.show();
		},

		onMediaOptionsChange: function(model, options) {
			this.updateIndex(options.index || 0);
			this.play(this.model);
		},

		updateIndex: function(index) {
			this.$playlist.find('.active').removeClass('active')
				.end().find('.track-' + index).addClass('active');
			this.model.set('currentIndex', index);
		},
		/**
		 * plays a single video or a playlist
		 * @param {json} mediaData - youtube api item result
		 * @param {json} options - key-value properties of media - type: video/playlist
		 */
		playMedia: function(mediaData, options) {
			var mediaId = _.isObject(mediaData) ? mediaData.id : mediaData;
			var playlistId = options && options.playlistId ? options.playlistId : mediaId;
			// 'size' attribute is the amount of videos in a playlist
			if (options && options.type === 'playlist') {
				this.player.loadPlaylist({
					list: playlistId,
					index: options.index || 0,
					playlist: 'playlist',
					suggestedQuality: 'large'
				});
			} else {
				this.player.loadVideoById(mediaId);
			}
		},

		playPlaylist: function(mediaData) {
			this.player.loadPlaylist(mediaData);
		},

		pause: function(ev) {
			ev.preventDefault();
			this.player.pauseVideo();
		},

		playVideo: function(ev) {
			if (ev) { ev.preventDefault(); }
			this.player.playVideo();
		},

		decreaseVolume: function(ev) {
			if (ev) { ev.preventDefault(); }
			this.updateVolume(this.player.getVolume() - 5);
		},

		increaseVolume: function(ev) {
			if (ev) { ev.preventDefault(); }
			this.updateVolume(this.player.getVolume() + 5);
		},

		updateVolume: function(volume) {
			if (volume < 0) {
				volume = 0;
			}
			if (volume >= 100) {
				volume = 100;
			}
			this.player.setVolume(volume);
			this.showVolume();
			this.$el.find('.volume-meter').html(Math.round(Math.abs(volume)));
		},

		hideVolume: function(ev) {
			this.$el.addClass('hide-volume');
		},

		showVolume: function(ev) {
			this.$el.removeClass('hide-volume');
		},

		toggleNowPlaying: function(show){
			this.$el.toggleClass('yt-playing', show);
		},

		show: function(ev) {
			if (ev) { ev.preventDefault(); }
			if (!this.visible) {
				this.$el.addClass('show-youtube-player');
				this.visible = true;
			} else {
				this.hide(ev);
			}
		},

		hide: function(ev) {
			if (ev) { ev.preventDefault(); }
			this.$el.removeClass('show-youtube-player');
			this.visible = false;
		}
	});

	return YoutubePlayer;
});