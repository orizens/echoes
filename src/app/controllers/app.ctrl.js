(function(){

angular
    .module('mediaDeck')
    .controller('AppCtrl', AppCtrl);

function AppCtrl($scope, $rootScope, YoutubeSearch, YoutubeVideoInfo, preset, YoutubeApi, YoutubeUser){
    var vm = this;
    vm.searching = YoutubeSearch.getIsSearching;
}

})();