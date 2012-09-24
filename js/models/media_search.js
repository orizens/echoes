define([
	'underscore',
	'backbone',
	'storage'
], function(_, Backbone, s) {
   
	var MediaSearch = Backbone.Model.extend({
		defaults: {
			query: 'pink floyd'
		}

		// localStorage: new Store('MediaSearchModel')
	});
   
	return MediaSearch; 
});