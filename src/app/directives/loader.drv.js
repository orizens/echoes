(function() {
    'use strict';

    angular
        .module('echoes')
        .directive('loader', loader);

    /* @ngInject */
    function loader ($http) {
        // Usage:
        //	<div loader></div>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
        	
        }
    }
})();