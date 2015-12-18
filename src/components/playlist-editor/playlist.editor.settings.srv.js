(function() {
    'use strict';

    angular
        .module('playlist.editor')
        .factory('PlaylistEditorSettings', PlaylistEditorSettings);

    /* @ngInject */
    function PlaylistEditorSettings(UserPlaylists) {
        var service = {
            add: add,
            getMedia: getMedia,
            addMedia: addMedia,
            show: show,
            hide: hide,
            visibility: visibility
        };
        var currentMedia;
        var isVisible = false;

        return service;

        ////////////////

        function add(media) {
        	currentMedia = media;
        }

        function getMedia () {
        	return currentMedia;
        }

        function addMedia (media) {
        	currentMedia = media;
        }

        function show () {
        	isVisible = true;
        }

        function hide () {
        	isVisible = false;
        }

        function visibility () {
        	return isVisible;
        }
    }
})();