define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
   
    var YoutubePlayer = Backbone.View.extend({
		el: '#youtube-player-container',

		events: {
			'click .hide-player': 'hide',
			'click .show-player': 'show'
		},

		initialize: function() {
			this.$player = this.$el.find('iframe');
		},

		play: function(mediaData) {
			var mediaSource = "http://www.youtube.com/embed/" + mediaData.id + "?autoplay=1&origin=http://orizens.github.org/echoes";
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