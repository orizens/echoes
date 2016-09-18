import PlaylistViewerModule, { PlaylistViewerComponent } from './index.js';
import YoutubePlaylistMock from '../../../tests/mocks/youtube.playlist.mock';
import YoutubeVideosMock from '../../../tests/mocks/youtube.videos.mock';

describe('playlist-viewer Component', () => {
  var controller, scope;
  let YoutubePlayerSettings, PlaylistEditorSettings, $state;

  beforeEach(window.module(PlaylistViewerModule));
  beforeEach(inject(($controller, $rootScope, $injector) => {
    YoutubePlayerSettings = jasmine.createSpyObj('YoutubePlayerSettings', [
      'playVideoId','queuePlaylist','queueVideo' ]);
    PlaylistEditorSettings = jasmine.createSpyObj('PlaylistEditorSettings', [
      'add'
      ]);
    $state = jasmine.createSpyObj('$state', ['go']);
    scope = $rootScope.$new();
    controller = $controller(PlaylistViewerComponent.controller, {
      $scope: scope,
      YoutubePlayerSettings: YoutubePlayerSettings,
      PlaylistEditorSettings: PlaylistEditorSettings,
      $state: $state
    });
    controller.playlist = YoutubePlaylistMock;
    controller.videos = YoutubeVideosMock.items;
  }));

  it('should play a video and queue the playlist', () => {
    const videos = controller.videos;
    controller.playVideo(videos[5]);
    expect(YoutubePlayerSettings.queuePlaylist).toHaveBeenCalledWith(videos);
    expect(YoutubePlayerSettings.playVideoId).toHaveBeenCalledWith(videos[5]);
  });

  it('should queue a playlist and play its first video when playing a playlist', () => {
    const videos = controller.videos;
    controller.playPlaylist();
    expect(YoutubePlayerSettings.queuePlaylist).toHaveBeenCalledWith(videos);
    expect(YoutubePlayerSettings.playVideoId).toHaveBeenCalledWith(videos[0]);
  });

  it('should queue a video', () => {
    const video = controller.videos[2];
    controller.queueVideo(video);
    expect(YoutubePlayerSettings.queueVideo).toHaveBeenCalledWith(video);
  });


  it('should queue a playlist', function() {
    const playlist = controller.videos;
    controller.queuePlaylist(playlist);
    expect(YoutubePlayerSettings.queuePlaylist).toHaveBeenCalledWith(playlist);
  });
  it('should call the state of add video to user\'s playlists' , () => {
    const video = controller.videos[5];
    controller.addVideo(video);
    expect(PlaylistEditorSettings.add).toHaveBeenCalledWith(video);
    expect($state.go).toHaveBeenCalledWith('addVideo', { id: video.id });
  });
});