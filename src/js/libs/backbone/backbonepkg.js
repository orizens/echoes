var _ = require('underscore');

var extensions = [
	require('./backbone.beamer.js'), 
	require('./backbone.CollectionView.js'), 
	require('./backbone.view-transition.js'), 
	require('./backbone.switcher.js'), 
	require('./backbone.safe.js'), 
	require('./backbone.Timber.js'), 
	require('../utils.js')
];
module.exports = function(Backbone){
	// register beamer extensions
	_.each(extensions, function(extension){
		if (extension && extension.beam) {
			extension.beam();
		}
	});
};