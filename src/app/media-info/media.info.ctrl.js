(function() {
    'use strict';

    angular
        .module('media.info')
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
    			YoutubeVideoInfo.list(nid).then(updateVideo);
    		}
    	});

    	function updateVideo (items) {
			if (items && items.length) {
                vm.video.title = items[0].snippet.title;
                vm.video.desc = parseTimeTracks(items[0].snippet.description);
				vm.video.thumb = items[0].snippet.thumbnails.high.url;
            }
    	}

    	// parse multiline tracks to single
    	// add buttons for time stops to allow playing of single tracks
    	// in full albums in one video
    	function parseTimeTracks (description) {
    		var desc = description.replace(/([0-9]*[0-9]*:*[0-9]*[0-9]:[0-9][0-9])/gim, 
			"<button class='btn btn-mini play-time' data-time='$1'>$1</button>\r", "gim");
			return desc;
    	}
    }
})();