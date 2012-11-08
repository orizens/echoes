define([
	'underscore',
	'backbone',
	'utils'
], function(_, Backbone, Utils) {
   
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
				end = start + itemsPerPage;
			start = start > 0 ? start : 1;
			this.set('totalItems', Utils.formatNumberWithComma(this.get('totalItems')));
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