(function(){

angular
    .module('echoes')
    .controller('AppCtrl', AppCtrl);

function AppCtrl($scope, YoutubeSearch, DrawerSettings){
    var vm = this;
    vm.searching = YoutubeSearch.getIsSearching;
    vm.drawerIsOpened = DrawerSettings.opened;
}

})();