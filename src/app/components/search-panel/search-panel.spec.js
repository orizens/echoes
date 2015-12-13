describe("Media Search", () => {
	var scope, ctrl, httpBackend, url, mockData, rootScope, YoutubeSearch;
	var mockVideoItem = {};

	beforeEach(module("media.search"));

	beforeEach(inject(($controller, $rootScope, _YoutubeSearch_, $httpBackend) => {
			rootScope = $rootScope;
			YoutubeSearch = _YoutubeSearch_;
			httpBackend = $httpBackend;
			// spies
			spyOn(YoutubeSearch, 'resetPageToken');
			spyOn(YoutubeSearch, 'search');
			scope = $rootScope.$new();
			ctrl = $controller("SearchCtrl as vm", {
			  $scope: scope 
			});
			scope.$digest();
			// mockVideoItem = window.mocks['media.info.mock'];
		}
	));

	it("should reset the page token when the query has changed", () => {
		scope.vm.params.q = 'some random text ' + Date().toString();
		scope.vm.resetPageToken();
		scope.$digest();
		expect(YoutubeSearch.resetPageToken).toHaveBeenCalled();
		expect(YoutubeSearch.resetPageToken.calls.count()).toBe(1);
	});

});