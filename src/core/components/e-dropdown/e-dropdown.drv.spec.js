describe('Unit: dropdown directive - ', function () {
	var element, scope, compile;
	var dropdownHtml = [
    	'<e-dropdown label="Preset"',
			'items="presets" ',
			'on-select="onPresetChange(item)"',
			'icon="tag"',
		'></e-dropdown>'
	];

	beforeEach(module('ui.controls'));
	beforeEach(module('htmlTemplates'));

	beforeEach(inject(function($compile, $rootScope) {
	    compile = $compile;
	    scope = $rootScope;
	    scope.onPresetChange = function(item) {
	    	return item;
	    };
	 	scope.presets = ['All', 'Albums', 'Live'];
	    element = angular.element(dropdownHtml.join(''));
	    $compile(element)(scope);
		scope.$digest();
	}));

	it('should render a dropdown element', function () {
	    expect(element.hasClass('dropdown')).toBeTruthy();
	});

	it("should render items if given presets", function() {
		expect(element.find('ul li').length).toBe(scope.presets.length);
	});

	it("should render a 'tag' icon", function(){
		expect(element.find('i[class*="-tag"]').length).toBe(1);
	});
	
	it("should render the label according to the 'label' attribute", function() {
		expect(element.find('.dropdown-toggle').text().trim()).toBe('Preset');
	});

	it("should call a function when select has changed", function() {
		spyOn(scope, 'onPresetChange');
		element.isolateScope().handleClick([scope.presets[0], 0]);
		expect(scope.onPresetChange).toHaveBeenCalled();
	});

	it("should call a function with the selected item when select has changed", function() {
		spyOn(scope, 'onPresetChange');
		element.isolateScope().handleClick([scope.presets[0], 0]);
		expect(scope.onPresetChange).toHaveBeenCalledWith([scope.presets[0], 0]);
	});

	it("should set the selected item as active", function() {
		var index = 1;
		element.isolateScope().handleClick(scope.presets[index], index);
		scope.$digest();
		expect(element.find('li').eq(index).hasClass('active')).toBeTruthy();
	});

	it("should set a predefined selected index from attribute", function() {
		var dropdownWithSelectedIndex = dropdownHtml.concat();
		dropdownWithSelectedIndex.splice(1, 0, ' selected="1" ');
		element = angular.element(dropdownWithSelectedIndex.join(''));
	    compile(element)(scope);
		scope.$digest();
		expect(element.find('li').eq(1).hasClass('active')).toBeTruthy();
	});
});