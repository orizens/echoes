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
			'mouseout .volume-meter': 'hideVolume',

			'mouseover .volume-down': 'showVolume',
			'mouseover .volume-up': 'showVolume',
			'mouseover .volume-meter': 'showVolume'
		},

		initialize: function() {
			this.playerModel = this.model.get('player');
			this.listenTo(this.playerModel, 'change:mediaId', this.onMediaChanged);
			this.listenTo(this.playerModel, 'change:index', this.playMedia);

			this.currentTrackInfoView = new TrackInfoView({
				el: this.$('.current-track-info-container'),
				model: this.model.youtube().info
			});

			this.currentPlaylistView = new PlaylistInfoView({
				el: this.$('.playlist-info'),
				model: this.model
			});

			this.listenTo(this.currentTrackInfoView, 'seek', this.seekToSeconds);

			// $(window).on('resize', _.bind(this.insertCustomStyles, this));

			window.onYouTubeIframeAPIReady = _.bind(this.createPlayer, this);
			var res = require(['http://www.youtube.com/iframe_api?&ghost='], function(){});
		},

		createPlayer: function(){
			var sizes = this.playerModel.get('size');
			this.player = new YT.Player('player', {
				height: String(sizes.height),
				width: String(sizes.width),
				playerVars: { 
					'autoplay': 0, 
					'enablejsapi': 1,
					'autohide': 0,
					'controls': 1,
					'fs': 1,
					'modestbranding': 1
				},
				events: {
					'onReady': _.bind(this.onPlayerReady, this),
					'onStateChange': _.bind(this.onPlayerStateChange, this)
				}
			});
		},

		onPlayerReady: function(){
			if (this.queue) {
				this.play(this.queue);
			}
			this.player.addEventListener('onStateChange', _.bind(this.onPlayerStateChange, this));
		},

		onPlayerStateChange: function(ev){
			var currentMediaId,
				currentPlaylistIndex;
			if (ev.data === YT.PlayerState.PAUSED) {
				this.toggleNowPlaying(false);
			}

			if (ev.data === YT.PlayerState.PLAYING) {
				currentMediaId = this.playerModel.get('mediaId');
				// TODO add support for playlist items titles
				if (this.playerModel.isCurrentPlaylist()) {
					currentPlaylistIndex = this.player.getPlaylistIndex();
					// sometimes the currentPlaylistIndex is -1 - need to fix
					currentPlaylistIndex = currentPlaylistIndex === -1 ? 
						// take the index from the player model
						// this.playerModel.get('index') || 0: 
						0: currentPlaylistIndex;
					this.model.youtube().fetchPlaylistInfo(currentMediaId);
					currentMediaId = this.player.getPlaylist()[currentPlaylistIndex];
					// this.model.fetchPlaylistInfo();
					this.updateIndex(currentPlaylistIndex);
				}
				this.model.youtube().fetchMediaById(currentMediaId);
				this.toggleNowPlaying(true);
			}
			// here we ensure that the player has been loaded and that
			// the getVolume method will return a number value
			_.once(_.bind(this.setVolume, this));
		},

		onMediaChanged: function (model, mediaId) {
			// this.model.youtube().get('info').set( { 'id': null } );
			this.play(model);
		},

		play: function(model) {
			if (!this.player || !this.player.loadVideoById) {
				this.show();
				this.queue = model;
				return;
			}
			this.player.stopVideo();
			if (this.player.clearVideo) { this.player.clearVideo(); }
			this.playMedia(model);
			this.$el.addClass('yt-playing');
			this.show(null , 'show');
		},

		updateIndex: function(index) {
			this.playerModel.set('index', index);
		},
		/**
		 * plays a single video or a playlist
		 * @param {json} mediaData - youtube api item result
		 * @param {json} options - key-value properties of media - type: video/playlist
		 *
		 * @param {YoutubePlayer} model - key-value properties of the selected media
		 */
		playMedia: function(model) {
			if (model.isCurrentPlaylist()) {
				this.playPlaylist(
					model.getPlaylistId(),
					model.getPlaylistCurrentIndex()
				);
			} else {
				this.player.loadVideoById( model.get('mediaId') );
			}
		},

		pause: function() {
			this.player.pauseVideo();
		},

		playVideo: function() {
			this.player.playVideo();
		},

		playPlaylist: function(playlistId, index){
			// if only index has changed (and not the playlist id)
			// then - play the index
			var playerCurrentPlaylistId;
			if (this.player) {
				playerCurrentPlaylistId = this.player.getPlaylistId(); 
				if (!_.isNull(playerCurrentPlaylistId) &&
					playlistId === playerCurrentPlaylistId) {
					this.player.playVideoAt(index);
					return;
				}
			} else {
				this.play(this.model.get('player'));
				return;
			}
			if (this.player.loadPlaylist) {
				this.player.loadPlaylist({
					list: playlistId,
					listType: 'playlist',
					index: index,
					// TODO: quality should be selected by the user
					suggestedQuality: 'large'
				});
			}
		},

		decreaseVolume: function() {
			this.updateVolume(this.player.getVolume() - 5);
			this.showVolume();
		},

		increaseVolume: function() {
			this.updateVolume(this.player.getVolume() + 5);
			this.showVolume();
		},

		// this method runs only once to set the ui with the
		// volume value
		setVolume: function () {
			this.updateVolume(this.player.getVolume());
		},

		updateVolume: function(volume) {
			if (volume < 0) {
				volume = 0;
			}
			if (volume >= 100) {
				volume = 100;
			}
			this.player.setVolume(volume);
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

		toggleFullScreen: function() {
			var player = this.playerModel,
				sizes = player.getSize();
			player.toggleFullScreen();
			this.player.setSize(sizes.width, sizes.height);
			this.$el.toggleClass('fullscreen', player.get('fullScreen'));
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
			var sizes = _().getPortviewSize(),
				$style = this.$('#youtube-full-screen');
				customStyle = _.template(YoutubeCustomCss, sizes);
			if ($style.length) {
				$style.replaceWith(customStyle);
			} else {
				this.$el.append(customStyle);
			}
		},

		seekToSeconds: function(seconds) {
			this.player.seekTo(seconds, true);
		}
	});

	return YoutubePlayer;
});