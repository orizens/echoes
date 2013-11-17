define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_search_results',
	'views/youtube_playlists_results'
], function($, _, Backbone, YoutubeSearchResults, YoutubePlaylistsResults) {
	
	var ContentLayout = Backbone.View.extend({
		el: '#search-results',

		switcher: {
			key: 'filter',
			transition: {
				cssIn: 'transition-in'
			},
			views: {
				videos: YoutubeSearchResults,
				playlists: YoutubePlaylistsResults
			}
		}
	});

	return ContentLayout;
});