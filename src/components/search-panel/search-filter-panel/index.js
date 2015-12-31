import angular from 'angular';
import DurationCtrl from './duration.ctrl.js';
import FeedFilter from './feed.filter.component.js';
import Presets from './presets';

export default angular.module('search-filter-panel', [
	'app.core',
	Presets.name
	])
	.controller('DurationCtrl',  DurationCtrl)
	.directive('feedFilter', FeedFilter);