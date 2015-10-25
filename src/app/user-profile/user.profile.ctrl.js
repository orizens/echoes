(function() {
    'use strict';

    angular
        .module('user-profile')
        .controller('UserProfileCtrl', UserProfileCtrl);
        

    /* @ngInject */
    function UserProfileCtrl($scope, GapiLoader, YoutubeUser, UserPlaylists) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'UserProfileCtrl';
        vm.user = YoutubeUser.data.user;
        vm.isUserSignedIn = isUserSignedIn;
        activate();

        /////////////
        
        function activate () {
            GapiLoader.auth()
                .then(YoutubeUser.signIn)
                .then(UserPlaylists.list);
        }

        function isUserSignedIn () {
            return YoutubeUser.isUserSignedIn();
        }
    }
})();