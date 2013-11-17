// environment vars
define(function(){
	var hasLocationSupport = location && location.hostname;
	var isDevMode = hasLocationSupport && location.hostname === "localhost" ? true : false;
	var url = isDevMode ? "http://localhost:8000/index.html" : "http://echotu.be/";
	
	return {
		youtube: {
			redirect_uri: url
		}
	}
})