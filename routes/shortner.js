// var key='AIzaSyCgrK5ds9uCSRM-WBUFm8V8jPX66q8-Od0',
var API_KEY='AIzaSyC0B6Ziu-GOhd2f1JTAwydr6Fd7L7eKk4E',
    http = require('http');

var googleapis = require('googleapis');

/**
 * Search Youtube API
 * @param request
 * @param response
 */
exports.convert = function (req, res) {
    var url = req.param('url');

    googleapis
        .discover('urlshortener', 'v1')
        .execute(function(err, client){
            client.urlshortener.url
                .get({ shortUrl: 'http://goo.gl/DdUKX' })
                .execute(function(err, result) {
                    console.log('the short result', result);
                    res.render('google-short', result);
                });
        });

}


exports.search1 = function (request, response) {
    var query = request.param('query');
    console.log('Searching for ' + query);

    var options = {
        host: 'www.googleapis.com',
        path: '/youtube/v3/search?part=snippet&q=' + query + 'key=' + API_KEY + '&max-results=10',
        method: 'GET'
    };

    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk);
            response.write(chunk);
        });
        res.on('end', function(){
            response.end();
        })
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.end();
};