var _ = require('underscore');
var Backbone = require('backbonejs');

module.exports = Timber.module('View', {
	el: '#user-playlists-filter',

	events: {
		'keyup input': function(ev){
			this.trigger('change', ev.target.value);
		}
	}
});