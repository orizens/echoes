describe('Echotu.be Search', function() {
  it('should search and display results', function() {
    browser.get('http://localhost:9001');

    element(by.model('vm.params.q')).sendKeys('ambient music');

    var searchResults = element.all(by.repeater('video in videos'));
    expect(searchResults.count()).toEqual(50);
  });
});