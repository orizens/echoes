define([
	'underscore',
	'backbone',
	'./history-model',
	'collections/youtube_search_results'
], function(_, Backbone, HistoryModel, YoutubeSearchResultsList) {
   	var stats = Backbone.Model.extend({
   		url: 'https://www.googleapis.com/youtube/v3/videos',
   		list: function(items) {
   			this.fetch({
   				data: {
					part: 'contentDetails,statistics',
					key: 'AIzaSyCgrK5ds9uCSRM-WBUFm8V8jPX66q8-Od0',
					id: this.getIds(items),
					fields: 'items(contentDetails,id,statistics)'
				}
   			})
   		},

   		getIds: function(items) {
   			var ids = items.map(function(video){
   				return video.snippet.resourceId.videoId;
   			});
   			return ids.join(',');
   		},

   		reset: function() {
   			var items = this.attributes.items;
   			items && items.length ? this.attributes.items.length = 0 : '';
   		}
   	});

    var list = YoutubeSearchResultsList.extend({
		model: HistoryModel,
		
		stats: new stats(),

		initialize: function() {
			this.listenTo(this.stats, 'change:items', this.updateModels);
		},

		addItems: function(items){
			this.stats.reset();
			this.stats.list(items);
			this.tempItems = items;
		},

		updateModels: function(model, items){
			var tempIds = this.tempItems.map(function(t){
				return t.snippet.resourceId.videoId;
			});

			var mappedItems = this.tempItems.filter(function(media, i){
				if (items[i] && tempIds.indexOf(items[i].id) > -1) {
					media.id = items[i].id;
					media.thumbnail = {
						hqDefault: media.snippet.thumbnails.high.url
					};
					media.likeCount = items[i].statistics.likeCount;
					media.duration = items[i].contentDetails.duration;
					return media;
				}
			});
			this.add(mappedItems);
			this.tempItems.length = 0;
		},

		
		// in order to fetch more details: duration, likes etc..
	});
   
    return list; 
});