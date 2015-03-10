(function() {
    'use strict';

    angular
        .module('echoes.resources')
        .factory('YoutubeUser', YoutubeUser);

    /* @ngInject */
    function YoutubeUser($rootScope) {
    	var data = {};
        var service = {
            update: update,
            data: data
        };
        return service;

        ////////////////

        function update(user) {
        	angular.copy(user, data);
        	$rootScope.$broadcast('user-signed-in', data);
        }
    }
})();