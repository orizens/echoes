describe('playlist-viewer Component', function(){
  var controller, scope, playlist-viewerCtrl;

  beforeEach(function(){
    module('playlist-viewer');
    inject(function($controller, $rootScope, _playlist-viewerCtrl_) {
      // use window.mocks['name.of.mock.json'] for json mocks
      scope = $rootScope.$new();
      controller = $controller('PlaylistViewerCtrl as vm', {
        $scope: scope
      });
      playlist-viewerCtrl = _playlist-viewerCtrl_
    });

  });

  // un"x" the describe and it
  xdescribe('playlist-viewer actions here...', function(){

    xit('should what it is supposed to do', function() {

    });

  });
});