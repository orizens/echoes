import angular from 'angular';
import { eDropdown } from './e-dropdown.component';

export default angular.module('eDropdown', [])
  .component(eDropdown.selector, eDropdown);
