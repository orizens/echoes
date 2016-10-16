import angular from 'angular';
import DrawerSettings from './drawer-settings.service.js';
import drawerToggle from './drawer-toggle.component';
import drawerClosed from './drawer-closed.component';

export default angular.module('drawer', [
  'app.core'
])
.factory('DrawerSettings', DrawerSettings)
.directive('drawerToggle', drawerToggle)
.directive('drawerClosed', drawerClosed)
.name;