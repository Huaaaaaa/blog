<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Cache-Control" content="no-cache" />
<meta name="renderer" content=”webkit|ie-comp|ie-stand”>
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" >
<meta http-equiv="Expires" content="-1" />
<jsp:include page="../common.jsp"></jsp:include>
<script type="text/javascript" src="${pageContext.request.contextPath}/modules/blog/js/blog_right_page.js"></script>
<title>Insert title here</title>
<style type="text/css">
div.alert.alert-danger {
	height: 30px;
	padding: 3px;
}

#filecheck {
	height: 30px;
	padding: 3px;
	margin-left: 2px;
	margin-top: 10px;
}
</style>
</head>
<body>
	<div class="blog_btn">
		<button id="blog_nopage" type="button" class="btn btn-info btn-lg">
			<span class="glyphicon">不分页列表</span>
		</button>
		<button id="add_blog" type="button" class="btn btn-info btn-lg">
			<span class="glyphicon glyphicon-plus">新建</span>
		</button>
		<!-- <button id="edit_blog" type="button" class="btn btn-info btn-lg">
			<span class="glyphicon glyphicon-edit">修改</span>
		</button>
		<button id="view_blog" type="button" class="btn btn-info btn-lg">
			<span class="glyphicon glyphicon-eye-open">查看</span>
		</button> -->
		<button id="upload_blog" type="button" class="btn btn-info btn-lg" >
			<span class="glyphicon glyphicon-upload">上传</span>
		</button>
		<!-- <button id="download_blog" type="button" class="btn btn-info btn-lg">
			<span class="glyphicon glyphicon-download">下载</span>
		</button> -->
		<button id="preview_blog" type="button" class="btn btn-info btn-lg">
			<span class="glyphicon glyphicon-eye-open">预览</span>
		</button>
		<button id="backto_blog" type="button" class="btn btn-info btn-lg">
			<span class="glyphicon glyphicon-circle-arrow-left">返回列表</span>
		</button>
		<button id="upload_blog_list" type="button" class="btn btn-info btn-lg">
			<span class="glyphicon glyphicon-eye-open">上传列表</span>
		</button>
	</div>
	<div id="content">
	<!-- 日志列表-->
		<div class="row-fluid">
			<h3>博客列表</h3>
			<table id="blog_table_nopage"
				class="display table-striped table-bordered table-hover table-condensed" cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>博客信息</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
		<div class="blog_list" id="blog_list" style="width: 1000px;">
			<div class="list-group" id="blog0"></div>
		</div>
	</div>

	<div class="modal fade" id="myModal" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" id="close">&times;</button>
					<h4 class="modal-title">上传文件</h4>
				</div>
				<div class="modal-body">
					<div id="sizecheck" class="alert alert-danger">
						提示：上传文件大小不能超过50M!
					</div>
					<form action="" enctype="multipart/form-data" id="upload_file_form" accept="application/msword">
						<span style="display: inline;margin-left: 50px;">请选择上传文件:</span><input id="file1" type="file" name="up_blog" style="display: inline;">
						<div id="filecheck" class="alert alert-danger"><strong>Warning!</strong>只能上传pdf和word两种类型的文件</div>
					</form>
				</div>
				<div class="modal-footer">
					<button id="yes_blog" type="button" class="btn btn-info">确定</button>
					<button id="no_blog" type="button" class="btn btn-info" data-dismiss="modal">取消</button>
				</div>
			</div>

		</div>
	</div>

</body>
</html>