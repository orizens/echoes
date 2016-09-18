import SearchFilterPanelModule, { SearchFilterPanelComponent } from './';

describe('search-filter-panel Component', () => {
  let scope, controller, preset, YoutubeSearch;

  beforeEach(window.module(SearchFilterPanelModule));
  beforeEach(inject(($controller, $rootScope) => {
    preset = jasmine.createSpyObj('preset', [
      'update', 'updateSelectedIndex', 'selected', 'getQuery'
    ]);
    preset.selected = () => ({ index: 0 });
    YoutubeSearch = jasmine.createSpyObj('YoutubeSearch', [
      'search', 'setPreset', 'resetPageToken', 'setType', 'setDuration'
    ]);
    scope = $rootScope.$new();
    controller = $controller(SearchFilterPanelComponent.controller, {
      $scope: scope,
      preset: preset,
      YoutubeSearch: YoutubeSearch
    });
  }));

  it('should set 0 as the selected index when no preset is selected', () => {
    expect(controller.selected).toBe(0);
  });

  it('should update the preset when a new one is selected', () => {
    controller.updatePreset('albums');
    expect(YoutubeSearch.setPreset).toHaveBeenCalled();
  });

  it('should search and reset search paging when a preset is updated', () => {
    controller.updatePreset('albums');
    expect(YoutubeSearch.search).toHaveBeenCalledWith(false, false);
  });
});