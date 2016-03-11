(function() {
    'use strict';

    angular
        .module('google-signin')
        .directive('googleSignIn', googleSignIn);

    /* @ngInject */
    function googleSignIn ($window, GapiLoader, GoogleClientApi, YoutubeUser) {
        // Usage:
        //	<a google-sign-in="callback-function" scope="string" api="string" api-version="string">Google Sign In</a>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
            	googleSignIn: '&'
            }
        };
        return directive;

        function link(scope, element, attrs) {
        	element[0].addEventListener('click', authorize);
            debugger
            scope.$on('$destroy', () => {
                element[0].removeEventListener('click', authorize);
            });
        	function authorize(ev){
        		ev.preventDefault();
                var options = {
                    immediate: false,
                    loadClientApi: true
                };
        		GapiLoader.auth(options)
                    .then(onGoogleAuthSuccess);

        		function onGoogleAuthSuccess (authSuccess) {
        			console.log(authSuccess);
                    YoutubeUser.signIn(authSuccess);
        			// GoogleClientApi.load(scope.api, scope.apiVersion).then(onGoogleClientApiSuccess);
        		}

        		function onGoogleClientApiSuccess (api) {
        			scope.googleSignIn({ auth: authResult });
        		}
        	}
        }
    }

})();