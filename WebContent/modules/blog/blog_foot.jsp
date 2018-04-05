<%@ page pageEncoding="UTF-8"%><%-- 
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> --%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Cache-Control" content="no-cache" />
<meta name="renderer" content=”webkit|ie-comp|ie-stand”>
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<meta http-equiv="Expires" content="-1" />
<jsp:include page="../common.jsp"></jsp:include>
<title>Insert title here</title>
<style type="text/css">
.rightFoot {
	width: 100%;
	padding-left: 50%;
	margin-top: 3px;
}
body {
	background-color: #cccccc;
}
</style>
<body>
	<div class="rightFoot">
		<div class="footer">本网站版权归copyright@csu-cyhua所有 <span class="date"></span></div>
	</div>
</head>
<body>
<script type="text/javascript">

$(function(){
    var date = new Date()
    $("span.date").text("2016-"+date.getFullYear());
});
</script>
</body>
</html>