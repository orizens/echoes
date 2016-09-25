const logError = error => console.log(error);
/* @ngInject */
export default class PlaylistSaverSettings {

  /* @ngInject */
  constructor (UserPlaylists, ApiPlaylists, $q) {
    Object.assign(this, { UserPlaylists, ApiPlaylists, $q });
    this.playlist = {
      title: '',
      id: '',
      description: ''
    };
    this.index = 0;
    this.totalTracks;
    this.defer;
    this._tracks;
  }

  save(tracks) {
    this._tracks = tracks;
    let params = {
      part: 'snippet,contentDetails',
      resource: {
        snippet: {
          title: this.playlist.title,
          description: this.playlist.description || ''
        }
      }
    };
    return this.ApiPlaylists.insert(params).then(response => {
      this.playlist.id = response.result.id;
      return this.addTracks(tracks)
        .then(success => this.reset(), logError);
    });
  }

  addTracks (tracks) {
    return this._addTrack(tracks[0], 0);
  }

  _addTrack (media, index) {
    return this.UserPlaylists
      .addToPlaylist(this.playlist.id, media, index)
      .then(response => this._addNextIndex(index), logError);
  }

  _addNextIndex (index) {
    const nextIndex = index + 1;
    if (nextIndex < this._tracks.length) {
      return this._addTrack(this._tracks[nextIndex], nextIndex);
    }
  }

  reset () {
    this.playlist.id = '';
    this.playlist.title = '';
    this.playlist.description = '';
  }
}
