define([
	'jquery',
	'underscore',
	'backbone',

	'views/media_search',
	'views/youtube_player',
	'views/content_layout',
	// 'views/results_navigation',
	'modules/feed-filter/feed-filter',
	'modules/user-playlists/user-playlists',
	'modules/user-profile/user-profile',
	'views/facebook/facebook_like_view',
	'views/youtube/PlaylistsViewer',
	'modules/sidebar/sidebar-view',
	'views/Loader',
	'views/infinite_scroller',
	'views/google/gplus-share',
	'modules/presets/presets.view',
	'modules/duration/duration.view',

	'collections/history_playlist'
], function(
	$, _, Backbone,
	MediaSearch, YoutubePlayer, ContentLayoutView,
	// ResultsNavigation, 
	FeedFilter, UserPlaylists, UserProfile,
	FacebookLikeView,
	PlaylistsViewer,
	SidebarView,
	Loader,
	InfiniteScroll,
	GPlusShare,
	PresetsView,
	DurationView,
	HistoryPlaylist) {
   
	var PlayerApp = Backbone.View.extend({
		el: '.container-main',
		
		initialize: function() {
			this.addStyle();
			
			this.views = {
				searchBar: new MediaSearch({ model: this.model.youtube }),
				youtubePlayer: new YoutubePlayer({ model: this.model }),
				contentView: new ContentLayoutView({ model: this.model }),
				// resultsNav: new ResultsNavigation({ model: this.model }),
				//	historyPlaylistData: new HistoryPlaylist()
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
				playlistsViewer: new PlaylistsViewer({ model: this.model }),
				infiniteScroll: new InfiniteScroll({ 
					el: this.$el,
					model: this.model
				}),
				presetsView: new PresetsView({ model: this.model }), 
				durationView: new DurationView({ model: this.model })
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
   
	return PlayerApp;
});
