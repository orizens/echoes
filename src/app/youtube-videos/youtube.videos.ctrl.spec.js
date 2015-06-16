describe("Youtube Videos", function() {
	var scope, ctrl, httpBackend, url, mockData, rootScope, YoutubeSearch, YoutubePlayerSettings, YoutubeVideoInfo, $q;
	var mockVideoItem = {};
	var mockPlaylistItem = {};

	beforeEach(module("youtube.videos"));

	beforeEach(inject(
		function($controller, $rootScope, _$q_, _YoutubeSearch_, _YoutubePlayerSettings_, _YoutubeVideoInfo_, $httpBackend){
			rootScope = $rootScope;
			$q = _$q_;
			YoutubeSearch = _YoutubeSearch_;
			YoutubePlayerSettings = _YoutubePlayerSettings_;
			YoutubeVideoInfo = _YoutubeVideoInfo_;
			httpBackend = $httpBackend;
			// spies
			spyOn(YoutubeSearch, 'search');
			spyOn(YoutubePlayerSettings, 'playVideoId');
			spyOn(YoutubePlayerSettings, 'queueVideo');
			spyOn(YoutubeVideoInfo, 'getPlaylist').and.callFake(function () {
				var defer = $q.defer();
				defer.resolve();
				return defer.promise;
			});
			spyOn(YoutubePlayerSettings, 'playPlaylist');
			scope = $rootScope.$new();
			ctrl = $controller("YoutubeVideosCtrl as vm", {
			  $scope: scope 
			});
			scope.$digest();
			mockVideoItem = window.mocks['video.item.mock'];
			mockPlaylistItem = window.mocks['youtube.videos.mock'];
		}
	));

	it("search youtube once, when it loads", function() {
		expect(YoutubeSearch.search).toHaveBeenCalled();
		expect(YoutubeSearch.search.calls.count()).toBe(1);
	});

	it("should queue and play video", function() {
		scope.vm.playVideo(mockVideoItem);
		expect(YoutubePlayerSettings.queueVideo).toHaveBeenCalled();
		expect(YoutubePlayerSettings.playVideoId).toHaveBeenCalled();
	});

	it("should play a playlist and queue the videos", function() {		
		scope.vm.playPlaylist(mockPlaylistItem);
		scope.$digest();
		expect(YoutubePlayerSettings.playPlaylist.calls.count()).toBe(1);
	});
});