define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_user_playlist_item'
], function($, _, Backbone, YoutubeItemView) {
	var YoutubePlaylistsView = Backbone.View.extend({

		el: '#user-playlists',

		view: {
			type: YoutubeItemView,
			events: {
				'playlist-selected': 'onPlaylistSelected'
			}
		},
		initialize: function(){
			this.listenTo(Backbone, 'user:authorized', this.handleAuthorize);
		},

		handleAuthorize: function(authResult){
			this.collection.list();
		},

		onPlaylistSelected: function() {
			this.$el.find('.active').removeClass('active');
		}
	});

    return YoutubePlaylistsView;
});