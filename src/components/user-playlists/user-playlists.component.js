import './user-playlists.less';
import template from './user-playlists.tpl.html';

export let UserPlaylistsComponent = {
  templateUrl: template,
  selector: 'user-playlists',
  controllerAs: 'userPlaylists',
  scope: {

  },
  bindToController: true,
  replace: true,
  restrict: 'E',
  controller: class UserPlaylistsCtrl {
    /* @ngInject */
    constructor ($http, YoutubePlayerSettings, UserPlaylists, YoutubeVideoInfo, YoutubeUser, toastr) {
      Object.assign(this, { YoutubePlayerSettings, YoutubeVideoInfo, YoutubeUser });
      this.title = 'UserPlaylistsCtrl';
      this.playlists = UserPlaylists.tracks;
      this.search = '';
      this.data = YoutubeUser.data;
      this._toastr = toastr.info('', '<i class="fa fa-refresh fa-spin fa-3x"></i> Loading Playlists...', {
        iconClass: 'toast-loader'
      });
      UserPlaylists
        .list()
        .then(() => toastr.clear(this._toastr));
    }

    playPlaylist (playlist) {
        this.YoutubeVideoInfo.getPlaylist(playlist.id).then(this.YoutubePlayerSettings.playPlaylist);
    }

    isUserSignedIn () {
      return this.YoutubeUser.isUserSignedIn();
    }
  }
};
