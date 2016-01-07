/* @ngInject */
export default function drawerToggle (DrawerSettings) {
    // Usage:
    //	<button drawer-toggle="css-class-to-apply" drawer-content="dom-selector"></button>
    // Creates:
    //	an action which will toggle the drawer
    // drawer-toggle - a css class to apply to this element
    // drawer-content - a selector to apply the drawer-toggle class to
    var directive = {
        link: link,
        restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {
    	var cssClassToApply = attrs.drawerToggle;
        // var drawerContent =
    	element.bind('click', function (ev) {
    		ev.preventDefault();
    		DrawerSettings.toggle();
    		if (cssClassToApply && cssClassToApply.length) {
    			addStateAsClass();
    		}
    		scope.$apply();
    	});

    	addStateAsClass();

    	function addStateAsClass () {
    		element.toggleClass(cssClassToApply, DrawerSettings.opened());
    	}
    }
}