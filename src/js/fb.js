var Backbone = require('backbonejs');

var load = function(){
	Backbone.ajax({
		dataType: 'jsonp',
		url: 'http://connect.facebook.net/en_US/all.js'
	})
}

	// FB.getLoginStatus(function(response) {
	// 	console.log(response);
	// });
module.exports = function(url, callbackName) {
	load(url);
}