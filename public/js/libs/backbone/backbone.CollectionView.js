/*
	usage:
	======
	var layout = Backbone.View.extend({
		view: {
			type: MyNiceItemView,
			
			// optional - a reference to a collection object to create an instance from
			collection: MusicLibrary,

			// custom events of the collection views that this view listens to
			// the config follows Backbone.View events configuration
			events: {
				'play-media': 'onMediaPlayed'
			}

		},
		
		initialize: function() {
			
		}
	});
*/
(function(){

	// check for Backbone
	// check for Underscore
	var _ = this._;
	var Backbone = this.Backbone;

	// if Underscore or Backbone have not been loaded
	// exit to prevent js errors
	if (!_ || !Backbone || !JSON) {
		return;
	}

	
	// defintion of Extension
	function CollectionView(view) {
		this.cv_views = [];
		// if view already has a collection
		// don't create a new one
		this.$target = view.view.target ? view.$(view.view.target) : view.$el;
		
		if (view.collection) return;
		
		//  save reference to original 'render' method
		this._sourceRender = view.render || function() {};

		// initialize collection if given
		if (view.view && view.view.collection) {
			this.collection = new view.view.collection();
		} else {
			this.collection = new Backbone.Collection();
		}

		// bind to events of views if given
		
		// view.listenTo(this.collection, 'reset update', this.render);
	}

	CollectionView.prototype = {
		render: function() {
			// this.trigger('before:render');
			this.resetViews();
			this.cv_views = this.collection.map(this.createItem, this);
			this.$target.append( _.map(this.cv_views, this.prepareItem, this));
			this.trigger('view-after:render');
			// this._sourceRender();
		},

		createItem: function(model) {
			var view = this.view.type;
			return new view({ model: model });
			// this.$el.append( _.last(this.cv_views).render().el );
		},

		prepareItem: function (view, index) {
			// this._currentViewIndex = index;
			_.each(this.view.events, function (method, _event) {
				this.listenTo(view, _event, this[method]);
			}, this);
			return view.render().el;
		}, 

		// deprecated
		_listenToLastestView: function (method, _event) {
			if (this.cv_views[this._currentViewIndex]) {
				this.listenTo(this.cv_views[this._currentViewIndex], _event, this[method]);
			}
		},

		// in 'add' use?
		renderItem: function(model) {
			var index = this.cv_views.length,
				view = this.view.type;
			this.cv_views.push(this.createItem(model));
			this.$target.append(this.prepareItem(_.last(this.cv_views), index));
		},

		addItems: function (items) {
			// create & prepare views
			var views = _.map(items, this.createItem, this);
			this.$target.append(_.map(views, this.prepareItem, this));
			return this;
		},

		resetViews: function() {
			_.each(this.cv_views, function (view) {
				this.stopListening(view);
			}, this)
			_.invoke(this.cv_views, 'remove');
			this.cv_views.length = 0;
		},

		_hide: function() {
			this.$el.removeClass(this.transition.css);
		},

		_show: function () {
			this.$el.addClass(this.transition.css);
		}
	};

	var init = function() {
		Backbone.trigger('extend:View', {
			key: 'view',
			extension: CollectionView,
			initialize: function () {
				this.listenTo(this.collection, 'reset destroy remove sort', function(){
					this.render();
				});
				this.listenTo(this.collection, 'add', function(model){
					this.renderItem(model);
				});
			}
		});
	};

	init();

	// if using AMD and xManager is loaded after the extension
	Backbone.on('xManager:ready', init);
}());