(function(jQuery){
	jQuery.fn.layerfocus = function(contentContainer,navContainer,options)
	{
		var defaults = {
			time		:3500,		//轮换秒数
            index		:1,			//默认第几张		
			speed		:500,		//切换时间
			dis			:1000,
			splits 		:1			//总标签
		};
		var opts = jQuery.extend(defaults, options);
		
		var _index = opts.index;
		var _time = opts.time;
		var _speed = opts.speed;
		var _dis = opts.dis;
		var _splits = opts.splits;
		
		var _this = jQuery(this);
		
		var node_ul = contentContainer.find("ul");	
		var node_li = node_ul.find("li");
		var node_li_nav = navContainer.find("li");
		
		var li_len = node_li.length;
		
		var _countIndex = (node_li.length/opts.split -  1)    
		var _start_left = node_ul.css("left");                
 		
		//var _timer = setInterval(show, _time);
   
        init();
		//alert(1);
		function init() {
			
			node_li_nav.click(function() {
				 _dis=node_li.eq(0).width();
				 node_ul.stop(true, true);
				 node_li_nav.eq(_index-1).removeClass("selected");
				 //_index = parseInt(jQuery(this).attr("_index"));
				 _index = jQuery(this).index()+1;
				 //alert(_index);
				 node_li_nav.eq(_index-1).addClass("selected");
				 _left = -_dis*(_index - 1);
				 //node_ul.css({"opacity":0.1})
				 node_ul.animate({"left": _left}, _speed,function(){
				   //node_ul.css({"opacity":1})
				 });
				//_timer = clearInterval(_timer);
			}).mouseout(function() {
				//_timer = setInterval(show, _time);
			});
		}
		
		function show() {
                        //alert(2);
			_dis=node_li.eq(0).width();
			node_ul.stop(true, true);
			node_li_nav.eq(_index-1).removeClass("selected");
			_index++;
			if(_index > li_len) {
				node_ul.append(node_ul.find("li:lt(1)"));
				node_ul.css("left", parseInt(node_ul.css("left")) + _dis);
				node_li_nav.eq(0).addClass("selected");
			}
			else {
				node_li_nav.eq(_index-1).addClass("selected");
			}
			var _left = parseInt(node_ul.css("left")) - _dis;
			node_ul.animate({"left": _left}, _speed, function() {
					if(_index > li_len) {
						node_ul.prepend(node_ul.find("li:gt("+(li_len-_splits-1)+")"));
						node_ul.css("left", 0);
						_index = 1;
					}
					
			});
			
		}
	}
})(jQuery);