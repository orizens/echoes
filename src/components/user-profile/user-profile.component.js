import UserProfileCtrl from './user-profile.ctrl.js';
import template from './user-profile.tpl.html';

/* @ngInject */
export default function userProfile() {
    // Usage:
    //  <user-profile></user-profile>
    // Creates:
    //
    var directive = {
        template,
        controller: UserProfileCtrl,
        controllerAs: 'userProfile',
        scope: {},
        bindToController: true,
        replace: true,
        restrict: 'E'
    };
    return directive;
}