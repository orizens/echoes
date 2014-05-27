define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_item'
], function($, _, Backbone, YoutubeItemView) {
   
    var historyView = YoutubeItemView.extend({
    	initialize: function () {
    		this.listenTo(this.model, 'change', this.render);
    	}
    });

    return historyView;
});		