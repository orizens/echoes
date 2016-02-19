import angular from 'angular';
import PresetCtrl from './preset.ctrl.js';
import AppCore from '../../../../core';

export default angular.module('presets', [
        AppCore,
        'LocalStorageModule'
    ])
    .controller('PresetCtrl', PresetCtrl)
;