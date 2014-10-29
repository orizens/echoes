angular.module('mediaDeck')
.factory('preset', function(){
    var selectedPreset = '';

    var setPreset = function(currentQuery, newPreset){
		var query = currentQuery || '';
    	query = query.replace(selectedPreset, '').trim();
		selectedPreset = newPreset.toLowerCase();
		query += ' ' + selectedPreset;
		return query;
    };

    return {
    	update: setPreset
    }
})