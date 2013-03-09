define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/youtube_item.html'
], function($, _, Backbone, YoutubeItemTemplate) {
   
    var YoutubeItemView = Backbone.View.extend({
		tagName: 'li',
		
		className: 'well youtube-item span3 nicer-ux ux-maker',
		
		template: _.template(YoutubeItemTemplate),

		events: {
			'click .media-title': 'selectMedia',
			'click .media-desc': 'toggleInformation'
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
			this.$el.remove();
		}
	});
   
    return YoutubeItemView;
});