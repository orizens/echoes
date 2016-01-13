import angular from 'angular';
import components from './components';
import services from './services';

export default angular.module('app.core', [
	components.name,
	services.name
]);