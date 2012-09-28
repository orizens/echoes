define([
	'underscore',
	'backbone',
	'safe'
], function(_, Backbone, safe) {

	var MediaSearch = Backbone.Model.extend({
		defaults: {
			query: 'pink floyd'
		},

		initialize: function(){
			Backbone.Safe.create('MediaSearch', this);
		}
	});
   
	return MediaSearch; 
});