var Backbone = require('backbonejs');
var YoutubeItemView = require('../../views/youtube_item.js');
   
var historyView = YoutubeItemView.extend({
	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
	}
});

module.exports = historyView;