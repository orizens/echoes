define([
	'underscore',
	'backbone'
], function(_, Backbone) {
   
    var Updates = Backbone.Model.extend({

		url: '/updates/latest.json',

		defaults: {
			// format: yyyymmdd(-hhmm)
			// (hhmm) is optional
			version: '20140601',
			description: ''
		},

		// in minutes
		interval: function(){
			var minutesForInterval = 60 * 4,
				value = 60 * 1000 * minutesForInterval;

			return value;
		},

		initialize: function() {
			this.intervalId = setInterval(this.check.bind(this), this.interval());
		},

		check: function() {
			this.fetch();
		}
	});
   
    return Updates;
});