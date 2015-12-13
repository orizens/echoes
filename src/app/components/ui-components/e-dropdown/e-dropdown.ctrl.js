/* @ngInject */
export default function eDropdownController () {
	var vm = this;
	vm.activeIndex = this.selected !== '' ? parseInt(this.selected) : 0;
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
	}
}