    angular
        .module('mediaDeck')
        .controller('MediaInfoCtrl', MediaInfoCtrl);

    /* @ngInject */
    function MediaInfoCtrl($scope, YoutubeVideo, YoutubePlayerSettings) {
    	$scope.video = {
    		title: 'No Media Yet...',
    		desc: '',
    		id: YoutubePlayerSettings.getCurrentId
    	};

    	$scope.$watch('video.id()', function (nid, o) {
    		if (nid) {
    			YoutubeVideo.fetch(nid).then(function(items){
    				$scope.video.title = items[0].snippet.title;
    				$scope.video.desc = items[0].snippet.description;
    			});
    		}
    	});
    }
