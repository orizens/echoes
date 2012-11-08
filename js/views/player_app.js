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

	'collections/history_playlist'
], function($, _, Backbone,
	MediaSearch, YoutubePlayer, ContentLayoutView,
	ResultsNavigation, FeedFilter, YoutubePlaylistsProvider, UserProfileManager,
	HistoryPlaylist) {
   
    var PlayerApp = Backbone.View.extend({
		initialize: function() {
			//- create an instance of the media provider
			this.modules = {};
			this.modules.searchBar = new MediaSearch({ model: this.model });
			this.modules.youtubePlayer = new YoutubePlayer({ model: this.model });
			this.modules.contentView = new ContentLayoutView({ model: this.model });
			this.modules.resultsNav = new ResultsNavigation({ model: this.model });
			// this.modules.historyPlaylistData = new HistoryPlaylist();
			this.modules.searchFeedFilter = new FeedFilter({ model: this.model });
			this.modules.userPlaylists = new YoutubePlaylistsProvider({ model: this.model });
			this.modules.userProfileManager = new UserProfileManager({ model: this.model });

			this.model.connectUser();
		}

		// renderHistory: function() {
		// 	this.modules.contentView.update( this.modules.historyPlaylistData.toJSON().reverse() );
		// 	return this;
		// },

	});
   
    return PlayerApp;
});