/* @ngInject */
export default function drawerClosed (DrawerSettings) {
    // Usage:
    //	<button drawer-closed="css-class-to-apply-when-closed" drawer-not-closed="css-to-apply"></button>
    // Creates:
    //	an action which will toggle the drawer
    var directive = {
        link: link,
        restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {
    	var cssClosed = attrs.drawerClosed;
        var cssNotClosed = attrs.drawerNotClosed;
        scope.drawerOpened = DrawerSettings.opened;
    	scope.$watch('drawerOpened()', function (nState, oldState) {
            if (nState !== oldState) {
                addStateAsClass(nState);
            }
        });

    	addStateAsClass();

    	function addStateAsClass () {
    		element
                .toggleClass(cssClosed, !DrawerSettings.opened())
                .toggleClass(cssNotClosed, DrawerSettings.opened());
    	}
    }
}