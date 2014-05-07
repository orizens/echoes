define([
	'underscore',
	'backbone'], 
function(_, Backbone) {

	var YoutubePlaylistInfoProvider = Backbone.Model.extend({

		defaults: {
			id: null,
			type: 'playlists',
			// video resource is not allowed to get maxResults
			maxResults: 50,
			startIndex: 1
		},

		initialize: function() {
			this.on('change:id', this.getInfo, this);
			this.on('change:startIndex', this.getInfo, this);
			this.on('change:items', this.fetchNext, this);
		},

		getInfo: function() {
			// reset startIndex for 'playlist' only, because it's a new request
			if (this.hasChanged('id')) {
				// the previous playlist items should be deleted now
				// because of an async actions
				this.set('items', null, { silent: true });
				this.set({ 'startIndex': 1 }, { silent: true });
			}
			this.fetch();
		},

		fetchNext: function() {
			var maxResults = this.get('maxResults'),
				startIndex = this.get('startIndex'),
				totalItems = this.get('totalItems'),
				nextIndex = maxResults + startIndex,
				hasMoreItems = totalItems - nextIndex > 0;
			if (hasMoreItems) {
				this.set('startIndex', nextIndex);
				return;
			}
			this.trigger('done', this.get('items'), this);
		},

		url: function() {
			var maxResults = !_.isNull(this.get('maxResults')) ? this.get('maxResults') : false,
				type = this.get('type');
			return 'https://gdata.youtube.com/feeds/api/' + 
				this.get('type') + '/' + this.get('id') + 
				'?v=2&alt=jsonc' + (maxResults ? '&max-results=' + maxResults : '') +
				// type 'video' doesn't support 'start-index'
				(type === 'playlists' ? '&start-index=' + this.get('startIndex') : '');
		},

		parse: function(response) {
			// it's the the first time this item is being fetched
			// so all data is returned
			if (this.get('id') === this.previous('id')) {
				// the other case is it's the n-th index of this item response
				// so - the new items should be added to the current
				if (this.get('items')) {
					response.data.items = this.get('items').concat(response.data.items);
				}
			}

			return response.data;
		}
	});

	return YoutubePlaylistInfoProvider;
});