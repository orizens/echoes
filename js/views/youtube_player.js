define([
	'jquery',
	'underscore',
	'backbone',
	'./youtube/track_info',
	'./youtube/playlist_info',
	'text!templates/youtube_custom_styles.css'
], function($, _, Backbone, TrackInfoView, PlaylistInfoView, YoutubeCustomCss) {
   
	var YoutubePlayer = Backbone.View.extend({
		el: '#youtube-player-container',

		events: {
			'click .show-player': 'show',
			'click .pause': 'pause',
			'click .play': 'playVideo',
			'click .volume-down': 'decreaseVolume',
			'click .volume-up': 'increaseVolume',
			'click .next': 'playNext',
			'click .previous': 'playPrevious',
			'click .fullscreen': 'toggleFullScreen',

			'mouseout .volume-down': 'hideVolume',
			'mouseout .volume-up': 'hideVolume',

			'mouseover .volume-down': 'showVolume',
			'mouseover .volume-up': 'showVolume',
			'mouseover .volume-meter': 'showVolume'
		},

		initialize: function() {
			this.model.on('change:play', this.play, this);
			this.model.on('change:mediaOptions', this.onMediaOptionsChange, this);
			
			this.currentTrackInfoView = new TrackInfoView({
				el: this.$('.current-track-info-container'),
				model: this.model.youtube().get('info')
			});

			this.currentPlaylistView = new PlaylistInfoView({
				el: this.$('.playlist-info'),
				model: this.model
			});

			this.currentTrackInfoView.on('seek', this.seekToSeconds, this);

			// @todo - should be a model attribute
			this.visibile = false;
			this.isFullscreen = false;

			this.insertCustomStyles();
			$(window).on('resize', _.bind(this.insertCustomStyles, this));

			window.onYouTubeIframeAPIReady = _.bind(this.createPlayer, this);
			var res = require(['http://www.youtube.com/iframe_api?&ghost='], function(){});
		},

		createPlayer: function(){
			this.player = new YT.Player('player', {
				height: '270',
				width: '300',
				playerVars: { 'autoplay': 0, 'enablejsapi': 1 },
				events: {
					'onReady': $.proxy(this.onPlayerReady, this),
					'onStateChange': $.proxy(this.onPlayerStateChange, this)
				}
			});
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
			this.$el.addClass('yt-playing');
			this.show(null , 'show');
		},

		onMediaOptionsChange: function(model, options) {
			this.updateIndex(options.index || 0);
			// this.play(this.model);
			if (this.player && this.player.playVideoAt)
				this.player.playVideoAt(parseInt(options.index, 10));
		},

		updateIndex: function(index) {
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
			var index = options.index ? parseInt(options.index, 10) : 0;
			// 'size' attribute is the amount of videos in a playlist
			if (options && options.type === 'playlist') {
				if (this.player && this.player.getPlaylistId() !== null) {
					this.player.playVideoAt(index);
				}
				// console.log('playlist load:', index);
				this.player.loadPlaylist({
					list: playlistId,
					index: index,
					playlist: 'playlist',
					suggestedQuality: 'large'
				});
			} else {
				this.player.loadVideoById(mediaId);
			}
		},

		pause: function() {
			this.player.pauseVideo();
		},

		playVideo: function() {
			this.player.playVideo();
		},

		decreaseVolume: function() {
			this.updateVolume(this.player.getVolume() - 5);
		},

		increaseVolume: function() {
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

		hideVolume: function() {
			this.$el.addClass('hide-volume');
		},

		showVolume: function() {
			this.$el.removeClass('hide-volume');
		},

		playNext: function() {
			this.player.nextVideo();
		},

		playPrevious: function() {
			this.player.previousVideo();
		},

		defaultSize: {
			width: 300,
			height: 270
		},

		toggleFullScreen: function() {
			var sizes = this.isFullscreen ? this.defaultSize : _(['sidebar']).getPortviewSize();
			this.isFullscreen = !this.isFullscreen;
			this.player.setSize(sizes.width, sizes.height);
			this.$el.toggleClass('fullscreen', this.isFullscreen);
		},

		toggleNowPlaying: function(show){
			this.$el.toggleClass('yt-playing', show);
		},

		show: function(ev, forceState) {
			if (ev) { ev.preventDefault(); }
			if (!this.visible || forceState === 'show') {
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
		},

		insertCustomStyles: function() {
			var sizes = _().getPortviewSize();
			this.$el.append(_.template(YoutubeCustomCss, sizes));
		},

		seekToSeconds: function(seconds) {
			this.player.seekTo(seconds, true);
		}
	});

	return YoutubePlayer;
});