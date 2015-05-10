(function() {
    'use strict';

    angular
        .module('echoes.resources')
        .factory('YoutubeUser', YoutubeUser);

    /* @ngInject */
    function YoutubeUser($rootScope, $http) {
    	var data = {};
        var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=';
        var service = {
            update: update,
            data: data,
            isSignedIn: isSignedIn,
            signOut: signOut
        };
        return service;

        ////////////////

        function update(user) {
        	angular.copy(user, data);
        	$rootScope.$broadcast('user-signed-in', data);
        }

        function isSignedIn () {
            return Object.keys(data).length;
        }
        
        function signOut () {
            var url = revokeUrl + gapi.auth.getToken().access_token;
            $http.get(url).then(signOutSuccess, singOutFailed);

            function signOutSuccess (ev) {
                console.log('signout success', ev);
                clearUserData();
            }

            function singOutFailed (response) {
                if ('' === response.statusText) {
                    return signOutSuccess(response);
                }
                console.log('singout failed');
            }
        }

        function clearUserData () {
            Object.keys(data).forEach(function (key) {
                delete data[key];
            });
        }
    }
})();