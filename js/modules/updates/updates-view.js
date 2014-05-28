define([
	'jquery',
	'underscore',
	'backbone',
	'text!./updates-message.html'
], function($, _, Backbone, updatesTpl) {

	var view = Backbone.View.extend({
		el: '#notification',
		events: {
			'click .btn-primary': function(ev){
				location.reload();
			},

			'click .dismiss': function(ev){
				this.model.updates.set({
					version: ''
				}, { silent: true });
			}
		},

		initialize: function() {
			this.listenTo(this.model.updates, 'change:version', this.render);
		},

		render: function(updatesModel){
			var html = _.template(updatesTpl, updatesModel.toJSON());
			this.$el.html(html);
			this.$el.modal('show');
			return this;
		}
		
	});

	return {
		create: function(model) {
			return new view({ model: model });
		}
	};
});
