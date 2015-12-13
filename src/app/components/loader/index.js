import angular from 'angular';
import template from './loader.tpl.html';
import controller from './loader.ctrl.js';

export default angular
    .module('loader', [
        'echoes.services'
    ])
    .directive('loader', loader);

/* @ngInject */
function loader () {
    // Usage:
    //	<loader xshow="func()"></loader>
    // Creates:
    //
    var directive = {
        restrict: 'E',
        replace: true,
        template,
        controller,
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            // show: '&'
        },
    };
    return directive;
}