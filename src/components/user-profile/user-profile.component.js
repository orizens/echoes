import './user-profile.less';
import template from './user-profile.tpl.html';

// Usage:
//  <user-profile></user-profile>
export let userProfile = {
  selector: 'userProfile',
  templateUrl: template,
  controllerAs: 'userProfile',
  controller: class UserProfileCtrl {
    /* @ngInject */
    constructor (GapiLoader, YoutubeUser, UserPlaylists, $window) {
      Object.assign(this, { GapiLoader, YoutubeUser, UserPlaylists, $window });
      this.data = YoutubeUser.data;
      if (!YoutubeUser.isUserSignedIn()) {
        this.signIn();
      }
    }

    signIn (options) {
      this.GapiLoader.auth(options)
      .then((res) => {
        // debugger
        this.YoutubeUser.signIn(res);
        this.UserPlaylists.list();
      });
    }

    signInDialog () {
      var options = {
        immediate: false,
        loadClientApi: false
      };
      this.signIn(options);
    }

    signOut () {
      this.GapiLoader.signOut()
      .then(this.YoutubeUser.signOut)
      .then(this.UserPlaylists.clearPlaylists);
    }

    reload () {
      this.$window.location.reload();
    }
  }
};