angular.module('mediaDeck')
.filter('titleCase', [
function() {
	var titleCaseFilter = function(input) {
		var words = input.split(' ');
		for (var i = 0; i < words.length; i++) {
			words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
		}
		return words.join(' '); 
	};
	return titleCaseFilter;
}]);