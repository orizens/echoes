define([
	'underscore',
	'backbone',
	'safe'
], function(_, Backbone, safe) {

	var MediaSearch = Backbone.Model.extend({
		defaults: {
			query: 'pink floyd'
		},

		safe: 'MediaSearch'
	});

	return MediaSearch;
});