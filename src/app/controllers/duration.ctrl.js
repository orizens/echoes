app.controller('DurationCtrl', [
'$scope', 
function DurationCtrl($scope){
	$scope.data = {
		label: 'Duration',
		items: [
			'Any',
			'Short (less then 4 minutes)',
			'Medium (4-20 minutes)',
			'Long (longer than 20 minutes)'
		]
	};
}]);