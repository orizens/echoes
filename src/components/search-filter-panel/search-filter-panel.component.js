import template from './search-filter-panel.html';

export let SearchFilterPanelComponent = {
  templateUrl: template,
  selector: 'searchPanelFilter',
  bindings: {},
  controller: class SearchPanelFilterCtrl {
    /* @ngInject */
    constructor (preset, YoutubeSearch) {
      // Object.assign(this, ...arguments);
      this.YoutubeSearch = YoutubeSearch;
      this.preset = preset;
      // TODO: preset - should be moved to a service/reducer
      this.data = {
        label: 'Preset'
      };
      this.presets = preset.items;
      this.selected = preset.selected().index;
      // TODO: duration - should be moved to a service/reducer
      this.durations = [
        'Any',
        'Short (less then 4 minutes)',
        'Medium (4-20 minutes)',
        'Long (longer than 20 minutes)'
      ];
      this.durationsMap = [
        '',
        'short',
        'medium',
        'long'
      ];
    }

    updatePreset (presetValue) {
      this.YoutubeSearch.setPreset(presetValue);
      this.YoutubeSearch.resetPageToken();
      this.YoutubeSearch.search(false, false);
    }

    onDurationChange (duration, index) {
      this.YoutubeSearch.setType(this.YoutubeSearch.types.VIDEO);
      this.YoutubeSearch.setDuration(this.durationsMap[index]);
      this.YoutubeSearch.resetPageToken();
      this.YoutubeSearch.search(false, false);
    }
  }
};
