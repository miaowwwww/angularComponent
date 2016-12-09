var app = angular.module('myApp', ['ggUi'])
.controller('indexCtrl', ["$scope", "topInput", function($scope, topInput) {
	$scope.input = function() {
		topInput.show('dashabi', '确定输入')
			.then(function(value) {
				console.log(value);
			}, function() {
				// cancel
			})
	}
}])