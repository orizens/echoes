import angular from 'angular';
import { PlayerControlsComponent } from './player-controls.component';

export default angular.module('player-controls', [

])
	.directive(PlayerControlsComponent.directiveSelector, () => PlayerControlsComponent)
	.name
;