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
        vm.onDescriptionClick = onDescriptionClick;

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
			'<a class="btn btn-mini play-time" time="$1">$1</a>\r', 'gim');
			return desc;
    	}

        function onDescriptionClick (time) {
            YoutubePlayerSettings.seekToSeconds(hmsToSeconds(time));
        }

        // converts time duration string to seconds as number
        // @param {string} d - duration string - 6:05, 1:04:05
        // @return {number}
        function hmsToSeconds (d) {
            d = d.split(':');
            var hasHour = d.length === 3;
            var h = hasHour ? parseInt(d[0], 10) * 60 * 60 : 0;
            var m = hasHour ? d[1] : d[0];
            var s = hasHour ? d[2] : d[1];
            return h + parseInt(m, 10) * 60 + parseInt(s, 10);
        }
    }
})();