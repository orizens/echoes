define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_search_results',
	'views/youtube_playlists_results',
	'views/youtube_playlist_info_viewer'
], function($, _, Backbone, 
	YoutubeSearchResults, 
	YoutubePlaylistsResults,
	PlaylistInfoViewer) {
	
	var ContentLayout = Backbone.View.extend({
		el: '#search-results',

		switcher: {
			key: 'layout',
			transition: {
				cssIn: 'transition-in'
			},
			views: {
				videos: YoutubeSearchResults,
				playlists: YoutubePlaylistsResults,
				playlistInfo: PlaylistInfoViewer
			}
		}
	});

	return ContentLayout;
});