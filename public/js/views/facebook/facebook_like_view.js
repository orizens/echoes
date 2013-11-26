define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/facebook_like_tag.html'
], function($, _, Backbone, FacebookLikeTag) {
   
    var FacebookLikeView = Backbone.View.extend({
		el: '#facebook-like',

		template: _.template(FacebookLikeTag),

		initialize: function() {
			this.listenTo(this.model.youtube().get('info'), 'change:id', this.render);
		},

		render: function() {
			this.$el.html( this.template({ url: location.href }) );
			if (FB) {
				FB.XFBML.parse(this.el);
			}
			return this;
		},

		getUrlForShare: function (url) {
			var nowPlayingPath = url.split('#');
			nowPlayingPath.splice(0, 1, "?play=" + this.model.youtube().get('info').get('id') + '#');
			return nowPlayingPath.join('');
		}
	});
   
    return FacebookLikeView;
});