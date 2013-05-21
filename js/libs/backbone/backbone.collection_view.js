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

		transition: {
			duration: 200,
			css: 'transition-in'
		},

		hide: function() {
			this.$el.removeClass(this.transition.css);
		},

		show: function () {
			this.$el.addClass(this.transition.css);
		},

		render: function() {
			// transition out
			if (this.transition) {
				if (this.$el.hasClass(this.transition.css)) {
					this.hide();
					this._timer = setTimeout(_.bind(this.renderCollection, this), this.transition.duration);
				} else {
					this.renderCollection();
				}
			} else {
				this.renderCollection();
			}
			return this;
		},

		renderCollection: function() {
			this.resetViews();
			this.$el.empty();
			this.collection.each(function(item){
				var index = this.cv_views.length;
				this.cv_views.push(new this.view({ model: item }));
				this.delegateBroadcasts(this.cv_views[index]);
				this.$el.append( this.cv_views[index].render().el );
			}, this);
			// transition in
			if (this.transition) {
				clearTimeout(this._timer);
				this._timer = setTimeout(_.bind(this.show, this), this.transition.duration);
			}
		},

		delegateBroadcasts: function(view) {
			_.each(this.broadcasts, function(callback, customEvent){
				view.on(customEvent, this[callback], this);
			}, this);
		},

		resetViews: function() {
			_.invoke(this.cv_views, 'remove');
			this.cv_views = [];
		},

		update: function(items) {
			this.collection.reset(items);
		}
	});

	var colViewExtend = CollectionView.extend;
	var colViewInitialize = function() {
		this.collection = new this.collection();
		this.listenTo(this.collection, 'reset', this.render);
		this.cv_views = [];
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