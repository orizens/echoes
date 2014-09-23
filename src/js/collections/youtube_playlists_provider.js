var _ = require('underscore');
var Backbone = require('backbonejs');
var YoutubePlaylistItemModel = require('../models/youtube_user_playlist_item.js');
var YoutubePlaylistItemsService = require('../models/youtube/YoutubePlaylistItemsService.js');
var PlaylistsService = require('../models/youtube/PlaylistsService.js');
var Gapi = require('../models/gapi.js');

// YoutubePlaylistItemsService should be used for updating 
// any playlist's item / video attributes:
// remove a video from playlist, change position,
// add a new video a playlist,
// 
// PlaylistsService should be used for updating a 
// playlist's operations:
// create a new playlist, remove a playlist,
// change playlist's properties: tital, description, privacy
var YoutubePlaylistsProvider = Backbone.Collection.extend({
	// model: YoutubePlaylistItemModel,
	model: YoutubePlaylistItemsService,

	url: function() {
		return 'http://gdata.youtube.com/feeds/api/users/' + this.username + '/playlists?v=2&alt=jsonc&max-results=50&start-index=' + this.index;
	},

	initialize: function () {
		this.tempItems = [];
	}, 

	insert: function(playlistId, videoId) {
		// debugger;
		var playlist = this.get(playlistId);
		if (playlist) {
			playlist.insert(videoId);
		}
		return playlist;
	},

	list: function(playlistId) {
		// create a new service for the playlist
		var playlist = new PlaylistsService();
		playlist.methods.list.id = playlistId;
		// register to sync event
		playlist.on('sync', function(model){
			var size = model.get('result').items[0].contentDetails.itemCount;
			this.get(playlistId).set('size', size);
		}, this);
		playlist.fetch();

	},

	
	createPlaylist: function (title, description) {
		var playlist = new PlaylistsService();
		playlist.on('sync', function(model){
			// this.resetParams();
			// this.fetch();
			this.trigger('created', model.attributes)
			playlist.off();
		}, this);
		return playlist.insert(title, description);
	},

	removePlaylist: function (id) {
		var playlist = new PlaylistsService();
		playlist.on('sync', function(model){
			this.trigger('removed', id);
			playlist.off();
		}, this);
		return playlist.remove(id);
	},

	resetParams: function () {
		this.index = 1;
		this.tempItems.length = 0;
	},

	getInfo: function() {
		// reset startIndex for 'playlist' only, because it's a new request
		if (this.hasChanged('id')) {
			this.set({ 'startIndex': 1 }, { silent: true });
		}
		this.fetch();
	},

	index: 1,

	fetchNext: function(response) {
		var maxResults = 50,
			startIndex = this.index,
			totalItems = response.data.totalItems,
			nextIndex = maxResults + startIndex,
			hasMoreItems = totalItems - nextIndex >= 0;
		if (hasMoreItems) {
			this.index = nextIndex;
		}
		return hasMoreItems;
	},

	parse: function(response) {
		// it's the the first time this item is being fetched
		// so all data is returned
		// if (this.get('id') === this.previous('id')) {
			// the other case is it's the n-th index of this item response
			// so - the new items should be added to the current
			// if (this.get('items')) {
				response.data.items = this.tempItems.concat(response.data.items);
			// }
		// }
		this.tempItems = response.data.items;
		if (this.fetchNext(response)){
			this.fetch({ reset: true });
		}
		return response.data.items;
	},

	comparator: function(entry) {
		return entry.get('title');
	}
});

module.exports = YoutubePlaylistsProvider;