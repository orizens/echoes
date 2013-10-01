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
	HistoryPlaylist) {
   
	var PlayerApp = Backbone.View.extend({
		el: '.container-main',
		
		initialize: function() {

			this.views = {
				searchBar: new MediaSearch({ model: this.model }),
				youtubePlayer: new YoutubePlayer({ model: this.model }),
				contentView: new ContentLayoutView({ model: this.model }),
				// resultsNav: new ResultsNavigation({ model: this.model }),
				//	historyPlaylistData: new HistoryPlaylist()
				searchFeedFilter: new FeedFilter({ model: this.model }),
				userPlaylists: new YoutubePlaylistsProvider({ 
					model: this.model,
					collection: this.model.user().playlists
				}),
				userProfileManager: new UserProfileManager({ model: this.model }),
				facebookLikeView: new FacebookLikeView({ model: this.model }),
				sidebarToggle: new SidebarView({ model: this.model }),
				loader: new Loader({ model: this.model }),
				playlistsViewer: new PlaylistsViewer({ model: this.model }),
				infiniteScroll: new InfiniteScroll({ 
					el: this.$el,
					model: this.model
				})
			};
				
			// set correct height
			$(window).on('resize', _.bind(this.setSize, this));
			this.setSize();

			
			// this.model.connectUser();
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
		}

		// renderHistory: function() {
		// 	this.modules.contentView.update( this.modules.historyPlaylistData.toJSON().reverse() );
		// 	return this;
		// },

	});
   
	return PlayerApp;
});