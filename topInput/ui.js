var ggUi = angular.module('ggUi', [])

/*
 *  顶部输入框
 *  topInput.show(defaultValue, resolveBottonText).then(function(inputValue){//...}, function(){// do nothing })
 *	topInput.show('确定').then(..)
 */
ggUi.factory("topInput", ["$q", "$timeout", "$compile", "$rootScope", function($q, $timeout, $compile, $rootScope) {
	return {
		show: _show
	};


	function _show(defaultValue, buttonText) {
		var deferred = $q.defer();
		var _body = angular.element(document.querySelector('body'));
		var _html = angular.element(html(buttonText));
		var _input = _html.find('input')[0];
		var scope = $rootScope.$new();
		scope.kw = defaultValue;
		scope._reject = function() {
			_html.remove();
			deferred.reject();
			scope.$destroy();
		};
		scope._resolve = function() {
			_html.remove();
			deferred.resolve(scope.kw);
			scope.$destroy();
		};
		scope.$on("$locationChangeStart", function() {
			_html.remove();
			scope.$destroy();
		})
		$compile(_html)(scope);

		_body.append(_html);

		var tryCount = 0,
			timeout = setTimeout(function() {
				var focusElement = document.activeElement;
				tryCount++;
				console.log("try " + tryCount);
				if (tryCount <= 10 && focusElement != _input) {
					console.log("done!");
					_input.focus();
					setTimeout(arguments.callee, 200);
				}

			}, 200);

		_input.onFocus = function() {
			clearTimeout(timeout);
		}

		return deferred.promise;
	}


	function html(text) {
		return (
			"<section id='topInput'>" +
				"<div>" +
					"<a ng-click='_reject()' class='nav-back'>取消</a>" +
				"<p>" +
					"<i class='ion-ios-search'></i>" +
					"<input id='top-input' ng-model='kw' type='text' maxlength='20' autocomplete='off' />" +
				"</p>" +
					"<a ng-click='_resolve()'>" + (text || '确定') + "</a>" +
				"</div>" +
				"<footer ng-click='_reject()'></footer>" +
			"</section>"
		)
	}
}]);
