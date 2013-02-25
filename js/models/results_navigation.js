define([
	'underscore',
	'backbone'
], function(_, Backbone) {
   
    var ResultsNavigation = Backbone.Model.extend({
		defaults: {
			startIndex: 1
		},

		initialize: function() {
			this.on('change:items', this.setDisplayHelpers, this);
		},

		setDisplayHelpers: function() {
			var itemsPerPage = this.get('itemsPerPage'),
				start = this.get('startIndex') - 1,
				end = start + itemsPerPage,
				totalItems = this.get('totalItems');
			start = start > 0 ? start : 1;
			this.set('totalItems', _(totalItems).formatNumberWithComma());
			this.set({
				start: start,
				end: end
			});
		},

		getNextIndex: function() {
			return this.get('startIndex') + this.get('itemsPerPage');
		},

		getPrevIndex: function() {
			return this.get('startIndex') - this.get('itemsPerPage');
		}
	});
   
    return ResultsNavigation; 
});