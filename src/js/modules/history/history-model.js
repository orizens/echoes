var _ = require('underscore');
var Backbone = require('backbonejs');
   
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
		duration: 0,
		favoriteCount: "",
		likeCount: 0,
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

	initialize: function(data) {
		this.digest();
	},

	digest: function() {
		//- convert rating to 2 numbers after the decimal point
		var attrs = this.attributes,
			snippet = attrs.snippet,
			likeCount = attrs.likeCount || 0,
			duration = attrs.duration;
		//- format the likeCount with comma each 3 numbers
		attrs.likeCountDisplay = _(likeCount).formatNumberWithComma();
		attrs.time = this.toHms(duration);
		attrs.title = snippet.title;
		attrs.description = snippet.description;
		return this;
	},

	fit: function(response) {
		var model = response.snippet;
		model.id = model.resourceId.videoId;
		model.thumbnail = {
			hqDefault: model.thumbnails.high.url
		};
		this.id = model.id;
		return model;
	},

	// format: PT1H4M56S
	toHms: function(time) {
		var t = time.split("PT")[1]
			.replace(/(H|M)/g, ":")
			.replace("S", "");
		var ts = t.split(":");
		ts = ts.map(function(d){
			return d.length === 1 ? "0" + d : d;
		});
		return ts.join(":");
	}
});

module.exports = YoutubeItemModel;