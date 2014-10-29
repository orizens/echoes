// environment vars

var hasLocationSupport = location && location.hostname;
var isDevMode = hasLocationSupport && location.hostname === "localhost" ? true : false;
var url = isDevMode ? "http://localhost:8000/index.html" : "http://echotu.be/";
	
module.exports = {
	youtube: {
		redirect_uri: url
	}
}