var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbonejs');
var FacebookLikeTag = require('./facebook-like-tag.html');

var facebookUrl = 'http://connect.facebook.net/en_US/all.js';
var facebookLoadedPrefix = 'facebook';

var initFacebookApp = function(){
	if (window.FB){
		window.FB.init({
			appId: '277907182339554',
		});
	}
}

var FacebookLikeView = Backbone.View.extend({
	el: '#facebook-like',

	template: FacebookLikeTag,

	initialize: function() {
		Backbone.on(facebookLoadedPrefix + ':loaded', function(){
			initFacebookApp();
			if (this.model.player.getShareUrl()){
				this.render();
			}
		}, this);
		var facebookSdk = require('facebook')(facebookUrl, facebookLoadedPrefix);
		this.listenTo(this.model.youtube.info, 'change:id', this.render);
	},

	render: function() {
		var url = this.model.player.getShareUrl();
		this.$el.html( this.template({ url: url }) );
		if (window.FB) {
			window.FB.XFBML.parse(this.el);
		}
		return this;
	}
});
   
module.exports = FacebookLikeView;