'use strict';
import { NavigatorComponent } from './navigator.component';

describe('Navigator Component', () => {
  let controller, scope, rootScope;

  beforeEach(() => {
    angular.module('navigator');
    inject(($controller, $rootScope, $injector) => {
      // use window.mocks['name.of.mock.json'] for json mocks
      scope = $rootScope.$new();
      rootScope = $rootScope;
      controller = $controller(NavigatorComponent.controller, {
        $scope: scope,
        $rootScope: rootScope
      });
    });

  });

  it('should update the active view when state changed', function() {
    let toState = { name: 'myPlaylists' };
    controller.handleStateChange({}, toState);
    let view = controller.views.find(view => view.ref === 'myPlaylists');
    expect(view.active).toBeTruthy();
  });

  it('should reset the old view to inactive state changed', function() {
    let toState = { name: 'myPlaylists' };
    controller.handleStateChange({}, toState);
    let view = controller.views.find(view => view.ref !== 'myPlaylists');
    expect(view.active).toBeFalsy();
  });

});