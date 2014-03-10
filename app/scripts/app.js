var echoesView = document.querySelector('#echoes-view');
var Echoes = {};
Echoes.Browser = function(ev) {
	this.win = this.view('div', { class: 'window'});
	this.closeBtn = this.view('button', {}, "Close");
	this.webview = this.view('webview');
	this.win.appendChild(this.closeBtn);
	this.win.appendChild(this.webview);
	this.closeBtn.addEventListener('click', this.close.bind(this));
	document.body.appendChild(this.win);
	ev.window.attach(this.webview);
}
Echoes.Browser.prototype.view = function(tag, attrs, html) {
	var el = document.createElement(tag);
	if (attrs) {
		Object.keys(attrs).forEach(function(key){
			el.setAttribute(key, attrs[key]);
		})
	}
	if (html) {
		el.innerHTML = html;
	}
	return el;
}
Echoes.Browser.prototype.close = function() {
	document.body.removeChild(this.win);
	this.webview.stop();
};

echoesView.addEventListener('newwindow', function(event) {
  var browser = new Echoes.Browser(event);
});