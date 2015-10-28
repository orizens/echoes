describe('Playlist Editor', () => {
	let scope, httpBackend, element,mockData, rootScope, iscope, PlaylistEditorSettings, UserPlaylists, currentMedia, ApiPlaylists, $q;
	let userPlaylistsMock = {};
	let playlistEditorHtml = [
		'<playlist-editor></playlist-editor>'
	];

	beforeEach(function(){
		module('playlist.editor');
		module('htmlTemplates');
		module( ($provide) => {
			$provide.value('YoutubeApi', {});
		});
		inject(($compile, $controller, $rootScope, _PlaylistEditorSettings_, $httpBackend, _UserPlaylists_, _ApiPlaylists_, _$q_) => {
			rootScope = $rootScope;
			PlaylistEditorSettings = _PlaylistEditorSettings_;
			UserPlaylists = _UserPlaylists_;
			ApiPlaylists = _ApiPlaylists_;
			$q = _$q_;
			
			// spyOn(YoutubeSearch, 'search').and.returnValue(true);
			httpBackend = $httpBackend;
			scope = $rootScope.$new();
			userPlaylistsMock = window.mocks['user.playlists.mock'];
			currentMedia = window.mocks['video.item.mock'];
			PlaylistEditorSettings.add(currentMedia);
			element = angular.element(playlistEditorHtml.join(''));
			$compile(element)(scope);
			scope.$digest();
			iscope = element.isolateScope();
		});
	});

	it('should display playlists', () => {
		expect(element.hasClass('modal')).toBeTruthy();
	});

	it('should not show the create button for a new playlist', () => {
		expect(iscope.vm.showCreate).toBeFalsy();
	});

	it('should show the create button when a playlist name doesn\'t exist', () => {
		iscope.vm.search = 'a new playlist';
		angular.extend(UserPlaylists.tracks, userPlaylistsMock.items);
		iscope.vm.isPlaylistNameExists();
		scope.$digest();
		expect(iscope.vm.showCreate).toBeTruthy();
		// UserPlaylists.tracks.length = 0;
	});

	it('should update the playlists when a playlist is removed', () => {
		angular.extend(UserPlaylists.tracks, userPlaylistsMock.items);
		let amountOfPlaylists = UserPlaylists.tracks.length;
		let deferred = $q.defer();
		spyOn(ApiPlaylists, 'remove').and.callFake( () => {
			deferred.resolve();
			return deferred.promise;
		});
		iscope.vm.remove(UserPlaylists.tracks[0]);
		expect(ApiPlaylists.remove).toHaveBeenCalled();
	});
});