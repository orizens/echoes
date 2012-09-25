define([
	'underscore'
], function(_) {
   
    var Utils = {
    	formatNumberWithComma: function(num) {
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
    };
   
   	/**
   	 * Safe - support for storing Backbone.Model to localstorage
   	 * @param {string} uniqueID - the name of the storage you'de like to use
   	 * @param {object} context  - the Backbone.Model instance reference
   	 */
   	function Safe(uniqueID, context) {
		var events = 'change';
		this.uid = uniqueID;
		this.context = context;
		this.isCollection = !context.set && context.models && context.add;

		//- if the uid doesn't exist, create it
		if (_.isNull(this.getData())) {
			this.storage().setItem(uniqueID, this.isCollection ? '[]' : '');
		}

		//- storage exist -> save to model
		//- if it's a collection - use add
		if (this.isCollection) {
			context.add(this.getData());
			events = 'add';
		} else {
			context.set(this.getData());
		}

		//- listen to any change event and cache it
		context.on(events, this.store, this);
	};

	Safe.prototype = {
		store: function(model) {
			this.storage()
				.setItem(this.uid, JSON.stringify(
					this.isCollection ? 
					model.collection.toJSON() :
					model.toJSON()
				));
		},

		storage: function() {
			return localStorage;
		},

		/**
		 * returns json object of the local saved data
		 * @return {json}
		 */
		getData: function() {
			//- JSON.parse can't be run with an empty string
			this._current = this.storage().getItem(this.uid);
			return this._current ? JSON.parse(this._current) : this._current;
		}
	};

	Utils.Safe = Safe;
    return Utils; 
});