(function() {
    'use strict';

    angular
        .module('mediaDeck')
        .controller('UserMenuCtrl', UserMenuCtrl)
        

    /* @ngInject */
    function UserMenuCtrl($scope, $rootScope, YoutubeClientApi) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'UserMenuCtrl';
        vm.saveUser = saveUser;
        // vm.user = {
        // 	snippet: {
        // 		title: 'Sign In'
        // 	}
        // }

        activate();

        function activate() {
        }

        function saveUser (resource) {
        	vm.user = angular.copy(resource.items[0]);
        	$rootScope.$broadcast('user-signed-in', vm.user);
        }
    }
})();