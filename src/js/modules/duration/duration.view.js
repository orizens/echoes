var _ = require('underscore');
var Backbone = require('backbonejs');
var ListView = require('../../views/ui/list.view.js');
var durationTpl = require('./duration.html');

var durations = {
	"0": {
		id: 0,
		value: '',
		label: 'Any',
		active: 'active'
	},
	"1": {
		id: 1,
		value: 'short',
		label: 'Short (less then 4 minutes)',
		active: ''
	},
	"2": {
		id: 2,
		value: 'medium',
		label: 'Medium (4-20 minutes)',
		active: ''
	},
	"3": {
		id: 3,
		value: 'long',
		label: 'Long (longer than 20 minutes)',
		active: ''
	}
};

var view = ListView.extend({
	el: '#duration-picker',
	target: '.dropdown-menu',
	key: 'duration',
	map: durations,
	template: durationTpl,
	listens: {
		init: function() {
			this.listenTo(this.model, 'change:layout', function(model, layout){
				var hideLayouts = 'history';
				this.$el.toggleClass('hidden', hideLayouts.indexOf(layout) >= 0);
			});
			var active = this.model.youtube.get('duration');
			this.$el.toggleClass('pick-active', active.id > 0);
			this.setActive(active);
		},
		select: function(duration) {
			if (_.isNumber(duration)){
				this.model.youtube.set({
					duration: durations[duration]
				});
				this.setActive(durations[duration]);
				this.render();
				this.$el.toggleClass('pick-active', duration > 0);
				this.model.youtube.fetch();
			}
		}
	}
})

view.durations = durations;

module.exports = view;