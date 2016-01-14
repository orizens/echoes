import template from './youtube-video.tpl.html';

export let YoutubeVideoComponent = {
	template,
	selector: 'youtubeVideo',
	controllerAs: '$ctrl',
	scope: {
		video: '='
	},
	bindToController: true,
	replace: true,
	restrict: 'E',
	controller: class YoutubeVideoCtrl {
		/* @ngInject */
		constructor (YoutubePlayerSettings, $state) {
			Object.assign(this, { YoutubePlayerSettings, $state });
			// this.video = video;
			this.video.snippet.description = this.toHtml(this.video.snippet.description);
			this.video.time = this.getDuration(this.video.contentDetails.duration);
		}

		queueVideo () {
			this.YoutubePlayerSettings.queueVideo(this.video);
		}

		playVideo () {
			this.YoutubePlayerSettings.queueVideo(this.video);
			this.YoutubePlayerSettings.playVideoId(this.video);
		}

		goBack () {
			this.$state.go('videos');
		}

		getDuration (time) {
			var t = time.split('PT')[1]
				.replace(/(H|M)/g, ':')
				.replace('S', '');
			var ts = t.split(':');
			ts = ts.map(function(d){
				return d.length === 1 ? '0' + d : d;
			});
			return ts.join(':');
		}

		toHtml (text) {
			const breakLineReg = /\n/gm
			const linksReg = /(http:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/gm
			if (!text) return text;
			return text
				.replace(breakLineReg, '<br>')
				.replace(linksReg, '<a href="$1" target="blank" title="opens in a new tab">$1</a>');
		}
	}
};
