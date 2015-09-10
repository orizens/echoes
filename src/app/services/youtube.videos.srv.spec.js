describe('Youtube Videos Service :: ', function(){
  var scope, ctrl, httpBackend, url, urlMoreInfo, mockData, rootScope, YoutubeSearchSrv,$q;
  var mockVideoItem = {};

  beforeEach(module("echoes"));

  beforeEach(
    inject(
      function($controller, $rootScope, YoutubeSearch, preset, $httpBackend, _$q_) {
        $q = _$q_;
        rootScope = $rootScope;
        YoutubeSearchSrv = YoutubeSearch;
        httpBackend = $httpBackend;
        scope = $rootScope.$new();
        ctrl = $controller("FeedCtrl as vm", {
          $scope: scope, 
          YoutubeSearch: YoutubeSearch,
          preset: preset
        });
        mockVideoItem = window.mocks['video.item.mock'];
        mockData = { items: [{id: {videoId: 'xyz32'}}] };
        url = "https://www.googleapis.com/youtube/v3/search" +
        "?key=AIzaSyB7fFNreY1UzX1la5arnnAi3ZOyvqOV6kk&maxResults=50&part=snippet,id";
        urlMoreInfo = "https://www.googleapis.com/youtube/v3/videos?id=xyz32&key=AIzaSyB7fFNreY1UzX1la5arnnAi3ZOyvqOV6kk&maxResults=50&part=snippet,contentDetails";
      }
    )
  );

  // xit('should set videos after successful search', function() {
  // xit('should set feed type after selecting a feed', function() {
  //   httpBackend.whenGET(url).respond(mockData);
  //   httpBackend.whenGET(urlMoreInfo).respond({items: [mockVideoItem]});
    // scope.searchYoutube();
    // httpBackend.flush();

    // expect(scope.videos).toBeDefined();
    // expect(scope.videos.length).toBe(1);
  // });

  it("set the feed type when clicked on playlist",  function(){
    httpBackend.whenGET(url).respond(mockData);
    spyOn(YoutubeSearchSrv, 'search').and.returnValue('done');

    spyOn(YoutubeSearchSrv, 'setType').and.callFake(function(){
      return 'playlist';
    });
    scope.vm.setFeed(scope.vm.data.items[1]);
    scope.$digest();
    expect(YoutubeSearchSrv.setType).toHaveBeenCalled();
    expect(YoutubeSearchSrv.setType.calls.count()).toEqual(1);
    expect(scope.vm.active).toBe(scope.vm.data.items[1]);
  });
});