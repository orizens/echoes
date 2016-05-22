import './youtube-player.less';
import YoutubePlayerCtrl from './youtube-player.ctrl.js';
import template from './youtube-player.tpl.html';

/* @ngInject */
export default function YoutubePlayerComponent(YoutubePlayerApi, YoutubePlayerSettings) {
    // Usage:
    //  <div youtube-player></div>
    // Creates:
    //
    var directive = {
        templateUrl: template,
        controller: YoutubePlayerCtrl,
        link: link,
        controllerAs: 'vm',
        scope: {
            autoNext: '@',
            onVideoStart: '&'            
        },
        bindToController: true,
        replace: true,
        restrict: 'A'
    };
    return directive;

    /* @ngInject */
    function link (scope, element, attrs) {
        YoutubePlayerApi.load().then(() => {
            YoutubePlayerSettings.createPlayer(attrs.playerId, scope.vm.size.height, scope.vm.size.width, '', onPlayerStateChange);
        });

        function onPlayerStateChange (state) {
            scope.$apply();
        }
    }
}