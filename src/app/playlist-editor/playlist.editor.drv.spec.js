describe('Playlist Editor', function() {
	var scope, httpBackend, mockData, rootScope, iscope, PlaylistEditorSettings, UserPlaylists, currentMedia;
	var userPlaylistsMock = {};
	var playlistEditorHtml = [
		'<playlist-editor></playlist-editor>'
	];

	beforeEach(function(){
		module('playlist.editor');
		module('templates');

		inject(function($compile, $controller, $rootScope, _PlaylistEditorSettings_, $httpBackend, _UserPlaylists_){
			rootScope = $rootScope;
			PlaylistEditorSettings = _PlaylistEditorSettings_;
			UserPlaylists = _UserPlaylists_;
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

	describe('Playlist Editor Directive', function() {
		it('should display playlists', function() {
			expect(element.hasClass('modal')).toBeTruthy();
		});

		it('should not show the create button for a new playlist', function() {
			expect(iscope.vm.showCreate).toBeFalsy();
		});

		it('should show the create button when a playlist name doesn\'t exist', function() {
			iscope.vm.search = 'a new playlist';
			angular.extend(UserPlaylists.tracks, userPlaylistsMock.items);
			scope.$digest();
			expect(iscope.vm.showCreate).toBeTruthy();
			UserPlaylists.tracks.length = 0;
		});
	});
});