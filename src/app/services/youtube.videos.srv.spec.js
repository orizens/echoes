describe('AppCtrl', function(){
  var scope, ctrl, httpBackend, url, urlMoreInfo, mockData, rootScope, YoutubeSearchSrv,$q;
  var mockVideoItem = {
  "kind": "youtube#video",
  "etag": "\"PSjn-HSKiX6orvNhGZvglLI2lvk/Qf4dRNQQ9-vhVzYy0ijASSD0PA8\"",
  "id": "R9rzodJedLI",
  "snippet": {
    "publishedAt": "2014-08-24T06:32:34.000Z",
    "channelId": "UCmE0EnLBJDe2ksZh3oRCaTA",
    "title": "Freddie Mercury - Greatest Hits | Best Of Freddie Mercury [ Full Album ]",
    "description": "Freddie Mercury - Greatest Hits | Best Of Freddie MercuryFreddie \nBest Bamboo Flute : https://www.youtube.com/watch?v=Olsfm4NdlP0Mercury - Greatest Hits | Best Of Freddie MercuryFreddie Mercury - Greatest Hits | Best Of Freddie MercuryFreddie Mercury - Greatest Hits | Best Of Freddie MercuryFreddie Mercury - Greatest Hits | Best Of Freddie MercuryFreddie Mercury - Greatest Hits | Best Of Freddie MercuryFreddie \\",
    "thumbnails": {
      "default": {
        "url": "https://i.ytimg.com/vi/R9rzodJedLI/default.jpg",
        "width": 120,
        "height": 90
      },
      "medium": {
        "url": "https://i.ytimg.com/vi/R9rzodJedLI/mqdefault.jpg",
        "width": 320,
        "height": 180
      },
      "high": {
        "url": "https://i.ytimg.com/vi/R9rzodJedLI/hqdefault.jpg",
        "width": 480,
        "height": 360
      },
      "standard": {
        "url": "https://i.ytimg.com/vi/R9rzodJedLI/sddefault.jpg",
        "width": 640,
        "height": 480
      },
      "maxres": {
        "url": "https://i.ytimg.com/vi/R9rzodJedLI/maxresdefault.jpg",
        "width": 1280,
        "height": 720
      }
    },
    "channelTitle": "Greatest Hits Albums",
    "categoryId": "10",
    "liveBroadcastContent": "none"
  },
  "contentDetails": {
    "duration": "PT1H38M43S",
    "dimension": "2d",
    "definition": "hd",
    "caption": "false",
    "licensedContent": true
  }
};

  beforeEach(module("mediaDeck"));

  beforeEach(
    inject(
      function($controller, $rootScope, YoutubeSearch, preset, $httpBackend, _$q_) {
        $q = _$q_;
        rootScope = $rootScope;
        YoutubeSearchSrv = YoutubeSearch;
        httpBackend = $httpBackend;
        scope = $rootScope.$new();
        ctrl = $controller("AppCtrl", {
          $scope: scope, 
          YoutubeSearch: YoutubeSearch,
          preset: preset
        });

        mockData = { items: [{id: {videoId: 'xyz32'}}] };
        url = "https://www.googleapis.com/youtube/v3/search" +
        "?key=AIzaSyB7fFNreY1UzX1la5arnnAi3ZOyvqOV6kk&maxResults=50&part=snippet,id";
        urlMoreInfo = "https://www.googleapis.com/youtube/v3/videos?id=xyz32&key=AIzaSyB7fFNreY1UzX1la5arnnAi3ZOyvqOV6kk&maxResults=50&part=snippet,contentDetails";
      }
    )
  );

  it('should set videos after successful search', function() {
    httpBackend.whenGET(url).respond(mockData);
    httpBackend.whenGET(urlMoreInfo).respond({items: [mockVideoItem]});
    scope.searchYoutube();
    httpBackend.flush();

    expect(scope.videos).toBeDefined();
    expect(scope.videos.length).toBe(1);
  });

  it("set the feed type when changed in YoutubeSearch and perform search",  function(){
    httpBackend.whenGET(url).respond(mockData);
    spyOn(scope, 'searchYoutube').and.callFake(function(){
      return 'ok';
    });

    spyOn(YoutubeSearchSrv, 'setType').and.callFake(function(){
      return 'set';
    });

    rootScope.$broadcast('feed-type-changed', 'playlist');
    scope.$digest();
    expect(YoutubeSearchSrv.setType).toHaveBeenCalled();
    expect(scope.searchYoutube).toHaveBeenCalled();
  })
});