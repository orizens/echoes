var Backbone = require('backbonejs');
var YoutubeVideos = require('../modules/videos/youtube-videos.js');
var YoutubePlaylistsResults = require('./youtube_playlists_results.js');
var PlaylistInfoViewer = require('../modules/playlist-viewer/playlist-viewer.js');
var history = require('../modules/history/history.js');
var YoutubePlaylists = require('../modules/playlists/youtube-playlists.js');

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

module.exports = ContentLayout;