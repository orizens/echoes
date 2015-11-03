(function() {
    'use strict';

    angular
        .module('_ngmodule_')
        .controller('_ngmodule_Ctrl', _ngmodule_Ctrl);

    /* @ngInject */
    function _ngmodule_Ctrl() {
        /*jshint validthis: true */
        var vm = this;
        vm.title = '_ngmodule_Ctrl';

        activate();

        function activate() {
        }
    }
})();
