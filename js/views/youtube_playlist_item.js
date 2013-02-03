define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/youtube_playlist_item.html'
], function($, _, Backbone, YoutubePlaylistItemTemplate) {
   
    var YoutubePlaylistItem = Backbone.View.extend({
		tagName: 'li',
		
		className: 'well youtube-item span3 nicer-ux ux-maker',

		template: _.template(YoutubePlaylistItemTemplate),
		
		events: {
			'click .media-title': 'updateState',
			'click .media-desc': 'toggleInformation'
		},

		initialize: function() {
			this.listenTo(this.model, 'change:isPlaying', this.renderState);
		},

		render: function() {
			this.$el.html( this.template(this.model.toJSON()) );
			this.renderState(this.model, this.model.get('isPlaying'));
			return this;
		},

		renderState: function(model, isPlaying) {
			this.$el.toggleClass('is-playing', isPlaying);
		},

		updateState: function() {
			this.model.set('isPlaying', true);
		},

		toggleInformation: function() {
			this.$el.toggleClass('show-description');
			this.$el.find('.icon-white').toggleClass('icon-chevron-up').toggleClass('icon-chevron-down');
		},

		destroy: function() {
			this.undelegateEvents();
			this.remove();
		}
	});
   
    return YoutubePlaylistItem;
});