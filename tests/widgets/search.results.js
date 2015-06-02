var Driver = require('selenium-webdriver');

module.exports = function () {
	this.Widgets = this.Widgets || {};
	var SearchResults = this.Widget.List.extend({
		root: "#search-results section > div > .youtube-items-container",
		itemSelector: '.youtube-item'
	});

	this.Widgets.SearchResults = SearchResults;
}