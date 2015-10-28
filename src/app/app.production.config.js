(function() {
    'use strict';

    angular
        .module('echoes')
        .config(($compileProvider) => {
        	$compileProvider.debugInfoEnabled(false);
        });
})();