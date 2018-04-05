<%@ page pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="../common.jsp"></jsp:include>
<link rel="stylesheet" style="text/css"
	href="${pageContext.request.contextPath}/modules/coding/css/coding.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/modules/coding/js/coding_blog.js"></script>
<title>coding_blog</title>
</head>
<body>
	<table id="coding"></table>
</body>
<script type="text/javascript">

    $(function() {
	
	var uid = '${uid}';
	var tableId = "coding";
	var language_type = '${language_type}';
	InitMainTable("coding",'${uid}','${language_type}');
	setCss();
	newBlog("${uid}");
	editBlog("${uid}");
	deleteBlog(tableId,uid,language_type);
	returnBlog("btn-return", "coding");
    });
    //设置表格样式
    function setCss() {
	$(".bootstrap-table").css("margin-top", "20px");
	$(".fixed-table-container").css({
	    "margin-left" : "10px",
	    "margin-right" : "10px",
	    "height" : "80%"
	});
	$(".btn-default").css("height", "34px");
	$(".fixed-table-toolbar .columns").css({
	    "margin-right" : "10px",
	    "margin-top" : "0px"
	});
	$(
		".fixed-table-toolbar .bs-bars, .fixed-table-toolbar .search, .fixed-table-toolbar .columns")
		.css({
		    "margin-top" : "0px"
		});
	$(".fixed-table-footer").find("table").remove();
	$("span.page-list").show();
	$(".fixed-table-toolbar")
		.prepend(
			'<div style="display:inline;margin-left:10px;"><button class="btn btn-md btn-info btn-add">新建</button><button class="btn btn-md btn-info btn-edit">修改</button><button class="btn btn-md btn-info btn-delete">删除</button><button class="btn btn-md btn-info btn-return">返回</button></div>');

    }
</script>



</html>