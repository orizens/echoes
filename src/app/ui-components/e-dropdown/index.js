import template from './e-dropdown-tpl.html';

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

	function controller ($attrs) {
		var vm = this;
		vm.activeIndex = $attrs.selected !== '' ? parseInt(vm.selected) : 0;
		vm.handleClick = handleClick;
		vm.status = {
			isOpen: false
		};

		function handleClick (item, $index) {
			vm.activeIndex = $index;
			vm.onSelect({
				item: item,
				index: $index
			});
		};
	}
}