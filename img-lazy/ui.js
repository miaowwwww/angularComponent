var ggUi = angular.module('ggUi', [])

ggUi.directive('ggImgLazy', ['$window', '$timeout', '$imgLazy', function($window, $timeout, $imgLazy) {

	_compile = function(ele, attr) {
		//--------- varities ---------
		var _imgSrc = attr.ggImgLazy;
		var _window = angular.element($window);
		var _top = ele[0].offsetTop;
		var _bottom = ele[0].height + _top;
		// cache what we need
		var _winH = $window.outerHeight;
		var _docT = document.documentElement.scrollTop;
		var _bodyT = document.body.scrollTop
			//------ set img offset top -------
		attr.$set('t', _top)
		attr.$set('b', _bottom)

		//------- push to the imgQueue --------------
		$imgLazy.imgQueue.push({
				attr: attr,
				cb: function(_viewBottom, _viewTop) {
					if ((attr.t <= _viewBottom) && (attr.b >= _viewTop)) {
						attr.$set('src', attr.ggImgLazy)
						return 1;		//返回值，用于后面判断是否已经显示
					}
				}
			})
			//next tick
		$timeout(function() {
				//------- bind scroll -------
				try {
					// ----- bind scroll once ------
					// _window.unbind('scroll');
					_window.bind('scroll', function() {
						// ------ scrollTop : document.documentElement.scrollTop || document.body.scrollTop --------------
						// ------ screen height $window.outerHeight -----------------
						// cache what we need
						var _winH_s = $window.outerHeight;
						var _docT_s = document.documentElement.scrollTop;
						var _bodyT_s = document.body.scrollTop
							//-------- compulate the view port position ---------
						var _viewBottom = _winH_s + (_docT_s || _bodyT_s);
						var _viewTop = (_docT_s || _bodyT_s)
							//-------- compare the view port position and offset top set img src --------
						angular.forEach($imgLazy.imgQueue, function(value,key) {
							var imgShow = value.cb(_viewBottom, _viewTop);
							if(imgShow == 1){			
								// 已经显示则从数组中删除该图片，防止再次遍历
								$imgLazy.imgQueue.splice(key,1)
							}

						})
					})
				} catch (e) {
					console.log(e)
				}

			})
			// ----- bind onload once ------
		window.onload = function() {
				var _viewBottom = _winH + (_docT || _bodyT);
				var _viewTop = (_docT || _bodyT)
				angular.forEach($imgLazy.imgQueue, function(value) {
					value.cb(_viewBottom, _viewTop)
				})
			}
			// ----- bind resize once ------
		window.onresize = function() {
			var _top = ele[0].offsetTop;
			var _bottom = ele[0].height + _top;
			attr.$set('t', _top)
			attr.$set('b', _bottom)
		}


		//----------- link function ----------

		return {
			post: function(scope, ele, attr) {

			}
		}

	}

	return {
		restrict: 'AE',
		compile: _compile
	}
}])

ggUi.factory('$imgLazy', [function() {

	var imgQueue = []

	return {

		imgQueue: imgQueue

	}
}])