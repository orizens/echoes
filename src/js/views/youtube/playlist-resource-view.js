define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_item'
], function($, _, Backbone, YoutubeItemView){
	
	var itemView = YoutubeItemView.extend({
		initialize: function(){
			this.listen();
		},
		render: function () {
			var video = this.model.toJSON();
			this.handleForbidden(video);
			_.extend(this.model.attributes, video);
			video = this.model.digest().toJSON();
			this.$el.html(this.template(video));
			return this;
		},

		handleForbidden: function (resource) {
			if (resource.status && resource.status.reason === 'suspended'
				|| resource.status && resource.status.value === 'restricted') {
				this.$el.hide();
			}
		}
	});

	return itemView;
});