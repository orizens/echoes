require([
	'jquery',
	'bootstrap',
	'views/player_app',
	'models/player_app',
	'routers/app_router'
], function( $, bootstrap, PlayerApp, PlayerModel, AppRouter ) {
	var playerModel = new PlayerModel();
	var playerView = new PlayerApp({ model: playerModel });
	var playerRouter = new AppRouter({ model: playerModel });
});