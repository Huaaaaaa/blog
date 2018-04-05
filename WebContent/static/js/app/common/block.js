var clock = $("#clock"); 
var browser = judgeBrowser();
function initNumXY(){  
//	1、12个数字的位置设置  
	var radius = 120;//大圆半径
	var dot_num = 360/$(".dot").length;//每个div对应的弧度数  
//	每一个dot对应的弧度;  
	var ahd = dot_num*Math.PI/180;  
	$(".dot").each(function(index, el) {  
		$(this).css({  
			"left":180+Math.sin((ahd*index))*radius,  
			"top":180+Math.cos((ahd*index))*radius  
		});  
	});  
	// 2、刻钟设置  
	for(var i = 0; i < 60; i++) {  
		clock.html(clock.html()+"<div class='clock-scale'> " +   
				"<div class='scale-hidden'></div>" +   
				"<div class='scale-show'></div>" +   
		"</div>");  
	}
	var scale =$(".clock-scale");  
	for(var i = 0; i < scale.length; i++) {  
		scale[i].css({"transform":'rotate(' + (i * 6 - 90) + 'deg)',
					"-webkit-transform":'rotate(' + (i * 6 - 90) + 'deg)',
					"-ms-transform":'rotate(' + (i * 6 - 90) + 'deg)',
					"-moz-webkit-transform":'rotate(' + (i * 6 - 90) + 'deg)'});  
	}  
}  
initNumXY();//调用上面的函数  
//获取时钟id  
var hour_line = $("#hour_line"),  
minute_line = $("#minute_line"),  
second_line = $("#second_line"),  
date_info=$("#date_info"),//获取date_info  
hour_time = $("#hour_time"),// 获去时间id  
minute_time = $("#minute_time"),  
second_time = $("#second_time");  
//3、设置动态时间  
function setTime(){  
	var nowdate = new Date();  
	var year = nowdate.getFullYear(),  
	month = nowdate.getMonth()+1,  
	day = nowdate.getDate(),
	hours = nowdate.getHours(),  
	minutes = nowdate.getMinutes(),  
	seconds = nowdate.getSeconds(),  
	date = nowdate.getDate();  
	var weekday =["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];  
	// 获取日期id  
	date_info.html(year+"年"+month+"月"+day+"日   "+weekday[day]);  
	hour_time.html(hours >=10 ? hours : "0"+hours);  
	minute_time.html(minutes >=10 ? minutes : "0"+minutes);  
	second_time.html(seconds >=10 ? seconds : "0"+seconds);  
	//时分秒针设置  
	var hour_rotate = (hours*30-90) + (Math.floor(minutes / 12) * 6);  
	hour_line.css({"transform":'rotate(' + hour_rotate + 'deg)',
				   "-webkit-transform":'rotate(' + hour_rotate + 'deg)',
				   "-ms-transform":'rotate(' + hour_rotate + 'deg)',
				   "-moz-webkit-transform":'rotate(' + hour_rotate + 'deg)'});  
	
	minute_line.css({"transform":'rotate(' + (minutes*6 - 90) + 'deg)',
					 "-webkit-transform":'rotate(' + (minutes*6 - 90) + 'deg)',
					 "-ms-transform":'rotate(' + (minutes*6 - 90) + 'deg)',
					 "-moz-webkit-transform":'rotate(' + (minutes*6 - 90) + 'deg)'}); 
	
	second_line.css({"transform":'rotate(' +(seconds*6 - 90) + 'deg)',
					 "-webkit-transform":'rotate(' + (seconds*6 - 90) + 'deg)',
					 "-ms-transform":'rotate(' + (seconds*6 - 90) + 'deg)',
					 "-moz-webkit-transform":'rotate(' + (seconds*6 - 90) + 'deg)'});
}  
//setTime();  
setInterval(setTime, 1000);