(function() {
    'use strict';

    angular
        .module('presets', [
            'echoes.resources',
            'echoes.services'
        ])
        .config(config);

    function config ($httpProvider) {
    	// $httpProvider.interceptors.push('searchListener');
    }
})();