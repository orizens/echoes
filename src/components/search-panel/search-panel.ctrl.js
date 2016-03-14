/* @ngInject */
export default class SearchPanelCtrl {
    /* @ngInject */
    constructor ($http, $q, $window, YoutubeSearch) {
        /*jshint validthis: true */
        Object.assign(this, { $http, $q, $window, YoutubeSearch });

        this.title = 'SearchCtrl';
        this.params = YoutubeSearch.params;
        this.resetPageToken = YoutubeSearch.resetPageToken;
        this.search = YoutubeSearch.search;
    }

    updateSearch($item, $model, $label) {
        this.YoutubeSearch.search();
    }

    complete (val) {
        const defered = this.$q.defer();
        this.$window.handleEchoesSuggest = handleEchoesSuggest;

        let config = {
          params: {
            hl: 'en',
            ds: 'yt',
            // oi: 'spell',
            // spell: '1',
            xhr: 't',
            client: 'youtube',
            q: val,
            callback: 'handleEchoesSuggest'
          }
        };
        const request = this.$http
            .jsonp('http://suggestqueries.google.com/complete/search', config);

        return defered.promise;

        function handleEchoesSuggest (res) {
            let suggestions = res[1]
                .map(result => result[0])
                .sort();
            if (suggestions.indexOf(val) === -1) {
                suggestions.unshift(val);
            }
            defered.resolve(suggestions);
        }
    }
}