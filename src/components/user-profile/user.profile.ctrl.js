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
        vm.data = YoutubeUser.data;
        activate();

        /////////////
        
        function activate () {
            GapiLoader.auth()
                .then(YoutubeUser.signIn)
                .then(UserPlaylists.list);
        }
    }
})();