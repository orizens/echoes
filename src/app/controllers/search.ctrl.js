(function() {
    'use strict';

    angular
        .module('mediaDeck')
        .controller('SearchCtrl', SearchCtrl);

    /* @ngInject */
    function SearchCtrl($scope, YoutubeSearch) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'SearchCtrl';
        vm.params = YoutubeSearch.params;
        vm.search = search;

        activate();

        function activate() {
        }

        function search () {
        	YoutubeSearch.search();
        }
    }
})();