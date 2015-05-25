(function() {
	'use strict';

	angular
		.module('mediaDeck')
		.controller('YoutubeVideoCtrl', YoutubeVideoCtrl);

	/* @ngInject */
	function YoutubeVideoCtrl($scope, YoutubePlayerSettings, YoutubeVideoInfo, $routeParams, $location){
		var vm = this;
		vm.goBack = goBack;
		vm.playVideo = playVideo;

		activate();
		////////////////////////
		
		function activate () {
			YoutubeVideoInfo.list($routeParams.id).then(function(items){
				vm.video = items[0];
				vm.time = getDuration(items[0].contentDetails.duration);
			});
		}

		function playVideo () {
			YoutubePlayerSettings.queueVideo(vm.video);
			YoutubePlayerSettings.playVideoId(vm.video);
		}

		function goBack () {
			$location.url('/');
		}

		function getDuration (time) {
			var t = time.split("PT")[1]
				.replace(/(H|M)/g, ":")
				.replace("S", "");
			var ts = t.split(":");
			ts = ts.map(function(d){
				return d.length === 1 ? "0" + d : d;
			});
			return ts.join(":");
		};
	}

})();