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
			ev.preventDefault();
			console.log('playlist selected', $(ev.target).data('id'));
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