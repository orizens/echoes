import controller from './e-dropdown.ctrl.js';
import template from './e-dropdown.tpl.html';

/* @ngInject */
export default function eDropdown() {
	// Usage:
    //	<e-dropdown label="presets" items="[array]" 
    // 		icon="fa-type" on-select="fun(item ,index)"
    //   	selected="index"></e-dropdown>
    // Creates:
    //
    var directive = {
		restrict: 'E',
		replace: true,
		controllerAs: 'vm',
		template,
		controller,
		bindToController: true,
		scope: {
			label: '@',
			icon: '@',
			items: '=',
			onSelect: '&',
			selected: '@'
		},
	};
	return directive;
}