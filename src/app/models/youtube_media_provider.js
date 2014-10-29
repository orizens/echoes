var _ = require('underscore');
var Backbone = require('backbonejs');
var YoutubeItemInfo = require('./youtube_item_info');
var YoutubePlaylistInfoProvider	= require('./youtube_playlist_info_provider');
var ProfileService = require('./youtube/ProfileService');
var history	= require('./youtube/playlist-items');
var UserPlaylists = require('../collections/youtube/UserPlaylists');

var Developer_API_key = "AI39si4_o0x9AELkUm2d2M30xfHzbgEjFtZgzV8C7Ydu2f6eRZ6XaYaRxD07qwEVBQkMiOK0pwOFbQ4M7sWl6jcJ7r102BsRJg";
var YoutubeMediaProvider = Backbone.Model.extend({
	// youtube services
	playlists: new UserPlaylists(),
	profile: new ProfileService(),
	history: new history(),
	
	defaults: {
		query: '',
		startIndex: 1,
		maxResults: 50,
		data: [],
		
		preset: '',
		duration: '',

		// supported feed types: videos, playlists, playlist
		feedType: 'videos',
		//- youtube item information provider
	},

	info: new YoutubeItemInfo(),
	playlist: new YoutubePlaylistInfoProvider(),

	safe: 'echoesYoutubeProvider',

	initialize: function() {
		// reset props
		this.attributes.data.length = 0;
		this.on('change:feedType', this.resetIndexAndSearch, this);
		this.on('change:query', this.resetIndexAndSearch, this);
		this.on('change:startIndex', this.search, this);
		this.on('change:preset', this.resetIndexAndSearch, this);

		this.listenTo(this.profile, 'loaded', this.updateLists);
	},

	updateLists: function(lists){
		this.history.setId(lists.watchHistory);
	},

	updateUserPlaylists: function(){
		if(this.profile.attributes.items) {
			this.playlists.list();
		} else {
			this.playlists.reset([]);
		}
	},
	resetIndexAndSearch: function () {
		this.set({ startIndex: 1 }, { silent: true });
		this.fetch();
	},

	search: function() {
		this.fetch();
	},

	fetchNext: function() {
		var startIndex = this.get('startIndex'),
			totalItems = this.get('data').totalItems,
			nextIndex = startIndex + this.get('data').itemsPerPage,
			remainder = totalItems - nextIndex;
		if (remainder > 0) {
			this.set('startIndex', nextIndex, { silent: true });
		}
		this.fetch();
	},

	query: function(data) {
		data.startIndex = data.startIndex || 1;
		this.set(data);
	},

	urlRoot: function() {
		var preset = this.attributes.preset ? '' + this.attributes.preset.value : '';
		var url = [
			'https://gdata.youtube.com/feeds/api/', this.getFeedType(),
			'?q=', this.attributes.query, preset,
			'&alt=jsonc&v=2&start-index=', this.attributes.startIndex,
			this.attributes.duration && this.attributes.duration.value ? '&duration=' + this.attributes.duration.value : '',
			'&max-results=', this.attributes.maxResults, "&key=", Developer_API_key
		];
		return url.join('');
	},

	getFeedType: function() {
		var feedType = this.get('feedType');
		if (feedType === 'playlists') {
			feedType += '/snippets';
		}
		// single playlist: PLD5BA8A4695FAA144?alt=jsonc&v=2
		if (feedType === 'playlist') {
			feedType += '/' + this.get('query');
		}
		return feedType;
	},

	validate: function(attrs) {
		if (attrs.startIndex < 0) {
			return 'start index should be greater than 1.';
		}
	},

	fetchMediaById: function(mediaId) {
		this.info.set('id', mediaId);
	},

	fetchPlaylistInfo: function(playlistId) {
		this.playlist.set('id', playlistId);
	},

	nextIndex: function () {
		var startIndex = this.get('startIndex'),
			totalItems = this.get('data').totalItems,
			nextIndex = startIndex + this.get('data').itemsPerPage,
			remainder = totalItems - nextIndex;
		if (remainder > 0) {
			this.set('startIndex', nextIndex);
		}
	},

	prevIndex: function() {
		var prevIndex = this.get('startIndex') - this.get('data').itemsPerPage;
		if (prevIndex > -1) {
			this.set('startIndex', prevIndex);
		}
	}
});
   
module.exports = YoutubeMediaProvider;