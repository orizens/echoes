var Driver = require('selenium-webdriver');

module.exports = function(){
  this.Given(/^I visit Echoes Player$/,function(){
    this.driver.visit('http://localhost:9001');
  });

  this.When(/^I search for \"([^\"]*)\"$/, function(value){
    var search = new this.Widgets.MediaSearch();
    return this.driver.sleep(3000).then(function () {
      return search.searchFor(value);
    });
  });

  this.Then(/^I should see 50 results$/, function(expected){
    var results = new this.Widgets.SearchResults();
    return results.items().should.eventually.have.length(50);
  });
};
