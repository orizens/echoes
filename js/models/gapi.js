define([
		"jquery", "underscore", "backbone"
], function($, _, Backbone) {
	var Developer_API_key = 'AIzaSyCgrK5ds9uCSRM-WBUFm8V8jPX66q8-Od0';
	var config = {
		apiKey: Developer_API_key,
		client_id: "971861197531",
		// clientSecret: "t7KrdesISXI-4ViBJ5jZOXSt",
		scopes: "https://www.googleapis.com/auth/youtube"
	};
	var Gapi = Backbone.Model.extend({

		defaults: {
			q: 'eric clapton',
			part: 'snippet',
			maxResults: 24
		},

		connect: function() {
			window.onGapiLoad = _.bind(this.onGapiLoad, this);
			require(['https://apis.google.com/js/client.js?onload=onGapiLoad'], function() {});
		},

		onGapiLoad: function() {
			gapi.client.setApiKey(Developer_API_key);
			this.checkAuth();
			// gapi.client.load('youtube', 'v3', _.bind(this.onload, this));
		},

		// the "authorize" method should be triggered by a user action
		// in order to prevent a pop up blocker
		// ref: https://developers.google.com/api-client-library/javascript/features/authentication
		checkAuth: function() {
			gapi.auth.authorize({
				client_id: config.client_id,
				scope: this.scopes,
				immediate: true
			}, _.bind(this.handleAuthResult, this));
		},

		// Upon successful authorization, this method will
		// load the defined client api on:
		// this.client = {api : '' , version : ''}
		handleAuthResult: function(authResult) {
			if (authResult && !authResult.error) {
				// a success method for gapi loader
				var success = function () {
					this.trigger('load:client');
				};
				//  load the gapi api
				gapi.client.load(this.client.api, this.client.version, _.bind(success, this));
				this.trigger("auth:success", authResult);
			}
		},

		url: function() {
			return gapi.client.youtube.search;
		},

		sync: function() {
			return Backbone.GapiSync.apply(this, arguments);
		},

		fetch: function (options) {
			this.sync('read', this, options);
		},

		create: function(options) {
			this.sync('create', this, options);
		}
		// fetch: function(options) {
		// 	options = options ? _.clone(options) : {};
		// 	var model = this;
		// 	var success = options.success;
		// 	options.success = function(response) {
		// 		model.set(response);
		// 		console.log(response);
		// 		if (success) success(model, response, options);
		// 		model.trigger('sync', model, response, options);
		// 	};
		// 	return this.sync('read', this, options);
		// }
	});

	Backbone.GapiSync = function(method, model, options) {
		// preparing the gapi request by the defined
		// api method
		var api = _.result(this, "url");
		var apiMethod = methodMap[method];
		var request = api[apiMethod]({
			part: 'snippet, status',
			resource: this.toJSON
		});

		options = options || {};
		// define a success method for response
		var success = options.success;
		options.success = function(resp) {
			if (resp.error) {
				return resp.error;
			}
			if (!model.set(model.parse(resp, options), options)) return false;
			// success method of the user
			if (success) success(model, resp, options);
			model.trigger('sync', model, resp, options);
		};

		// Make the request
		request.execute(options.success);
		model.trigger('request', model, request, options);
		return request;
	};

	var methodMap = {
		'create': 'insert',
		'update': 'update',
		'delete': 'delete',
		'read': 'list'
	};
	return Gapi;
});