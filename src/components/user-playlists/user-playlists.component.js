import template from './user-playlists.tpl.html';

export let UserPlaylistsComponent = {
	template,
	selector: 'user-playlists',
	controllerAs: 'userPlaylists',
	scope: {

	},
	bindToController: true,
	replace: true,
	restrict: 'E',
	controller: class UserPlaylistsCtrl {
		/* @ngInject */
		constructor ($http, YoutubePlayerSettings, UserPlaylists, YoutubeVideoInfo, YoutubeUser) {
			Object.assign(this, { YoutubePlayerSettings, YoutubeVideoInfo, YoutubeUser });
			this.title = 'UserPlaylistsCtrl';
			this.playlists = UserPlaylists.tracks;
			this.search = '';
			UserPlaylists.list();
		}

		playPlaylist (playlist) {
		    this.YoutubeVideoInfo.getPlaylist(playlist.id).then(this.YoutubePlayerSettings.playPlaylist);
		}

		isUserSignedIn () {
			return this.YoutubeUser.isUserSignedIn();
		}
	}
};
