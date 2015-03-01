(function() {
  'use strict';

angular
  .module('mediaDeck')
  .service('YoutubeVideoInfo', YoutubeVideoInfo);

  function YoutubeVideoInfo ($http, YOUTUBE_API_KEY){
  	var url = 'https://www.googleapis.com/youtube/v3/videos';
  	var config = {
        params: {
          part: 'snippet,contentDetails',
          key: YOUTUBE_API_KEY,
          id: '',
          maxResults: 50
        }
      };

  	this.list = function(id){
  		this.setId(id);
  		return $http.get(url, config).then(function(res){
        return res.data.items;
      });
  	};

    this.setId = function(id){
      config.params.id = id;
    };

    this.toFriendlyDuration = function (time) {
      var t = time.split("PT")[1];
      var ts = '';
      if (t) {
        t = t.replace(/(H|M)/g, ":")
          .replace("S", "");
        ts = t.split(":");
        ts = ts.map(function(d){
          return d.length === 1 ? "0" + d : d;
        });
      } else {
        t = time.split("P")[1];
        t = t.replace("D", "");
        ts = [parseInt(t) * 24, ':00:00'];
      }
      return ts.join(":");
    };
    
  }

})();