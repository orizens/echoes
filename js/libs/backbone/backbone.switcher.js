/*
	usage:
	======
	var layout = Backbone.View.extend({
		switcher: {
			key: 'resource',
			views: {
				viewA: SomeViewA,
				viewB: SomeViewB
			}
		},
		
		initialize: function() {
			console.log('init...', this.options);
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

	// * check for requirejs?
	
	// save reference to Backbone.View's contructore to allow 
	// overiding 
	// var ViewExtend = Backbone.View.extend;

	// factory for creating extend replacement for Backbone Objects
	var createExtend = function(extendFn) {
		
		return function(config) {
			var init = config.initialize || function(){};
			config.initialize = function() {
				var key;
				// activate the switcher's configuration
				if (this.switcher) {
					this._bswitcher = Switcher(this);
				}
				init.apply(this, arguments);
				// TODO: make pre render configurable
				// pre render by default selected "key" view
				this.trigger('after:initialize');
			};
			return extendFn.call(this, config);
		};
	};

	Backbone.View.extend = createExtend(Backbone.View.extend);

	var Switcher = function (_view) {
		
		// parse options of "switcher" configuration
		var key = _view.switcher.key || null;
		var views = _view.switcher.views;
		var currentResource;
		var currentView;
		
		var init = function () {
			_parseOptions();
			_view.listenTo(_view.model, 'change:' + key, _handleResource);
			_view.listenToOnce(_view, 'after:initialize', _start);
		};

		var _start = function() {
			_handleResource(_view.model, _view.model.get(key));
		};

		var _parseOptions = function() {
			// set the target to append the views to
			if (_view.options && _view.options.target) {
				_view.$target = _view.$(_view.options.target);
			} else {
				_view.$target = _view.$el;
			}
		};

		var _handleResource = function(model, resource) {
			currentResource = resource;
			if (currentView) {
				currentView.stopListening();
				currentView.$el.fadeOut(300, _renderResource);
			} else {
				_renderResource();
			}
			// currentResource = resource;
			// render the view object
			// this._render();
		};

		var _renderResource = function() {
			// console.log('_renderResource');
			if (currentView) {
				currentView.remove();
			}
			// render the view object
			_render();
		};

		// TODO: apply transitions
		var _render = function () {
			// console.log('creating new view');
			currentView = new views[currentResource]({ model: _view.model });
			_view.$target.append(currentView.el);
			currentView.$el.fadeIn(300);
			// to allow transitions between views
			// this.tid = setTimeout(_.bind(function(){
			// 	this._currentView.showViews();
			// 	clearTimeout(this.tid);
			// }, this), 0);

			_view.currentView = currentView;
			_view.trigger("after:render");
		};
		init();

	};	

}());