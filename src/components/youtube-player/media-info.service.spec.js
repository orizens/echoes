xdescribe("Media Info Controller", function() {
  let scope, ctrl, httpBackend, url, mockData, YoutubeVideoInfo, YoutubePlayerSettings, YoutubePlayerCreator, MediaInfoService;
  let mockVideoItem = {};

  function playVideo () {
    httpBackend.whenGET(/.+videos.*/).respond(mockVideoItem);
    YoutubePlayerSettings.playVideoId(mockVideoItem.items[0]);
    scope.$apply();
    httpBackend.flush();
  }

  beforeEach(module("media.info"));

  beforeEach(inject(
    function($controller, $rootScope, $injector, $httpBackend){
      var ytPlayerSpy = jasmine.createSpyObj('ytPlayerSpy', ['loadVideoById', 'playVideo', 'pauseVideo']);
      YoutubePlayerSettings = $injector.get('YoutubePlayerSettings');
      YoutubeVideoInfo = $injector.get('YoutubeVideoInfo');
      YoutubePlayerCreator = $injector.get('YoutubePlayerCreator');
      MediaInfoService = $injector.get('MediaInfoService');
      
      httpBackend = $httpBackend;

      spyOn(YoutubePlayerCreator, 'createPlayer').and.returnValue(ytPlayerSpy);
      scope = $rootScope.$new();
      ctrl = $controller("MediaInfoCtrl as vm", {
        $scope: scope 
      });
      YoutubePlayerSettings.createPlayer();
      mockVideoItem = window.mocks['media.info.mock'];
    }
  ));

  it("should have an empty video object on scope", () => {
    expect(scope.vm.videoInfo).toBeDefined();
  });

  it("should fetch additional data when a new video is played", (done) => {
    httpBackend.whenGET(/.+videos.*/).respond(mockVideoItem);
    let promise = YoutubeVideoInfo.list(mockVideoItem.items[0].id);
    promise.then(function(videoResource){
      expect(videoResource).toBeDefined();
      expect(videoResource[0]).toBeDefined();
      expect(videoResource[0].snippet).toBeDefined();
      done();
    });
    httpBackend.flush();
  });

  it("should update the video's title when video has changed", () => {
    playVideo();
    expect(scope.vm.videoInfo.title).toEqual(mockVideoItem.items[0].snippet.title);
  });

  it("should render a high qualty thumbnail next to the title", () => {
    playVideo();
    expect(scope.vm.videoInfo.thumb).toEqual(mockVideoItem.items[0].snippet.thumbnails.high.url);
  });

});