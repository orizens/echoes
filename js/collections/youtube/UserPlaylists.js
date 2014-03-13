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
		provider: new PlaylistsService(),

		initialize: function () {
			this.listenTo(this.provider, 'change:items', this.updateItems);
		},

		comparator: function (item) {
			return item.attributes.snippet.title.toLowerCase();
		},

		insert: function (playlistId, videoId) {
			console.log(playlistId);
		},

		create: function (model) {
			this.factory.get('resource').snippet.title = model.title;
			this.factory.create();
			this.factory.set(this.factory.defaults, { silent: true });
		},

		list: function () {
			this.provider.fetch();
		},

		updateItems: function(provider, items){
			if (items) this.set(items);
		}

    });
   
    return UserPlaylists; 
});