import angular from 'angular';
import searchPanel from './search-panel.component.js';

export default angular.module('search-panel', [
	    'echoes.services',
    ])
    .config(config)
    .directive('searchPanel', searchPanel)
;
/* @ngInject */
function config () {
    
}