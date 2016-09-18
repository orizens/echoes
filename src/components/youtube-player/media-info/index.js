import angular from 'angular';
import { MediaInfoComponent } from './media-info.component';

export * from './media-info.component';

export default angular.module('media-info', [

])
.component(MediaInfoComponent.selector, MediaInfoComponent)
.name;