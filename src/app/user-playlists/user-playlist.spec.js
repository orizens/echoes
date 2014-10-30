describe('Unit: UserPlaylistsCtrl - ', function(){
  var scope, ctrl, url, urlMoreInfo, mockData, rootScope,$q;

  beforeEach(module("mediaDeck"));

  beforeEach(
    inject(
      function($controller, $rootScope, _$q_, Gapi) {
        $q = _$q_;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        ctrl = $controller("UserPlaylistsCtrl", {
          $scope: scope,
        });

        mockData = { items: [{id: {videoId: 'xyz32'}}] };
        url = "https://www.googleapis.com/youtube/v3/search" +
        "?key=AIzaSyB7fFNreY1UzX1la5arnnAi3ZOyvqOV6kk&maxResults=50&part=snippet,id";
        urlMoreInfo = "https://www.googleapis.com/youtube/v3/videos?id=xyz32&key=AIzaSyB7fFNreY1UzX1la5arnnAi3ZOyvqOV6kk&maxResults=50&part=snippet,contentDetails";
      }
    )
  );

  // it('should set videos after successful search', function() {
  //   httpBackend.whenGET(url).respond(mockData);
  //   httpBackend.whenGET(urlMoreInfo).respond({items: [mockVideoItem]});
  //   scope.searchYoutube();
  //   httpBackend.flush();

  //   expect(scope.videos).toBeDefined();
  //   expect(scope.videos.length).toBe(1);
  // });

  // it("set the feed type when changed in YoutubeSearch and perform search",  function(){
  //   httpBackend.whenGET(url).respond(mockData);
  //   spyOn(scope, 'searchYoutube').and.callFake(function(){
  //     return 'ok';
  //   });

  //   spyOn(YoutubeSearchSrv, 'setType').and.callFake(function(){
  //     return 'set';
  //   });

  //   rootScope.$broadcast('feed-type-changed', 'playlist');
  //   scope.$digest();
  //   expect(YoutubeSearchSrv.setType).toHaveBeenCalled();
  //   expect(scope.searchYoutube).toHaveBeenCalled();
  // })
});