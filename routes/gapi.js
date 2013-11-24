var googleapis = require('googleapis');

function GapiHandler(config) {
	this.googleapis = googleapis;
    this.params = {
        part: 'snippet',
        maxResults: 50
    };

    // parse configuration
    if (config) {
        this.config = config;
        
        if (config.render) {
            this.render = config.render;
        }
        if (config.discover) {
            this.discover(this.config.discover[0], this.config.discover[1]);
        }
    }
}

GapiHandler.prototype = {
    discover: function (apiName, apiVersion) {
        this.googleapis.discover(apiName, apiVersion || '')
            .execute(this.prepare.bind(this));
    },

    prepare: function(err, client) {
        this.client = client;
        this.req = this.getApi();
        this.req.withApiKey(this.config.key);
    },

    request: function(res) {
        this.res = res;
        this.req.execute(this.response.bind(this));
    },

    response: function (err, result) {
        if (err) {
            console.log('Error in GAPI request:', err);
            this.res.end();
            return;
        }
        this.render.call(this, err, result, this.res);
    },

    // setter for params
    set: function(key, value) {
        if (key){
            // if key is an object - iterate and copy values
            if (key.toString().indexOf('Object') > -1) {
                Object.keys(key).forEach(function(param, val) {
                    this.params[param] = val;
                });
            }
            this.params[key] = value;
        }
    },

    getApi: function () {
        var apiPath = this.config.apis.split('.');
        var apiFun = this.client;
        apiPath.forEach(function(val){
            apiFun = apiFun[val];
        });
        return apiFun(this.params);
    },

    render: function(err, result, res) {
        res.render(this.config.template, result);
    }
}

exports.create = function(config) {
	return new GapiHandler(config);
}