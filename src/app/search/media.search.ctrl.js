(function() {
    'use strict';

    angular
        .module('media.search')
        .controller('SearchCtrl', SearchCtrl);

    /* @ngInject */
    function SearchCtrl($scope, $http, $q, $window, YoutubeSearch) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'SearchCtrl';
        vm.params = YoutubeSearch.params;
        vm.search = search;
        vm.complete = complete;
        vm.updateSearch = updateSearch;

        activate();

        function activate() {
            $scope.$watch('vm.params.q', YoutubeSearch.resetPageToken);
        }

        function search () {
        	YoutubeSearch.search();
        }

        function updateSearch($item, $model, $label) {
            search();
        }

        function complete (val) {
            var defered = $q.defer();
            $window.handleEchoesSuggest = handleEchoesSuggest;
            
            var config = {
              params: {
                hl: "en",
                ds: "yt",
                // oi: "spell",
                // spell: "1",
                xhr: "t",
                client: "youtube",
                q: val,
                callback: 'handleEchoesSuggest'
              }
            };
            var request = $http
                .jsonp('http://suggestqueries.google.com/complete/search', config);
                
            return defered.promise;

            function handleEchoesSuggest (res) {
                defered.resolve(res[1].map(function(result){
                    return result[0];
                }));
            }
        }
    }
})();