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
define(['jquery', 'underscore', 'backbonesrc'], function($, _, B){

	// check for Backbone
	// check for Underscore
	var _ = this._;
	var Backbone = this.Backbone;

	// if Underscore or Backbone have not been loaded
	// exit to prevent js errors
	if (!_ || !Backbone || !JSON) {
		throw new Error("Some modules are not loaded");
		return;
	}

	function Switcher(view) {
		this.sw_keys = view.switcher.key.split(' ');
		this.sw_views = view.switcher.views;
		this.currentView = null;
		this.sw_currentResource = null;
		_.extend(this, view);
		this._init();
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
			this.trigger("after:render");
			this.$target.addClass(this.switcher.transition.cssIn);
		}
	}

	var init = function() {
		Backbone.trigger('extend:View', {
			key: 'switcher',
			extension: Switcher,
			initialize: function () {
				this.trigger('after:initialize');
			}
		});
	};

	return {
		beam: init
	}
})