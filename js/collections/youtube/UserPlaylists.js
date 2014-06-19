// Youtube user playlist service to perform crud playlist 
// operations: insert, delete, udpate, etc..
define([
	'backbone', 
	'models/youtube/YoutubePlaylistItemsService',
	'models/youtube/PlaylistsService',
	'models/youtube/playlist-items'
], 
function(Backbone, YoutubePlaylistItemsService, PlaylistsService,
	PlaylistItems) {
   
    var UserPlaylists = Backbone.Collection.extend({

		model: YoutubePlaylistItemsService,

		factory: new PlaylistsService(),
		provider: new PlaylistsService(),
		updater: new PlaylistItems(),

		initialize: function () {
			this.listenTo(this.provider, 'change:items', this.updateItems);
			this.listenTo(this.updater, 'change:result', this.addResource);
		},

		comparator: function (item) {
			return item.attributes.snippet.title.toLowerCase();
		},

		insert: function (playlistId, videoId) {
			this.updater.insert(playlistId, videoId);
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
			this.trigger('update', items);
		},

		addResource: function (resource) {
			this.trigger('added', resource);
		}

    });
   
    return UserPlaylists; 
});