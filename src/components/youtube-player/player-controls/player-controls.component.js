import template from './player-controls.html';

export let PlayerControlsComponent = {
	template,
	selector: 'player-controls',
	// add ng1 directive definition
	directiveSelector: 'playerControls',
	controllerAs: '$ctrl',
	scope: {
		'onShowPlayer': '&',
		'onFullscreen': '&',
		'onPlayPrevious': '&',
		'onPause': '&',
		'onPlay': '&',
		'onPlayNext': '&',
		'onAdd': '&',
		'playlist': '=',
		'playlistIndex': '='
	},
	bindToController: true,
	replace: true,
	restrict: 'E',
	controller: class PlayerControlsCtrl {
		/* @ngInject */
		constructor () {
			// Object.assign(this, ...arguments);
			this.States = { 
				ADD: 'add',
				PLAY: 'play',
				PAUSE: 'pause',
				PLAY_NEXT: 'play-next',
				PLAY_PREVIOUS: 'play-previous',
				FULL_SCREEN: 'full-screen',
				SHOW_PLAYER: 'show-player'
			};
		}
		
		handleOnAction (action) {
			switch (action) {
			case this.States.SHOW_PLAYER:
				return this.onShowPlayer();

			case this.States.FULL_SCREEN:
				return this.onFullscreen();

			case this.States.PLAY_PREVIOUS:
				return this.onPlayPrevious();

			case this.States.PAUSE:
				return this.onPause();

			case this.States.PLAY:
				return this.onPlay();

			case this.States.PLAY_NEXT:
				return this.onPlayNext();

			case this.States.ADD:
				return this.onAdd();

			default:
				return action;
			}
		}

		playlistHasTracks() {
			return this.playlistIndex > 0 && !this.playlistIsEmpty();
		}

		playlistIsEmpty () {
			return this.playlist.length === 0;
		}

		playlistHasOneTrack () {
			return this.playlist.length === 1;
		}
	}
};
