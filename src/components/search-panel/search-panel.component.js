import SearchPanelCtrl from './search-panel.ctrl.js';
import template from './search-panel.tpl.html';

/* @ngInject */
export default function searchPanel() {
    // Usage:
    //  <search-panel></search-panel>
    // Creates:
    //
    var directive = {
        template,
        controller: SearchPanelCtrl,
        controllerAs: 'vm',
        scope: {},
        bindToController: true,
        replace: true,
        restrict: 'E'
    };
    return directive;
}