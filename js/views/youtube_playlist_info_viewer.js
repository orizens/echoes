define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_item',
	'models/youtube_item',
	'models/youtube_playlist_info_provider',
	'text!templates/youtube_playlist_info_viewer.html'
], function($, _, Backbone, 
	YoutubeItemView, 
	YoutubeItemModel,
	YoutubePlaylistInfoProvider,
	YoutubePlaylistInfoViewerTpl) {
	var playlist = Backbone.Collection.extend({
		model: YoutubeItemModel
	});

	var items = Backbone.View.extend({
		tagName: 'ul',
		className: 'clearfix unstyled ux-maker playlist-items',
		view: {
			type: YoutubeItemView,
			collection: playlist
		}
	});
	
	var info = Backbone.View.extend({
		template: YoutubePlaylistInfoViewerTpl,
		render: function(){
			this.$el.html(_.template(this.template, this.model.toJSON()));	
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
			this.infoView = new info({
				model: this.info
			});
			this.items = new items();
			this.$el.append([this.infoView.el, this.items.el]);
			this.listenTo(this.model.youtube(), 'change:showPlaylistId', this.getPlaylistInfo);
			this.listenTo(Backbone, 'app:load-more', this.handleLoadMore);
			this.listenTo(this.info, 'done', this.renderItems);
			Backbone.trigger('app:show-loader');
			this.getPlaylistInfo();
		},
		
		getPlaylistInfo: function(){
			this.info.set('id', this.model.youtube().get('showPlaylistId'));
		},

		renderItems: function(items) {
			Backbone.trigger('app:hide-loader');
			this.items.collection.set(_.map(items, function(item){
				return item.video;
			}));
			this.infoView.render();
		}
	});

    return PlaylistInfoViewer;
});