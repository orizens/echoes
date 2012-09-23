/*
	Author: Oren Farhi, http://twitter.com/orizens
*/
var PlayerApp = {
	Models: {},
	Views: {},
	Collections: {},
	Templates: {},
	Utils: {
		formatNumberWithComma: function(num) {
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}
};

PlayerApp.Models.YoutubeItemSearchResult = Backbone.Model.extend({
	defaults: {
		//- custom properties not related to json response
		likeCountDisplay: 0
	},

	initialize: function() {
		//- convert rating to 2 numbers after the decimal point
		var likeCount = this.get('likeCount') || 0;
		//- format the likeCount with comma each 3 numbers
		this.set("likeCountDisplay", PlayerApp.Utils.formatNumberWithComma(likeCount));
	}
});

PlayerApp.Collections.YoutubeSearchResults = Backbone.Collection.extend({
	model: PlayerApp.Models.YoutubeItemSearchResult
});

PlayerApp.Views.YoutubeItemSearchResult = Backbone.View.extend({
	tagName: 'li',
	
	className: 'well youtube-item span3 nicer-ux',

	events: {
		'click a': 'onClick',
		'click .media-desc': 'toggleInformation'
	},

	initialize: function() {
		this.template = _.template($('#youtube-item-search-result').html());
	},

	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		this.$el.find('.twipsy').tooltip();
		return this;
	},

	onClick: function(ev) {
		ev.preventDefault();
		this.trigger('media-clicked', this.model.toJSON());
	},

	toggleInformation: function() {
		this.$el.toggleClass('show-description');
		this.$el.find('.icon-white').toggleClass('icon-chevron-up').toggleClass('icon-chevron-down');
	},

	destroy: function() {
		this.undelegateEvents();
		this.$el.remove();
	}
});

PlayerApp.Views.YoutubeSearchResults = Backbone.View.extend({
	el: "#searchResults",

	initialize: function() {
		this.collection = new PlayerApp.Collections.YoutubeSearchResults();
		this.collection.on('reset', this.render, this);
		this.views = [];
	},

	render: function() {
		this.$el.fadeOut(300, _.bind(this.renderCollection, this));
	},

	renderCollection: function() {
		this.resetViews();
		//- TODO: fix-  in order the remove the progress bar
		this.$el.empty();
		this.collection.each(function(item){
			this.views.push(new PlayerApp.Views.YoutubeItemSearchResult({ model: item }));
			this.views[this.views.length - 1].on('media-clicked', this.onSelected, this);
			this.$el.append( this.views[this.views.length - 1].render().el );
		}, this);
		this.$el.delay(200).fadeIn(500);
	},

	resetViews: function() {
		_.each(this.views, function(view) {
			view.off();
			view.destroy();
		});
		this.views = [];
	},

	update: function(results) {
		this.collection.reset(results.items);
	},

	onSelected: function(ev) {
		this.trigger('search-result-selected', ev);
	}
});

PlayerApp.Models.ResultsNavigation = Backbone.Model.extend({
	defaults: {
		startIndex: 1
	},

	initialize: function() {
		this.on('change:items', this.setDisplayHelpers, this);
	},

	setDisplayHelpers: function() {
		var itemsPerPage = this.get('itemsPerPage'),
			start = this.get('startIndex') - 1,
			end = start + itemsPerPage;
		start = start > 0 ? start : 1;
		this.set('totalItems', PlayerApp.Utils.formatNumberWithComma(this.get('totalItems')));
		this.set({
			start: start,
			end: end
		});
	},

	getNextIndex: function() {
		return this.get('startIndex') + this.get('itemsPerPage');
	},

	getPrevIndex: function() {
		return this.get('startIndex') - this.get('itemsPerPage');
	}
});

PlayerApp.Views.ResultsNavigation = Backbone.View.extend({
	el: '#results-navigator',

	events: {
		'click .next': 'onNextClick',
		'click .prev': 'onPrevClick'
	},

	initialize: function() {
		this.template = _.template($('#results-navigation').html());
		this.model = new PlayerApp.Models.ResultsNavigation();
		this.model.on('change', this.render, this);
	},

	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	},

	onNextClick: function(ev) {
		ev.preventDefault();
		this.trigger('navigate-index-change', this.model.getNextIndex());
	},

	onPrevClick: function(ev) {
		ev.preventDefault();
		this.trigger('navigate-index-change', this.model.getPrevIndex());
	},

	update: function(results) {
		this.model.set(results);
		this.$el.toggleClass('prev-disabled', this.model.get('startIndex') === 1);
	}
});

PlayerApp.Models.YoutubeMediaProvider = Backbone.Model.extend({
	
	defaults: {
		query: '',
		startIndex: 1,
		indexSteps: 25
	},

	initialize: function() {
		this.on('change:query change:startIndex', this.search, this);
		this.on('change:data', this.publishResponse, this);
	},

	search: function() {
		this.fetch();
	},

	urlRoot: function() {
		return 'https://gdata.youtube.com/feeds/api/videos?q=' + this.get('query') + '&alt=jsonc&v=2&start-index=' + this.get('startIndex');
	},

	publishResponse: function() {
		this.trigger('new-media-response', this.get('data'));
	}
});

PlayerApp.Views.MediaSearch = Backbone.View.extend({
	el: '#media-explorer',
	events: {
		'click button' : 'onExplore'
	},

	initialize: function(){
		// cache input field
		this.$search = this.$el.find('input');
	},

	onExplore: function(ev) {
		ev.preventDefault();
		this.trigger('search-request', this.$el.find('input').val());
	},

	getQuery: function() {
		return this.$search.val();
	}
});

PlayerApp.Views.YoutubePlayer = Backbone.View.extend({
	el: '#youtube-player-container',

	events: {
		'click .hide-player': 'hide',
		'click .show-player': 'show'
	},

	initialize: function() {
		this.$player = this.$el.find('iframe');
	},

	play: function(mediaData) {
		var mediaSource = "http://www.youtube.com/embed/" + mediaData.id + "?autoplay=1&origin=http://orizens.bitbucket.org";
		this.$player.attr('src', mediaSource);
		this.show();
	},

	show: function() {
		this.$el.addClass('show-youtube-player');
	},

	hide: function() {
		this.$el.removeClass('show-youtube-player');
	}
});

PlayerApp.Views.App = Backbone.View.extend({
	initialize: function() {
		//- create an instance of the media provider
		this.modules = {};
		this.modules.search = new PlayerApp.Views.MediaSearch();
		this.modules.search.on('search-request', this.onNewSearch, this);

		this.modules.mediaProvider = new PlayerApp.Models.YoutubeMediaProvider();
		this.modules.mediaProvider.on('new-media-response', this.onYoutubeSearchResponse, this);

		this.modules.youtubePlayer = new PlayerApp.Views.YoutubePlayer();
		this.modules.resultsView = new PlayerApp.Views.YoutubeSearchResults();
		this.modules.resultsView.on('search-result-selected', this.onMediaAddedToQueue, this);
		this.modules.resultsNav = new PlayerApp.Views.ResultsNavigation();
		this.modules.resultsNav.on('navigate-index-change', this.onSearchResultsIndexChange, this);
	},

	renderExplore: function() {
		this.modules.mediaProvider.set('query', this.modules.search.getQuery());
		return this;
	},

	onYoutubeSearchResponse: function(data) {
		this.modules.resultsView.update(data);
		this.modules.resultsNav.update(data);
	},

	onNewSearch: function(searchQuery) {
		this.modules.mediaProvider.set('query', searchQuery);
	},

	onSearchResultsIndexChange: function(index) {
		this.modules.mediaProvider.set('startIndex', index);
	},

	onMediaAddedToQueue: function(mediaData) {
		this.modules.youtubePlayer.play(mediaData);
	}
});

PlayerApp.Player = Backbone.Router.extend({

	routes: {
		'': 'home',
		'explore': 'home',
		'history': 'showHistory',
		'settings': 'showSettings'
	},

	initialize: function() {
		this.appView = new PlayerApp.Views.App();
	},

	home: function() {
		this.appView.renderExplore();
	},

	showHistory: function() {
		console.log('in progress...');
		this.navigate('explore', {trigger: true});
	},

	showSettings: function() {
		console.log('in progress...');
		this.navigate('explore', {trigger: true});
	}
});

PlayerApp.Templates.load = function(templatesUrl, callback){
	//- load templates and then start player
	templatesUrl = templatesUrl ? templatesUrl : 'templates/templates.html';
	$.get(templatesUrl, function(templates){
		$('body').append(templates);
		if (callback) {
			callback();
		}
	});
};
