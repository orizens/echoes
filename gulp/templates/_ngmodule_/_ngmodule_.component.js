import template from './_ngmodule_.tpl.html';

export let =ngmodule=Component = {
	template,
	selector: '_ngmodule_',
	// add ng1 directive definition
	directiveSelector: () => console.log('=ngmodule=', '-> change this'),
	controllerAs: '$ctrl',
	scope: {

	},
	bindToController: true,
	replace: true,
	restrict: 'E',
	controller: class =ngmodule=Ctrl {
		/* @ngInject */
		constructor () {
			// Object.assign(this, ...arguments);

		}
	}
};
