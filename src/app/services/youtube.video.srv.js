angular.module('mediaDeck')
.service('YoutubeVideo', function($http, YOUTUBE_API_KEY){
	var url = 'https://www.googleapis.com/youtube/v3/videos';
	var config = {
      params: {
        part: 'snippet,contentDetails',
        key: YOUTUBE_API_KEY,
        id: '',
        maxResults: 50
      }
    };

	this.fetch = function(id){
		this.setId(id);
		return $http.get(url, config).then(function(res){
      return res.data.items;
    });
	};

  this.setId = function(id){
    config.params.id = id;
  };

  this.toFriendlyDuration = function (time) {
    var t = time.split("PT")[1]
      .replace(/(H|M)/g, ":")
      .replace("S", "");
    var ts = t.split(":");
    ts = ts.map(function(d){
      return d.length === 1 ? "0" + d : d;
    });
    return ts.join(":");
  };
  
});