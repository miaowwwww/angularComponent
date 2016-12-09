var ggUi = angular.module('ggUi', [])

/*
*   	可编辑的div
*		应用于发表评论中有表情的时候，div中添加img（表情）
*		<div contenteditable ></div>
*		by-guo
*/

app.directive('contenteditable',  function($sce) {
  return {
    restrict: 'A', 
    require: '?ngModel', 
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return; 

      ngModel.$render = function() {
      	console.log('render');
				element.html($sce.trustAsHtml(ngModel.$viewValue || ''));
      };

      element.on('blur keyup change', function($event) {
        scope.$evalAsync(read);
      });
      read(); // initialize

      function read() {
    	  console.log('read')
    	  var html = element.html();
    	  console.log('before replace:' +html +'   ngModel:' + ngModel.$modelValue);
    	  console.log('after replace:'+ html);
    	  if ( attrs.stripBr && html == '<br>' ) {
        	console.log('stript')
        	html = '';
    	  }
    	  ngModel.$setViewValue(html);
      }
    }
  };
});

/*
*	征文模块评论中使用了img标签，使用ngBindHtml需要$sce服务，
* ng-bind-html
*/
app.filter('to_trusted', ['$sce', function($sce) {
	return function(text) {
		return $sce.trustAsHtml(text);
	};
}]);

/*
*	过滤ngModel输入中的emoji表情
*/
app.directive('filterEmoji',function() {
  return {
    restrict: 'A', 
    require: '?ngModel', 
    link: function(scope, element, attrs, ngModel) {
    	if (!ngModel) return; 
      	function parser(value){
			value = value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
			return value;
    	}
    	ngModel.$parsers.push(parser);
    }
  }
});
