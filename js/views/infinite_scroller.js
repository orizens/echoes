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
			this.$el.scroll( _.bind(this.loadNext, this) );
		},

		// loads the next results upon the end of scroll
		loadNext: function() {
			if (this.isInRequest) {
				return;
			};
				console.log('loadNext fun');
				console.log('scrolled at end', this.$el.scrollTop(), ">=", this.$(".row-fluid").height() - this.$el.height() - 250);
			if(this.$el.scrollTop() >= this.$(".row-fluid").height() - this.$el.height() - 250) {
				this.model.youtube().fetchNext();
				// $('div#loadmoreajaxloader').show();
				// $.ajax({
				// url: "loadmore.php",
				// success: function(html)
				// {
				//     if(html)
				//     {
				//         $("#postswrapper").append(html);
				//         $('div#loadmoreajaxloader').hide();
				//     }else
				//     {
				//         $('div#loadmoreajaxloader').html('<center>No more posts to show.</center>');
				//     }
				// }
				// });
			}
		}

	});
   
	return InfiniteScroller; 
});