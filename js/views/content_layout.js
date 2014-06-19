define([
	'jquery',
	'underscore',
	'backbone',
	'modules/videos/youtube-videos',
	'views/youtube_playlists_results',
	'modules/playlist-viewer/playlist-viewer',
	'modules/history/history',
	'modules/playlists/youtube-playlists'
], function($, _, Backbone, 
	YoutubeVideos, 
	YoutubePlaylistsResults,
	PlaylistInfoViewer,
	history,
	YoutubePlaylists) {
	
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
				history: history,
				myPlaylists: YoutubePlaylists
			}
		}
	});

	return ContentLayout;
});