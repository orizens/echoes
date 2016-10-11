/* @ngInject */
export default function MediaInfoService(YoutubeVideoInfo) {
  var info = {
    title: 'No Media Is Playing Yet...',
    desc: 'More information about the played video is displayed here...',
    thumb: '',
    id: ''
  };

  var service = {
    info,
    parseTimeTracks,
    updateVideo,
    fetchInfo,
    textHasTracks
  };

  const hasTracksRegexp = new RegExp('(([0-9]{0,1}[0-9]):([0-9][0-9]){0,1}:{0,1}([0-9][0-9]){0,1})', 'gm');
  return service;

  ////////////////
  function fetchInfo (video) {
    YoutubeVideoInfo.list(video.id).then(updateVideo);
  }

  function updateVideo (items) {
    if (items && items.length) {
      info.id = items[0].id;
      info.title = items[0].snippet.title;
      info.desc = parseTimeTracks(items[0].snippet.description);
      info.thumb = items[0].snippet.thumbnails.high.url;
    }
  }

  // parse multiline tracks to single
  // add buttons for time stops to allow playing of single tracks
  // in full albums in one video
  function parseTimeTracks (description) {
    var desc = description.replace(hasTracksRegexp, 
      '<a class="btn btn-primary btn-mini play-time" time="$1">$1</a>', 'gim');
    return desc;
  }

  function textHasTracks(text) {
    const tracks = text.match(hasTracksRegexp);
    return Array.isArray(tracks);
  }
}