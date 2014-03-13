define([
	'jquery',
	'underscore',
	'backbone',

	'views/media_search',
	'views/youtube_player',
	'views/content_layout',
	// 'views/results_navigation',
	'views/feed_filter',
	'views/youtube_playlists_provider',
	'views/user_profile_manager',
	'views/facebook/facebook_like_view',
	'views/youtube/PlaylistsViewer',
	'views/SidebarView',
	'views/Loader',
	'views/infinite_scroller',
	
	'modules/presets/presets.view',
	'modules/duration/duration.view',

	'collections/history_playlist'
], function(
	$, _, Backbone,
	MediaSearch, YoutubePlayer, ContentLayoutView,
	// ResultsNavigation, 
	FeedFilter, YoutubePlaylistsProvider, UserProfileManager,
	FacebookLikeView,
	PlaylistsViewer,
	SidebarView,
	Loader,
	InfiniteScroll,
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
				searchFeedFilter: new FeedFilter({ model: this.model }),
				userPlaylists: new YoutubePlaylistsProvider({ 
					model: this.model,
					collection: this.model.youtube.playlists
				}),
				userProfileManager: new UserProfileManager({ model: this.model }),
				facebookLikeView: new FacebookLikeView({ model: this.model }),
				sidebarToggle: new SidebarView({ model: this.model }),
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

			
			// show first time dialog
			this.setFirstTimeDialog();
		},

		setSize: function() {
			// 10 is for keeping the bottom line of content stick
			// to the footer bar
			this.$el.height(_().getPortviewSize().height + 10);	
		},

		setFirstTimeDialog: function() {
			var showFirstTimeDialog = localStorage.getItem('showFirstTime');
			var closeDialog = function() {
				$('#e-dialog').modal("hide");
			};

			if (showFirstTimeDialog !== "false") {

				$('#e-dialog').find('.dont-remind').on('click', function(ev){
					localStorage.setItem('showFirstTime', "false");
					closeDialog();
				});

				$('#e-dialog').modal();
			}
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