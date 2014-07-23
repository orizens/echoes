var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbonejs');
var facebook = require('facebook')();
var FacebookLikeTag = require('./facebook-like-tag.html');

var FacebookLikeView = Backbone.View.extend({
	el: '#facebook-like',

	template: FacebookLikeTag,

	initialize: function() {
		if (FB){
			FB.init({
				appId: '277907182339554',
			});
		}
		this.listenTo(this.model.youtube.info, 'change:id', this.render);
	},

	render: function() {
		var url = this.model.player.getShareUrl();
		this.$el.html( this.template({ url: url }) );
		if (FB) {
			FB.XFBML.parse(this.el);
		}
		return this;
	}
});
   
module.export = FacebookLikeView;