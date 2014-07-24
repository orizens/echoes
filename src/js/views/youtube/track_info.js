var _ = require('underscore');
var Backbone = require('backbonejs');

var TrackInfoView = Backbone.View.extend({

	events: {
		'click .play-time': 'onPlayTimeClick'
	},

	initialize: function() {
		this.$title = this.$('.yt-media-title');
		this.$info = this.$('.track-info');
		this.listenTo(this.model, 'change:title', this.render);
		this.listenTo(this.model, 'change:id', this.renderLoading);
	},

	render: function(model, title) {
		var desc = model.get('description'),
			img = $('<img />').attr('src', model.get('thumbnail').hqDefault);
		// parse multiline tracks to single
		// add buttons for time stops to allow playing of single tracks
		// in full albums in one video
		desc = desc.replace(/([0-9]*[0-9]*:*[0-9]*[0-9]:[0-9][0-9])/gim, 
			"<button class='btn btn-mini play-time' data-time='$1'>$1</button>\r", "gim");
		this.$title.empty().append(img.clone()).append(title);
		desc = '<em>' + title + '</em>\n' + desc;
		this.$info.empty().append(desc).append(img);
	},

	renderLoading: function(){
		this.$title.html('Loading...');
		return this;	
	},

	onPlayTimeClick: function(ev){
		// convert time duration string to seconds as a number
		var $target = $(ev.target),
			time = $target.data('time'),
			seconds = _(time).hmsToSeconds();
		// clear last clicked button
		this.$info.find('.btn-info').removeClass('btn-info');
		$target.addClass('btn-info');
		this.trigger('seek', seconds);
	}
});

module.exports = TrackInfoView;