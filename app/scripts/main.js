'use strict';
/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/trunk/apps/experimental.app.html
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
    // chrome.app.window.create('index-orig.html', {
    	id: 'echoes',
    	bounds: {
	        width: 1280,
	        height: 768
    	}
    });
});

