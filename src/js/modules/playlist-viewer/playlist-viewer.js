var _ = require('underscore');
var Backbone = require('backbonejs');
var YoutubeItemView = require('../../views/youtube_item.js');
var YoutubeItemModel = require('../../models/youtube_item.js');
var YoutubePlaylistInfoProvider = require('../../models/youtube_playlist_info_provider.js');
var PlaylistViewerTpl = require('./playlist-viewer.tpl.html');


var playlist = Backbone.Collection.extend({
	model: YoutubeItemModel
});
var itemView = YoutubeItemView.extend({
	initialize: function(){
		this.listen();
	},
	render: function () {
		var video = this.model.toJSON().video;
		
		// on status - 'limitedSyndication' is not handled here
		// it has restriction of countries for now

		// if (video.status && video.status.reason === 'suspended'
		// 	|| video.status && video.status.value === 'restricted') {
		// 	debugger;
		// 	this.$el.hide();
			// video = this.model.toJSON();
		// }

		// video.likeCountDisplay = this.model.get('likeCountDisplay');
		// the model saves the video's json data in the 'video'
		// property, so we need to apply the video json data
		// to the model, and then run digest on the model
		// to apply the 'likeCountDisplay' and 'time' convertions
		_.extend(this.model.attributes, video);
		video = this.model.digest().toJSON();
		this.$el.html(this.template(video));
		return this;
	}
});

var items = Backbone.View.extend({
	tagName: 'ul',
	className: 'clearfix unstyled ux-maker playlist-items',
	view: {
		type: itemView,
		collection: playlist,
		events: {
			'play-media': 'playMedia'
		}
	},

	initialize: function (options) {
		this.options = options;
	},
	
	playMedia: function(model){
		// unselect last played
		var lastPlayedIndex = this.model.player.get('index');
		var lastPlayedModel;
		if (lastPlayedIndex) {
			lastPlayedModel = this.collection.at(lastPlayedIndex);
			if (lastPlayedModel) {
				lastPlayedModel.set({ isPlaying: false });
			}
		}
		// play the new one
		this.model.playMedia({
			type: 'playlist',
			mediaId: this.options.info.get('id'),
			index: model.get('position') - 1
		});
	}
});

var PlaylistInfoView = Backbone.View.extend({
	template: PlaylistViewerTpl,
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));	
	}
});

var PlaylistInfoViewer = Backbone.View.extend({
	tagName: 'div',

	transition: {
		duration: 200,
		css: 'transition-in'
	},

	initialize: function() {
		this.info = new YoutubePlaylistInfoProvider();
		this.infoView = new PlaylistInfoView({
			model: this.info
		});
		this.items = new items({
			model: this.model,
			info: this.info
		});
		this.$el.append([this.infoView.el, this.items.el]);
		this.listenTo(this.model.youtube, 'change:showPlaylistId', this.getPlaylistInfo);
		this.listenTo(Backbone, 'app:load-more', this.handleLoadMore);
		this.listenTo(this.info, 'done', this.renderItems);
		Backbone.trigger('app:loader-start');
		this.getPlaylistInfo();
	},
	
	getPlaylistInfo: function(){
		this.info.set('id', this.model.youtube.get('showPlaylistId'));
	},

	renderItems: function(items) {
		var hasFiltered = false;
		Backbone.trigger('app:loader-end');
		this.items.collection.set(_.chain(items)
			.filter(function(item){
				var hasVideo = item && item.video;
				var hasStatus = hasVideo && item.video.status && item.video.status;
				var exclude = "private blocked suspended";
				if (hasStatus && exclude.indexOf(hasStatus.reason) > -1) {
					return false;
				}
				if (hasVideo){
					return item;
				}
			}).value()
		);
		// update the size of playlist after the filter above
		hasFiltered = this.info.get('totalItems') !== this.items.collection.length;
		this.info.set({ 
			totalItems: this.items.collection.length,
			restricted: hasFiltered
		});
		this.info.sourceItems = items;
		this.infoView.render();
	}
});

module.exports = PlaylistInfoViewer;