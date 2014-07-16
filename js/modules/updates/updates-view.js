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
			this.listenTo(this.model.updates, 'check:version-update', function(updates){
				var data = updates.toJSON();
				data.title = "New Update Is Available";
				data.description = "These are the changes and updates for the new release:<br>" + data.description;
				data.update = true;
				this.render(data);
			});
			this.listenTo(this.model.updates, 'manual:no-update', function(updates){
				var data = updates.toJSON();
				data.title = "Update Check Is Done";
				data.description = "no update for now.\nPlease check in later.";
				data.update = false;
				this.render(data);
			});
		},
		
		render: function(data){
			var html = _.template(updatesTpl, data);
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
