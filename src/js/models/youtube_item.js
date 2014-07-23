define([
	'underscore',
	'backbone'
], function(_, Backbone) {
   
    var YoutubeItemModel = Backbone.Model.extend({
		defaults: {
			//- custom properties not related to json response
			likeCountDisplay: 0,
			time: 0,
			mediaType: 'video',
			isPlaying: false,
			isFavorite: false,

			// youtube video json
			accessControl: {},
			category: "",
			commentCount: "",
			content: {},
			description: "",
			duration: "",
			favoriteCount: "",
			likeCount: "",
			player: {},
			rating: "",
			ratingCount: "",
			restrictions: {},
			status: {},
			thumbnail: {},
			title: "",
			updated: "",
			uploaded: "",
			uploader: "",
			viewCount: ""
		},

		initialize: function() {
			this.digest();
		},

		digest: function() {
			//- convert rating to 2 numbers after the decimal point
			var likeCount = this.get('likeCount') || 0,
				duration = this.get('duration');
			//- format the likeCount with comma each 3 numbers
			this.set("likeCountDisplay", _(likeCount).formatNumberWithComma());
			this.set('time', _(duration).secondsToHms());
			return this;
		}
	});
   
    return YoutubeItemModel;
});