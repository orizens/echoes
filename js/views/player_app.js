define([
	'jquery',
	'underscore',
	'backbone',

	'views/media_search',
	'views/youtube_player',
	'views/youtube_search_results',
	'views/results_navigation',
	'views/feed_filter',

	'models/youtube_media_provider',
	'collections/history_playlist'
], function($, _, Backbone,
	MediaSearch, YoutubePlayer, YoutubeSearchResultsView,
	ResultsNavigation, FeedFilter, YoutubeMediaProvider, HistoryPlaylist) {
   
    var PlayerApp = Backbone.View.extend({
		initialize: function() {
			//- create an instance of the media provider
			this.modules = {};
			this.modules.searchBar = new MediaSearch();
			this.modules.searchBar.on('search-request', this.query, this);

			this.modules.mediaProvider = new YoutubeMediaProvider();
			this.modules.mediaProvider.on('new-media-response', this.onYoutubeSearchResponse, this);

			this.modules.youtubePlayer = new YoutubePlayer();
			this.modules.resultsView = new YoutubeSearchResultsView();
			this.modules.resultsView.on('search-result-selected', this.play, this);
			this.modules.resultsNav = new ResultsNavigation();
			this.modules.resultsNav.on('navigate-index-change', this.onSearchResultsIndexChange, this);
			this.modules.historyPlaylistData = new HistoryPlaylist();
			this.modules.searchFeedFilter = new FeedFilter();
			this.modules.searchFeedFilter.on('feed-type-change', this.onNewSearch, this);
		},

		query: function(query, options) {
			//- in case the query is null - get it from the default query
			query = query || this.modules.searchBar.getQuery();
			this.modules.mediaProvider.query({ query: query});
			this.modules.searchBar.setQuery(query);
			if (options && options.ignore) {
				return;
			}
		},

		renderExplore: function() {
			this.modules.mediaProvider.set('query', this.modules.searchBar.getQuery());
			//- if it's the same query value - initiate manual search
			this.modules.mediaProvider.validateQuerySearch();
			return this;
		},

		renderHistory: function() {
			this.modules.resultsView.update( this.modules.historyPlaylistData.toJSON().reverse() );
			return this;
		},

		onYoutubeSearchResponse: function(data) {
			this.modules.resultsView.update(data.items);
			this.modules.resultsNav.update(data);
		},

		onNewSearch: function(query) {
			this.modules.mediaProvider.set(query);
		},

		onSearchResultsIndexChange: function(index) {
			this.modules.mediaProvider.set('startIndex', index);
		},

		play: function(mediaData) {
			this.modules.youtubePlayer.play(mediaData);
			this.modules.historyPlaylistData.queue(mediaData);
		},

		toggleViews: function(show) {
			_.each(Array.prototype.slice.call(arguments, 1), function(view) {
				view.$el.toggleClass('hidden', !show);
			});
		}
	});
   
    return PlayerApp;
});