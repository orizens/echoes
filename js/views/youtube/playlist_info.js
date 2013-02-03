define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {

	var PlaylistInfo = Backbone.View.extend({

		initialize: function() {
			this.listenTo(this.model.youtube().get('playlist'), 'change:items', this.render);
			this.listenTo(this.model, 'change:currentIndex', this.updateIndex);
		},

		render: function(model, items) {
			var playlistId = model.get('id');
			var options = this.model.get('mediaOptions');
			var currentPlayedIndex = options ? parseInt(options.index, 10) : 0;
			var titles = _.map(items, function(item, index){
				var html = '<li class="' + (index === currentPlayedIndex ? 'active' : '') + " track-" + index +
					'"><a class="ellipsis" href="#play/playlist/' + playlistId + '/' + index +
					'">' + (index +1) + 
					'. ' + item.video.title + '</a></li>';
				return html;
			});
			this.$el.html(titles.join(''));
		},

		updateIndex: function(model, index) {
			this.$el.find('.active').removeClass('active')
				.end().find('.track-' + index).addClass('active');
		}
	});

	return PlaylistInfo;
});