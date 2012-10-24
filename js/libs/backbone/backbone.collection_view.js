define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
   
    var CollectionView = Backbone.View.extend({

		// define a reference to a collection
		collection: null,
		
		// should be defined when extending this CollectionView
		view: null,

		initialize: function() {
			this.collection = new this.collection();
			this.collection.on('reset', this.render, this);
			this.views = [];
		},

		render: function() {
			this.renderCollection();
		},

		renderCollection: function() {
			this.resetViews();
			this.$el.empty();
			this.collection.each(function(item){
				var index = this.views.length;
				this.views.push(new this.view({ model: item }));
				this.views[index].on = this.on;
				this.$el.append( this.views[index].render().el );
			}, this);
			this.$el.delay(200).fadeIn(500);
		},

		resetViews: function() {
			_.each(this.views, function(view) {
				view.off();
				view.destroy();
			});
			this.views = [];
		},

		update: function(items) {
			this.collection.reset(items);
		}
	});

	Backbone.CollectionView = CollectionView;
    return CollectionView;
});