define([
	'underscore',
	'backbone',
	'models/youtube_user_playlist_item'
], function(_, Backbone, YoutubePlaylistItemModel) {
   
    var YoutubePlaylistsProvider = Backbone.Collection.extend({
		model: YoutubePlaylistItemModel,

		url: 'http://gdata.youtube.com/feeds/api/users/orizendesigns/playlists?v=2&alt=jsonc',

		parse: function(response) {
			return response.data.items;
		},

		initialize: function() {
			this.fetch();
		},

		comparator: function(entry) {
			return entry.get('title').$t;
		}
	});
   
    return YoutubePlaylistsProvider; 
});