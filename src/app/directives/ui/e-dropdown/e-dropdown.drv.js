(function() {
    'use strict';

	angular
		.module('ui.controls')
		.directive('eDropdown', eDropdown);

	/* @ngInject */
	function eDropdown() {
		// Usage:
        //	<e-dropdown label="presets" items="[array]" 
        // 		icon="fa-type" on-select="fun(item ,index)"
        //   	selected="index"></e-dropdown>
        // Creates:
        //
        var directive = {
			restrict: 'E',
			replace: true,
			templateUrl: 'app/directives/ui/e-dropdown/e-dropdown-tpl.html',
			scope: {
				label: '@',
				icon: '@',
				items: '=',
				onSelect: '&',
				selected: '@'
			},
			link: link
		};
		return directive;

		function link (scope, element, attrs) {
			scope.activeIndex = attrs.selected !== '' ? parseInt(scope.selected) : 0;
			scope.handleClick = function (item, $index) {
				scope.activeIndex = $index;
				scope.onSelect({
					item: item,
					index: $index
				});
			};
		}
	}
})();