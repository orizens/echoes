(function() {
    'use strict';

    angular
        .module('drawer')
        .controller('DrawerCtrl', DrawerCtrl);

    /* @ngInject */
    function DrawerCtrl(DrawerSettings) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'DrawerCtrl';
        vm.opened = DrawerSettings.opened;
        vm.toggle = DrawerSettings.toggle;

        activate();

        function activate() {
        }
    }
})();