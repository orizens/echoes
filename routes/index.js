/*
 * GET home page.
 */

exports.index = function(req, res){
	// var fs = require('fs');
	// var ytdl = require('ytdl');

	// ytdl('https://www.youtube.com/watch?v=oF68P5N1RJM')
	  // .pipe(fs.createWriteStream('video.flv'));

	res.render('index', { title: 'Express' });
};