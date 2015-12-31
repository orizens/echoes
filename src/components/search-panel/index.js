import angular from 'angular';
import searchPanel from './search-panel.component.js';
import SearchFilterPanel from './search-filter-panel';

export default angular.module('search-panel', [
	    'app.core',
	    SearchFilterPanel.name
    ])
    .config(config)
    .directive('searchPanel', searchPanel)
;
/* @ngInject */
function config () {
    
}