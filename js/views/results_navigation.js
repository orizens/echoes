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
			this.navModel = new ResultsNavigationModel();
			this.navModel.on('change', this.render, this);
			this.model.youtube().on('new-media-response', this.navModel.set, this.navModel);
		},

		render: function() {
			this.$el.toggleClass('prev-disabled', this.model.youtube().get('startIndex') === 1);
			this.$el.html( this.template(this.navModel.toJSON()) );
			return this;
		},

		onNextClick: function(ev) {
			ev.preventDefault();
			this.model.youtube().set('startIndex', this.navModel.getNextIndex());
		},

		onPrevClick: function(ev) {
			ev.preventDefault();
			this.model.youtube().set('startIndex', this.navModel.getPrevIndex());
		}
	});
   
    return ResultsNavigationView; 
});