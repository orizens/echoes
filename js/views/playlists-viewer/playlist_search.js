define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/viewer-search.html'
], function($, _, Backbone, template) {

	var ViewerSearch = Backbone.View.extend({

		events: {
			'keyup input': function (ev) {
				this.filter = ev.target.value;
				this.trigger('search:change', this.filter);
				// this.filterPlaylist(this.filter);
			},
			'click button[data-action="create"]': function () {
				var query = this.$('input[type=search]').val();
				this.createPlaylist(query);
				this.trigger('search:add', query);
			},

			'submit form': function (ev) {
				ev.preventDefault();
			}
		},

		initialize: function() {
			this.listenTo(this.model, 'change:playlist-add', this.render);
			this.filter = "";
		},

		template: _.template(template),

		render: function(model, video) {
			video.query = this.filter;
			this.$el.html(this.template(video));
			return this;
		}

	});

	return ViewerSearch;
});