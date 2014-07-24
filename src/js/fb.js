var Backbone = require('backbonejs');

var load = function(url, eventName){
	return Backbone.ajax({
		dataType: 'jsonp',
		url: url,
		complete: function (res, status) {
			Backbone.trigger(eventName + ':loaded');
		}
	})
}

	// FB.getLoginStatus(function(response) {
	// 	console.log(response);
	// });
module.exports = function(url, eventName) {
	return load(url, eventName);
}