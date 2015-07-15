(function() {
    'use strict';

    angular
        .module('navigator')
        .controller('NavigatorCtrl', NavigatorCtrl);

    /* @ngInject */
    function NavigatorCtrl($element) {
        /*jshint validthis: true */
        var vm = this;
        var activeCssClass = 'active';
        var anchors = $element.find('a');
        var listItems = anchors.parent();
        vm.title = 'NavigatorCtrl';

        activate();

        function activate() {
        	anchors.bind('click', updateActive);
        }

        function updateActive (ev) {
            var el = angular.element(ev.target);
            var listItem = el.parent();
            if (!listItem.hasClass(activeCssClass)) {
                listItems.removeClass(activeCssClass);
                listItem.addClass(activeCssClass);
            }
        }
    }
})();