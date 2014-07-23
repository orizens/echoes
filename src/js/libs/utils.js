define([
	'jquery',
	'underscore'
], function($, _) {
   
	var Utils = {
		formatNumberWithComma: function(num) {
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},

		// convert 'd' seconds to a h:mm:ss display
		// credits to http://snipplr.com/view.php?codeview&id=20348
		// @param  {number} d number of seconds
		// @return {string}
		secondsToHms: function(d) {
			d = Number(d);
			var h = Math.floor(d / 3600);
			var m = Math.floor(d % 3600 / 60);
			var s = Math.floor(d % 3600 % 60);
			return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
		},

		// converts time duration string to seconds as number
		// @param {string} d - duration string - 6:05, 1:04:05
		// @return {number}
		hmsToSeconds: function(d) {
			d = d.split(':');
			var hasHour = d.length === 3;
			var h = hasHour ? parseInt(d[0], 10) * 60 * 60 : 0;
			var m = hasHour ? d[1] : d[0];
			var s = hasHour ? d[2] : d[1];
			return h + parseInt(m, 10) * 60 + parseInt(s, 10);
		},

		// excludes {array} - values of elements to exclude in calculation
		getPortviewSize: function(excludes) {
			var hasExcludes = excludes && excludes.length ? excludes : false;
				sidebar = hasExcludes && excludes.indexOf('sidebar') === -1 ? $('.sidebar').outerWidth() : 0,
				height = window.innerHeight - $('.navbar').outerHeight() - $('.youtube-player').outerHeight(),
				width = window.innerWidth - sidebar;
			return _.clone({ height: height, width: width });
		},

		hasHiddenScroll: function(){
			var agent = navigator.userAgent.match(/(Windows)/);
			return _.isUndefined(agent) || _.isNull(agent);
		},

		addFeatures: function() {
			var ios = navigator.userAgent.match(/(ipad)|(iphone)|(6_0)/gim);
			return ios;
		},

		isFullScreen: function () {
			var isFull = navigator.standalone || false;
			return isFull;
		}
	};
   
	_.mixin(Utils);

	return Utils;
});