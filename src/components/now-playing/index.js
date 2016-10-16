import angular from 'angular';
import AppCore from '../../core';
import { nowPlayingComponent } from './now-playing.component';
import nowPlaylist from './now-playlist';
import nowPlaylistFilter from './now-playlist-filter';
import playlistSaver from './playlist-saver';
import youtubePlayer from '../youtube-player';

export default angular.module('now-playing', [
  AppCore,
  nowPlaylist.name,
  nowPlaylistFilter.name,
  playlistSaver,
  youtubePlayer
])
.config(config)
.component(nowPlayingComponent.selector, nowPlayingComponent)
.name;
/* @ngInject */
function config () {

}
