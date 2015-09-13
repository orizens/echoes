(function(){
	angular
		.module('echoes')
		.controller('DurationCtrl',  DurationCtrl);

function DurationCtrl($scope, YoutubeSearch){
	var vm = this;

	vm.durations = [
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

	vm.onDurationChange = onDurationChange;

	function onDurationChange (duration, index) {
	    YoutubeSearch.setType(YoutubeSearch.types.VIDEO);
	    YoutubeSearch.setDuration(durationsMap[index]);
	    YoutubeSearch.search();
	}
}

})();