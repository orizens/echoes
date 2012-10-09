define([
	'jquery',
	'underscore',
	'backbone'
	// 'youtube'
], function($, _, Backbone) {
   
	var YoutubePlayer = Backbone.View.extend({
		el: '#youtube-player-container',

		events: {
			'click .hide-player': 'hide',
			'click .show-player': 'show',
			'click .pause': 'pause',
			'click .play': 'playVideo',
			'click .volume-down': 'decreaseVolume',
			'click .volume-up': 'increaseVolume'
		},

		initialize: function() {
			window.onYouTubeIframeAPIReady = _.bind(this.createPlayer, this);
			var res = require(['http://www.youtube.com/iframe_api?&ghost='], function(){});
		},

		createPlayer: function(){
			this.player = new YT.Player('player', {
				height: '270',
				width: '270',
				events: {
					'onReady': $.proxy(this.onPlayerReady, this),
					'onStateChange': $.proxy(this.onPlayerStateChange, this)
				}
			});
		},
		
		onPlayerReady: function(){

		},

		onPlayerStateChange: function(){

		},

		play: function(mediaData) {
			this.player.loadVideoById(mediaData.id);
			this.$el.addClass('yt-playing');
			this.show();
		},

		pause: function(ev) {
			ev.preventDefault();
			this.$el.removeClass('yt-playing');
			this.player.pauseVideo();
		},

		playVideo: function(ev) {
			if (ev) { ev.preventDefault(); }
			this.player.playVideo();
		},

		decreaseVolume: function(ev) {
			if (ev) { ev.preventDefault(); }
			this.player.setVolume(this.player.getVolume() - 5);
		},

		increaseVolume: function(ev) {
			if (ev) { ev.preventDefault(); }
			this.player.setVolume(this.player.getVolume() + 5);
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