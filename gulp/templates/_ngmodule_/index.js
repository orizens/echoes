import angular from 'angular';
import { _ngmodule_Component } from './_ngmodule_.component';

export default angular.module('_ngmodule_', [

    ])
    .config(config)
    .directive(_ngmodule_Component.selector, () => _ngmodule_Component)
;
/* @ngInject */
function config () {

}