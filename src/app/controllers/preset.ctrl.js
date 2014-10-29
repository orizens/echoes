app.controller('PresetCtrl', [
'$scope', '$rootScope', 
function PresetCtrl($scope, $rootScope) {
	var selectedPreset = '';

	$scope.data = {
		label: 'Preset',
		items: [
			'All',
			'Albums',
			'Live'
		]
	};

	$scope.preset = $scope.data.items[0];

	// add the preset to the input's query model
	$scope.$watch('preset', function(newPreset, oldPreset){
		if (angular.equals(newPreset, oldPreset)) { 
			return;
		}
		// if 'All' is selected, send a empty string value
		newPreset = newPreset === $scope.data.items[0] ? '' : newPreset;
		$rootScope.$broadcast('preset-change', newPreset);
	});
}]);