import './youtube-media.less';
import template from './youtube-media.html';

export const YoutubeMedia = {
  selector: 'youtubeMedia',
  templateUrl: template,
  bindings: {
    onPlay: '&',
    onQueue: '&',
    onAdd: '&',
    video: '<'
  },
  controllerAs: 'vm',
  /* @ngInject */
  controller: function() {
    var vm = this;
    vm.playVideo = playVideo;
    vm.queueVideo = queueVideo;
    vm.add = add;
    vm.showDesc = false;
    vm.toggle = toggle;
    vm.isPlaying = false;

    function playVideo(video) {
      vm.onPlay({
        video
      });
    }

    function queueVideo(video) {
      vm.onQueue({
        video
      });
    }

    function add(video) {
      vm.onAdd({
        video
      });
    }

    function toggle(showDesc) {
      vm.showDesc = !showDesc;
    }
  }
};
