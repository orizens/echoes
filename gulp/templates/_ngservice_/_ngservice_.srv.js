(function() {
    'use strict';

    angular
        .module('_ngservice_')
        .factory('_ngservice_', _ngservice_);

    /* @ngInject */
    function _ngservice_(dependencies) {
        var service = {
            func: func
        };
        return service;

        ////////////////

        function func() {
        }
    }
})();