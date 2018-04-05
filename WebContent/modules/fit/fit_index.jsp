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
<title>fit index</title>
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
	$(function() {
		$("div.test").on("click",function(event) {
			console.info("触发div" + $(this).index());
		});

		$("div.test ul").on("click", function(event) {
			console.info("触发ul");
		});
		
		$("div.test ul>li").on("click", function(event) {
			/* event.stopPropagation();
			event.cancelBubble = true; */
			console.info("触发li" + $(this).index());
		});

	});
</script>
</html>