(function() {
    'use strict';

    angular
        .module('youtube-videos')
        .config(function ($routeProvider) {
        	$routeProvider
        		.when('/', {
        			template: '<youtube-videos></youtube-videos>'
        		})
        })
})();