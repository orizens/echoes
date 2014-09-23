var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbonejs');
var YoutubeItemTemplate = require('../../templates/youtube_item.html');
   
var YoutubeItemView = Backbone.View.extend({
	tagName: 'li',
	
	className: 'youtube-item card ux-maker col-sm-3 col-xs-12',
	
	events: {
		'click .media-thumb': 'selectMedia',
		'click .media-desc': 'toggleInformation',
		'click .add-to-playlist': 'addToPlaylist',
		'click .favorite-media': 'toggleFavorite',
		'click .close': 'toggleInformation'
	},
	template: YoutubeItemTemplate,

	initialize: function() {
		this.listen();
	},

	listen: function () {
		this.listenTo(this.model, 'change:isPlaying', this.render);
		this.listenTo(this.model, 'change:isFavorite', this.render);
	},

	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	},

	selectMedia: function(ev) {
		ev.preventDefault();
		this.model.set('isPlaying', true);
		this.trigger('play-media', this.model);
	},

	toggleInformation: function(ev) {
		ev.stopPropagation();
		this.$el.toggleClass('show-description');
	},

	addToPlaylist: function(ev){
		ev.preventDefault();
		Backbone.trigger('app:add-to-playlist', this.model.toJSON());
	},

	toggleFavorite: function (ev) {
		var isFavorite = this.model.get('isFavorite');
		ev.preventDefault();
		console.log('favorited video', this.model.toJSON());
		this.model.set('isFavorite', !isFavorite);
	}
});

module.exports = YoutubeItemView;