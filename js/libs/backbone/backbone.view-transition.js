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

	
	// defintion of Extension
	function Transitioner(view) {
		//  save reference to original 'render' method
		this._sourceRender = view.render || function() {};
	}

	Transitioner.prototype = {
		render: function() {
			// transition out
			if (this.transition) {
				if (this.$el.hasClass(this.transition.css)) {
					this._hide();
					this._timer = setTimeout(_.bind(this.handleTransition, this), this.transition.duration);
				} else {
					this.handleTransition();
				}
			} else {
				this._sourceRender();
			}
			return this;
		},

		handleTransition: function () {
			this._sourceRender();
			clearTimeout(this._timer);
			this._timer = setTimeout(_.bind(this._show, this), this.transition.duration);
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
			key: 'transition',
			extension: Transitioner,
			initialize: function () {
				// attach broadcasts
			}
		});
	};

	init();

	// if using AMD and xManager is loaded after the extension
	Backbone.on('xManager:ready', init);
}());