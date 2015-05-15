var Driver = require('selenium-webdriver');

module.exports = function () {
	this.Widgets = this.Widgets || {};

	this.Widgets.SearchResults = this.Widget.List.extend({
		root: "#search-results section > div > ul"
	});
}