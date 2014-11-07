angular.module('mediaDeck')
.factory('preset', function(){
    var selectedPreset = '';

    var setPreset = function(currentQuery, newPreset){
        var query = currentQuery || '';
        query = query.replace(selectedPreset, '').trim();
        selectedPreset = newPreset.toLowerCase();
        if (newPreset === 'All') {
            newPreset = '';
        }
		query += ' ' + newPreset.toLowerCase();
		return query;
    };

    return {
    	update: setPreset
    };
});