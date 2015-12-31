/* @ngInject */
export default function drawerToggle (DrawerSettings) {
    // Usage:
    //	<button drawer-toggle="css-class-to-apply"></button>
    // Creates:
    //	an action which will toggle the drawer
    var directive = {
        link: link,
        restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {
    	var cssClassToApply = attrs.drawerToggle;
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