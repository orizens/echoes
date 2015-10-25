(function() {
    'use strict';

    angular
        .module('google-signin')
        .directive('googleSignOut', googleSignOut);

    /* @ngInject */
    function googleSignOut ($window, GapiLoader, GoogleClientApi, YoutubeUser) {
        // Usage:
        //	<a google-sign-in="callback-function" scope="string" api="string" api-version="string">Google Sign In</a>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
            	googleSignOut: '&'
            }
        };
        return directive;

        function link(scope, element, attrs) {
        	element[0].addEventListener('click', unauthorize);

        	function unauthorize(ev){
        		ev.preventDefault();
        		GapiLoader.signOut().then(onGoogleUnAuthSuccess);

        		function onGoogleUnAuthSuccess (authSuccess) {
        			console.log(authSuccess);
                    YoutubeUser.signOut();
        			// GoogleClientApi.load(scope.api, scope.apiVersion).then(onGoogleClientApiSuccess);
        		}

        		// function onGoogleClientApiSuccess (api) {
        		// 	scope.googleSignOut({ auth: authResult });
        		// }
        	}
        }
    }

})();