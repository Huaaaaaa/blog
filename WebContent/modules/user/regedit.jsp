<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<jsp:include page="../common.jsp"></jsp:include>
<link rel="stylesheet" style="text/css" href="${pageContext.request.contextPath}/modules/user/css/regedit.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/passstrength.js"></script>
<script
	src="${pageContext.request.contextPath}/modules/user/js/regedit.js"></script>
</head>
<body>
	<div class="welcome"  style="margin-left: 15%">
		<h2>欢迎注册我的小屋！</h2><!-- <br/>和我一起记录关于你旅行、摄影、跳舞、跑步、敲代码......的小故事 -->
	</div>
	<div id="regmodal">
		<div>
			<img class="coding"
				src="${pageContext.request.contextPath}/modules/user/images/coding.jpg">
			<%-- <img class="hike"
				src="${pageContext.request.contextPath}/modules/user/images/hike.jpg"> --%>
			<img class="hiphop1"
				src="${pageContext.request.contextPath}/modules/user/images/hiphop1.jpg">
			<img class="run1"
				src="${pageContext.request.contextPath}/modules/user/images/run1.jpg">
			<img class="camera"
				src="${pageContext.request.contextPath}/modules/user/images/camera.jpg">
			<img class="code"
				src="${pageContext.request.contextPath}/modules/user/images/code.jpg">
			<img class="hiphop"
				src="${pageContext.request.contextPath}/modules/user/images/hiphop.jpg">
		</div>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" align="center">注册小屋</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" role="form" id="regedit_form"
						method="post" name="regedit_form">
						<div class="form-group">
							<label class="control-label col-sm-3" for="username">用&nbsp;&nbsp;户&nbsp;&nbsp;名:</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="username"
									name="userName" placeholder="用户名" value="admin">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-3" for="nickname">昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="nickname"
									name="nickName" placeholder="昵称" value="admin">
							</div>
						</div>
						<div class="form-group">
							<div class="strength_user_password" id="strength_user_password">
								<ul>
									<li class="veryweak"><span>风险</span></li>
									<li class="weak"><span>弱</span></li>
									<li class="medium"><span>中</span></li>
									<li class="strong"><span>强</span></li>
								</ul>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-3" for="password">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</label>
							<div class="col-sm-6">
								<input type="password" class="form-control" id="password"
									name="password" placeholder="密码" value="admin123">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-3" for="password1">确认密码:</label>
							<div class="col-sm-6">
								<input type="password" class="form-control" id="password1"
									name="password1" placeholder="密码" value="admin123">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-3" for="email">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:</label>
							<div class="col-sm-6">
								<input type="email" class="form-control" id="email"
									name="accountEmail" placeholder="电子邮箱" value="admin@163.com">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-3" for="phone">手&nbsp;&nbsp;机&nbsp;&nbsp;号:</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="phone"
									name="accountPhone" placeholder="手机号" value="12363236326">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer" style="text-align: center;">
					<button id="btn_reg" class="btn btn-info btn-md"
						data-dismiss="modal">确定</button>
					<a type="button" class="btn btn-info btn-md" id="toLogin"
						href="/jsp" data-dismiss="modal">返回</a>
				</div>
			</div>
		</div>
	</div>


	<div class="modal fade" id="alertModal" role="dialog">
		<div class="modal-dialog alert-dialog">

			<div class="modal-content">
				<div class="modal-header">
					<!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
					<h4 class="modal-title center">温馨提示</h4>
				</div>
				<div class="modal-body">
					<p class="center">Some text in the modal.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">确定</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>