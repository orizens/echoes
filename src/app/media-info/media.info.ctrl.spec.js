describe("Media Info Controller", function() {
	var scope, ctrl, httpBackend, url, mockData, rootScope, YoutubeVideoInfo;
	var mockVideoItem = {};

	function playVideo () {
		httpBackend.whenGET(/.+videos.*/).respond(mockVideoItem);
		YoutubePlayerSettings.playVideoId(mockVideoItem.items[0]);
		scope.$apply();
		httpBackend.flush();
	}

	beforeEach(module("media.info"));

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

	it("should fetch additional data when a new video is played", function(done) {
		httpBackend.whenGET(/.+videos.*/).respond(mockVideoItem);
		var promise = YoutubeVideoInfo.list(mockVideoItem.items[0].id);
		promise.then(function(videoResource){
			expect(videoResource).toBeDefined();
			expect(videoResource[0]).toBeDefined();
			expect(videoResource[0].snippet).toBeDefined();
			done();
		});
		httpBackend.flush();
	});

	it("should update the video's title when video has changed", function() {
		playVideo();
		expect(scope.vm.video.title).toEqual(mockVideoItem.items[0].snippet.title);
	});

	it("should render a high qualty thumbnail next to the title", function() {
		playVideo();
		expect(scope.vm.video.thumb).toEqual(mockVideoItem.items[0].snippet.thumbnails.high.url);
	});

});