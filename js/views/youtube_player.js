define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
   
	var YoutubePlayer = Backbone.View.extend({
		el: '#youtube-player-container',

		events: {
			'click .hide-player': 'hide',
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
			this.model.youtube().get('info').on('change:title', this.renderTitle, this);
			this.model.youtube().get('playlist').on('change:items', this.renderPlaylistInfo, this);

			window.onYouTubeIframeAPIReady = _.bind(this.createPlayer, this);
			var res = require(['http://www.youtube.com/iframe_api?&ghost='], function(){});
			this.$title = this.$('.yt-media-title');
			this.$info = this.$('.track-info');
			// @todo should be a view with subviews
			this.$playlist = this.$('.playlist-info');
			this.$playlist.on('click', 'a', _.bind(this.onPlaylistItemClick, this));
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
				width: '350',
				playlist: '',
				playerVars: { 'autoplay': 1, 'enablejsapi': 1 },
				events: {
					'onReady': $.proxy(this.onPlayerReady, this),
					'onStateChange': $.proxy(this.onPlayerStateChange, this)
				}
			});
		},
		
		renderPlaylistInfo: function(model, items) {
			var titles = _.map(items, function(item, index){
				return '<li class="' + (index === 0 ? 'active' : '') + '"><a class="ellipsis" href="#'+ (index + 1) + '" data-index="' + (index) + '">' + (index +1) + '. ' + item.video.title + '</a></li>';
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
			var isPlaylist = this.model.get('mediaOptions').type === 'playlist' || false;
			if (ev.data === YT.PlayerState.PAUSED) {
				this.toggleNowPlaying(false);
			}

			if (ev.data === YT.PlayerState.PLAYING) {
				// TODO add support for playlist items titles
				if (isPlaylist) {
					this.model.set('mediaId', this.player.getPlaylist()[this.player.getPlaylistIndex()]);
					this.model.fetchPlaylistInfo();
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

		/**
		 * plays a single video or a playlist
		 * @param {json} mediaData - youtube api item result
		 * @param {json} options - key-value properties of media - type: video/playlist
		 */
		playMedia: function(mediaData, options) {
			var mediaId = _.isObject(mediaData) ? mediaData.id : mediaData;
			// 'size' attribute is the amount of videos in a playlist
			if (options && options.type === 'playlist') {
				this.player.loadPlaylist({
					list: mediaId,
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
			this.player.setVolume(volume);
			this.showVolume();
			this.$el.find('.volume-meter').html(Math.abs(volume));
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
			this.$el.addClass('show-youtube-player');
		},

		hide: function(ev) {
			ev.preventDefault();
			this.$el.removeClass('show-youtube-player');
		}
	});

	return YoutubePlayer;
});