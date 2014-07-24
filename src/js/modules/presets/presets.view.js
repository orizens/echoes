var _ = require('underscore');
var Backbone = require('backbonejs');
var ListView = require('../../views/ui/list.view.js');
var presetTpl = require('./preset.html');

var presets = {
	"1": {
		id: 1,
		value: '',
		label: 'All',
		active: 'active'
	},
	"2": {
		id: 2,
		value: 'full album',
		label: 'Albums',
		active: ''
	},
	"3": {
		id: 3,
		value: 'live',
		label: 'Live',
		active: ''
	}
};

var view = ListView.extend({
	el: '#search-presets',
	key: 'preset',
	map: presets,
	template: presetTpl,
	listens: {
		init: function() {
			this.listenTo(this.model, 'change:layout', function(model, layout){
				var hideLayouts = 'history';
				this.$el.toggleClass('hidden', hideLayouts.indexOf(layout) >= 0);
			});
			var active = this.model.youtube.get('preset');
			if (active) {
				this.resetActive();
				this.map[active.id].active = 'active';
			}
		},
		select: function(presetKey) {
			this.model.youtube.set({
				preset: presets[presetKey]
			});
		}
	}
});

view.presets = presets;

module.exports = view;