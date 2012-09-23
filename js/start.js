/**
 *	initialize scent player application
 */
$(function(){
	PlayerApp.Templates.load(null, function(){
		new PlayerApp.Views.App();
	});
});