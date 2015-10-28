(function() {
    'use strict';

    // angular
    //     .module('user-profile', [
            
    //     ]);

    angular
        .Component({
            selector: 'user-profile',
            bindings: [
                'echoes.resources',
                'google.api.loader',
                'youtube.api',
                'google-signin'
            ]
        })
        .View({
            templateUrl: 'app/user-profile/user-profile.tpl.html'
        })
        .Class({
            constructor: 'UserProfileCtrl'
        })
})();