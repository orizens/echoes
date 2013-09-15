define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/youtube_playlist_list_item.html'
], function($, _, Backbone, YoutubePlaylistItemTemplate) {

	var PlaylistsViewer = Backbone.View.extend({

		el: "#playlists-viewer",

		events: {
			'click .modal-body a': function (ev) {
				ev.preventDefault();
				this.addToPlaylist($(ev.target).data('id'));
			},
			'click button[data-dismiss]': 'reset',
			'keyup .modal-header input': function (ev) {
				this.filter = ev.target.value;
				this.filterPlaylist(this.filter);
			},
			'click button[data-action="create"]': function (ev) {
				this.createPlaylist(this.$search.val());
			}
		},

		initialize: function() {
			this.listenTo(this.model, 'change:playlist-add', this.showPlaylistsViewer);
			this.listenTo(this.model.user().playlists, 'reset', this.renderPlaylists);
			this.listenTo(this.model.user().playlists, 'add', this.renderPlaylists);
			this.listenTo(this.model.user().playlists, 'change', this.renderGapiResult);

			// this.listenTo(this.model.youtube().playlists, 'sync', this.renderGapiResult);
			// listen to modal events
			this.$el.on('hidden', _.bind(this.reset, this));

			// cache
			this.$search = this.$('input[type=search]');
			this.filter = "";

			// prerendering
			this.renderPlaylists();
		},

		template: _.template(YoutubePlaylistItemTemplate),

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
			// debugger;
			this.filterPlaylist(this.filter);
			// TODO render as a change event through a model
			// this.$('a[href="#' + playlistId + '"] + .message').html(message);
			// this.$('a[href="#' + playlistId + '"] .badge').html(model.get('size'));
		},

		filterPlaylist: function(filter){
			var playlists = this.model.user().playlists.filter(function(model){
				return model.get('title').toLowerCase().indexOf(filter) > -1;
			}, this);
			this.render(playlists);
		},

		reset: function () {
			this.$('input[type=search]').val("");
			this.$('.message').empty();
			this.filter = "";
		},

		createPlaylist: function (title) {
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