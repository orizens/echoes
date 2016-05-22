import './e-dropdown.less';
import template from './e-dropdown.tpl.html';

// Usage:
//	<e-dropdown label="presets" items="[array]"
// 		icon="fa-type" on-select="fun(item ,index)"
//   	selected="index"></e-dropdown>
// Creates:
//
/* @ngInject */
export default function eDropdown() {
    var directive = {
		restrict: 'E',
		replace: true,
		templateUrl: template,
		bindToController: true,
		scope: {
			label: '@',
			icon: '@',
			items: '=',
			onSelect: '&',
			selected: '@'
		},
		controllerAs: 'vm',
		controller: function eDropdownController () {
			var vm = this;
			vm.activeIndex = this.selected !== '' ? parseInt(this.selected) : 0;
			vm.handleClick = handleClick;
			vm.status = {
				isOpen: false
			};
			vm.displayLabel = vm.items[vm.activeIndex];

			function handleClick (item, $index) {
				vm.activeIndex = $index;
				vm.displayLabel = vm.items[vm.activeIndex];
				vm.onSelect({
					item: item,
					index: $index
				});
			}
		}
	};
	return directive;
}