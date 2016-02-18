/* @ngInject */
export default function GapiLoader ($window, $rootScope, $q, GoogleClientApi, $http, GapiApiSetter) {
    var defered = $q.defer();
    var authDefered = $q.defer();
    var scope = GapiApiSetter.scope;
    var clientId = GapiApiSetter.clientId;
    var loadClientApi = true;

    var service = {
        load: load,
        auth: auth,
        signOut: signOut
    };

    activate();

    return service;

    function activate(){
        // Youtube callback when API is ready
        $window.onGapiLoad = function () {
            $rootScope.$applyAsync(function () {
                defered.resolve();
            });
        };

        // Inject YouTube's client API
        (function () {
            var validProtocols = ['http:', 'https:'];
            var url = '//apis.google.com/js/client.js?onload=onGapiLoad';

            // We'd prefer a protocol relative url, but let's
            // fallback to `http:` for invalid protocols
            if (validProtocols.indexOf(window.location.protocol) < 0) {
                url = 'http:' + url;
            }
            var tag = document.createElement('script');
            tag.src = url;
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }());
    }

    function load() {
        return defered.promise;
    }

    function auth (options) {
        var isImmediate = options && options.hasOwnProperty('immediate') ? options.immediate : true;
        // var scopePrefix = 'https://www.googleapis.com/auth/';
        // var scope = options && options.hasOwnProperty('scope') ? options.scope : '';
        // check if scopes has multiple endpoints
        // scope = scope.replace(/ /gm, '').split(',').map(function (s) {
            // return scopePrefix + s;
        // });
        load().then(function(){
            gapi.auth.authorize({
                client_id: clientId,
                scope: scope,
                // false - is for showing pop up
                immediate: isImmediate,
            }, function(authResult){
                authHasError(authResult);
                if (loadClientApi) {
                    GoogleClientApi.load()
                        .then(function (res) {
                            // console.log('client api loaded', res);
                            authDefered.resolve(authResult);
                        });
                } else {
                    authDefered.resolve(authResult);
                }
                // signIn(authResult);
            });
        });

        return authDefered.promise;
    }

    function authHasError (auth) {
        return auth.error && auth.error.indexOf('fail') > -1;
    }

    function signOut () {
        var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=';
        var url = revokeUrl + gapi.auth.getToken().access_token;
        return $http.get(url).then(signOutSuccess, singOutFailed);

        function signOutSuccess (ev) {
            console.log('signout success', ev);
            return ev;
        }

        function singOutFailed (response) {
            if ('' === response.statusText) {
                return signOutSuccess(response);
            }
            console.log('singout failed');
        }
    }
}