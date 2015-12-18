/* @ngInject */
export default function GapiApiSetter () {
    var scope = '';
    var api = {
        client: '',
        version: '',
    };
    var clientId = '';
    
    var service = {
        config: config,
        $get: $get
    };

    return service;

    function $get () {
        return {
            scope: scope,
            api: api,
            clientId: clientId
        };
    }

    function config (options) {
        setScope(options.scope);
        setApi(options.api.client, options.api.version);
        setClientId(options.clientId);
    }

    function setScope (scopes) {
        var scopePrefix = 'https://www.googleapis.com/auth/';
        // check if scopes has multiple endpoints
        scope = scopes.replace(/ /gm, '').split(',').map(function (s) {
            return scopePrefix + s;
        });
    }

    function setApi (client, version) {
        api.client = client;
        api.version = version;
    }

    function setClientId (id) {
        clientId = id;
    }
}