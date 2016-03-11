'use strict';

describe('Echoes Services: Youtube Search Service', () => {
	let scope, httpBackend, rootScope, YoutubeSearch, YoutubeVideoInfo, presetSrv;
	let mockVideoItems = {};

	beforeEach(angular.mock.module('core.services'));

	beforeEach(inject(($controller, $injector, $rootScope, _YoutubeSearch_, $httpBackend, _YoutubeVideoInfo_) => {
			rootScope = $rootScope.$new();
			presetSrv = $injector.get('preset');
			YoutubeSearch = _YoutubeSearch_;
			YoutubeVideoInfo = _YoutubeVideoInfo_;
			httpBackend = $httpBackend;
			mockVideoItems = window.mocks['youtube.videos.mock'];
			httpBackend
				.whenGET(/www.googleapis.com\/youtube\/v3\/search/)
				.respond(mockVideoItems);
			// spies
			// spyOn(YoutubeSearch, 'resetPageToken');
			spyOn(YoutubeVideoInfo, 'list').and.callFake( () => {
				return mockVideoItems.items;
			});
			scope = $rootScope.$new();
		}
	));

	it('should have a search function', () => {
		expect(YoutubeSearch.search).toBeDefined();
	});

	it('search youtube when query has changed', () => {
		YoutubeSearch.params.q = 'pink floyd';
		YoutubeSearch.search('pink floyd albums');
		httpBackend.flush();
		expect(YoutubeSearch.items.length).toBeGreaterThan(0);
	});

	it('should have a searchMore function should call search with params query and true', () => {
		YoutubeSearch.params.q = 'pink floyd live';
		YoutubeSearch.search('pink floyd albums');
		httpBackend.flush();
		spyOn(YoutubeSearch, 'search').and.callThrough();
		YoutubeSearch.searchMore();
		httpBackend.flush();
		expect(YoutubeSearch.search).toHaveBeenCalledWith(YoutubeSearch.params.q, true);
	});

	it('should reset the page token to ""', () => {
		YoutubeSearch.resetPageToken();
		expect(YoutubeSearch.params.pageToken).toBe('');
	});

	it('should search with an empty preset when preset is not set', () => {
		const query = 'direstraits';
		YoutubeSearch.search(query);
		httpBackend.expectGET(/q=direstraits\+&/);
	});

	it('should search with a preset when preset is set', () => {
		const query = 'direstraits';
		const selectedPreset = presetSrv.items[1];
		let getUrl = new RegExp(`q=${query}+${selectedPreset}+&`, 'i');
		presetSrv.update(query, selectedPreset);
		YoutubeSearch.search(query);
		httpBackend.expectGET();
	});
	// it('search, by default, should not concat results and reset items array', function() {
	// 	YoutubeSearch.params.q = 'pink floyd live';
	// 	YoutubeSearch.search('pink floyd albums');
	// 	YoutubeSearch.search('mozart', false);
	// 	httpBackend.flush();
	// 	expect(YoutubeSearch.items.length).toBe(10);
	// });
});