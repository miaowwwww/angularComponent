var ggUi = angular.module('ggUi', [])

/*
 *  指令用于ul上,ul不用设置overflow，
 *  ul外层有块元素包裹，如：div，div设置overflow：hidden;以及可视的height
 *  异步获取的arry,若没有该参数，则需要写死内容
 *  speed:滚动速度
 *  delay：滚动间隔时间
 *  model：监听的父作用域数组
 *  <div>
 *    <ul slide-follow speed="300" delay="2000" model="arr" >
 *      <li ng-repeat='item in [1,2...]'></li>  
 *    </ul>
 *  </div>
 */
ggUi.directive("slideFollow", ["$timeout", "$interval", function($timeout, $interval) {
	return {
		restrict: 'A',
		replace: false,
		link: _link
	}

	function _link(scope, elem, attrs) {
		var iliCount, totalCount, timer, index, model, closeFn,
			delay = attrs.delay || 2000,
			speed_s = attrs.speed || 300,
			speed_ms = speed_s / 1000;

		// 静态li时
		$timeout(function() {
			if (elem.find('li').length > 0) {
				init();
			}
		});

		// 异步获取数组后，重新启动
		model = attrs.model;
		if(model){
			closeFn = scope.$watch(model, function(newValue) {
				if (newValue && newValue.length) {
					closeFn();
					newValue.length > 0 && init();
				}
			});
		}

		// 1.初始化
		function init() {
			$interval.cancel(timer);
			reset();
			$timeout(function() {
				var arr = elem.children("li");
				iliCount = arr.length;
				// 复制一份内容
				elem.html(elem.html() + elem.html());

				totalCount = elem.children("li").length;
				start();
			}, 16)
		}

		// 2.开始滚动
		function start() {
			index = 1;
			timer = $interval(function() {
				// 1.上滚
				next();

				index = index + 1;
				// 2.判断是否重置
				if (index > iliCount) {
					index = 1;
					setTimeout(function() {
						reset();
					}, speed_s);
				};

			}, delay)
		}

		// 3.重置
		function reset() {
			elem.css({
				"-webkit-transition": "all 0s",
				"transition": "all 0s",
				"-webkit-transform": "translate3d(0,0,0)",
				"transform": "translate3d(0,0,0)"
			})
		}

		// 4.下一个
		function next() {
			var percent = index / totalCount * 100;
			elem.css({
				"-webkit-transition": "all " + speed_ms + "s",
				"transition": "all " + speed_ms + "s",
				"-webkit-transform": "translate3d(0,-" + percent + "%,0)",
				"transform": "translate3d(0,-" + percent + "%,0)"
			});
		}


	}

}]);