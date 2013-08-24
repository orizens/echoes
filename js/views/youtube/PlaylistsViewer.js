define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {

	var PlaylistsViewer = Backbone.View.extend({

		el: "#playlists-viewer",

		events: {
			'click .modal-body a': 'addToPlaylist',
			'keyup .modal-header input': 'filterPlaylist'
		},

		initialize: function() {
			this.listenTo(this.model, 'change:playlist-add', this.showPlaylistsViewer);
			this.listenTo(this.model.user().playlists(), 'reset', this.renderPlaylists);
			this.listenTo(this.model.user().playlists(), 'change', this.renderPlaylists);
			this.listenTo(this.model.youtube().playlists, 'sync', this.renderGapiResult);
			// prerendering
			this.renderPlaylists();
		},

		template: _.template("<li><a href='#<%= id %>' data-id='<%= id %>'><%= title %> <span class='badge badge-info'><%= size %></span></a><span class='message'></span></li>"),

		render: function(userPlaylists) {
			this.$('.modal-body ul').empty().append(
				userPlaylists.map(function(model){
					return this.template(model.toJSON());
				}, this)
			);
		},

		renderPlaylists: function () {
			this.render(this.model.user().playlists());
		},

		showPlaylistsViewer: function(model, video){
			this.$('.video-title').append(video.title);
			this.$el.modal('show');
			console.log(video);
		},

		addToPlaylist: function(ev){
			ev.preventDefault();
			var playlistId = $(ev.target).data('id');
			var videoId = this.model.get('playlist-add').id;
			this.model.youtube().playlists.insert(playlistId, videoId);
			// TODO display video added to playlist
			// reset playlist so it can be triggered again
			this.model.set('playlist-add', false, { silent: true });
			return;
		},

		renderGapiResult: function(model){
			var message = 'the video has been added to playlist successfuly';
			// message = response.error.data[0].message;
			var playlistId = model.get('resource').snippet.playlistId;
			var videoId = model.get('resource').snippet.resourceId.videoId;
			var size = this.model.user().playlists().get(playlistId).get('size');
			this.model.user().playlists().get(playlistId).set({ size: size + 1});
			// TODO render as a change event through a model
			this.$('a[href="#' + playlistId + '"] + .message').html(message);
		},

		filterPlaylist: function(ev){
			var filter = ev.target.value;
			var playlists = this.model.user().playlists().filter(function(model){
				return model.get('title').toLowerCase().indexOf(filter) > -1;
			}, this);
			this.render(playlists);
		}
	});

	return PlaylistsViewer;
});