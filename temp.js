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
	var ViewInitialize = Backbone.View.prototype.constructor;
	var ViewExtend = Backbone.View.extend;

	_.extend(Backbone.View.prototype, {

		_init: function() {
			var key;
			// activate the switcher's configuration
			if (this.switcher) {
				key = this.switcher.key || "";
				if (this.switcher.options) {
					this.parseOptions();
				}
				this.listenTo(this.model, 'change:' + key, this.handleResource);
			}
			this._userInit.apply(this, arguments);
		},

		parseOptions: function() {
			var options = this.switcher.options;
			// set the target to append the views to
			if (options.target) {
				this.$target = this.$(options.target);
			} else {
				this.$target = this.$el;
			}
		},

		handleResource: function(model, resource) {
			if (this._currentView) {
				this._currentView.destroy();
			}
			this.currentResource = resource;
			// render the view object
			this._render();
		},

		// TODO: apply transitions
		_render: function () {
			this._currentView = new this.currentResource.view({ model: this.model });
			this.$target.append(this._currentView.render().el);
			
			// to allow transitions between views
			this.tid = setTimeout(_.bind(function(){
				this._currentView.showViews();
				clearTimeout(this.tid);
			}, this), 0);

			this.trigger("after:render");
		}
	});

	_.extend(Backbone.View, {

		extend: function (options) {
			// keep user's initialize
			options._userInit = options.initialize;
			// replace user's initialize with the plugin's init
			options.initialize = Backbone.View.prototype._init;
			return ViewExtend.call(this, options);
		}
	});
	

}());
var views = {
    'a': {
        view: 'TocView/TocView',
        model: ['course' ],
        collection: ['classesCollection', 'studyClassStates'],
        router: {
            routes: {
                'course/:courseId/toc/studyClass/:studyClassId': 'showTableOfContents'
            },
            handlers: {
                showTableOfContents: function (courseId, studyClassId) {//
                    console.log('course');
                }
            }
        }
    },

    'b': {
        view: 'TocItemView/TocItemView',
        model: ['course'],
        router: {
            routes: {
                'course/:courseId/studyClass/:studyClassId/item/:itemId': 'showTocItem'
            },
            handlers: {
                showTocItem: function (courseId, studyClassId, itemId) {
                }
            }
        }
    }
};
var layout = Backbone.View.extend({
	switcher: {
		key: 'resource'
	},
	initialize: function() {
		console.log('init...', this.options);
	}
});
var layoutModel = Backbone.Model.extend({
	defaults: {
		'resource': 'a'
	}
});

var layView = new layout({
	model: new layoutModel()
});