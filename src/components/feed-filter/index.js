import angular from 'angular';
import AppCore from '../../core';
import { FeedFilterComponent } from './feed-filter.component.js';

export default angular.module('feed-filter', [
	AppCore,
	'LocalStorageModule'
	])
	.directive('feedFilter', () => FeedFilterComponent);