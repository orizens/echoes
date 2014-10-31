(function() {
    'use strict';

    angular
        .module('mediaDeck')
        .controller('UserMenuCtrl', UserMenuCtrl)
        

    /* @ngInject */
    function UserMenuCtrl($scope, $rootScope, YoutubeApi, YoutubeUser) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'UserMenuCtrl';
        vm.saveUser = saveUser;
        // vm.signOut = signOut;
        vm.user = YoutubeUser.data;
        // vm.user = {
        // 	snippet: {
        // 		title: 'Sign In'
        // 	}
        // }

        function saveUser (resource) {
        	YoutubeUser.update(resource.items[0]);
        }
    }
})();