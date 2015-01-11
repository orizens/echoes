describe('Echotu.be Search', function() {
  it('should search and display results', function() {
    browser.get('http://localhost:9001');

    element(by.model('vm.params.q')).sendKeys('ambient music');
    // element(by.css('[value="add"]')).click();

    var searchResults = element.all(by.repeater('video in videos'));
    expect(searchResults.count()).toEqual(50);
    // expect(searchResults.get(2).getText()).toEqual('write a protractor test');
  });
});