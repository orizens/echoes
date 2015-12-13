describe("Youtube Videos", () => {
	let scope, ctrl, YoutubeSearch, YoutubePlayerSettings, YoutubeVideoInfo, controller;
	let mockVideoItem = {};
	let mockPlaylistItem = {};

	beforeEach(module("youtube-videos"));

	beforeEach(inject(($injector, $controller, $q) => {
			controller = $controller;
			YoutubeSearch = $injector.get('YoutubeSearch');
			YoutubePlayerSettings = $injector.get('YoutubePlayerSettings');
			YoutubeVideoInfo = $injector.get('YoutubeVideoInfo');
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
			scope = $injector.get('$rootScope').$new();
			ctrl = controller("YoutubeVideosCtrl as vm", { $scope: scope });
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