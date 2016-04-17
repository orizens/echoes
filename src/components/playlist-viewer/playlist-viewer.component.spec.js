import { PlaylistViewerComponent } from './playlist-viewer.component';

describe('playlist-viewer Component', () => {
  var controller, scope;
  let YoutubePlayerSettings, PlaylistEditorSettings, $state;

  beforeEach(() => {
    angular.module('playlist-viewer');
    inject(($controller, $rootScope, $injector) => {
      // use window.mocks['name.of.mock.json'] for json mocks
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
      controller.playlist = window.mocks['youtube.playlist.mock'];
      controller.videos = window.mocks['youtube.videos.mock'].items;
    });

  });

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