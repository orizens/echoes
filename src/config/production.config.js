import angular from 'angular';

angular.module('echoes')
    .config(config);

/* @ngInject */
function config ($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
}