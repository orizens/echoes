(function() {
    'use strict';

    angular
        .module('mediaDeck')
        .controller('SearchCtrl', SearchCtrl);

    /* @ngInject */
    function SearchCtrl($scope, $http, $q, $window, YoutubeSearch) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'SearchCtrl';
        vm.params = YoutubeSearch.params;
        vm.search = search;
        vm.complete = complete;

        activate();

        function activate() {
        }

        function search () {
        	YoutubeSearch.search();
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