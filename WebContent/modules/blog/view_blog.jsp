<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="../common.jsp"></jsp:include>
<title>view blog</title>
<style type="text/css">
.blogTitle{
	text-align: left;
	font-size: 20px;
	font-style: normal;
	font-family: fantasy;
	font-weight: 5px;
	color:#6699CC;
	margin-bottom: 15px;
	margin-top: 20px;
}

.blogInfo{
	margin: 20px;
}
.mottoInfo{
	margin-top: 30px;
	margin-left: 20px;
	text-align: left;
	font-size: 18px;
	color: red;
}
</style>
</head>
<body>
	<div class="blogInfo">
		<div class="blogTitle"></div>
		<div class="blogContent"></div>
	</div>
	<div class="mottoInfo"></div>

</body>
<script type="text/javascript">
$(function(){
    $(".blogTitle").html('${blog.blogTitle}');
    $(".blogContent").html('${blog.blogHtmlcontent}');//这里设置值时必须使用单引号，以免与html中的双引号产生冲突，无法解析样式
    $(".mottoInfo").html("我想说的话："+'${userMotto}');
});
</script>
</html>