import angular from 'angular';
import DurationCtrl from './duration.ctrl.js';
import FeedFilter from './feed.filter.drv.js';
import Presets from './presets';

export default angular.module('search-filter-panel', [
	'echoes.services',
	Presets.name
	])
	.controller('DurationCtrl',  DurationCtrl)
	.directive('feedFilter', FeedFilter);