(function() {
    'use strict';

    // this service consumes the app's services and 
    // servers as an api to this component
    angular
        .module('_ngmodule_')
        .factory('_ngmodule_Connector', _ngmodule_Connector);

    /* @ngInject */
    function _ngmodule_Connector() {
        var service = {
            func: func
        };
        return service;

        ////////////////

        function func() {
        }
    }
})();