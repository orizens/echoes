/**
 *	initialize scent player application
 */
$(function(){
	Echoes.Templates.load(null, function(){
		window.EchoesPlayer = new Echoes.Player();
		Backbone.history.start();
	});
});