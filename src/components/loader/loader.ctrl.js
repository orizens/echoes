/* @ngInject */
export default function LoaderController(YoutubeSearch){
	var vm = this;
	vm.show = YoutubeSearch.getIsSearching;
}