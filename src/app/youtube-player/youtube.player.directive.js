(function() {
    'use strict';

    angular
        .module('youtube.player')
        .directive('youtubePlayer', youtubePlayer);
    
        /* @ngInject */
        function youtubePlayer ($rootScope, $window) {
            // Usage:
            //  <div youtube-player video-id="vm.video.id" height="vm.height" width="vm.width"></div>
            // Creates:
            //
            var directive = {
                link: link,
                controller: controller,
                controllerAs: 'vm',
                restrict: 'A',
                // replace: true,
                scope: {
                	videoId: '=',
                	height: '=',
                	width: '=',
                    index: '=',
                    seek: '=',
                    autoNext: '@',
                    onVideoStart: '&'
                }
            };
            var player;

            return directive;

            /* @ngInject */
    		function controller ($scope, $attrs, youtubePlayerApi, YoutubePlayerSettings) {
                /*jshint validthis: true */
    			var vm = this;
                vm.seek = YoutubePlayerSettings.getSeek;
                // $scope.apiReady = youtubePlayerApi.isReady;
                $scope.$watch('vm.seek()', function (newSeconds, oldSeconds) {
                    if (player && newSeconds !== oldSeconds) {
                        seekToSeconds(newSeconds);
                    }
                });
                youtubePlayerApi.ready.then(createPlayer);

                function seekToSeconds (seconds) {
                    player.seekTo(seconds, true);
                }

                function createPlayer () {
                    // var playerVars = angular.copy(scope.playerVars);
                    // playerVars.start = playerVars.start || scope.urlStartTime;
                    player = new YT.Player($attrs.id, {
                        height: $scope.height,
                        width: $scope.width,
                        videoId: $scope.videoId,
                        // playerVars: playerVars,
                        events: {
                            onReady: onPlayerReady,
                            onStateChange: onPlayerStateChange
                        }
                    });
                    YoutubePlayerSettings.setYTPlayer(player);
                    player.id = $attrs.id;
                    return player;
                }

                function onPlayerStateChange (event) {
                    var state = event.data;
                    
                    // play the next song if its not the end of the playlist
                    // should add a "repeat" feature
                    if (angular.isDefined($attrs.autoNext) && state === YT.PlayerState.ENDED) {
                        YoutubePlayerSettings.playNextTrack({ stopOnLast: true });
                    }

                    if (state === YT.PlayerState.PAUSED) {
                        YoutubePlayerSettings.playerState = YT.PlayerState.PAUSED;
                    }
                    if (state === YT.PlayerState.PLAYING) {
                        YoutubePlayerSettings.playerState = YT.PlayerState.PLAYING;
                    }
                    $scope.$apply();
                }

                function onPlayerReady (event) {
                    // YoutubePlayerSettings.setYTPlayer(player);
                    // applyBroadcast(eventPrefix + 'ready', scope.player, event);
                }
    		}

            function link(scope, element, attrs) {
            	scope.$watch('videoId', function (newVideoId) {
                    if (player) {
	            		playMedia(newVideoId);
            		}
            	});

                scope.$watch('height', function(newHeight, oldHeight){
                    if (player && newHeight !== oldHeight) {
                        player.setSize(scope.width, scope.height);
                    }
                });

                function playMedia(id) {
                    player.loadVideoById(id);
                    player.playVideo();
                    scope.onVideoStart({ id: id });
                }
            }
        }
})();