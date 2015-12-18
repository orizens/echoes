    /* @ngInject */
export default function PlaylistInfo($q, $http, YOUTUBE_API_KEY, YoutubeVideoInfo) {
    var url = 'https://www.googleapis.com/youtube/v3/playlistItems';
    var config = {
      params: {
        part: 'snippet,contentDetails',
        key: YOUTUBE_API_KEY,
        playlistId: '',
        maxResults: 50
      }
    };
    var service = {
        list: list
    };
    return service;

    ////////////////

    function list(playlistId) {
        var defer = $q.defer();
    	config.params.playlistId = playlistId;
        playlist(url, config).then(function (items) {
            defer.resolve(items);
        });

        return defer.promise;
    }

    function playlist(url, config) {
        var items = [];
        var token;
        var _defer = $q.defer();
        
        getItems();

        return _defer.promise;

        function getItems () {
            return $http.get(url, config)
                .then(function (response) {
                    token = response.data.nextPageToken;
                    return response;
                })
                .then(YoutubeVideoInfo.enrichItems)
                .then(function (videos) {
                    Array.prototype.push.apply(items, videos);
                    if (token) {
                        config.params.pageToken = token;
                        return getItems();
                    }
                    _defer.resolve(items);
                });
        }
    }
}