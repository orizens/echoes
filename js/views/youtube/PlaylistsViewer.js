define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {

	var PlaylistsViewer = Backbone.View.extend({

		el: "#playlists-viewer",

		events: {
			'click .modal-body a': 'addToPlaylist',
			'click button[data-dismiss]': 'reset',
			'keyup .modal-header input': 'filterPlaylist',
			'click button[data-action="create"]': 'createPlaylist'
		},

		initialize: function() {
			this.listenTo(this.model, 'change:playlist-add', this.showPlaylistsViewer);
			this.listenTo(this.model.user().playlists, 'reset', this.renderPlaylists);
			this.listenTo(this.model.user().playlists, 'change add', this.renderPlaylists);
			this.listenTo(this.model.youtube().playlists, 'sync', this.renderGapiResult);
			// listen to modal events
			this.$el.on('hidden', _.bind(this.reset, this));

			// prerendering
			this.renderPlaylists();
		},

		template: _.template("<li><a href='#<%= id %>' data-id='<%= id %>'><%= title %> <span class='badge badge-info'><%= size %></span></a><span class='message'></span></li>"),

		render: function(userPlaylists) {
			var html = userPlaylists.map(function(model){
				return this.template(model.toJSON());
			}, this);
			if (!html.length && !this.model.user().get('author')) {
				html = "<li>Please sign in to add videos to your playlists</li>";
			}
			this.$('.modal-body ul').empty().append(html);
		},

		renderPlaylists: function () {
			this.render(this.model.user().playlists);
		},

		showPlaylistsViewer: function(model, video){
			this.$('.video-title').html(video.title);
			if (!this.model.user().playlists.length) {
				this.render(this.model.user().playlists);
			}
			this.$el.modal('show');
		},

		addToPlaylist: function(ev){
			ev.preventDefault();
			var playlistId = $(ev.target).data('id');
			var videoId = this.model.get('playlist-add').id;
			debugger;
			this.model.youtube().playlists.insert(playlistId, videoId);
			// TODO display video added to playlist
			// reset playlist so it can be triggered again
			this.model.set('playlist-add', false, { silent: true });
			return;
		},

		renderGapiResult: function(model){
			var message = 'the video has been successfuly added to this playlist.';
			// message = response.error.data[0].message;
			var playlistId = model.get('resource').snippet.playlistId;
			var videoId = model.get('resource').snippet.resourceId.videoId;
			// temp: in order to prevent a "favorite" action to trigger
			// the render.
			if (!_.isFunction(this.model.user().playlists)) {
				return;
			}
			// this will update the user playlist view on the sidebar
			var size = this.model.user().playlists.get(playlistId).get('size');
			this.model.user().playlists.get(playlistId).set({ size: size + 1});
			// TODO render as a change event through a model
			this.$('a[href="#' + playlistId + '"] + .message').html(message);
		},

		filterPlaylist: function(ev){
			var filter = ev.target.value;
			var playlists = this.model.user().playlists.filter(function(model){
				return model.get('title').toLowerCase().indexOf(filter) > -1;
			}, this);
			this.render(playlists);
		},

		reset: function () {
			this.$('input[type=search]').val("");
			this.$('.message').empty();
		},

		createPlaylist: function () {
			var title = this.$('input[type=search]').val();
			// var playlistsService = this.model.youtube().playlistsService;
			if (title.length) {
				this.model.youtube().playlists.create({ title: title });
				// playlistsService.get('resource').snippet.title = title;
				// playlistsService.create();
			}
		}
	});

	return PlaylistsViewer;
});