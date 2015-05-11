describe('Youtube Player Module', function() {
	var scope, ctrl, httpBackend, url, mockData, rootScope, YoutubePlayerSettings, YoutubeSearch;
	var videosResponseMock = {};

	beforeEach(function(){
		module('youtube.player');

		inject(function($controller, $rootScope, _YoutubePlayerSettings_, $httpBackend){
			rootScope = $rootScope;
			YoutubePlayerSettings = _YoutubePlayerSettings_;
			// spyOn(YoutubeSearch, 'search').and.returnValue(true);
			httpBackend = $httpBackend;
			// scope = $rootScope.$new();
			// ctrl = $controller("PresetCtrl as vm", {
			//   $scope: scope 
			// });
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

		xit('should play the 1st video by default when playing a playlist', function() {
			
		});
	});
});