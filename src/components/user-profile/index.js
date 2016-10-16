import angular from 'angular';
import { userProfile } from './user-profile.component.js';

export default angular.module('user-profile', [
  'app.core'
    // 'google.api.loader',
    // 'youtube.api',
    // 'google-signin'
])
.component(userProfile.selector, userProfile)
.name;