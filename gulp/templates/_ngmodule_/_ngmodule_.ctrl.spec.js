describe('_ngmodule_ Component', function(){
  var controller, scope, _ngmodule_Ctrl;

  beforeEach(function(){
    module('_ngmodule_');
    inject(function($controller, $rootScope, __ngmodule_Ctrl_) {
      // use window.mocks['name.of.mock.json'] for json mocks
      scope = $rootScope.$new();
      controller = $controller('_ngmodule_Ctrl as vm', {
        $scope: scope
      });
      _ngmodule_Ctrl = __ngmodule_Ctrl_
    });

  });

  // un"x" the describe and it 
  xdescribe('_ngmodule_ actions here...', function(){

    xit('should what it is supposed to do', function() {
      
    });

  });
});