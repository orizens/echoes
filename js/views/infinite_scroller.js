define(['jquery', 'underscore', 'backbone'], 
function($, _, Backbone) {
   
	var InfiniteScroller = Backbone.View.extend({

		el: '.container-main',

		initialize: function() {
			this.listenToScroll();
		},

		listenToScroll: function() {
			this.$el.scroll( _.bind(this.loadNext, this) );
		},

		// loads the next results upon the end of scroll
		loadNext: function() {
				console.log('loadNext fun');
			if(this.$el.scrollTop() == this.$(".row-fluid").height() - this.$el.height()) {
				console.log('scrolled at end');
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