export default class FeedFilterCtrl {
	
	/* @ngInject */
	constructor (YoutubeSearch) {
		this.setType = YoutubeSearch.setType;
		this.data = {
			items: [
			{ label: 'Videos', icon: 'film', value: 'video' },
			{ label: 'Playlists', icon: 'th-list', value: 'playlist' }
			]
		};
		this.active = this.data.items[0];
	}

    setFeed (item){
		this.active = item;
        this.setType(item.value);
	}
}