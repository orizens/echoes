import angular from 'angular';
import { NavigatorComponent } from './navigator.component';

export * from './navigator.component';

export default angular.module('navigator', [

])
	.config(config)
	.component(NavigatorComponent.selector, NavigatorComponent)
.name;
/* @ngInject */
function config () {

}