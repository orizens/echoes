(function() {
    'use strict';

    angular
        .module('navigator')
        .directive('navigator', navigator);

    /* @ngInject */
    function navigator () {
        // Usage:
        //  <ul navigator></ul>
        // Creates:
        //  manages navigation links and its active state in dom
        //  should search for any anchors with li parents and handles
        //  the active class name based on a state
        var directive = {
            link: link,
            restrict: 'A',
            // controllerAs: 'vm',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs) {
            var activeCssClass = 'active';
            var anchors = element.find('a');
            var listItems = anchors.parent();
            anchors.bind('click', updateActive);

            function updateActive (ev) {
                var el = angular.element(ev.target);
                var listItem = el.parent();
                if (!listItem.hasClass(activeCssClass)) {
                    listItems.removeClass(activeCssClass);
                    listItem.addClass(activeCssClass);
                }
            }
        }
    }
})();