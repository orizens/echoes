define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone, durationTpl) {
	var view = Backbone.View.extend({
		
		events: {
			'click a': function(ev){
				ev.preventDefault();
				var $target = $(ev.target);
				var isDropdown = $target.hasClass('dropdown-toggle');
				if (!isDropdown){
					this.resetActive();
					$target.parent().addClass('active');
					var selectedValue = $target.data(this.key);
					this.trigger('select', selectedValue);
				}
			}
		},

		initialize: function(){
			var $target = this.$(this.target);
			this.$target = $target.length ? $target : this.$el;
			// listen to the listens events
			if (this.listens) {
				if (this.listens.init){
					this.listenTo(this, 'init', this.listens.init);
				}
				if (this.listens.select){
					this.listenTo(this, 'select', this.listens.select);
				}
			}
			this.trigger('init');
			this.render();
		},
		render: function(){
			var html = _.map(this.map, function(p){
				return _.template(this.template, p);
			}, this);
			this.$target.html(html.join(''));
		},

		resetActive: function(){
			this.$('.active').removeClass('active');
			_.each(this.map, function(p){
				p.active = '';
			});
		},

		setActive: function(active){
			if (active) {
				this.resetActive();
				this.map[active.id].active = 'active';
			}
		}
	});
	
	return view;
});