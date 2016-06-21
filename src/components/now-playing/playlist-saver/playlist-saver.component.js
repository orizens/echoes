import './playlist-saver.less';
import template from './playlist-saver.tpl.html';

// Usage:
//	<playlist-saver></playlist-saver>
// Creates:
//
export let PlaylistSaverComponent = {
	selector: 'playlist-saver',
	directiveSelector: 'playlistSaver',
	templateUrl: template,
	controllerAs: 'playlistSaver',
	bindToController: true,
	restrict: 'E',
	replace: true,
	scope: {
		onSave: '&?',
		onCancel: '&?',
		tracks: '='
	},
	controller: class PlaylistSaverCtrl {
		/* @ngInject */
		constructor ($scope, PlaylistSaverSettings) {
			Object.assign(this, { $scope, PlaylistSaverSettings });
			this.playlist = PlaylistSaverSettings.playlist;
			this.inSaveMode = false;
		}

		save () {
			this.inSaveMode = true;
			this.PlaylistSaverSettings
				.save(this.tracks)
				.then(onSuccess.bind(this), onFail.bind(this));

			function onSuccess (playlistId) {
				this.onSave({ playlistId: playlistId });
				this.inSaveMode = false;
				this.$scope.$apply();
			}

			function onFail (response) {
				console.log('failed to save tracks to playlist', response);
			}
		}
	}
}