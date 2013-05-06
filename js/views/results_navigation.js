define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/results_navigation.html'
], function($, _, Backbone, ResultsNavigationTemplate) {
   
    var ResultsNavigationView = Backbone.View.extend({
		el: '#results-navigator',

		events: {
			'click .next': 'onNextClick',
			'click .prev': 'onPrevClick'
		},

		initialize: function() {
			this.template = _.template(ResultsNavigationTemplate);
			this.listenTo(this.model.youtube(), 'change:data', this.render);
		},

		render: function(model) {
			this.$el.toggleClass('prev-disabled', model.get('startIndex') === 1);
			model.setDisplayHelpers();
			this.$el.html( this.template(model.toJSON()) );
			return this;
		},

		onNextClick: function(ev) {
			ev.preventDefault();
			this.model.youtube().nextIndex();
		},

		onPrevClick: function(ev) {
			ev.preventDefault();
			this.model.youtube().prevIndex();
		}
	});
   
    return ResultsNavigationView; 
});