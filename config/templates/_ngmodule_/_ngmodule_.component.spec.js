import { =ngmodule=Ctrl } from './_ngmodule_.component';

describe('_ngmodule_ Component', () => {
  var controller, scope;

  beforeEach(() => {
    angular.module('_ngmodule_');
    inject(($controller, $rootScope, $injector) => {
      // use window.mocks['name.of.mock.json'] for json mocks
      scope = $rootScope.$new();
      controller = $controller(=ngmodule=Ctrl.controller, {
        $scope: scope
      });
    });

  });

  it('should do what it is supposed to do', () => {

  });

});