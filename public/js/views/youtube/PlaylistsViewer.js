define([
	'jquery',
	'underscore',
	'backbone',
	'views/playlists-viewer/playlist_search',
	'views/playlists-viewer/playlists_list',
	'text!templates/youtube_playlist_list_item.html'
], function($, _, Backbone, ViewerSearch, PlaylistsList,
	YoutubePlaylistItemTemplate) {

	var PlaylistsViewer = Backbone.View.extend({

		el: "#playlists-viewer",

		events: {
			'click .modal-body a': function (ev) {
				ev.preventDefault();
				this.addToPlaylist($(ev.target).data('id'));
			}
		},

		initialize: function() {
			this.listenTo(this.model, 'change:playlist-add', this.show);
			this.listenTo(this.model.user().playlists, 'reset', this.render);
			this.listenTo(this.model.user().playlists, 'add', this.render);
			this.listenTo(this.model.user().playlists, 'change', this.renderGapiResult);

			// this.listenTo(this.model.youtube().playlists, 'sync', this.renderGapiResult);
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

			this.filter = "";

			this.listenTo(this.header, 'search:change', this.filterPlaylist);
			this.listenTo(this.header, 'search:add', this.createPlaylist);
			// prerendering
			this.render();
		},

		render: function() {
			var signedIn = this.model.user().get('author');
			var playlists = this.model.user().playlists;
			this.playlists.collection.reset(
				this.getPlaylistsForDisplay(playlists),
				{ reset: true }
			);
			var hasPlaylists = this.playlists.collection.length;
			this.$el.toggleClass('user-not-signed-in', !signedIn);
			this.$el.toggleClass('add-new-playlist', !hasPlaylists);
		},

		getPlaylistsForDisplay: function (playlists) {
			var filter = this.filter;
			return playlists.filter(function(model){
				return model.get('title').toLowerCase().indexOf(filter) > -1;
			}, this);
		},

		show: function(){
			this.$el.modal('show');
		},

		addToPlaylist: function(playlistId){
			var videoId = this.model.get('playlist-add').id;
			this.model.user().playlists.insert(playlistId, videoId);
			// TODO display video added to playlist
			// reset playlist so it can be triggered again
			this.model.set('playlist-add', false, { silent: true });
			return;
		},

		renderGapiResult: function(model){
			var message = 'the video has been successfuly added to this playlist.';
			var playlistId = model.id;
			model.set('message', message, { silent: true });
			// this will update the user playlist view on the sidebar
			this.model.user().playlists.list(playlistId);
			this.render();
		},

		filterPlaylist: function(filter){
			this.filter = filter;
			this.render();
		},

		reset: function () {
			this.$('input[type=search]').val("");
			this.$('.message').empty();
			this.filter = "";
		},

		createPlaylist: function (title) {
			var playlist;
			if (title.length) {
				playlist = this.model.user().playlists.createPlaylist(title);
				this.listenTo(playlist, 'sync', function(model){
					this.header.resetState();
				});
			}
		}
	});

	return PlaylistsViewer;
});