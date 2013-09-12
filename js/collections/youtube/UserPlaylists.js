// Youtube user playlist service to perform crud playlist 
// operations: insert, delete, udpate, etc..
define([
	'backbone', 
	'models/youtube/YoutubePlaylistItemsService',
	'models/youtube/PlaylistsService'
], 
function(Backbone, YoutubePlaylistItemsService, PlaylistsService) {
   
    var UserPlaylists = Backbone.Collection.extend({

		model: YoutubePlaylistItemsService,

		factory: new PlaylistsService(),

		insert: function (playlistId, videoId) {
			console.log(playlistId);
		},

		create: function (model) {
			this.factory.get('resource').snippet.title = model.title;
			this.factory.create();
			this.factory.set(this.factory.defaults, { silent: true });
		}

    });
   
    return UserPlaylists; 
});