var GapiHandler = require('./gapi');

// Browser apps key
var API_KEY='AIzaSyCgrK5ds9uCSRM-WBUFm8V8jPX66q8-Od0';

var youtubeHandler = GapiHandler.create({
    key: API_KEY,
    template: 'youtube',
    discover: ['youtube', 'v3'],
    apis: 'youtube.search.list'
});

/**
 * Search Youtube API
 * @param request
 * @param response
 */
exports.search = function (req, res) {
    var query = req.param('query');
    youtubeHandler.set('q', query);
    youtubeHandler.request(res);
}