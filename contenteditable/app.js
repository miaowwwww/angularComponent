var app = angular.module('myApp', ['ggUi'])
.controller('indexCtrl', ["$scope", "$timeout", function($scope, $timeout) {
	$scope.textValue = 'this is a div ';
	$scope.text = 'aaaaaaaaaaaa';
	$timeout(function() {
		$scope.textValue = 'fffffffffffffffffffffff';
	},2000)
}])