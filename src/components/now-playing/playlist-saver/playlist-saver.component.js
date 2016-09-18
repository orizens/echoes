import './playlist-saver.less';
import template from './playlist-saver.tpl.html';

export let PlaylistSaverComponent = {
  selector: 'playlistSaver',
  templateUrl: template,
  bindings: {
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
};