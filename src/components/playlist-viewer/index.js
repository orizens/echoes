import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AppCore from '../../core';
import playlistEditor from '../playlist-editor';
import { PlaylistViewerComponent } from './playlist-viewer.component';

export * from './playlist-viewer.component';

export default angular.module('playlist-viewer', [
  AppCore,
  uiRouter,
  playlistEditor
])
  .config(config)
  .component(PlaylistViewerComponent.selector, PlaylistViewerComponent)
.name;
/* @ngInject */
function config ($stateProvider) {
  $stateProvider
    .state('playlist', {
      url: '/playlist/:playlistId/:backState',
      template: '<playlist-viewer videos="vm.videos" playlist="vm.playlist" back="{{:: vm.backState}}"></playlist-viewer>',
      controller: function (videos, playlist, $stateParams, toastr) {
        this.backState = $stateParams.backState;
        this.videos = videos;
        this.playlist = playlist[0];
        toastr.clear(playlist._toast);
      },
      controllerAs: 'vm',
      resolve: {
        videos: getPlaylistVideos,
        playlist: getPlaylistInfo
      }
    });
}

/* ngInject */
function getPlaylistVideos ($stateParams, YoutubeVideoInfo, PlaylistInfo, YoutubeUser) {
  const playlistId = $stateParams.playlistId;
  return YoutubeUser.isUserSignedIn() ?
    YoutubeVideoInfo.getPlaylist(playlistId) :
    PlaylistInfo.list(playlistId);
}

/* @ngInject */
function getPlaylistInfo ($stateParams, YoutubePlaylistInfo, toastr) {
  let _toast = toastr.info('', '<i class="fa fa-refresh fa-spin fa-3x"></i> Loading Playlist...', {
    iconClass: 'toast-loader'
  });
  return YoutubePlaylistInfo.list($stateParams.playlistId)
    .then(items => {
      items._toast = _toast;
      return items;
    });
}