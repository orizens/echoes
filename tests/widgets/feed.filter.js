var Driver = require('selenium-webdriver');

module.exports = function () {
	this.Widgets = this.Widgets || {};
	this.Widgets.FeedFilter = this.Widget.extend({

		root: "#feed-filter li:nth-child(2)",

		choosePlaylists: function () {
			return this.click();
		}
	});
}
