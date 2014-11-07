(function(){


	angular
		.module('mediaDeck')
		.controller('PresetCtrl', PresetCtrl);

	function PresetCtrl(preset, YoutubeSearch) {
		var vm = this;
		vm.data = {
			label: 'Preset',
			items: [
				'All',
				'Albums',
				'Live'
			]
		};
		vm.presets = vm.data.items;
		vm.updatePreset = updatePreset;

	    function updatePreset (presetValue) {
	    	YoutubeSearch.params.q = preset.update(YoutubeSearch.params.q, presetValue);
	    	YoutubeSearch.search();
	    }
	}

})();