describe('user-playlists Component', function(){
  var controller, scope, UserPlaylistsCtrl;

  beforeEach(function(){
    module('user-playlists');
    inject(function($controller, $rootScope, _UserPlaylistsCtrl_) {
      // use window.mocks['name.of.mock.json'] for json mocks
      scope = $rootScope.$new();
      controller = $controller('UserPlaylistsCtrl as vm', {
        $scope: scope
      });
      UserPlaylistsCtrl = _UserPlaylistsCtrl_
    });

  });

  // un"x" the describe and it
  xdescribe('user-playlists actions here...', function(){

    xit('should what it is supposed to do', function() {

    });

  });
});