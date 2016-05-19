import angular from 'angular';
import { MediaInfoComponent } from './media-info.component';

export default angular.module('media-info', [

])
	.directive(MediaInfoComponent.directiveSelector, () => MediaInfoComponent)
	.name
;