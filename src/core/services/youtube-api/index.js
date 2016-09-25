import angular from 'angular';
import GoogleApiLoader from './google.api.loader.mdl.js';
import UserPlaylistsService from './user.playlists.service.js';

export default angular
.module('youtube.api', [
  GoogleApiLoader.name
])
.factory('uGapi', uGapi)
.factory('UserPlaylists', UserPlaylistsService.UserPlaylists)
.factory('ApiPlaylists', UserPlaylistsService.ApiPlaylists);

/* @ngInject */
function uGapi($q, $rootScope, GapiLoader) {
  return GapiApi;

  // config:
  //  resourceName - api to use, i.e, "playlists"
  //  pages - number of next pages to fetch
  function GapiApi(config){
    var resourceName = config.resourceName;
    var pages = config.pages || 0;
    var pagesCounter = 0;

    var defer;
    var params = {
      part: 'snippet,contentDetails',
      maxResults: 50,
      mine: true
    };

    var service = {
      list,
      params,
      insert,
      remove
    };
    return service;

    function list (args, transformFunc) {
      defer = $q.defer();
      args = args || {};
      gapiList(angular.copy(params, args), transformFunc);
      return defer.promise;
    }

    function gapiList(args, transformFunc) {
      GapiLoader.auth().then(() => {
        getAllItems(args, transformFunc).then(res => {
          defer.resolve(res.result);
        });
      });
    }

    function getNextPage(response) {
      var pageToken = response.result.nextPageToken;
      var _params = angular.copy(params);
      var allowNextPage = pageToken && pages === 'all' || pagesCounter < parseInt(pages);
      _params.pageToken = pageToken;
      if (allowNextPage) {
        defer.notify(response.result);
        pagesCounter++;
        gapiList(_params);
        return;
      }
      endPromise(response);
    }

    function endPromise (response) {
      defer.resolve(response.result);
      $rootScope.$apply();
    }

    function getAllItems(params, transformFunc) {
      let items = [];
      let token;
      return getItems();

      function getItems () {
        return $q.when(gapi.client.youtube[resourceName].list(params))
        .then(response => {
          token = response.result.nextPageToken;
          return response;
        })
        .then(transformFunc)
        .then(response => {
          var returnValue = response;
          Array.prototype.push.apply(items, response.length ? response : response.result.items);
          if (token) {
            params.pageToken = token;
            return getItems();
          }
          if (response.result) {
            response.result.items = items;
          }
          if (response.length)  {
            returnValue = {items: items};
          }
          return returnValue;
        });
      }
    }

    function insert (params) {
      return $q.when(gapi.client.youtube[resourceName].insert(params));
    }

    function remove (playlistId) {
      var params = {
        id: playlistId
      };
      return $q.when(gapi.client.youtube[resourceName].delete(params));
    }
  }
}
