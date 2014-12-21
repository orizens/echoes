(function() {
    'use strict';

    angular
        .module('mediaDeck')
        .controller('SearchCtrl', SearchCtrl);

    /* @ngInject */
    function SearchCtrl($scope, $http, $q, YoutubeSearch) {
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
            var config = {
              params: {
                hl: "en",
                ds: "yt",
                // oi: "spell",
                // spell: "1",
                xhr: "t",
                client: "youtube",
                q: val
              }
            };

            // var request = $http
            //     .jsonp('http://suggestqueries.google.com/complete/search', config)
            //     .then(handleResults, handleResults);
                // .then(handleResults, function(err){
                //     debugger;
                // }, function(res){
                //     debugger
                // });
            // return request;
            var deffered = $q.defer();
            $.ajax({
                url: "http://suggestqueries.google.com/complete/search",
                dataType: "jsonp",
                data: {
                    hl: "en",
                    ds: "yt",
                    oi: "spell",
                    spell: "1",
                    json: "t",
                    client: "youtube",
                    q: val
                },
                success: function( data ) {
                    deffered.resolve(data[1]);
                }
            });

            return deffered.promise;

            function handleResults (response) {
                console.log('request', request);
                debugger
                return response.data[1];
            }
        }
    }
})();