(function(){

angular
    .module('mediaDeck')
    .controller('AppCtrl', AppCtrl);

function AppCtrl($scope, $rootScope, YoutubeSearch, YoutubeVideoInfo, preset, YoutubeApi, YoutubeUser){
    var app = this;
    app.searching = YoutubeSearch.getIsSearching;

    YoutubeApi.auth().then(function(user){
        YoutubeUser.update(user);
    });
}

})();