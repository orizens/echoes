define([
	'underscore',
	'backbone',
	'models/youtube_user_playlist_item'
], function(_, Backbone, YoutubePlaylistItemModel) {
   
    var YoutubePlaylistsProvider = Backbone.Collection.extend({
		model: YoutubePlaylistItemModel,

		url: function() {
			return 'http://gdata.youtube.com/feeds/api/users/' + this.username + '/playlists?v=2&alt=jsonc';
		},

		parse: function(response) {
			return response.data.items;
		},

		initialize: function() {
			require(['http://orizens.com/tools/services/echoes/profile.php'], _.bind(this.onProfileLoaded, this));
		},

		onProfileLoaded: function(response){
			if (window.ytProfile) {
				this.username = window.ytProfile.entry.yt$username.$t;
				this.trigger('yt-profile-loaded', this.username);
				this.fetch();
			}
		},

		comparator: function(entry) {
			return entry.get('title');
		}
	});
   
    return YoutubePlaylistsProvider; 
});