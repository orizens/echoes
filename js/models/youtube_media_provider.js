define([
	'underscore',
	'backbone'
], function(_, Backbone) {
   
    var YoutubeMediaProvider = Backbone.Model.extend({
	
		defaults: {
			query: '',
			startIndex: 1,
			indexSteps: 25
		},

		initialize: function() {
			this.on('change:query change:startIndex', this.search, this);
			this.on('change:data', this.publishResponse, this);
		},

		search: function() {
			this.fetch();
		},

		urlRoot: function() {
			return 'https://gdata.youtube.com/feeds/api/videos?q=' + this.get('query') + '&alt=jsonc&v=2&start-index=' + this.get('startIndex');
		},

		validateQuerySearch: function() {
			if (!this.hasChanged('query') && this.has('data')) {
				this.publishResponse();
			}
		},

		publishResponse: function() {
			this.trigger('new-media-response', this.get('data'));
		}
	});
   
    return YoutubeMediaProvider; 
});