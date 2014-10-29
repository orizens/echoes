angular.module('ui.controls')
.directive('eDropdown', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'app/directives/ui/e-dropdown/e-dropdown-tpl.html',
		scope: {
			label: '@',
			icon: '@',
			items: '=',
			onSelect: '&'
		},
		link: function (scope, element, attrs) {
			scope.activeIndex = 0;
			scope.handleClick = function (item, $index) {
				scope.activeIndex = $index;
				scope.onSelect({
					item: item,
					index: $index
				});
			};
		}
	};
});