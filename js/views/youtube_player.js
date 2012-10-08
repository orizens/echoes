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
			'click .show-player': 'show'
		},

		initialize: function() {
			var that = this;
			window.onYouTubeIframeAPIReady = function() {
				that.createPlayer();
			};
			var res = require(['youtube'], function(){});
			// this.$player = this.$el.find('iframe');
		},

		createPlayer: function(){
			this.player = new YT.Player('player', {
				height: '270',
				width: '270',
				// videoId: 'u1zgFlCw8Aw',
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
			this.show();
			return;
			var mediaSource = "http://www.youtube.com/embed/" + mediaData.id + "?enablejsapi=1&version=3&playerapiid=1&autoplay=1&origin=http://orizens.github.org/echoes";
			this.$player.attr('src', mediaSource);
			this.show();
		},

		show: function() {
			this.$el.addClass('show-youtube-player');
		},

		hide: function() {
			this.$el.removeClass('show-youtube-player');
		}
	});

	return YoutubePlayer;
});