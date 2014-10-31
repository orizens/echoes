(function() {
    'use strict';

    angular
        .module('youtube.directives')
        .directive('youtubeSignIn', youtubeSignIn)
        .factory('YoutubeApi', YoutubeApi)
        .factory('YoutubeClientApi', YoutubeClientApi)
        .factory('GoogleClientApi', GoogleClientApi);

    function YoutubeApi ($window, $rootScope, $q, GoogleClientApi) {
        var defered = $q.defer();
        var authDefered = $q.defer();
        var service = {
            load: load,
            auth: auth,
            signIn: signIn
        };

        activate();

        return service;

        function activate(){
            // Youtube callback when API is ready
            $window.onGapiLoad = function () {
                $rootScope.$apply(function () {
                    defered.resolve(); 
                    console.log('youtube api ready');
                });
            };

            // Inject YouTube's client API
            (function () {
                var validProtocols = ['http:', 'https:'];
                var url = '//apis.google.com/js/client.js?onload=onGapiLoad';

                // We'd prefer a protocol relative url, but let's
                // fallback to `http:` for invalid protocols
                if (validProtocols.indexOf(window.location.protocol) < 0) {
                    url = 'http:' + url;
                }
                var tag = document.createElement('script');
                tag.src = url;
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }());
        }

        function load() {
            return defered.promise;
        }

        function auth () {
            load().then(function(){
                gapi.auth.authorize({
                    client_id: '971861197531',
                    scope: "https://www.googleapis.com/auth/youtube",
                    // false - is for showing pop up
                    immediate: true, 
                }, function(authResult){
                    signIn(authResult)
                });
            })
            return authDefered.promise;
        }

        function signIn (authResult) {
            GoogleClientApi.load('youtube', 'v3').then(function(res){
                gapi.client.youtube.channels.list({
                    part: 'snippet,contentDetails',
                    mine: true
                }).then(function(result){
                    console.log('results user', result);
                    authDefered.resolve(result.result.items[0], authResult);
                    $rootScope.$digest();
                });
            });
        }
    }
    /* @ngInject */
    function youtubeSignIn ($window, YoutubeApi, YoutubeClientApi, GoogleClientApi) {
        // Usage:
        //	<a youtube-sign-in="">Youtube Sign In</a>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
            	youtubeSignIn: '&'
            }
        };
        return directive;

        function link(scope, element, attrs) {
        	element.get(0).addEventListener('click', authorize);

        	function authorize(ev){
        		ev.preventDefault();
                YoutubeClientApi.load().then(function(){
                    gapi.auth.authorize({
                        client_id: '971861197531',
                        scope: "https://www.googleapis.com/auth/youtube",
                        // false - is for showing pop up
                        immediate: false, 
                    }, handleAuth);
                })
        	}

        	function handleAuth(authResult) {
    			console.log('auth Result', authResult)
    			YoutubeApi.signIn(authResult);
    		}
        }
    }

    function YoutubeClientApi ($q, $rootScope, $window, GoogleClientApi, YoutubeApi){
    	var defered = $q.defer();
    	var service = {
    		load: load
    	};

    	return service;

    	function load(api, version) {
    		// api.api = api;
    		// api.version = version;
            YoutubeApi.load().then(function(){
                defered.resolve();
            });
    		return defered.promise;
    	};
    }

    function GoogleClientApi ($q) {
    	var DeveloperApiKey = 'AIzaSyCgrK5ds9uCSRM-WBUFm8V8jPX66q8-Od0';
    	var clientId = '971861197531';
    	var defered = $q.defer();
    	var service = {
    		load: load
    	}
    	return service;

    	function load (client, version) {
    		gapi.client.setApiKey(DeveloperApiKey);
			//  load the gapi api
			gapi.client.load(client, version, handleResponse);
			return defered.promise;
    	}

    	function handleResponse (res) {
    		console.log('client load success', res);
    		defered.resolve(res);
	    }
	}
})();