describe('Movie Result Directive', function() {

    var result  = {
        Title: 'Start Wars: Episode IV - A New Hope'
    };
    var $compile, $rootScope;

    beforeEach(module('movieApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should output movie result to expected HTML format', function() {
        $rootScope.result = result;
        var element = $compile('<movie-result result="result"></movie-result>')($rootScope);
        $rootScope.digest();
        console.log(element[0]);
        expect(element.html()).toBe('<div>Start Wars: Episode IV - A New Hope</div>');
    });
});