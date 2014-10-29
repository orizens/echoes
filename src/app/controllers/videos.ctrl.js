angular.module('mediaDeck').controller('VideosCtrl',
function ($scope, YoutubePlayerSettings){
	$scope.playVideo = function (video) {
		YoutubePlayerSettings.playVideoId(video.id);
	};

	$scope.feedType = 'video';
	
	$scope.$on('feed-type-changed', function (ev, feedType) {
        $scope.feedType = feedType;
    });
});