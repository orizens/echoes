import SearchPanelModule, { SearchPanelComponent } from './';

describe('Search Panel', () => {
  var ctrl, YoutubeSearch;

  beforeEach(window.module(SearchPanelModule));

  beforeEach(window.inject(($componentController, _YoutubeSearch_) => {
    YoutubeSearch = _YoutubeSearch_;
    // spies
    spyOn(YoutubeSearch, 'resetPageToken');
    spyOn(YoutubeSearch, 'search');
    ctrl = $componentController(SearchPanelComponent.selector, {
      $http: {}, $q: {}, $window: {}
    });
  }));

  it('should reset the page token when the query has changed', () => {
    ctrl.params.q = 'some random text ' + Date().toString();
    ctrl.resetPageToken();
    expect(YoutubeSearch.resetPageToken).toHaveBeenCalled();
    expect(YoutubeSearch.resetPageToken.calls.count()).toBe(1);
  });

});