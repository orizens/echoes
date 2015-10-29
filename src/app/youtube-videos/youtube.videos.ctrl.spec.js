describe("Youtube Videos", () => {
	var scope, ctrl, httpBackend, url, mockData, rootScope, YoutubeSearch, YoutubePlayerSettings, YoutubeVideoInfo, $q, controller;
	var mockVideoItem = {};
	var mockPlaylistItem = {};

	beforeEach(module("youtube-videos"));

	beforeEach(inject(($controller, $rootScope, _$q_, _YoutubeSearch_, _YoutubePlayerSettings_, _YoutubeVideoInfo_, $httpBackend) => {
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
			spyOn(YoutubeVideoInfo, 'getPlaylist').and.callFake( () => {
				let defer = $q.defer();
				defer.resolve();
				return defer.promise;
			});
			spyOn(YoutubePlayerSettings, 'playPlaylist');
			scope = $rootScope.$new();
			controller = $controller
			ctrl = $controller("YoutubeVideosCtrl as vm", {
			  $scope: scope 
			});
			scope.$digest();
			mockVideoItem = window.mocks['video.item.mock'];
			mockPlaylistItem = window.mocks['youtube.videos.mock'];
		}
	));

	it("search youtube once when it loads if there are no items to render", () => {
		expect(YoutubeSearch.search).toHaveBeenCalled();
		expect(YoutubeSearch.search.calls.count()).toBe(1);
	});

	it('should not search when it loads if there are items to render', () => {
		angular.copy(mockPlaylistItem.items, YoutubeSearch.items);
		ctrl = controller("YoutubeVideosCtrl as vm", {
		  $scope: scope 
		});
		expect(YoutubeSearch.search.calls.count()).toBe(1);
	});

	it("should queue and play video", () => {
		scope.vm.playVideo(mockVideoItem);
		expect(YoutubePlayerSettings.queueVideo).toHaveBeenCalled();
		expect(YoutubePlayerSettings.playVideoId).toHaveBeenCalled();
	});

	it("should play a playlist and queue the videos", () => {		
		scope.vm.playPlaylist(mockPlaylistItem);
		scope.$digest();
		expect(YoutubePlayerSettings.playPlaylist.calls.count()).toBe(1);
	});
});