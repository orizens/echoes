(function() {
    'use strict';

    angular
        .module('echoes')
        .config(config);

        /* @ngInject */
        function config ($compileProvider) {
        	$compileProvider.debugInfoEnabled(false);
        }
})();