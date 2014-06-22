define([
	'underscore',
	'backbone'
], function(_, Backbone) {
   
    var Updates = Backbone.Model.extend({

		url: '/updates/latest.json',

		defaults: {
			// format: yyyymmdd(-hhmm)
			// (hhmm) is optional
			version: '201406221530',
			description: '',
			manualCheck: false
		},

		time: {
			minute: 1000 * 60,
			minutesForInterval: 60 * 2
		},

		// in minutes
		interval: function(){
			var value = this.time.minute * this.time.minutesForInterval;
			return value;
		},

		initialize: function() {
			this.intervalId = setInterval(function(){
				this.set('manualCheck', false);
				this.fetch();
			}.bind(this), this.interval());
		},

		// for external use
		check: function() {
			this.set('manualCheck', true);
			this.fetch();
		}
	});
   
    return Updates;
});