define([
	'underscore',
	'backbone'
], function(_, Backbone) {
   
    var YoutubeMediaProvider = Backbone.Model.extend({
	
		defaults: {
			query: '',
			startIndex: 1,
			maxResults: 24,

			// supported feed types: videos, playlists, playlist
			feedType: 'videos'
		},

		initialize: function() {
			this.on('change:query change:startIndex change:feedType', this.search, this);
			this.on('change:data', this.publishResponse, this);
		},

		search: function() {
			this.fetch();
		},

		query: function(data) {
			data.startIndex = data.startIndex || 1;
			this.set(data);
		},
		
		urlRoot: function() {
			return 'https://gdata.youtube.com/feeds/api/' + this.getFeedType() +
				'?q=' + this.get('query') +
				'&alt=jsonc&v=2&start-index=' + this.get('startIndex') +
				'&max-results=' + this.get('maxResults');
		},

		publishResponse: function() {
			this.trigger('new-media-response', this.get('data'));
		},

		getFeedType: function() {
			var feedType = this.get('feedType');
			if (feedType === 'playlists') {
				feedType += '/snippets';
			}
			// single playlist: PLD5BA8A4695FAA144?alt=jsonc&v=2
			if (feedType === 'playlist') {
				feeType += '/' + this.get('query');
			}
			return feedType;
		}
	});
   
    return YoutubeMediaProvider;
});