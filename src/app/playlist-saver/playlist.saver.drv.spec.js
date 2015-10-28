describe('Playlist Saver', () => {
	var scope, httpBackend, element, mockData, rootScope, iscope, UserPlaylists, ApiPlaylists, $q, PlaylistSaverSettings;
	var youtubeVideosMock = {};
	var html = [
		'<playlist-saver on-save="onSave()" on-cancel="onCancel()" tracks="playlist"></playlist-saver>'
	];

	function fakePromise () {
		var defer = $q.defer();
		// defer.resolve();
		// because there's a scope.apply in the controller 
		// scope.$digest();
		return defer;
	};

	beforeEach(() => {
		module('playlist.saver');
		module('htmlTemplates');
		module( ($provide) => {
			$provide.value('YoutubeApi', {});
		});
		inject(($compile, $controller, $rootScope, $httpBackend, _UserPlaylists_, _ApiPlaylists_, _$q_, _PlaylistSaverSettings_) => {
			rootScope = $rootScope;
			UserPlaylists = _UserPlaylists_;
			ApiPlaylists = _ApiPlaylists_;
			$q = _$q_;
			PlaylistSaverSettings = _PlaylistSaverSettings_;
			
			// spyOn(YoutubeSearch, 'search').and.returnValue(true);
			httpBackend = $httpBackend;
			scope = $rootScope.$new();
			scope.onSave = angular.noop;
			scope.onCanel = angular.noop;
			scope.playlist = [];
			youtubeVideosMock = window.mocks['youtube.videos.mock'];
			element = angular.element(html.join(''));
			$compile(element)(scope);
			scope.$digest();
			iscope = element.isolateScope();
		});
	});

	describe('Playlist Saver Directive', () => {
		it('should render the playlist saver template', () => {
			expect(element.hasClass('playlist-saver')).toBeTruthy();
		});

		it('should display an input to enter the name of the playlist', () => {
			expect(element.find('input')).toBeTruthy();
		});

		it('should get a playlist array as an attribute', () => {
			expect(iscope.vm.tracks).toEqual(scope.playlist);
		});

		it('should indicate the total number of videos to be added to the playlist', () => {
			var totalVideos = scope.playlist.length;
			scope.playlist.push(youtubeVideosMock.items[0]);
			scope.playlist.push(youtubeVideosMock.items[1]);
			scope.$digest();
			expect(element.find('.title').text()).toContain('2');
		});

		it('should show animated icon on save button after click', (done) => {
			spyOn(PlaylistSaverSettings, 'save').and.callFake( () => {
				let defer = $q.defer();
				defer.resolve();
				scope.$digest();
				return defer.promise;
			});
			iscope.vm.save();
			expect(element.find('.btn-save .fa').hasClass('ng-hide')).toBeFalsy();
			done();
		});

		// PlaylistSaverSettings Service
		it('should reset the playlist saver settings meta data after save', (done) => {
			// mock ApiPlaylists.insert -> return promise
			let defer1 = $q.defer();
			let defer2 = $q.defer();
			spyOn(ApiPlaylists, 'insert').and.callFake( () => {
				// defer1.resolve();
				return defer1.promise;
			});
			// mock UserPlaylists.addToPlaylist -> return promise
			spyOn(UserPlaylists, 'addToPlaylist').and.callFake( () => {
				// defer2 = $q.defer();
				return defer2.promise;
			});
			// check playlist{} has been cleaned
			// so => PlaylistSaverSettings.save().then -> should reset playlist
			let tracks = youtubeVideosMock.items.slice(0,1);
			PlaylistSaverSettings.save(tracks);
			setTimeout( () => {
				defer1.resolve({ result: 1});
				defer2.resolve({ result: 1});
				// run digest cycle to apply promises
				scope.$digest();
				expect(ApiPlaylists.insert).toHaveBeenCalled();
				expect(UserPlaylists.addToPlaylist).toHaveBeenCalled();
				let playlist = PlaylistSaverSettings.playlist;
				expect(PlaylistSaverSettings.playlist.id).toBe('');
				expect(PlaylistSaverSettings.playlist.title).toBe('');
				expect(PlaylistSaverSettings.playlist.description).toBe('');
				done();
			}, 0);
		});
	});
});