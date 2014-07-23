define([
	'jquery',
	'underscore',
	'backbone',
	'./playlist-search',
	'./playlists-list',
	'modules/gsignin/gsignin'
], function($, _, Backbone, ViewerSearch, PlaylistsList, gsignin) {

	return Timber.module('View', {

		el: "#playlists-viewer",

		initialize: function() {
			this.listenTo(Backbone, 'app:add-to-playlist', this.show);
			this.listenTo(this.model.youtube.playlists, 'update', this.render);
			// this.listenTo(this.model.user.playlists, 'reset', this.render);
			this.listenTo(this.model.youtube.playlists, 'added', function(resource){
				this.model.youtube.playlists.list();
			});
			this.listenTo(this.model.youtube.profile, 'change:items', this.render);
			this.listenTo(this.model.user.playlists, 'created', function(resource){
				this.model.youtube.playlists.add(resource.result);
				this.header.resetState();
				this.render();
			});
			this.listenTo(this.model.user.playlists, 'removed', function(id){
				this.model.youtube.playlists.removeItemById(id);
				this.render();
			});
			// listen to modal events
			this.$el.on('hidden', _.bind(this.reset, this));
			this.$el.on('show', _.bind(this.render, this));
			this.header = new ViewerSearch({
				el: this.$('.modal-header'),
				model: this.model
			});

			this.playlists = new PlaylistsList({
				el: this.$('.modal-body ul')
			});

			this.gsignin = new gsignin({
				el: this.$('.gsign-in')[0],
				scopes: this.model.user.auth.scopes,
				clientId: this.model.user.getClientId()
			});

			this.listenTo(this.gsignin, 'auth:success', function(){
				this.model.youtube.profile.connect();
			});

			this.listenTo(this.playlists, 'adding', this.addToPlaylist);
			this.listenTo(this.playlists, 'remove', this.removePlaylist);

			this.filter = "";

			this.listenTo(this.header, 'search:change', this.filterPlaylist);
			this.listenTo(this.header, 'search:add', this.createPlaylist);
			// prerendering
			// this.render();
		},

		render: function() {
			var filteredItems = this.getPlaylistsForDisplay(this.model.youtube.playlists);
			var items = filteredItems;
			var isSignedIn = this.model.youtube.profile.isSignedIn();
			this.playlists.collection.reset(items, {reset: true});
			this.$el.toggleClass('user-not-signed-in', !isSignedIn);
			this.$el.toggleClass('add-new-playlist', !items.length);
		},

		getPlaylistsForDisplay: function (playlists) {
			var filter = this.filter;
			var results = playlists.filter(function(model){
				return model.getTitle().toLowerCase().indexOf(filter) > -1;
			}, this);
			return results.map(function(model){
				return model.toJSON();
			});
		},

		show: function(video){
			this.currentVideo = video;
			this.$el.modal('show');
		},

		addToPlaylist: function(playlistId){
			var videoId = this.currentVideo.id;
			this.model.youtube.playlists.insert(playlistId, videoId);
			// TODO display video added to playlist
			// reset playlist so it can be triggered again
			this.model.set('playlist-add', false, { silent: true });
			return;
		},

		renderGapiResult: function(model){
			var message = 'the video has been successfuly added to this playlist.';
			var playlistId = model.id;
			model.set({
				'message': message, 
				'adding': false
			},
			{ silent: true });
			// this will update the user playlist view on the sidebar
			this.model.user.playlists.list(playlistId);
			this.render();
		},

		filterPlaylist: function(filter){
			this.filter = filter;
			this.render();
		},

		reset: function () {
			this.playlists.reset();
			this.filter = "";
		},

		createPlaylist: function (title) {
			var playlist;
			if (title.length) {
				this.model.user.playlists.createPlaylist(title);
			}
		},

		removePlaylist: function(model){
			this.model.user.playlists.removePlaylist(model.id);
		}
	});
});