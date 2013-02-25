define([
	'jquery',
	'underscore',
	'backbone',

	'views/media_search',
	'views/youtube_player',
	'views/content_layout',
	'views/results_navigation',
	'views/feed_filter',
	'views/youtube_playlists_provider',
	'views/user_profile_manager',

	'collections/history_playlist'
], function(
	$, _, Backbone,
	MediaSearch, YoutubePlayer, ContentLayoutView,
	ResultsNavigation, FeedFilter, YoutubePlaylistsProvider, UserProfileManager,
	HistoryPlaylist) {
   
	var PlayerApp = Backbone.View.extend({
		el: '.container-main',
		
		views: {},

		initialize: function() {
			this.views.searchBar = new MediaSearch({ model: this.model });
			this.views.youtubePlayer = new YoutubePlayer({ model: this.model });
			this.views.contentView = new ContentLayoutView({ model: this.model });
			this.views.resultsNav = new ResultsNavigation({ model: this.model });
			// this.views.historyPlaylistData = new HistoryPlaylist();
			this.views.searchFeedFilter = new FeedFilter({ model: this.model });
			this.views.userPlaylists = new YoutubePlaylistsProvider({ model: this.model });
			this.views.userProfileManager = new UserProfileManager({ model: this.model });

			// set correct heights
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