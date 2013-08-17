define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/youtube_item.html'
], function($, _, Backbone, YoutubeItemTemplate) {
   
    var YoutubeItemView = Backbone.View.extend({
		tagName: 'li',
		
		className: 'youtube-item span3 nicer-ux ux-maker',
		
		template: _.template(YoutubeItemTemplate),

		events: {
			'click .media-title': 'selectMedia',
			'click .media-desc': 'toggleInformation',
			'click .add-to-playlist': 'addToPlaylist'
		},

		initialize: function() {
			this.listenTo(this.model, 'change:isPlaying', this.render);
		},

		render: function() {
			this.$el.html( this.template(this.model.toJSON()) );
			return this;
		},

		selectMedia: function(ev) {
			this.model.set('isPlaying', true);
		},

		toggleInformation: function() {
			this.$el.toggleClass('show-description');
		},

		destroy: function() {
			this.undelegateEvents();
			this.remove();
		},

		addToPlaylist: function(ev){
			ev.preventDefault();
			console.log('added to play;list');
			this.model.set('addToPlaylist', new Date());
		}
	});
   
    return YoutubeItemView;
});