define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/playlist-search.html'
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
				this.setState('loading');
				this.trigger('search:add', query);
			},

			'submit form': function (ev) {
				ev.preventDefault();
			}
		},

		initialize: function() {
			this.listenTo(Backbone, 'app:add-to-playlist', this.render);
			this.filter = "";
		},

		template: _.template(template),

		render: function(video) {
			video.query = this.filter;
			this.$el.html(this.template(video));
			setTimeout(_.bind(function(){
				this.$('input').get(0).focus();
			}, this), 500);
			return this;
		},

		setState: function (state) {
			this.$('.add-btn').button(state);
		},

		resetState: function () {
			this.setState('reset');
			this.$('input[type]').val("")
		}

	});

	return ViewerSearch;
});