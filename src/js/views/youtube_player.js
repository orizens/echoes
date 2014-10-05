var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbonejs');
var TrackInfoView = require('./youtube/track_info');
var PlaylistInfoView = require('./youtube/playlist_info');
var YoutubeCustomCss = require('../../templates/youtube_custom_styles.html');

var YoutubePlayer = Backbone.View.extend({
	el: '#youtube-player-container',

	events: {
		'click .show-player': 'show',
		'click .pause': 'pause',
		'click .play': 'playVideo',
		'click .volume-toggle': 'toggleVolume',
		// 'click .volume-up': 'increaseVolume',
		'click .next': 'playNext',
		'click .previous': 'playPrevious',
		'click .fullscreen': 'toggleFullScreen',
		'click .add-to-playlist': 'addToPlaylist',

		'mouseout .volume-down': 'hideVolume',
		'mouseout .volume-up': 'hideVolume',

		'mouseover .volume-down': 'showVolume',
		'mouseover .volume-up': 'showVolume'
	},

	initialize: function() {
		this.playerModel = this.model.player;
		this.listenTo(this.playerModel, 'change:mediaId', this.onMediaChanged);
		this.listenTo(this.playerModel, 'change:index', this.playMedia);

		this.currentTrackInfoView = new TrackInfoView({
			el: this.$('.current-track-info-container'),
			model: this.model.youtube.info
		});

		this.currentPlaylistView = new PlaylistInfoView({
			el: this.$('.playlist-info'),
			model: this.model
		});

		this.$volume = this.$('#volume-ctrl').slider({
			min: 0,
			max: 100,
			orientation: "vertical",
			slide: _.bind(function(ev, ui){
				this.updateVolume(ui.value);
			}, this)
		});
		this.listenTo(this.currentTrackInfoView, 'seek', this.seekToSeconds);

		// $(window).on('resize', _.bind(this.insertCustomStyles, this));

		window.onYouTubeIframeAPIReady = _.bind(this.createPlayer, this);
		Backbone.ajax({
			dataType: 'jsonp',
			url: 'http://www.youtube.com/iframe_api?&ghost='
		});

		// window.addEventListener('online', function(ev){
		// 	this.createPlayer();
		// 	// start playing only if the previous state was in play mode
		// 	// before client went offline
		// 	if(this.playerModel.get('isPlaying')){
		// 		this.play(this.model.player);
		// 	}
		// }.bind(this));
	},

	createPlayer: function(){
		var sizes = this.playerModel.get('size');
		// destroy player first
		if (this.player) {
			this.player.destroy();
		}
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
		var isMuted = this.player.isMuted();
		isMuted ? this.mute() : this.unMute();
		this.setVolume();

		if (this.queue) {
			this.play(this.queue);
		}
		this.player.addEventListener('onStateChange', _.bind(this.onPlayerStateChange, this));

	},

	onPlayerStateChange: function(ev){
		var currentMediaId,
			currentMediaIdFromPlayer;
		if (ev.data === YT.PlayerState.PAUSED) {
			this.toggleNowPlaying(false);
		}

		if (ev.data === YT.PlayerState.PLAYING) {
			currentMediaIdFromPlayer = this.player.getVideoData().video_id;
			currentMediaId = this.playerModel.get('mediaId');
			if (this.playerModel.isCurrentPlaylist()) {
				currentMediaId = this.updatePlaylistIndex(currentMediaId, this.player.getPlaylistIndex());
			}
			// update the echoes model with relevant id being played
			if (currentMediaIdFromPlayer && currentMediaIdFromPlayer !== currentMediaId) {
				currentMediaId = currentMediaIdFromPlayer;
			}
			this.model.youtube.fetchMediaById(currentMediaId);
			// always show the player when playing video (yt restrictions)
			this.toggleNowPlaying(true);
		}
		// here we ensure that the player has been loaded and that
		// the getVolume method will return a number value
		_.once(_.bind(this.setVolume, this));
	},

	/**
	 *	@returns mediaId - by current index
	 */
	updatePlaylistIndex: function (playlistId, index) {
		var currentMediaId;
		// sometimes the index is -1 - need to fix
		if (index === -1) {
			index = 0;
		}
		this.model.youtube.fetchPlaylistInfo(playlistId);
		currentMediaId = this.player.getPlaylist()[index];
		this.playerModel.set('index', index);
		return currentMediaId;
	},

	onMediaChanged: function (model, mediaId) {
		// this.model.youtube.get('info').set( { 'id': null } );
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
			this.player.loadVideoById( model.get('mediaId'), 0, 'large' );
		}
	},

	pause: function() {
		this.player.pauseVideo();
		this.playerModel.pause();
	},

	playVideo: function() {
		this.player.playVideo();
		this.playerModel.play();
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
			this.play(this.model.player);
			return;
		}
		if (this.player.loadPlaylist) {
			this.player.loadPlaylist({
				listType: 'playlist',
				list: playlistId,
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
		var volume = this.player.getVolume();
		this.updateVolume(volume);
		this.$volume.slider({ value: volume });
	},

	toggleVolume: function(ev){
		var $volumeBtn = this.$('.volume-master');
		var isMute = $volumeBtn.hasClass('volume-mute');
		isMute ? this.unMute() : this.mute();
	},

	mute: function(){
		this.player.mute();
		this.$('.volume-master').addClass('volume-mute');
	},

	unMute: function(){
		this.player.unMute();
		this.$('.volume-master').removeClass('volume-mute');
	},
	updateVolume: function(volume) {
		if (volume < 0) {
			volume = 0;
		}
		if (volume >= 100) {
			volume = 100;
		}
		this.player.setVolume(volume);
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
			sizes = player.getSize(),
			applyFullscreen;
		player.toggleFullScreen();
		this.player.setSize(sizes.width, sizes.height);
		applyFullscreen = player.get('fullScreen');
		this.$el.toggleClass('fullscreen', applyFullscreen);
		// hack - should be in app ctrl
		$(document.body).toggleClass('fullscreen', applyFullscreen);
	},

	toggleNowPlaying: function(show){
		this.$el.toggleClass('yt-playing', show);
		show ? this.playerModel.play() : this.playerModel.pause();
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
			customStyle = YoutubeCustomCss(sizes);
		if ($style.length) {
			$style.replaceWith(customStyle);
		} else {
			this.$el.append(customStyle);
		}
	},

	seekToSeconds: function(seconds) {
		this.player.seekTo(seconds, true);
	},

	addToPlaylist: function(ev){
		ev.preventDefault();
		Backbone.trigger('app:add-to-playlist', this.model.youtube.info.toJSON());
	}
});

module.exports = YoutubePlayer;