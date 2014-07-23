/*
	Backbone Extension Manager
	==========================
	BEM allows to augment backbone objects easily
	and plug into the constructor process.

	Extensions are meant to be configurable defintions that can be added
	to any Backbone object. i.e:
	
	var Person = Backbone.Model.extend({
		
		// transition manager
		transition: {
			duration: 350,
			css: 'transition-in'
		},

		safe: 'my-local-storgae-safe-key'

	})

	Usage
	=====
	An extension may register using Backbone's Event system.
	This code will extend Backbone.View:
	
	Backbone.trigger('extend:view', {
		
		// This is the new member that the extension will 
		// add to Backbone.View
		key: 'safe',

		// extension initialize method
		// this method should parse the member of the extension
		// the scope of "this" is the actual Backbone.Views instance
		// i.e: 'safe'
		initialize: function(config) {
			.... 
		},
		extension: MyExtension
	});

	function MyExtension(backboneObjectInstance) {
	
	}
	
	// these methods will be added to the Backbone Object Prototype
	// So, each run in the scope of the instance
	MyExtension.prototype.replace = function() {}
	MyExtension.prototype.add = function() {}
*/
var _ = require('underscore');
var Backbone = require('backbone');

var keys = {
	View: {},
	Model: {},
	Collection: {},
	Router: {}
};

// save reference to Backbone.Object's contructor to allow 
// factory for creating extend replacement for Backbone Objects
// backboneType: (string) one of 'keys' members
var createExtend = function(extendFn, backboneType) {
	
	return function(config) {
		// save a reference to an 'inti' 
		var init = config.initialize || this.prototype.initialize || function(){};
		config.initialize = function() {
			// activate any key that is registered for this
			// type
			_.each(keys[backboneType], function(config, extKey) {
				if (this[extKey]) {
					_.extend(this, new config.extension(this));
					config.initialize && config.initialize.apply(this);
				}
			}, this);

			init.apply(this, arguments);
			// pre render by default selected "key" view
			// this.trigger('after:initialize');
		};
		return extendFn.call(this, config);
	};
};

var isRegistered = {
	View: false,
	Model: false,
	Collection: false,
	Router: false
};

// This extends a Backbone.'type' object
// and provide a custom 'extend' function
var Extension = function(type) {
	this._type = type;
	Backbone.on('extend:' + type, _.bind(this.register, this));
};

Extension.prototype = {
	register: function (config) {
		this.config = config;
		this.ensureExtend();
		if (this.validate()) {
			keys[this._type][config.key] = config;
		}
	},

	ensureExtend: function () {
		if (!isRegistered[this._type]) {
			isRegistered[this._type] = true;
			Backbone[this._type].extend = createExtend(Backbone[this._type].extend, this._type);
		}
	},

	validate: function () {
		// failsafe if extension member exists
		if (keys[this._type][this.config.key]) {
			console.log(
				'An extension with the same key:', 
				extConfig.key, 
				'is already exsiting or has already been loaded.');
		}
		return !keys[this._type][this.config.key];
	}
};

// initialize manager
var backboneObjects = ['View', 'Model', 'Collection', 'Router'];
var register = function(backboneObject) {
	new Extension(backboneObject);
};
_.each(backboneObjects, register);
// Extenstions should registered through
// an event 'extend:View'
module.exports = Backbone;