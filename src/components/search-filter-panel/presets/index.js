import angular from 'angular';
import PresetCtrl from './preset.ctrl.js';
import PresetService from './preset.service.js';
import EchoesServices from '../../../core';

export default angular.module('presets', [
        EchoesServices.name,
        'LocalStorageModule'
    ])
    .controller('PresetCtrl', PresetCtrl)
    .factory('preset', PresetService)
;