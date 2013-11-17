/*
	usage:
	======
	var layout = Backbone.View.extend({
		switcher: {
			key: 'resource',
			// 'key' may be a reference to multiple attributes values
			// and may be defined as such:
			// key: 'resource filter'

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
			// save a reference to an 'inti' 
			var init = config.initialize || function(){};
			config.initialize = function() {
				// activate the switcher's configuration
				if (this.switcher) {
					// this._bswitcher = new Switcher(this);
					_.extend(this, new Switcher(this));
					this._init();
				}
				init.apply(this, arguments);
				// TODO: make pre render configurable
				// per render by default selected "key" view
				this.trigger('after:initialize');
			};
			return extendFn.call(this, config);
		};
	};

	Backbone.View.extend = createExtend(Backbone.View.extend);

	function Switcher(view) {
		this.sw_keys = view.switcher.key.split(' ');
		this.sw_views = view.switcher.views;
		this.currentView = null;
		this.sw_currentResource = null;
	}

	Switcher.prototype = {
		_init: function () {
			this._parseOptions();
			_.each(this.sw_keys, this._addListener, this);
			this.listenToOnce(this, 'after:initialize', this._start);
		},

		_addListener: function (key) {
			this.listenTo(this.model, 'change:' + key, this._handleResource);
		},

		_start: function() {
			this._handleResource(this.model, this.model.get(this.sw_keys));
		},

		_parseOptions: function() {
			// set the target to append the views to
			if (this.switcher.options && this.switcher.options.target) {
				this.$target = this.$(this.switcher.options.target);
			} else {
				this.$target = this.$el;
			}
		},

		_handleResource: function(model, resource) {
			this.sw_currentResource = resource;
			if (this.currentView) {
				this.currentView.stopListening();
			}
			this._renderResource();
		},

		_renderResource: function() {
			// console.log('_renderResource');
			if (this.currentView) {
				this.currentView.$el.removeClass(this.switcher.transition.cssIn);
				this.currentView.remove();
			}
			// render the view object
			this._render();
		},

		// TODO: apply transitions
		_render: function () {
			// console.log('creating new view');
			this.currentView = new this.sw_views[this.sw_currentResource]({ model: this.model });
			this.$target.append(this.currentView.el);
			this.currentView = this.currentView;
			this.trigger("after:render");
			this.$target.addClass(this.switcher.transition.cssIn);
		}
	}

}());