var GapiHandler = require('./gapi');
var url = require('url');

// Browser apps key
var API_KEY='AIzaSyCgrK5ds9uCSRM-WBUFm8V8jPX66q8-Od0';

var youtubeHandler = GapiHandler.create({
	key: API_KEY,
	template: 'index',
	discover: ['youtube', 'v3'],
	apis: 'youtube.videos.list',
	on: {
		render: function(result){
			var items = result.items;
			var snippet = items.length ? items[0].snippet : false;
			var data = {};
			data.items = items;
			data.current = snippet ? snippet.thumbnails.default.url : '';
			data.title = snippet ? snippet.title : '';
			return data;
		}
	}
});

exports.index = function(req, res){
	// by using this url:
	// http://localhost:5000/?play=vJzTiwP3KK8#play/video/vJzTiwP3KK8
	// 
	// client will auto play the video and server will fetch data
	// and use it in the views html
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var videoId = req.param('play');
    youtubeHandler.set('id', videoId);
    youtubeHandler.request(res);
};