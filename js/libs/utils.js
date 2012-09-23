define([
	'underscore'
], function(_) {
   
    var Utils = {
    	formatNumberWithComma: function(num) {
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
    };
   
    return Utils; 
});