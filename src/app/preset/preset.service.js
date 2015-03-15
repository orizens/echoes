(function() {
    'use strict';

    angular.module('presets')
    .factory('preset', preset)
    .factory('searchListener', searchListener);

    function preset (localStorageService){
        var Storage = {
            PRESET: 'preset'
        };
        var items = [
            'all',
            'albums',
            'live'
        ];
        var query;
        var selectedPreset = localStorageService.get(Storage.PRESET);
        var selectedIndex = 0;
        var service = {
            selected: selected,
            update: update,
            items: items,
            getQuery: getQuery
        };
        activate();

        return service;

        function activate () {
            updateSelectedIndex(selectedPreset);
        }

        function update (currentQuery, newPreset){
            // query = currentQuery;
            var query = currentQuery.replace(selectedPreset, '').trim();
            selectedPreset = newPreset.toLowerCase();
            if (selectedPreset === 'all') {
                selectedPreset = '';
            }
            query += ' ' + selectedPreset.toLowerCase();
            localStorageService.set(Storage.PRESET, selectedPreset);
            updateSelectedIndex(selectedPreset);
            return query;
        }

        function updateSelectedIndex (preset) {
            var indexOfSelectedPreset = items.indexOf(preset);
            selectedIndex = indexOfSelectedPreset === -1 ? 0 : indexOfSelectedPreset; 
        }

        function selected () {
            return {
                label: selectedPreset,
                index: selectedIndex
            };
        }

        function getQuery () {
            return query;
        }
    }

    function searchListener (preset) {
        return {
            'request': addPreset
        };

        function addPreset (config) {
            if (config.url.match(/v3\/search/gim)) {
                config.transformRequest = transformSearch;
            }

            function transformSearch (data, headersGetter) {
                
            }
            return config;
        }
    }
})();