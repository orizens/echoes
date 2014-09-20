var _ = require('underscore');
var Backbone = require('backbonejs');
var YoutubeItemView = require('../../views/youtube_user_playlist_item.js');
var PlaylistsFilter = require('./user-playlists-filter');

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
		this.filter = PlaylistsFilter.create(this.model);
		this.listenTo(this.filter, 'change', this.filterList);
		// this.listenTo(Backbone, 'user:authorized', this.handleAuthorize);
		this.listenTo(this.model.youtube.profile, 'change:items', this.list);
	},

	// handleAuthorize: function(authResult){
	// 	this.model.youtube.profile.connect();
	// },
	filterList: function(val){
		var playlists = this.model.youtube.playlists;
		this.collection = playlists.filter(function(item){
			return item.attributes.snippet.title.toLowerCase().indexOf(val.toLowerCase()) > -1;
		});
		this.render();
	},
	list: function(){
		this.model.youtube.updateUserPlaylists();
	},

	onPlaylistSelected: function() {
		this.$el.find('.active').removeClass('active');
	}
});