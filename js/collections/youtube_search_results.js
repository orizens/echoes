define([
	'underscore',
	'backbone',
	'models/youtube_item'
], function(_, Backbone, YoutubeItemModel) {
   
    var YoutubeSearchResults = Backbone.Collection.extend({
		model: YoutubeItemModel,
		
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
   
    return YoutubeSearchResults; 
});