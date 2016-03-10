import template from './navigator.tpl.html';

export let NavigatorComponent = {
	template,
	selector: 'navigator',
	// add ng1 directive definition
	directiveSelector: 'navigator',
	controllerAs: '$ctrl',
	scope: {

	},
	bindToController: true,
	replace: true,
	restrict: 'E',
	controller: class NavigatorCtrl {
		/* @ngInject */
		constructor ($rootScope) {
			// Object.assign(this, { });
			this.views = [
				{ label: 'Explore', icon: 'music', active: true, ref: 'explore', rules: ['videos', '', 'video', 'explore'] },
				{ label: 'My Playlists', icon: 'heart', active: false, ref: 'myPlaylists', rules: ['myPlaylists', 'playlist'] }
			];
			$rootScope.$on('$stateChangeStart', this.handleStateChange.bind(this));
		}

		handleStateChange (event, toState, toParams, fromState, fromParams, options) {
			const currentState = toState.name;
			this.views.forEach(view => view.active = false);
			this.views
				.filter(view => view.rules.some(route => route === currentState))
				.map(view => view.active = true);
		}
	}
};
