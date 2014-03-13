define([
	'jquery',
	'underscore',
	'backbone',
	'modules/videos/youtube-videos',
	'views/youtube_playlists_results',
	'views/youtube_playlist_info_viewer'
], function($, _, Backbone, 
	YoutubeVideos, 
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
				videos: YoutubeVideos,
				playlists: YoutubePlaylistsResults,
				playlistInfo: PlaylistInfoViewer
			}
		}
	});

	return ContentLayout;
});