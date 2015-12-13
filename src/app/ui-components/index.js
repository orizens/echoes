import angular from 'angular';
import eDropdown from './e-dropdown';

export default angular.module('ui.components', [])
	.directive('eDropdown', eDropdown);