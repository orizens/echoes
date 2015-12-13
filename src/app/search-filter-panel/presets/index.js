import angular from 'angular';
import PresetCtrl from './preset.ctrl.js';
import PresetService from './preset.service.js';

export default angular.module('presets', [
        'echoes.resources',
        'echoes.services',
        'LocalStorageModule'
    ])
    .controller('PresetCtrl', PresetCtrl)
    .factory('preset', PresetService)
;