define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_user_playlist_item'
], function($, _, Backbone, YoutubeItemView) {
	return Timber.module('View', {

		el: '#user-playlists',

		transition: {
			duration: 300,
			css: 'transition-in'
		},

		view: {
			type: YoutubeItemView,
			events: {
				'playlist-selected': 'onPlaylistSelected'
			}
		},
		initialize: function(){
			// this.listenTo(Backbone, 'user:authorized', this.handleAuthorize);
			this.listenTo(this.model.youtube.profile, 'change:items', this.list);
		},

		// handleAuthorize: function(authResult){
		// 	this.model.youtube.profile.connect();
		// },

		list: function(){
			if (this.model.youtube.profile.attributes.items) {
				this.collection.list();
			} else {
				this.collection.reset([]);
			}
		},

		onPlaylistSelected: function() {
			this.$el.find('.active').removeClass('active');
		}
	});
});