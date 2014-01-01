define(['jquery', 'underscore', 'backbone'], 
function($, _, Backbone) {
   
	var InfiniteScroller = Backbone.View.extend({

		initialize: function() {
			this.listenTo(this.model.youtube(), 'request', function(){
				this.isInRequest = true;
			});
			this.listenTo(this.model.youtube(), 'sync', function(){
				this.isInRequest = false;
			})
			this.listenToScroll();
		},

		listenToScroll: function() {
			// check if should listen to body when on 7"
			// var computedStyle = window.getComputedStyle(document.body);
			// var bodyIsScrolled = computedStyle.overflowY === 'scroll';
			// if (bodyIsScrolled){
				$(window).scroll(_.bind(this.loadNextForBody, this));
			// } else {
				// this.$el.scroll(_.bind(this.loadNext, this));
			// }
		},

		// loads the next results upon the end of scroll
		loadNext: function() {
			if (this.isInRequest) {
				return;
			};
			// row-fluid - the height of the whole content
			// this.$el height - the height of the visible area - "viewport"
			// console.log('scrolled at end', this.$el.scrollTop(), ">=", this.$(".row-fluid").height() - this.$el.height() - 250);
			var scrolledSoFar = this.$el.scrollTop();
			var contentHeight = this.$("#search-results").height();
			var viewportHeight = this.$el.height();
			// the relative y point of the viewport when the fetch will occur
			var pointOfLoading = viewportHeight * 0.4;

			if(scrolledSoFar >= contentHeight - viewportHeight - pointOfLoading) {
				this.model.youtube().fetchNext();
			}
		},

		loadNextForBody: function(){
			if (this.isInRequest) {
				return;
			};
			// scroll support for body 7" device
			var contentHeight = this.$("#search-results").height();
			var bodyScrolledSoFar = $('body').scrollTop();
			var bodyViewport = window.innerHeight;
			var bodyPointOfLoading = bodyViewport * 0.4;
			if (bodyScrolledSoFar >= contentHeight - bodyViewport - bodyPointOfLoading) {
				Backbone.trigger('app:load-more', true);
				// this.model.youtube().fetchNext();
				return;
			}	
		}

	});
   
	return InfiniteScroller; 
});