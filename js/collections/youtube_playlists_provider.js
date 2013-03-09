define([
	'underscore',
	'backbone',
	'models/youtube_user_playlist_item'
], function(_, Backbone, YoutubePlaylistItemModel) {
   
    var YoutubePlaylistsProvider = Backbone.Collection.extend({
		model: YoutubePlaylistItemModel,

		url: function() {
			return 'http://gdata.youtube.com/feeds/api/users/' + this.username + '/playlists?v=2&alt=jsonc&max-results=50';
		},

		parse: function(response) {
			return response.data.items;
		},

		comparator: function(entry) {
			return entry.get('title');
		}
	});
   
    return YoutubePlaylistsProvider;
});