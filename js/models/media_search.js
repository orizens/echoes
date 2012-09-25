define([
	'underscore',
	'backbone',
	'utils'
], function(_, Backbone, Utils) {

	var MediaSearch = Backbone.Model.extend({
		defaults: {
			query: 'pink floyd'
		},

		initialize: function(){
			this.storage = new Utils.Safe('MediaSearch', this);
		}
		// localStorage: new Store('MediaSearchModel')
	});
   
	return MediaSearch; 
});