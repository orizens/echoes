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

		render: function() {
			this.renderCollection();
		},

		renderCollection: function() {
			this.resetViews();
			this.$el.empty();
			this.collection.each(function(item){
				var index = this.views.length;
				this.views.push(new this.view({ model: item }));
				this.delegateBroadcasts(this.views[index]);
				this.$el.append( this.views[index].render().el );
			}, this);
			this.$el.delay(200).fadeIn(500);
		},

		delegateBroadcasts: function(view) {
			_.each(this.broadcasts, function(callback, customEvent){
				view.on(customEvent, this[callback], this);
			}, this);
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

	var colViewExtend = CollectionView.extend;
	var colViewInitialize = function() {
		this.collection = new this.collection();
		this.collection.on('reset', this.render, this);
		this.views = [];
	};

	CollectionView.extend = function(config) {
		var init = config.initialize || function(){};
		var events = config.broadcasts;
		this.instance = [];

		config.initialize = function() {
			colViewInitialize.apply(this, arguments);

			// attach broadcasts
			if (events) {

				this.broadcasts = events;
				
			}

			// run the custom initialize passed with config
			init.apply(this, arguments);
		};

		return colViewExtend.call(CollectionView, config);
	};

	Backbone.CollectionView = CollectionView;
	return CollectionView;
});