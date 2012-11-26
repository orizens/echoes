define([
	'underscore',
	'backbone'
], function(_, Backbone) {
   
	var YoutubeItemProvider = Backbone.Model.extend({
		
		defaults: {
			id: null
		},

		initialize: function() {
			this.on('change:id', this.getInfo, this);
		},

		getInfo: function() {
			this.fetch();
		},

		urlRoot: function() {
			return 'https://gdata.youtube.com/feeds/api/videos/?v=2&alt=jsonc&q=' + 
			this.get('id');
		},

		parse: function(response) {
			return response.data.items.length ? response.data.items[0] : {};
		}
	});
   
	return YoutubeItemProvider; 
});