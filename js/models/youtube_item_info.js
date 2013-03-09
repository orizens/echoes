define([
	'underscore',
	'backbone'
], function(_, Backbone) {
   
	var YoutubeItemProvider = Backbone.Model.extend({
		
		defaults: {
			id: null,
			type: 'videos',
			// video resource is not allowed to get maxResults
			maxResults: null
		},

		initialize: function() {
			this.on('change:id', this.getInfo, this);
		},

		getInfo: function() {
			this.fetch();
		},

		url: function() {
			var maxResults = !_.isNull(this.get('maxResults')) ? this.get('maxResults') : false;
			return 'https://gdata.youtube.com/feeds/api/' + this.get('type') + '/' + 
				this.get('id') + '?v=2&alt=jsonc' + 
				(maxResults ? '&max-results=' + maxResults : '' );
		},

		parse: function(response) {
			return response.data;
		}
	});
   
	return YoutubeItemProvider; 
});