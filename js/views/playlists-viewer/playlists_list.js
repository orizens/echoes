define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/youtube_playlist_list_item.html'
], function($, _, Backbone, template) {
	var PlaylistView = Backbone.View.extend({
		tagName: 'li',
		events: {
			'click a': function(ev){
				ev.preventDefault();
				this.model.set('adding', true, { silent: true });
				this.render();
				this.model.trigger('change:adding', this.model);
			}
		},
		initialize: function(){
			this.model.set('adding', false, { silent: true });
		},
		template: _.template(template),
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	var PlaylistsList = Backbone.View.extend({

		view: {
			type: PlaylistView
		},

		initialize: function() {
			this.listenTo(this.collection, 'change:adding', this.onAdd);
			// TODO
			// this.listenTo(this.model.user.playlists, 'reset', this.renderPlaylists);
			// this.listenTo(this.model.user.playlists, 'add', this.renderPlaylists);
			// this.listenTo(this.model.user.playlists, 'change', this.renderGapiResult);
		},

		onAdd: function(model){
			if (model.get('adding')){
				this.trigger('adding', model.id);
			}
		},

		reset: function(){
			this.collection.each(function(playlist){
				playlist.set('message', '', {silent: true});
			});
		}
	});

	return PlaylistsList;
});