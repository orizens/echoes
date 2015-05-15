(function(){


	angular
		.module('presets')
		.controller('PresetCtrl', PresetCtrl);

	function PresetCtrl(preset, YoutubeSearch) {
		var vm = this;
		var indexOfSelectedPreset;
		vm.data = {
			label: 'Preset'
		};
		vm.presets = preset.items;
		vm.updatePreset = updatePreset;
		vm.selected = preset.selected().index;
		// put selected preset

	    function updatePreset (presetValue) {
	    	YoutubeSearch.params.q = preset.update(YoutubeSearch.params.q, presetValue);
	    	YoutubeSearch.search();
	    }
	}

})();