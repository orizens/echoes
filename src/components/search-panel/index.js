import angular from 'angular';
import AppCore from '../../core';
import { SearchPanelComponent } from './search-panel.component.js';

export * from './search-panel.component.js';

export default angular.module('search-panel', [
  AppCore
])
	.config(config)
	.component(SearchPanelComponent.selector, SearchPanelComponent)
 .name;
/* @ngInject */
function config() {

}
