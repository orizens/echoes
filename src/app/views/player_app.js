var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbonejs');

var MediaSearch = require('./media_search.js');
var YoutubePlayer = require('./youtube_player.js');
var ContentLayoutView = require('./content_layout.js');
var FeedFilter = require('../modules/feed-filter/feed-filter.js');
var UserPlaylists = require('../modules/user-playlists/user-playlists.js');
var UserProfile = require('../modules/user-profile/user-profile.js');
var FacebookLikeView = require('./facebook/facebook-like-view.js');
var AddToPlaylists = require('./add-to-playlists/add-to-playlists.js');
var SidebarView = require('../modules/sidebar/sidebar-view.js');
var Loader = require('./Loader.js');
var InfiniteScroll = require('./infinite_scroller.js');
var GPlusShare = require('./google/gplus-share.js');
var PresetsView = require('../modules/presets/presets.view.js');
var DurationView = require('../modules/duration/duration.view.js');
var UpdatesView = require('../modules/updates/updates-view.js');

var PlayerApp = Backbone.View.extend({
	el: '.container-main',
	
	initialize: function() {
		this.addStyle();
		
		this.views = {
			searchBar: new MediaSearch({ model: this.model.youtube }),
			youtubePlayer: new YoutubePlayer({ model: this.model }),
			contentView: new ContentLayoutView({ model: this.model }),
			searchFeedFilter: FeedFilter.create(this.model),
			userPlaylists: UserPlaylists.create(this.model, this.model.youtube.playlists),
			userProfile: UserProfile.create(this.model),
			facebookLikeView: new FacebookLikeView({ model: this.model }),
			gplusShare: new GPlusShare({
				model: this.model,
				el: '#gp-share'
			}),
			sidebarToggle: SidebarView.create(this.model),
			loader: new Loader({ model: this.model }),
			playlistsViewer: AddToPlaylists.create(this.model),
			infiniteScroll: new InfiniteScroll({ 
				el: this.$el,
				model: this.model
			}),
			presetsView: new PresetsView({ model: this.model }), 
			durationView: new DurationView({ model: this.model }),
			updates: UpdatesView.create(this.model)
		};
			
		// set correct height
		// $(window).on('resize', _.bind(this.setSize, this));
		// this.setSize();

	},

	setSize: function() {
		// 10 is for keeping the bottom line of content stick
		// to the footer bar
		this.$el.height(_().getPortviewSize().height + 10);	
	},

	addStyle: function () {
		var ios = _().addFeatures(),
			isFullScreen = _().isFullScreen(),
			features = [];
		// add support for a styled scroll
		if (!_().hasHiddenScroll()) {
			features.push('styled-scrollbar');
		}

		if (ios && ios.length) {
			features.push('ios');
		}

		if (isFullScreen) {
			features.push('full-screen-app');
		}
		$('html').addClass(features.join(' '));
	}, 


});

module.exports = PlayerApp;
