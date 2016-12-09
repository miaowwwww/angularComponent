var app = angular.module('myApp', ['ggUi'])
.controller('indexCtrl', ["$scope", "$timeout", function($scope, $timeout) {
	$scope.arr = [];
	$timeout(function(){
		$scope.arr = [1,2,3,4];
	},1000)

}])