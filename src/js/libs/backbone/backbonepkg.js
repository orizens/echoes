define([
	'backbonesrc',
	'beamer',
	'collectionView',
	'transition',
	'switcher',
	'safe',
	'timber',
	'utils'
], function(Backbone, Beamer, CView, Transition, Switcher, Safe) {
	// register beamer extensions
	_.each(arguments, function(extension){
		if (extension && extension.beam) {
			extension.beam();
		}
	});
	return window.Backbone; 
});