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
			// prerendering
			this.renderPlaylists();
		},

		template: _.template("<li><a href='#<%= id %>' data-id='<%= id %>'><%= title %> <span class='badge badge-info'><%= size %></span></a></li>"),

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
			var playlistId = $(ev.target).data('id');
			ev.preventDefault();
			console.log('playlist selected', playlistId);

			if (gapi && gapi.client.youtube) {
				var request = gapi.client.youtube.playlistItems.insert({
					part: 'snippet,status',
					resource: {
						snippet: {
							playlistId: playlistId,
							resourceId: {
								videoId: this.model.get('playlist-add').id,
								kind: 'youtube#video'
							}
						}
					}
				});
				request.execute(function(response){
					var message = 'the video has been added to playlist successfuly';
					if (response.error) {
						message = response.error.data[0].message;
					}
					$(ev.target).after(message);
				});
			}
			this.model.set('playlist-add', false, { silent: true });
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