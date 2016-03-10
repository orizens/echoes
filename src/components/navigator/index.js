import angular from 'angular';
import { NavigatorComponent } from './navigator.component';

export default angular.module('navigator', [

])
	.config(config)
	.directive(NavigatorComponent.directiveSelector, () => NavigatorComponent)
;
/* @ngInject */
function config () {

}