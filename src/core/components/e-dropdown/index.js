import './e-dropdown.less';
import template from './e-dropdown.tpl.html';

// Usage:
//	<e-dropdown label="presets" items="[array]"
// 		icon="fa-type" on-select="fun(item ,index)"
//   	selected="index"></e-dropdown>
// Creates:
//
export let eDropdown = {
  selector: 'eDropdown',
  replace: true,
  templateUrl: template,
  bindings: {
    label: '@',
    icon: '@',
    items: '<',
    onSelect: '&',
    selected: '@'
  },
  controllerAs: 'vm',
  /* @ngInject */
  controller: function() {
    // var vm = this;
    this.activeIndex = this.selected !== '' ? parseInt(this.selected) : 0;
    this.handleClick = handleClick;
    this.status = {
      isOpen: false
    };
    this.displayLabel = this.items[this.activeIndex];

    function handleClick(item, $index) {
      this.activeIndex = $index;
      this.displayLabel = this.items[this.activeIndex];
      this.onSelect({
        item: item,
        index: $index
      });
    }
  }
};
