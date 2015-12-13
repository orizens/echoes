import FeedFilterCtrl from './feed.filter.ctrl.js';
import template from './feed.filter.tpl.html';

/* @ngInject */
export default function FeedFilter() {
    // Usage:
    //	<feed-filter></feed-filter>
    // Creates:
    //
    var directive = {
    	template,
        controller: FeedFilterCtrl,
        controllerAs: 'vm',
        scope: {},
        bindToController: true,
        replace: true,
        restrict: 'E'
    };
    return directive;
}