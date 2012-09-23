define([
	'jquery',
	'underscore',
	'backbone',
	'models/results_navigation',
	'text!templates/results_navigation.html'
], function($, _, Backbone, ResultsNavigationModel, ResultsNavigationTemplate) {
   
    var ResultsNavigationView = Backbone.View.extend({
		el: '#results-navigator',

		events: {
			'click .next': 'onNextClick',
			'click .prev': 'onPrevClick'
		},

		initialize: function() {
			this.template = _.template(ResultsNavigationTemplate);
			this.model = new ResultsNavigationModel();
			this.model.on('change', this.render, this);
		},

		render: function() {
			this.$el.html( this.template(this.model.toJSON()) );
			return this;
		},

		onNextClick: function(ev) {
			ev.preventDefault();
			this.trigger('navigate-index-change', this.model.getNextIndex());
		},

		onPrevClick: function(ev) {
			ev.preventDefault();
			this.trigger('navigate-index-change', this.model.getPrevIndex());
		},

		update: function(results) {
			this.model.set(results);
			this.$el.toggleClass('prev-disabled', this.model.get('startIndex') === 1);
		}
	});
   
    return ResultsNavigationView; 
});