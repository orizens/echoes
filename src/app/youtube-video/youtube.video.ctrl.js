(function() {
	'use strict';

	angular
		.module('mediaDeck')
		.controller('YoutubeVideoCtrl', YoutubeVideoCtrl)
		.filter('tohtml', toHtml);

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

	function toHtml () {
		return function (text, target) {
			var breakLineReg = /\n/gm
			var linksReg = /(http:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/
			if (!text) return text;
			return text
				.replace(breakLineReg, '<br>')
				.replace(linksReg, '<a href="$1" target="blank" title="opens in a new tab">$1</a>');
		}
	}
})();