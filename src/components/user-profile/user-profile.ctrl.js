/* @ngInject */
export default class UserProfileCtrl {
    /* @ngInject */
    constructor (GapiLoader, YoutubeUser, UserPlaylists) {
        this.data = YoutubeUser.data;

        GapiLoader.auth()
            .then(YoutubeUser.signIn)
            .then(UserPlaylists.list);
    }
}