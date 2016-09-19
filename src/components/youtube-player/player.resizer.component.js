/* @ngInject */
export default function playerResizer (PlayerResizer) {
    // Usage:
    //	<div player-resize="fullscreen-or-css-classname"></div>
    // Creates:
    //
    var directive = {
        link: link,
        restrict: 'A'
    };
    return directive;

    /* @ngInject */
    function link(scope, element, attrs) {
    	scope.$watch('isFullScreen()', function (newVal, oldVal) {
    		if (newVal !== oldVal) {
    			element.toggleClass(attrs.playerResizer, newVal);
    		}	
    	});

    	scope.isFullScreen = function(){
    		return PlayerResizer.isFullScreen();
    	};
    }
}