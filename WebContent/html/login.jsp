<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Cache-Control" content="no-cache" />
<meta name="renderer" content=”webkit|ie-comp|ie-stand”>
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" >
<meta http-equiv="Expires" content="-1" />
<title>小屋入口</title>
<link rel="stylesheet" type="stylesheet" href="../js/bootstrap/css/bootstrap.min.css">
</head>
<body style="background-color: #E6E6FA">
	<div class="wrapper">
		<div class="container"
			style="margin-top: 300px; margin-right: -200px;">
			<form class="form-horizontal" role="form" id="login_form" >
				<div class="form-group" style="text-align: center;">
					<label class="control-label col-sm-3" for="username">用户登录</label>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-2" for="username">用户名:</label>
					<div class="col-sm-3">
						<input type="text" class="form-control" id="username"
							name="username" placeholder="用户名">
					</div><span id="un"></span>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-2" for="password">密&nbsp;&nbsp;&nbsp;&nbsp;码:</label>
					<div class="col-sm-3">
						<input type="password" class="form-control" id="password"
							name="password" placeholder="密码" >
					</div><span id="pn" ></span>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-2" for="valicode">验证码:</label>
					<div class="col-sm-3">
						<input id="valicode" name="valicode" class="form-control"
							type="text" maxLength="5" >
						<div class="form-group">
							<div class="col-sm-6" style="padding-top: 10px;">
								<img id="refresh" src="/login/img">
							</div>
							<div class="col-sm-6" style="padding-top: 6px;">
								<a class="btn btn-info btn-sm" type="button"
									href="javascript:refresh('/login/img')">点击获取验证码</a>
							</div>
						</div>
					</div><span id="cn" ></span>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-3">
						<div class="checkbox">
							<label><input type="checkbox">记住密码</label>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-4">
						<button type="submit" class="btn btn-success" id="login">登录</button>
						<a type="button" href="#" class="btn btn-warning">忘记密码？</a> <a
							type="button" href="#" class="btn btn-info">注册</a>
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
<script type="text/javascript" src="../static/js/plugins/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="../static/js/plugins/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../static/js/plugins/jquery-validation/jquery.validate.js"></script>
<script type="text/javascript" src="../static/js/login.js"></script>
<script type="text/javascript">
$(function(){
	$("#username").focus();
	$("span").css("color","red");
	inputBlur();
	/*  $("#login").click(function(){
		 if(login()==false){
			 return false;
		 }else{
			 window.location.href="/index"
		 }
	 }); */
	 $("#login").click(login);
});

</script>

</html>