define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/youtube_item.html'
], function($, _, Backbone, YoutubeItemTemplate) {
   
    var YoutubeItemView = Backbone.View.extend({
		tagName: 'li',
		
		className: 'youtube-item card span3 nicer-ux ux-maker',
		
		events: {
			'click .media-thumb': 'selectMedia',
			'click .media-desc': 'toggleInformation',
			'click .add-to-playlist': 'addToPlaylist',
			'click .favorite-media': 'toggleFavorite',
			'click .close': 'toggleInformation'
		},
		template: _.template(YoutubeItemTemplate),

		initialize: function() {
			this.listen();
		},

		listen: function () {
			this.listenTo(this.model, 'change:isPlaying', this.render);
			this.listenTo(this.model, 'change:isFavorite', this.render);
		},

		render: function() {
			this.$el.html( this.template(this.model.toJSON()) );
			return this;
		},

		selectMedia: function(ev) {
			ev.preventDefault();
			this.model.set('isPlaying', true);
			this.trigger('play-media', this.model);
		},

		toggleInformation: function(ev) {
			ev.stopPropagation();
			this.$el.toggleClass('show-description');
		},

		addToPlaylist: function(ev){
			ev.preventDefault();
			Backbone.trigger('app:add-to-playlist', this.model.toJSON());
		},

		toggleFavorite: function (ev) {
			var isFavorite = this.model.get('isFavorite');
			ev.preventDefault();
			console.log('favorited video', this.model.toJSON());
			this.model.set('isFavorite', !isFavorite);
		}
	});
   
    return YoutubeItemView;
});
