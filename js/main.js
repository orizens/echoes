require([
	'jquery',
	'bootstrap',
	'safe',
	'views/player_app',
	'models/player_app',
	'routers/app_router'
], function( $, bootstrap, safe, PlayerApp, PlayerModel, AppRouter ) {
	// var playerModel = new PlayerModel();
	window.playerModel = new PlayerModel();
	var playerView = new PlayerApp({ model: playerModel });
	var playerRouter = new AppRouter({ model: playerModel });
});