/* @ngInject */
export default function GoogleClientApi ($q, GapiApiSetter) {
	var defered = $q.defer();
	var service = {
		load: load,
        getClientApi: getClientApi
	};
    // activate();

	return service;

    // function activate () {
    // }

    // optional: client, version
	function load (client, version) {
		// gapi.client.setApiKey(DeveloperApiKey);
		//  load the gapi api
        client = GapiApiSetter.api.client;
        version = GapiApiSetter.api.version;
		gapi.client.load(client, version, handleResponse);
		return defered.promise;
	}

	function handleResponse (res) {
        if (gapi && gapi.client) {
            console.log('client load success:', res);
    		defered.resolve(gapi.client);
            return gapi.client;
        }
        console.log('gapi not loaded yet...', result);
    }

    function getClientApi () {
        return defered.promise;
    }
}