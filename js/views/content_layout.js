define([
	'jquery',
	'underscore',
	'backbone',
	'modules/videos/youtube-videos',
	'views/youtube_playlists_results',
	'modules/playlist-viewer/playlist-viewer',
	'modules/history/history'
], function($, _, Backbone, 
	YoutubeVideos, 
	YoutubePlaylistsResults,
	PlaylistInfoViewer,
	history) {
	
	var ContentLayout = Backbone.View.extend({
		el: '#search-results',

		switcher: {
			key: 'layout',
			transition: {
				cssIn: 'transition-in'
			},
			views: {
				videos: YoutubeVideos,
				playlists: YoutubePlaylistsResults,
				playlistInfo: PlaylistInfoViewer,
				history: history
			}
		}
	});

	return ContentLayout;
});