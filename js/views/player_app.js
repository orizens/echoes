define([
	'jquery',
	'underscore',
	'backbone',

	'views/media_search',
	'views/youtube_player',
	'views/content_layout',
	'views/results_navigation',
	'views/feed_filter',
	'views/youtube_playlists_provider',
	'views/user_profile_manager',

	'models/youtube_media_provider',
	'collections/history_playlist'
], function($, _, Backbone,
	MediaSearch, YoutubePlayer, ContentLayoutView,
	ResultsNavigation, FeedFilter, YoutubePlaylistsProvider, UserProfileManager,
	YoutubeMediaProvider, HistoryPlaylist) {
   
    var PlayerApp = Backbone.View.extend({
		initialize: function() {
			//- create an instance of the media provider
			this.modules = {};
			this.modules.searchBar = new MediaSearch();
			this.modules.searchBar.on('search-request', this.query, this);

			this.modules.mediaProvider = new YoutubeMediaProvider();
			this.modules.mediaProvider.on('new-media-response', this.onYoutubeSearchResponse, this);

			this.modules.youtubePlayer = new YoutubePlayer();
			this.modules.resultsView = new ContentLayoutView({ model: this.model });
			this.modules.resultsView.on('search-result-selected', this.onMediaSelected, this);
			this.modules.resultsNav = new ResultsNavigation();
			this.modules.resultsNav.on('navigate-index-change', this.onSearchResultsIndexChange, this);
			this.modules.historyPlaylistData = new HistoryPlaylist();
			this.modules.searchFeedFilter = new FeedFilter();
			this.modules.searchFeedFilter.on('feed-type-change', this.onNewSearch, this);
			this.modules.userPlaylists = new YoutubePlaylistsProvider();
			this.modules.userPlaylists.on('yt-profile-loaded', this.onUserProfileLoaded, this);
			this.modules.userProfileManager = new UserProfileManager({ model: this.model });

			//- bind model events
			this.model.on('change:route', this.onNavigationChange, this);
			this.model.on('change:play', this.play, this);
		},

		routes: {
			'explore': 'renderExplore',
			'history': 'renderHistory'
		},

		onNavigationChange: function(model, route) {
			var method = this.routes[route];
			if (method) {
				this[method].call(this);
			}
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
			this.model.set('filter', query.feedType);
			this.modules.mediaProvider.set(query);
		},

		onSearchResultsIndexChange: function(index) {
			this.modules.mediaProvider.set('startIndex', index);
		},

		onMediaSelected: function(mediaData, options) {
			this.modules.historyPlaylistData.queue(mediaData);
		},

		play: function(model, mediaData) {
			this.modules.youtubePlayer.play(mediaData, model.getOptions());
		},

		onUserProfileLoaded: function(username) {
			this.model.set('username', username);
		}
	});
   
    return PlayerApp;
});