(function() {
    'use strict';

    angular
        .module('media.info')
        .directive('onSourceClick', onSourceClick);

    /* @ngInject */
    function onSourceClick ($parse, $rootScope) {
        // Usage:
        //	<div on-source-click="getTime"><div>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
        	var callback = $parse(attrs.onSourceClick)(scope);
        	element.bind('click', onClick);

        	function onClick ($event) {
	            var text = $event.target.innerText;
	            callback(text);
                $rootScope.$apply();
        	}
        }
    }
})();