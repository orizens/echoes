import angular from 'angular';

export default YoutubeUser;

    /* @ngInject */
    function YoutubeUser($http, $q, GapiLoader) {
    	var data = {
            status: {
                signed_in: false
            },
            user: {},
            auth: {}
        };
        var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=';
        var service = {
            update: update,
            data: data,
            signOut: signOut,
            signIn: signIn,
            isUserSignedIn: isUserSignedIn
        };
        GapiLoader.auth().then((authResult) => {
            angular.extend(data.status, authResult.status);
            angular.merge(data.auth, authResult);
        });

        return service;

        ////////////////

        function update(user) {
        	angular.copy(user, data);
        }

        function signOut () {
            data.status.signed_in = false;
            data.user = {};
            return gapi.auth.signOut();
        }

        function isUserSignedIn () {
            return data.status && data.status.signed_in === true;
        }

        function signIn (userAuth) {
            const status = userAuth.status;
            angular.copy(userAuth.status, data.status);
            if (!status.google_logged_in && !status.signed_in) {
                return;
            }
            return $q.all([
                gapi.client.youtube.channels.list({
                    part: 'snippet,contentDetails',
                    mine: true
                })]).then(saveUser, (res) => console.log('not authorized', res));

        }

        function saveUser (result) {
            // console.log('results user', result);
            angular.copy(result[0].result.items[0], data.user);
            // $rootScope.$broadcast('user-signed-in', data);
            return result;
        }
    }