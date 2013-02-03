define([
	'underscore',
	'backbone',
	'models/youtube_playlist_item'
], function(_, Backbone, YoutubePlaylistItemModel) {
   
    var YoutubePlaylistSearchResults = Backbone.Collection.extend({
		model: YoutubePlaylistItemModel,

		played: null,

		initialize: function() {
			this.listenTo(this, 'reset', this.updatePlayedId);
		},

		savePlayed: function(model) {
			if (this.played === model.id) {
				return;
			}
			if (this.played) {
				this.get(this.played).set({ 'isPlaying': false });
			}
			this.played = model.id;
		},

		updatePlayedId: function() {
			var current = this.get(this.played);
			if (current) {
				current.set({ 'isPlaying': true });
			}
		}
	});
   
    return YoutubePlaylistSearchResults; 
});