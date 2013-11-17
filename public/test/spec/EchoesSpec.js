// - YoutubeResponse json response object
describe("Echoes Player", function () {
	// var player = ;
	var youtubeItemView;
	var youtubeItemModel;

	describe(":: Youtube Item Model", function(){

		beforeEach(function() {
			youtubeItemModel = new PlayerApp.Models.YoutubeItemSearchResult();
			youtubeItemModel.set( YoutubeResponse.data.items[0] );
		});

		it("should have an id", function(){

			expect( youtubeItemModel.get('id') ).toBeDefined();
		});
			
		it("should have a High Qaulty thumbnail", function(){
			expect( youtubeItemModel.get('thumbnail' ).hqDefault).toBeDefined();
		});

		it("should be longer than 0 seconds", function(){
			expect( youtubeItemModel.get('duration') ).toBeGreaterThan(0);
		});

	});

	describe(":: Youtube Item View", function(){

		beforeEach(function(){
			youtubeItemView = new PlayerApp.Views.YoutubeItemSearchResult();
			youtubeItemView.model = youtubeItemModel; 
		});

		it("Should render this.model and add tooltip", function(){
			youtubeItemView.render();
			expect( youtubeItemView.$el ).toBeTruthy();
		});

		it("Should trigger 'media-clicked' event", function(){
			var mediaClickedModel;
			youtubeItemView.on( 'media-clicked', function(data) {
				mediaClickedModel = data;
			});
			expect( youtubeItemView.model.toJSON() ).toMatch( mediaClickedModel );
		});

	});
});