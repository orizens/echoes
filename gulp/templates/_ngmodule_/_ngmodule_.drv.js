(function() {
    'use strict';

    angular
        .module('_ngmodule_')
        .directive('_ngmodule_', _ngmodule_);

    /* @ngInject */
    function _ngmodule_ () {
        // Usage:
        //  <component api-prop="something()"></component>
        // Creates:
        //
        var directive = {
            // link: link,
            controller: controller,
            controllerAs: 'vm',
            // controller: '_ngmodule_Ctrl',
            // template: '<div>template as a string</div>',
            templateUrl: 'src/app/_ngmodule_/_ngmodule_.tpl.html',
            restrict: 'E',
            replace: true,
            bindToController: true,
            scope: {}
        };
        return directive;

        function controller () {
            
        }

        // 4th argument: Ctrl
        function link(scope, element, attrs) {
        }
    }
})();