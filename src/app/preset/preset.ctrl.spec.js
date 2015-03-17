describe('Preset Module', function() {
	var scope, ctrl, httpBackend, url, mockData, rootScope, PresetCtrl, preset, YoutubeSearch;
	var mockVideoItem = {};

	beforeEach(module("presets"));

	beforeEach(inject(
		function($controller, $rootScope, _preset_, _YoutubeSearch_, $httpBackend){
			rootScope = $rootScope;
			preset = _preset_;
			// PresetCtrl = _PresetCtrl_;
			YoutubeSearch = _YoutubeSearch_;
			spyOn(YoutubeSearch, 'search').and.returnValue(true);
			spyOn(preset, 'update').and.returnValue(true);
			httpBackend = $httpBackend;
			scope = $rootScope.$new();
			ctrl = $controller("PresetCtrl as vm", {
			  $scope: scope 
			});
			// mockVideoItem = window.mocks['media.info.mock'];
		}
	));

	it('should set 0 as the selected index when no preset is selected', function() {
		expect(scope.vm.selected).toBe(0);
	});

	it('should update the preset when a new one is selected', function() {
		scope.vm.updatePreset('albums');
		expect(preset.update).toHaveBeenCalled();
	});

	it('should search youtube when a preset is updated', function() {
		scope.vm.updatePreset('albums');
		expect(YoutubeSearch.search).toHaveBeenCalled();
	});
});