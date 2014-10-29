angular.module('mediaDeck')
.controller('YoutubeVideoCtrl', [
'$scope', 'YoutubeVideo', '$routeParams', '$location',
function($scope, YoutubeVideo, $routeParams, $location, $route){
	var getDuration = function (time) {
		var t = time.split("PT")[1]
			.replace(/(H|M)/g, ":")
			.replace("S", "");
		var ts = t.split(":");
		ts = ts.map(function(d){
			return d.length === 1 ? "0" + d : d;
		});
		return ts.join(":");
	};


	YoutubeVideo.fetch($routeParams.id).then(function(items){
		$scope.video = items[0];
		$scope.time = getDuration(items[0].contentDetails.duration)
	});

	$scope.goBack = function () {
		$location.url('/');
	};

}]);