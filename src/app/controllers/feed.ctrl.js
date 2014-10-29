(function() {
angular.module('mediaDeck')
.controller('FeedCtrl', FeedCtrl);

function FeedCtrl($scope, $rootScope) {
	$scope.data = {
		items: [
		{ label: 'Videos', icon: 'film', value: 'video' },
		{ label: 'Playlists', icon: 'th-list', value: 'playlist' }
		]
	}
	$scope.active = $scope.data.items[0];

	$scope.setFeed = function(item){
		$scope.active = item;
		$rootScope.$broadcast('feed-type-changed', item.value);
	}

    // 'use strict';

    // angular
    //     .module('module')
    //     .controller('Ctrl', Ctrl);

    // /* @ngInject */
    // function Ctrl(dependencies) {
    //     /*jshint validthis: true */
    //     var vm = this;
    //     vm.title = 'Ctrl';

    //     activate();

    //     function activate() {
    //     }
    // }
}
})();