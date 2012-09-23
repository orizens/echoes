/**
 *	initialize scent player application
 */
$(function(){
	PlayerApp.Templates.load(null, function(){
		window.Echoes = new PlayerApp.Player();
		Backbone.history.start();
	});
});