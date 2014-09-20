var _ = require('underscore');
var Backbone = require('backbonejs');
var YoutubeItemView = require('../../views/youtube_user_playlist_item.js');

module.exports = Timber.module('View', {

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
		this.model.youtube.updateUserPlaylists();
	},

	onPlaylistSelected: function() {
		this.$el.find('.active').removeClass('active');
	}
});