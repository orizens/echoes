'use strict';
import { YoutubeVideosComponent } from './youtube-videos.component';

describe('Youtube Videos', () => {
	let scope, YoutubeSearch, ctrl, YoutubePlayerSettings, controller;
	let YoutubeVideoInfo = {};
	let mockVideoItem = {};
	let mockPlaylistItem = {};

	beforeEach(angular.mock.module('youtube-videos'));

	beforeEach(inject(($injector, $controller, $q) => {
		controller = $controller;
		YoutubeSearch = jasmine.createSpyObj('YoutubeSearch', [
			'search', 'resetPageToken', 'getFeedType', 'searchMore'
		]);
		YoutubePlayerSettings = jasmine.createSpyObj('YoutubePlayerSettings',
			['playVideoId', 'queueVideo', 'playPlaylist']);
		// spies
		YoutubeSearch.items = [];
		YoutubeVideoInfo.getPlaylist = () => {};
		spyOn(YoutubeVideoInfo, 'getPlaylist').and.callFake( () => {
			let defer = $q.defer();
			defer.resolve();
			return defer.promise;
		});
		scope = $injector.get('$rootScope').$new();
		ctrl = controller(YoutubeVideosComponent.controller, {
			$scope: scope,
			YoutubeSearch: YoutubeSearch,
			YoutubePlayerSettings: YoutubePlayerSettings,
			YoutubeVideoInfo: YoutubeVideoInfo
		});
		scope.$digest();
		mockVideoItem = window.mocks['video.item.mock'];
		mockPlaylistItem = window.mocks['youtube.videos.mock'];
	}));

	it('search youtube once when it loads if there are no items to render', () => {
		expect(YoutubeSearch.search).toHaveBeenCalled();
		expect(YoutubeSearch.search.calls.count()).toBe(1);
	});

	it('should not search when it loads if there are items to render', () => {
		angular.copy(mockPlaylistItem.items, YoutubeSearch.items);
		controller(YoutubeVideosComponent.controller, {
			$scope: scope,
			YoutubeSearch: YoutubeSearch,
			YoutubePlayerSettings: YoutubePlayerSettings,
			YoutubeVideoInfo: YoutubeVideoInfo
		});
		expect(YoutubeSearch.search.calls.count()).toBe(1);
	});

	it('should queue and play video', () => {
		ctrl.playVideo(mockVideoItem);
		expect(YoutubePlayerSettings.queueVideo).toHaveBeenCalled();
		expect(YoutubePlayerSettings.playVideoId).toHaveBeenCalled();
	});

	it('should play a playlist and queue the videos', () => {
		ctrl.playPlaylist(mockPlaylistItem);
		scope.$digest();
		expect(YoutubePlayerSettings.playPlaylist.calls.count()).toBe(1);
	});
});