/* @ngInject */
export default class PresetCtrl {
	/* @ngInject */
	constructor (preset, YoutubeSearch) {
		this.YoutubeSearch = YoutubeSearch;
		this.preset = preset;
		this.data = {
			label: 'Preset'
		};
		this.presets = preset.items;
		this.selected = preset.selected().index;
	}
    
    updatePreset (presetValue) {
    	this.YoutubeSearch.params.q = this.preset.update(this.YoutubeSearch.params.q, presetValue);
    	this.YoutubeSearch.search();
    }
}