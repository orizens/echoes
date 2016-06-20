import angular from 'angular';
import template from './loader.tpl.html';
import LoaderCtrl from './loader.ctrl.js';

export default angular
    .module('loader', [
        'app.core'
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
        templateUrl: template,
        controller: LoaderCtrl,
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            // show: '&'
        },
    };
    return directive;
}