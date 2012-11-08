define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/youtube_playlist_item.html'
], function($, _, Backbone, YoutubePlaylistItemTemplate) {
   
    var YoutubePlaylistItem = Backbone.View.extend({
		tagName: 'li',
		
		className: 'well youtube-item span3 nicer-ux ux-maker',

		events: {
			'click .media-title': 'selectMedia',
			'click .media-desc': 'toggleInformation'
		},

		initialize: function() {
			this.template = _.template(YoutubePlaylistItemTemplate);
		},

		render: function() {
			this.$el.html( this.template(this.model.toJSON()) );
			this.$el.find('.twipsy').tooltip();
			return this;
		},

		selectMedia: function(ev) {
			this.trigger('media-clicked', this.model.toJSON());
		},

		toggleInformation: function() {
			this.$el.toggleClass('show-description');
			this.$el.find('.icon-white').toggleClass('icon-chevron-up').toggleClass('icon-chevron-down');
		},

		destroy: function() {
			this.undelegateEvents();
			this.$el.remove();
		}
	});
   
    return YoutubePlaylistItem;
});