import SearchPanelModule, { SearchPanelComponent } from './';

describe('Search Panel', () => {
  let ctrl, YoutubeSearch;

  beforeEach(window.module(SearchPanelModule));

  beforeEach(window.inject(($componentController) => {
    // spies
    YoutubeSearch = jasmine.createSpyObj('YoutubeSearch', ['resetPageToken', 'search']);
    YoutubeSearch.params = {};
    ctrl = $componentController(SearchPanelComponent.selector, {
      $http: {}, $q: {}, $window: {}, YoutubeSearch, $scope: {}
    });
  }));

  it('should reset the page token when the query has changed', () => {
    ctrl.params.q = 'some random text ' + Date().toString();
    ctrl.resetPageToken();
    expect(YoutubeSearch.resetPageToken).toHaveBeenCalled();
    expect(YoutubeSearch.resetPageToken.calls.count()).toBe(1);
  });

});