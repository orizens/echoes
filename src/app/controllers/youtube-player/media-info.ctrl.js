    angular
        .module('mediaDeck')
        .controller('MediaInfoCtrl', MediaInfoCtrl);

    /* @ngInject */
    function MediaInfoCtrl($scope, YoutubeVideoInfo, YoutubePlayerSettings) {
        var vm = this;
    	vm.video = {
    		title: 'No Media Yet...',
    		desc: '',
            thumb: '',
    		id: YoutubePlayerSettings.getCurrentId
    	};

    	$scope.$watch('vm.video.id()', function (nid, o) {
    		if (nid) {
    			YoutubeVideoInfo.list(nid).then(function(items){
    				if (items && items.length) {
                        vm.video.title = items[0].snippet.title;
                        vm.video.desc = items[0].snippet.description;
        				vm.video.thumb = items[0].snippet.thumbnails.high.url;
                    }
    			});
    		}
    	});
    }
