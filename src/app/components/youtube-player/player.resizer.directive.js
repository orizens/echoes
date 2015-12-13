(function() {
    'use strict';

    angular
        .module('youtube.player')
        .directive('playerResizer', playerResizer);

    /* @ngInject */
    function playerResizer (PlayerResizer) {
        // Usage:
        //	<div player-resize="fullscreen-or-css-classname"></div>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

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
})();