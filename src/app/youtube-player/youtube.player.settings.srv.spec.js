describe('Youtube Player Module', function() {
	var scope, ctrl, httpBackend, url, mockData, rootScope, YoutubePlayerSettings, YoutubeSearch;
	var videosResponseMock = {};

	beforeEach(function(){
		module('youtube.player');
		inject(function (localStorageService) {
			spyOn(localStorageService, 'get').and.returnValue([]);
		});
		inject(function($controller, $rootScope, _YoutubePlayerSettings_, $httpBackend){
			rootScope = $rootScope;
			YoutubePlayerSettings = _YoutubePlayerSettings_;
			httpBackend = $httpBackend;
			videosResponseMock = window.mocks['youtube.videos.mock'];
		});
	});

	describe('Youtube Player Settings Service', function() {
		it('queue videos to its playlist', function() {
			YoutubePlayerSettings.queueVideo(videosResponseMock.items[1]);
			expect(YoutubePlayerSettings.nowPlaylist.length).toBe(1);
		});

		it('should reset the seek to zero when a new video is played', function() {
			YoutubePlayerSettings.playVideoId(videosResponseMock.items[5]);
			expect(YoutubePlayerSettings.getSeek()).toBe(0);
		});

		it('should update the nowPlaying object when playing a video', function() {
			var video = videosResponseMock.items[3];
			YoutubePlayerSettings.playVideoId(video);
			expect(YoutubePlayerSettings.nowPlaying.mediaId).toBe(video.id);
		});

		it('should mark the next video when play next track', function() {
			YoutubePlayerSettings.playVideoId(videosResponseMock.items[1]);
			YoutubePlayerSettings.queueVideo(videosResponseMock.items[2]);
			YoutubePlayerSettings.playNextTrack();
			expect(YoutubePlayerSettings.nowPlaying.mediaId).toBe(videosResponseMock.items[2].id);
		});

		it('should play the 1st video by default when playing a playlist', function() {
			YoutubePlayerSettings.playPlaylist(videosResponseMock.items.concat());
			expect(YoutubePlayerSettings.nowPlaying.index).toBe(0);
		});

		it('should play a selected index video playing a playlist and sending an index to play', function() {
			YoutubePlayerSettings.playPlaylist(videosResponseMock.items.concat(), 4);
			expect(YoutubePlayerSettings.nowPlaying.index).toBe(4);
		});

		it('should update the index of now playing when a track removed from the now playlist', function() {
			var nowPlayingIndex = 3;
			var removedIndex = 0;
			YoutubePlayerSettings.playPlaylist(videosResponseMock.items.concat(), nowPlayingIndex);
			YoutubePlayerSettings.remove(YoutubePlayerSettings.nowPlaylist[removedIndex], removedIndex);
			expect(YoutubePlayerSettings.nowPlaying.index).toBe(nowPlayingIndex - 1);
		});

		it('should play the previous track and update the index', function() {
			YoutubePlayerSettings.playPlaylist(videosResponseMock.items.concat(), 3);
			expect(YoutubePlayerSettings.nowPlaying.index).toBe(3);
			YoutubePlayerSettings.playPreviousTrack();
			expect(YoutubePlayerSettings.nowPlaying.index).toBe(2);
		});
	});
});