define([
	'underscore',
	'backbone',
	'./history-model',
	'collections/youtube_search_results'
], function(_, Backbone, HistoryModel, YoutubeSearchResultsList) {
   
    var list = YoutubeSearchResultsList.extend({
		model: HistoryModel,
		
		initialize: function() {
			this.listenTo(this, 'reset', this.updatePlayedId);
		}
	});
   
    return list; 
});