import './user-profile.less';
import template from './user-profile.tpl.html';

/* @ngInject */
export default function userProfile() {
    // Usage:
    //  <user-profile></user-profile>
    // Creates:
    //
    var directive = {
        templateUrl: template,
        scope: {},
        bindToController: true,
        replace: true,
        restrict: 'E',
        controllerAs: 'userProfile',
        controller: class UserProfileCtrl {
            /* @ngInject */
            constructor (GapiLoader, YoutubeUser, UserPlaylists) {
                Object.assign(this, { GapiLoader, YoutubeUser, UserPlaylists })
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
        }
    };
    return directive;
}