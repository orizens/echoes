/* @ngInject */
export default class FeedFilterCtrl {
	/* @ngInject */
	constructor (YoutubeSearch) {
		Object.assign(this, { YoutubeSearch })
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
        this.YoutubeSearch.setType(item.value);
        this.YoutubeSearch.search()
	}
}