var Driver = require('selenium-webdriver');

module.exports = function () {
	this.Widgets = this.Widgets || {};
	this.Widgets.MediaSearch = this.Widget.extend({
		root: "#media-search",

		setSearchQuery: function (val) {
			return this.fill(val);
		},

		searchFor: function (value) {
			return this.resetInput().then(function(){
			  this.fill(value);
			  return this.sendKeys(Driver.Key.ENTER);
			}.bind(this)); 
		},

		resetInput: function () {
			return this.sendKeys('', Driver.Key.ENTER);
		}
	});
}