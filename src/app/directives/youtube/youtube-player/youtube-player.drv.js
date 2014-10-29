(function() {
    'use strict';

    angular
        .module('youtube.directives')

        .service('youtubePlayerApi', function($rootScope, $window){
        	var that = this;
        	this.ready = false;
        	this.created = false;
        	this.isReady = function(){
        		return that.ready;
        	};
			// Inject YouTube's iFrame API
    	    (function () {
    	        var validProtocols = ['http:', 'https:'];
    	        var url = '//www.youtube.com/iframe_api';

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

    	    // Youtube callback when API is ready
    	    $window.onYouTubeIframeAPIReady = function () {
	            that.ready = true;
    	        $rootScope.$apply(function () {
    	            console.log('api ready');
    	        });
    	    };
        })

        .directive('youtubePlayer', youtubePlayer);
    
        /* @ngInject */
        function youtubePlayer ($rootScope, $window) {
            // Usage:
            //
            // Creates:
            //
            var directive = {
                link: link,
                controller: ctrl,
                restrict: 'A',
                replace: true,
                scope: {
                	videoId: '=',
                	height: '=',
                	width: '='
                }
            };
            var player;

            return directive;

    		function ctrl ($scope, youtubePlayerApi) {
    			$scope.apiReady = youtubePlayerApi.isReady;

    			$scope.$watch('apiReady()', function(newReady, oldReady){
    				if (newReady !== oldReady && !youtubePlayerApi.created) {
    					youtubePlayerApi.created = true;
    					$scope.create();
    				}
    			});
    		}
            function link(scope, element, attrs) {
            	

            	scope.$watch('videoId()', function (newVideoId) {
            		if (player) {
	            		player.loadVideoById(newVideoId);
	            		player.playVideo();
            		}
            	});

            	scope.create = createPlayer;

            	function createPlayer () {
	                // var playerVars = angular.copy(scope.playerVars);
	                // playerVars.start = playerVars.start || scope.urlStartTime;
	                player = new YT.Player(attrs.id, {
	                    height: scope.height,
	                    width: scope.width,
	                    videoId: scope.videoId,
	                    // playerVars: playerVars,
	                    events: {
	                        onReady: onPlayerReady,
	                        onStateChange: onPlayerStateChange
	                    }
	                });

                    
	                player.id = attrs.id;
	                return player;
	            }

                function onPlayerStateChange (event) {
                    // var state = stateNames[event.data];
                    // if (typeof state !== 'undefined') {
                        // applyBroadcast(eventPrefix + state, scope.player, event);
                    // }
                    // scope.$apply(function () {
                    //     scope.player.currentState = state;
                    // });
                }

                function onPlayerReady (event) {
                    // applyBroadcast(eventPrefix + 'ready', scope.player, event);
                }
            }
        }
})();