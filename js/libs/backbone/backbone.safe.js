/**
 * Safe - support for storing Backbone.Model to localstorage
 * 		  using the 'set' method of Model
 *
 * @requires Backbone.js, Underscore.js
 * @param {string} uniqueID - the name of the storage you'de like to use
 * @param {object} context  - the Backbone.Model instance reference
 * @param {object} options - (optional) configuration for setting up various features
 *
 * @author Oren Farhi, http://orizens.com
 */
(function(){

	var _ = this._;
	var Backbone = this.Backbone;
	
	// if Underscore or Backbone have not been loaded
	// exit to prevent js errors
	if (!_ || !Backbone || !JSON) {
		return;
	}

	Backbone.Safe = function(uniqueID, context, options) {

		// parsing options settings
		this.reload = options && _.isTrue(options.reload);

		this.uid = uniqueID;
		this.context = context;
		this.isCollection = !context.set && context.models && context.add;

		// mixins for collection and model
		var collection = {
			
			// events that Safe is listening in order to
			// trigger save to local storage
			events: 'add reset',

			emptyValue: '[]',

			reloadFromCache: function() {
				context.add(this.getData());
			},

			toJSON: function(model) {
				return model.collection.toJSON();
			}
		};

		var model = {

			events: 'change',

			emptyValue: '{}',

			reloadFromCache: function() {
				context.set(this.getData());
			},

			toJSON: function(model) {
				return model.toJSON()
			}
		};

		// attach relevant object to Safe prototype
		_.extend( this, this.isCollection ? collection : model );

		// if the uid doesn't exist, create it
		this.ensureUID();

		// These are the lines that are responsible for
		// loading the saved data from the local storage to the model
		// 
		// the data is loaded before the Safe binds to change events
		// storage exist ? -> save to model
		// if it's a collection - use add
		this.reloadFromCache();

		// listen to any change event and cache it
		context.on(this.events, this.store, this);
	};

	Backbone.Safe.prototype = {
		
		/**
		 * creates a local storage item with the provided
		 * UID if not exist
		 */
		ensureUID: function() {
			if (_.isNull(this.getData())){
				this.create();
			}
		},

		create: function() {
			this.storage().setItem(uniqueID, this.emptyValue);
		},

		store: function(model) {
			this.storage()
				.setItem(this.uid, JSON.stringify( this.toJSON( model )));
		},

		storage: function() {
			return localStorage;
		},

		/**
		 * returns json object of the local saved data
		 * @return {json}
		 */
		getData: function() {
			// JSON.parse can't be run with an empty string
			this._current = this.storage().getItem(this.uid);
			return this._current ? JSON.parse(this._current) : this._current;
		}
	};

	// factory method
	Backbone.Safe.create = function( uniqueID, context, options) {
		if (uniqueID && context) {
			context.safe = new Backbone.Safe(uniqueID, context, options);
		}
	}

})();