describe("Media Info :", function() {
	var scope, ctrl, httpBackend, url, mockData, rootScope, YoutubeVideoInfo;
	var mockVideoItem = {};

	beforeEach(module("mediaDeck"));

	beforeEach(inject(
		function($controller, $rootScope, _YoutubeVideoInfo_, _YoutubePlayerSettings_, $httpBackend){
			rootScope = $rootScope;
			YoutubeVideoInfo = _YoutubeVideoInfo_;
			YoutubePlayerSettings = _YoutubePlayerSettings_;
			httpBackend = $httpBackend;
			scope = $rootScope.$new();
			ctrl = $controller("MediaInfoCtrl as vm", {
			  $scope: scope 
			});
			mockVideoItem = window.mocks['media.info.mock'];
		}
	));

	it("should have an empty video object on scope", function() {
		expect(scope.vm.video).toBeDefined();
	});

	it("should update the video's title when video has changed", function() {
		httpBackend.whenGET(/.+videos.*/).respond(mockVideoItem);
		YoutubePlayerSettings.playVideoId(mockVideoItem.items[0]);
		scope.$apply();
		httpBackend.flush();
		expect(scope.vm.video.title).toEqual(mockVideoItem.items[0].snippet.title);
	});
});