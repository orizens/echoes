import angular from 'angular';
import PresetCtrl from './preset.ctrl.js';
import EchoesServices from '../../../../core';

export default angular.module('presets', [
        EchoesServices.name,
        'LocalStorageModule'
    ])
    .controller('PresetCtrl', PresetCtrl)
;