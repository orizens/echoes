import template from './_ngmodule_.tpl.html';

export let NameComponent = {
    template,
    selector: 'selector',
    controllerAs: '$ctrl',
    scope: {

    },
    bindToController: true,
    replace: true,
    restrict: 'E',
    controller: class NameCtrl {
        /* @ngInject */
        constructor () {
            // Object.assign(this, { })

        }
    }
}