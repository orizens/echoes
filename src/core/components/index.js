import angular from 'angular';
import eDropdown from './e-dropdown';
import YoutubeComponents from './youtube-components';

export default angular.module('core.components', [
	YoutubeComponents.name
	])
	.directive('eDropdown', eDropdown);