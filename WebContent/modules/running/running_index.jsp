<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="../common.jsp"></jsp:include>
<style type="text/css">
.test {
	background-color: white;
	margin-top: 20px;
	width: 400px;
}

.c1 {
	background-color: #FF9900;
}

.c2 {
	background-color: #FFFFCC;
}
</style>
<title>running index</title>
</head>
<body>
	<div class="test">
		<ul>
			<li class="c1">test1</li>
			<li class="c2">test2</li>
			<li class="c1">test3</li>
			<li class="c2">test4</li>
			<li class="c1">test5</li>
			<li class="c2">test6</li>
		</ul>
	</div>
</body>

<script type="text/javascript">
/* 	document.getElementById("test").addEventListener("click", function(e) {
		alert("触发div");
	}, true);
	document.getElementById("ul").addEventListener("click", function(e) {
		alert("触发ul");
	},true);
	var lis = document.getElementsByTagName("li");
	for (var i = 0; i < lis.length; lis++) {
		lis[i].addEventListener("click", function(e) {
			alert("触发li"+i);
		},true);
	}
 */	
 /* 获取触发事件的源对象 */
 function getEventTarget(e){
	 var event = window.event || e;
	 var obj = event.target || event.srcElement;
	 console.info(obj+"is clicked");
 }
	 
	$(function() {
		
		/* var a=1,b=2,c=1;
		var c = a==b;
		console.info(c = a==b);//==>=(优先级测试)
		console.info(c); */
	/* $("div.test").on("click","ul>li", function(event) {
				console.info("触发li"+$(this).index());
			}); */

		$("div.test ul").on("click", function(event) {
			console.info("触发ul");
			getEventTarget(event);
		});
			
		$("div.test ul>li").on("click", function(event) {
			event.stopPropagation();
			event.cancelBubble = true;
			console.info("触发li" + $(this).index());
			getEventTarget(event);
		});
		

		$("div.test ul").append("<li class='c1'>test7</li>");
	});
</script>
</html>