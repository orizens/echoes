export default class DurationCtrl {
	/* @ngInject */
	constructor ($scope, YoutubeSearch) {
		this.YoutubeSearch = YoutubeSearch;
		this.durations = [
		    'Any',
		    'Short (less then 4 minutes)',
		    'Medium (4-20 minutes)',
		    'Long (longer than 20 minutes)'
		];
		this.durationsMap = [
		    '',
		    'short',
		    'medium',
		    'long'
		];
	}

	onDurationChange (duration, index) {
	    this.YoutubeSearch.setType(this.YoutubeSearch.types.VIDEO);
	    this.YoutubeSearch.setDuration(this.durationsMap[index]);
	    this.YoutubeSearch.search();
	}
}