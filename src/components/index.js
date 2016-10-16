import angular from 'angular';

import YoutubeVideos from './youtube-videos';
import SearchPanel from './search-panel';
import YoutubePlayer from './youtube-player';
import NowPlaying from './now-playing';
import UserProfile from './user-profile';
import Drawer from './drawer';
import PlaylistEditor from './playlist-editor';
import YoutubeVideo from './youtube-video';
import UserPlaylists from './user-playlists';
import PlaylistViewer from './playlist-viewer';
import NavigatorComponent from './navigator';

export default angular.module('app.components', [
  YoutubeVideos,
  SearchPanel,
  YoutubePlayer,
  NowPlaying,
  UserProfile,
  Drawer,
  PlaylistEditor,
  YoutubeVideo,
  UserPlaylists,
  PlaylistViewer,
  NavigatorComponent
])
.name;