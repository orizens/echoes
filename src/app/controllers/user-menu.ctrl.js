(function() {
    'use strict';

    angular
        .module('echoes')
        .controller('UserMenuCtrl', UserMenuCtrl);
        

    /* @ngInject */
    function UserMenuCtrl($scope, $rootScope, YoutubeApi, YoutubeUser) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'UserMenuCtrl';
        vm.saveUser = saveUser;
        vm.signOut = signOut;
        vm.user = YoutubeUser.data;
        activate();

        /////////////
        
        function activate () {
            YoutubeApi.auth().then(function(user){
                YoutubeUser.update(user);
            });
        }

        function saveUser (resource) {
        	YoutubeUser.update(resource.items[0]);
        }

        function signOut ($event) {
            YoutubeUser.signOut();
            $event.stopPropagation();
        }
    }
})();