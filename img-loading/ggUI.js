var ggUi = angular.module('ggUi', [])

/*
 *  图片加载中，图片错误更换图片
 *  图片不一点一点的显示，先显示背景图片，图片整张加载完成在显示,
 *  <img img-loading loading-src="imgsrc" target-src="imgsrc" error-src="imgsrc"  />
 */
app.directive("imgLoading",["$timeout", function($timeout) {
  return {
    restrict: 'EA',
    link: _link
  };

  function _link (scope, elem, attrs) {
      var img = new Image();
      // 1.目标图片下载成功
      img.onload = function() {
        attrs.$set('src', img.src);
        delete img;
      }
      // 2.目标图片下载失败，下载错误图片
      img.onerror = function() {
      	attrs.$set('src', attrs.errorSrc);
      }
      // 3.设置默认加载中的图片
      if(attrs.loadingSrc) {
				elem.css({"background":"url(" + attrs.loadingSrc + ") no-repeat 50% 50%","background-size":"contain"});
      } 
      // 4.赋值
      img.src = attrs.targetSrc;
      // 5.配合angular的{{}},实现更新
      attrs.$observe("targetSrc", function(newvalue, oldvalue){
        img.src = newvalue;
      });
  }
}])
