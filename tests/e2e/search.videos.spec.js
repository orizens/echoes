// at the top of the test spec:
var fs = require('fs');
// abstract writing screen shot to a file
function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);

    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

describe('Echotu.be Search', function() {
  it('should search and display results', function() {
    browser.get('http://localhost:9001');
    // browser.debugger();
    element(by.model('vm.params.q')).sendKeys('ambient music');
    var searchResults = element.all(by.repeater('video in videos'));
    expect(searchResults.count()).toEqual(50);
  });

  it("should search and display playlists when 'playlists' is selected", function() {
  	var playlistFeed = element(by.id('feed-filter')).element(by.repeater('feed in vm.data.items').row(1));
  	playlistFeed.click();
  	// browser.pause();
  	var searchResults = element.all(by.repeater('video in vm.videos'));
    expect(searchResults.count()).toEqual(50);
  });

  it('should display 100 results after 1 infinite scroll', function() {
    	var lastSearchResult = browser.findElement(by.repeater('video in vm.videos').row(49));
    	var scrollIntoView = function () {
    	  arguments[0].scrollIntoView();
    	};
    	browser.executeScript(scrollIntoView, lastSearchResult).then(function () {
        var searchResults = element.all(by.repeater('video in vm.videos'));
        browser.sleep(3000).then(function () {
          expect(searchResults.count()).toEqual(100);
        })
      });
    	// browser.pause();
    	// // within a test:
    	// browser.takeScreenshot().then(function (png) {
    	//     writeScreenShot(png, '100-results.png');
    	// });
    	
    });
});