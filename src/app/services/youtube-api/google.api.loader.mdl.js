import angular from 'angular';
import GapiLoader from './gapi.loader.js';
import GoogleClientApi from './google.client.api.js';
import GapiApiSetter from './gapi.api.setter.js';

export default angular
        .module('google.api.loader', [])
        .factory('GapiLoader', GapiLoader)
        .factory('GoogleClientApi', GoogleClientApi)
        .provider('GapiApiSetter', GapiApiSetter);