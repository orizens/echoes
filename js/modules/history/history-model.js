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
			_.extend(this.attributes, this.fit(data));
			this.on('change:duration', this.digest, this);
			this.list();
			// this.digest();
		},

		digest: function() {
			//- convert rating to 2 numbers after the decimal point
			var likeCount = this.get('likeCount') || 0,
				duration = this.get('duration');
			//- format the likeCount with comma each 3 numbers
			this.set("likeCountDisplay", _(likeCount).formatNumberWithComma());
			this.set('time', _(duration).secondsToHms());
			return this;
		},

		fit: function(response) {
			var model = response.snippet;
			model.id = model.resourceId.videoId;
			model.thumbnail = {
				hqDefault: model.thumbnails.high.url
			};
			return model;
		},

		url: 'https://www.googleapis.com/youtube/v3/videos',

		list: function() {
			this.fetch({
				data: {
					part: 'snippet,contentDetails,statistics',
					key: 'AIzaSyCgrK5ds9uCSRM-WBUFm8V8jPX66q8-Od0',
					id: this.attributes.id,
					fields: 'items'
				}
			});
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
		},

		parse: function (response) {
			var item = response.items[0];
			var model = {};
			model.likeCount = item.statistics.likeCount;
			model.duration = this.toHms(item.contentDetails.duration);
			return model;
		}
	});
   
	return YoutubeItemModel;
});