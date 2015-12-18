(function() {
    'use strict';

    angular
        .module('drawer')
        .directive('drawerClosed', drawerClosed);

    /* @ngInject */
    function drawerClosed (DrawerSettings) {
        // Usage:
        //	<button drawer-closed="css-class-to-apply-when-closed"></button>
        // Creates:
        //	an action which will toggle the drawer
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
        	var cssClassToApply = attrs.drawerClosed;
            scope.drawerOpened = DrawerSettings.opened;
        	scope.$watch('drawerOpened()', function (nState, oldState) {
                if (nState !== oldState) {
                    addStateAsClass();
                }
            });

        	addStateAsClass();
        	
        	function addStateAsClass () {
        		element.toggleClass(cssClassToApply, !scope.drawerOpened());
        	}
        }
    }
})();