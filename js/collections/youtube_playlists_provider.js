define([
	'underscore',
	'backbone',
	'models/youtube_user_playlist_item'
], function(_, Backbone, YoutubePlaylistItemModel) {
   
    var YoutubePlaylistsProvider = Backbone.Collection.extend({
		model: YoutubePlaylistItemModel,

		url: function() {
			return 'http://gdata.youtube.com/feeds/api/users/' + this.username + '/playlists?v=2&alt=jsonc&max-results=50&start-index=' + this.index;
		},

		initialize: function () {
			this.tempItems = [];
		}, 
		getInfo: function() {
			// reset startIndex for 'playlist' only, because it's a new request
			if (this.hasChanged('id')) {
				this.set({ 'startIndex': 1 }, { silent: true });
			}
			this.fetch();
		},

		index: 1,

		fetchNext: function(response) {
			var maxResults = 50,
				startIndex = this.index,
				totalItems = response.data.totalItems,
				nextIndex = maxResults + startIndex,
				hasMoreItems = totalItems - nextIndex > 0;
			if (hasMoreItems) {
				this.index = nextIndex;
			}
			return hasMoreItems;
		},

		parse: function(response) {
			// it's the the first time this item is being fetched
			// so all data is returned
			// if (this.get('id') === this.previous('id')) {
				// the other case is it's the n-th index of this item response
				// so - the new items should be added to the current
				// if (this.get('items')) {
					response.data.items = this.tempItems.concat(response.data.items);
				// }
			// }
			this.tempItems = response.data.items;
			if (this.fetchNext(response)){
				this.fetch({ reset: true });
			}
			return response.data.items;
		},

		comparator: function(entry) {
			return entry.get('title');
		}
	});
   
    return YoutubePlaylistsProvider;
});