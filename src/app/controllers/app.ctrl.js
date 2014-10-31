(function(){

angular
    .module('mediaDeck')
    .controller('AppCtrl', AppCtrl);

function AppCtrl($scope, $rootScope, YoutubeSearch, YoutubeVideoInfo, preset, YoutubeApi, YoutubeUser){
    $scope.feedType = 'video';
    $scope.searching = false;
	$scope.searchYoutube = function () {
        $scope.searching = true;
		YoutubeSearch.search($scope.query).then(function(items){
	    	if ($scope.feedType === YoutubeSearch.types.VIDEO) {
                items.forEach(function(item){
                    item.time = YoutubeVideoInfo.toFriendlyDuration(item.contentDetails.duration);
                });
            }
            $scope.searching = false;
            $scope.videos = items;
	    });
	};

    $scope.presets = [
        'All',
        'Albums',
        'Live'
    ];

    $scope.durations = [
        'Any',
        'Short (less then 4 minutes)',
        'Medium (4-20 minutes)',
        'Long (longer than 20 minutes)'
    ];

    var durationsMap = [
        '',
        'short',
        'medium',
        'long'
    ];

    $scope.onPresetChange = onPresetChange;
    $scope.onDurationChange = onDurationChange;

    function onDurationChange (duration, index) {
        YoutubeSearch.setType(YoutubeSearch.types.VIDEO);
        $scope.feedType = YoutubeSearch.types.VIDEO;
        YoutubeSearch.setDuration(durationsMap[index]);
        $scope.searchYoutube();
    }

    function onPresetChange (presetValue) {
        $scope.query = preset.update($scope.query, presetValue);
    }
    // or use $rootScope
    $scope.$on('preset-change', function (ev, presetValue) {
		$scope.query = preset.update($scope.query, presetValue);
    });

    $scope.$on('feed-type-changed', function (ev, feedType) {
        YoutubeSearch.setType(feedType);
        $scope.feedType = feedType;
        $scope.searchYoutube();
    });

    // $rootScope.$on('$routeChangeStart', function(ev, next, current){
        // console.log('current route:', arguments.length, current);
        // console.log('next route:', arguments.length, next);
    // });

    $scope.searchYoutube();
    YoutubeApi.auth().then(function(user){
        YoutubeUser.update(user);
    });
};

})();