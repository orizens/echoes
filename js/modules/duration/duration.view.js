define([
	'jquery',
	'underscore',
	'backbone',
	'views/ui/list.view',
	'text!modules/duration/duration.html'
], function($, _, Backbone, ListView, durationTpl) {
	
	var durations = {
		"0": {
			id: 1,
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
				var active = this.model.youtube.get('duration');
				if (active) {
					this.resetActive();
					this.map[active.id].active = 'active';
				}
			},
			select: function(duration) {
				if (duration){
					this.model.youtube.set({
						duration: durations[duration]
					});
					this.model.youtube.fetch();
				}
			}
		}
	})

	view.durations = durations;

	return view;
});