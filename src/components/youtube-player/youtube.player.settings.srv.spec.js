import YoutubePlayerModule from './';
import YoutubeVideosMock from '../../../tests/mocks/youtube.videos.mock';

describe('Youtube Player Module', function() {
  var YoutubePlayerSettings, YoutubePlayerCreator;
  var videosResponseMock = {};

  function queueVideos (amount) {
    videosResponseMock.items
    .slice(0, amount)
    .forEach(function (video) {
      YoutubePlayerSettings.queueVideo(video);
    });
  }

  beforeEach(window.module(YoutubePlayerModule));
  beforeEach(() => {
    window.inject(localStorageService => {
      spyOn(localStorageService, 'get').and.returnValue([]);
    });
    window.inject(($controller, $injector) => {
      var ytPlayerSpy = jasmine.createSpyObj('ytPlayerSpy', ['loadVideoById', 'playVideo', 'pauseVideo']);
      YoutubePlayerSettings = $injector.get('YoutubePlayerSettings');
      YoutubePlayerCreator = $injector.get('YoutubePlayerCreator');

      spyOn(YoutubePlayerCreator, 'createPlayer').and.returnValue(ytPlayerSpy);
      videosResponseMock = Object.assign({}, YoutubeVideosMock);
      YoutubePlayerSettings.createPlayer();
    });
  });

  describe('Youtube Player Settings Service', function() {
    it('queue videos to its playlist', function() {
      YoutubePlayerSettings.queueVideo(videosResponseMock.items[1]);
      expect(YoutubePlayerSettings.nowPlaylist.length).toBe(1);
    });

    it('shouldn\'t queue the same video to a playlist', function(){
      YoutubePlayerSettings.queueVideo(videosResponseMock.items[1]);
      YoutubePlayerSettings.queueVideo(videosResponseMock.items[1]);
      expect(YoutubePlayerSettings.nowPlaylist.length).toBe(1);
    });

    it('should reset the seek to zero when a new video is played', function() {
      YoutubePlayerSettings.playVideoId(videosResponseMock.items[5]);
      expect(YoutubePlayerSettings.getSeek()).toBe(0);
    });

    it('should update the nowPlaying object when playing a video', function() {
      var video = videosResponseMock.items[3];
      YoutubePlayerSettings.playVideoId(video);
      expect(YoutubePlayerSettings.nowPlaying.mediaId).toBe(video.id);
    });

    it('should mark the next video when play next track', function() {
      YoutubePlayerSettings.playVideoId(videosResponseMock.items[1]);
      YoutubePlayerSettings.queueVideo(videosResponseMock.items[2]);
      YoutubePlayerSettings.playNextTrack();
      expect(YoutubePlayerSettings.nowPlaying.mediaId).toBe(videosResponseMock.items[2].id);
    });

    it('should the first track when last track has ended and the user requested the next track', function() {
      queueVideos(3);
      YoutubePlayerSettings.playVideoId(videosResponseMock.items[2]);
      YoutubePlayerSettings.playNextTrack();
      expect(YoutubePlayerSettings.nowPlaying.mediaId).toBe(videosResponseMock.items[0].id);
    });

    it('shouldn\'t play the next track if it\'s the last track on playlist and the player requested next track', function() {
      spyOn(YoutubePlayerSettings, 'playVideoId').and.callThrough();
      queueVideos(3);
      YoutubePlayerSettings.playVideoId(videosResponseMock.items[2]);
      YoutubePlayerSettings.playNextTrack({ stopOnLast: true });
      expect(YoutubePlayerSettings.playVideoId.calls.count()).toBe(1);
    });
    it('should play the 1st video by default when playing a playlist', function() {
      YoutubePlayerSettings.playPlaylist(videosResponseMock.items.concat());
      expect(YoutubePlayerSettings.nowPlaying.index).toBe(0);
    });

    it('should play a selected index video playing a playlist and sending an index to play', function() {
      YoutubePlayerSettings.playPlaylist(videosResponseMock.items.concat(), 4);
      expect(YoutubePlayerSettings.nowPlaying.index).toBe(4);
    });

    it('should update the index of now playing when a track removed from the now playlist', function() {
      var nowPlayingIndex = 3;
      var removedIndex = 0;
      YoutubePlayerSettings.playPlaylist(videosResponseMock.items.concat(), nowPlayingIndex);
      YoutubePlayerSettings.remove(YoutubePlayerSettings.nowPlaylist[removedIndex], removedIndex);
      expect(YoutubePlayerSettings.nowPlaying.index).toBe(nowPlayingIndex - 1);
    });

    it('should play the previous track and update the index', function() {
      YoutubePlayerSettings.playPlaylist(videosResponseMock.items.concat(), 3);
      expect(YoutubePlayerSettings.nowPlaying.index).toBe(3);
      YoutubePlayerSettings.playPreviousTrack();
      expect(YoutubePlayerSettings.nowPlaying.index).toBe(2);
    });
  });
});