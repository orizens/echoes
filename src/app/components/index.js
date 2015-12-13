'use strict';
import angular from 'angular';
import ngRoute from 'angular-router-browserify';
import EchoesServices from '../services';
import AngularAnimate from 'angular-animate';
import AngularSanitize from 'angular-sanitize';
import AngularBootstrap from 'angular-ui-bootstrap';
import YoutubeDirectives from './youtube-components';
import YoutubeVideos from './youtube-videos';
import Loader from './loader';
import uiComponents from './ui-components';
import SearchFilterPanel from './search-filter-panel';

ngRoute(angular);

export default angular.module('echoes.components', [
		// services
		EchoesServices.name,

		// framework wide components
		'ngRoute',
		AngularAnimate,
		AngularSanitize,
		AngularBootstrap,
    	
    	// ui-components
    	YoutubeDirectives.name,
    	YoutubeVideos.name,
    	Loader.name,
    	uiComponents.name,
    	SearchFilterPanel.name,
    ])
    .config(config)
;
/* @ngInject */
function config () {
    
}