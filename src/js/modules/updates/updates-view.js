var _ = require('underscore');
var Backbone = require('backbonejs');
var updatesTpl = require('./updates-message.html');

var view = Backbone.View.extend({
	el: '#notification',
	events: {
		'click .btn-primary': function(ev){
			location.reload();
		},

		'click .dismiss': function(ev){
			if (this.model.updates.versionChanged()){
				this.model.updates.set({
					version: ''
				}, { silent: true });
			}
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
		this.$modalContent = this.$('.modal-content');
	},
	
	render: function(data){
		var html = updatesTpl(data);
		this.$modalContent.html(html);
		this.$el.modal('show');
		return this;
	}
	
});

module.exports = {
	create: function(model) {
		return new view({ model: model });
	}
};
