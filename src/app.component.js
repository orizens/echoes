import template from './app.html';

export let AppComponent = {
  templateUrl: template,
  selector: 'app',
  bindings: {},
  controller: class AppCtrl {
    /* @ngInject */
    constructor($state) {
      Object.assign(this, { $state });
    }
  }
};