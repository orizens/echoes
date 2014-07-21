/*
	usage:
	======
	var layout = Backbone.View.extend({
		transition: {
			// duration of the transition
			// needed to allow smooth transition
			duration: 200,

			// the css class that will be applied
			// to make the transition
			css: 'transition-in'

			// TODO 
			// add css: in/out
			// add built-in transition: slide-left/right/top/bottom
		},
		
		initialize: function() {
			console.log('init...');
		}
	});
*/
define(['jquery', 'underscore', 'backbonesrc'], function(){

	// check for Backbone
	// check for Underscore
	var _ = this._;
	var Backbone = this.Backbone;

	// if Underscore or Backbone have not been loaded
	// exit to prevent js errors
	if (!_ || !Backbone || !JSON) {
		return;
	}

	var Timber = Timber || {};

	Timber.module = function(backboneType, extendBody) {
		return {
			create: function(model, collection) {
				var mod = Backbone[backboneType].extend(extendBody);
				var options = {
					model: model
				};
				if (collection) {
					options.collection = collection;
				}
				return new mod(options);
			}
		};
	};
	// export to global
	window.Timber = window.Timber || Timber;
	Backbone.Timber = Timber;
});