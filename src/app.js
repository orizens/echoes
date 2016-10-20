import './css/style.less';
require('font-awesome-webpack');
require('es6-shim');

import angular from 'angular';
// import Angular2To1 from 'angular2to1';
import AngularUiRouter from 'angular-ui-router';
import AngularAnimate from 'angular-animate';
import AngularSanitize from 'angular-sanitize';
import AngularBootstrap from 'angular-ui-bootstrap';
import AngularToastr from 'angular-toastr';
/*eslint-disable */
import LocalStorageModule from 'angular-local-storage';
/*eslint-enable */
import AppCore from './core';

import AppComponents from './components';
import { AppComponent } from './app.component';

angular.module('echoes', [
  // framework wide components
  AngularUiRouter,
  AngularAnimate,
  AngularSanitize,
  AngularBootstrap,
  AngularToastr,

  // services
  'LocalStorageModule',
  AppCore,

  // ui-components
  AppComponents
  // '720kb.socialshare',
])
.config(config)
.component(AppComponent.selector, AppComponent);

/* @ngInject */
function config ($stateProvider, $urlRouterProvider, localStorageServiceProvider, GapiApiSetterProvider, toastrConfig) {
  GapiApiSetterProvider.config({
    scope: 'youtube',
    api: {
      client: 'youtube',
      version: 'v3'
    },
    clientId: '971861197531'
  });

  localStorageServiceProvider.setPrefix('EchoesPlayer');

  $stateProvider
    .state('videos', {
      url: '/',
      template: '<youtube-videos></youtube-videos>'
    });

  $urlRouterProvider.otherwise('/');

  angular.extend(toastrConfig, {
    allowHtml: true,
    extendedTimeOut: 10000,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },  
    messageClass: 'toast-message',
    progressBar: true,
    tapToDismiss: true,
    positionClass: 'toast-bottom-right',
    // templates: {
    //   toast: 'directives/toast/toast.html',
    //   progressbar: 'directives/progressbar/progressbar.html'
    // },
    timeOut: 10000,
    titleClass: 'toast-title',
    toastClass: 'toast'
  });
}

angular.element(document).ready(() => {
  angular.bootstrap(document, [APP_NAME]);
});
