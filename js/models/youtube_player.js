define([
	'underscore',
	'backbone'], 
function(_, Backbone) {

	var YoutubePlayer = Backbone.Model.extend({

		defaults: {
			options: null,
			// a new media id that should be loaded and replace
			// the 'nowPlayingId' media
			// be notified to the player to play
			mediaId: '',
			// can be od a video OR a playlist
			nowPlayingId: '',
			// "Now Playing Type" indicated what type of media is playing in youtube player
			// possible values: 'videos', 'playlist'
			type: '',

			// the selected index to be played in a playlist
			index: 0,

			// the size of the player canvas
			size: {
				width: 300,
				height: 270
			},

			fullScreen: false
		},

		initialize: function() {
			// reset attributes that don't need cache
			this.set('nowPlayingId', null);
			this.set('mediaId', null);
		},

		// 'setOptions' should set the values for the Selected
		// new mediaId that should replace the nowPlayingId
		// 
		// options should include any required settings for the selected media
		// to be played
		// possible settings keys: 
		// - mediaId: video-id-string, playlist-id-string
		// - type: 'video', 'playlist'
		// - if 'playlist' then:
		// - index: index of a media id in the playlist to be played
		setOptions: function (options) {
			// validate the index of a playlist only
			// if a playlist is set in options
			if (options.type === 'playlist') {
				this.validateIndex(options);
			}

			// this.set(options, { silent: true });
			this.set(options);
			

			// need to reset the mediaId so a 'change' 
			// event will be triggered
			// this.set( { 'mediaId': '' }, { silent: true } );
			// this.set( { 'mediaId': options.mediaId } );
		},

		validateIndex: function (options) {
			var index = options.index;
			// validate the index is a number
			if (!_.isNumber(index)) {
				options.index = index = parseInt(index, 10);
			}
			// validate the index is a valide positive index
			options.index = index < 0 ? 0 : index;
		},

		getPlaylistId: function () {
			return this.get('mediaId');
		},

		getPlaylistCurrentIndex: function () {
			return this.get('index');
		},

		// returns true if the current model is 'playlist'
		isCurrentPlaylist: function () {
			return this.get('type') === 'playlist';
		},

		toggleFullScreen: function () {
			this.set( 'fullScreen', !this.get('fullScreen'));
		},

		getSize: function () {
			return this.get('fullScreen') ? this.defaults.size : _(['sidebar']).getPortviewSize();
		},

		getShareUrl: function(){
			var mediaType = this.attributes.type;
			var url = "http://echotu.be/#play/" + mediaType + "/" + this.attributes.mediaId;
			if (mediaType === 'playlist') {
				url += "/" + this.index;
			}
			return url;
		}
	});

	return YoutubePlayer;
});