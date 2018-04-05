<%@ page pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Cache-Control" content="no-cache" />
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<meta http-equiv="Expires" content="-1" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>小屋入口</title>
<link rel="stylesheet" style="text/css"
	href="${pageContext.request.contextPath}/modules/login/css/login.css">
<jsp:include page="../common.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/modules/login/js/login.js"></script>
</head>
<body style="background-color: #E6E6FA" onload="jumpToTop()">

	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-6 work">
				<img class="imgs img1" alt=""
					src="${pageContext.request.contextPath}/modules/login/images/3.jpg">
				<img class="imgs img2" alt=""
					src="${pageContext.request.contextPath}/modules/login/images/2.jpg">
				<img class="imgs img3" alt=""
					src="${pageContext.request.contextPath}/modules/login/images/7.jpg">
				<img class="imgs img4" alt=""
					src="${pageContext.request.contextPath}/modules/login/images/6.jpg">
			</div>
			<div class="col-sm-6 form">
				<form class="form-horizontal" role="form" id="login_form">
					<div class="form-group" style="text-align: center;">
						<label for="username" class="home">小<i
							class="glyphicon glyphicon-home"></i>入口
						</label>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-2" for="username">用户名:</label>
						<div class="col-sm-5">
							<input type="text" class="form-control" id="username"
								name="username" placeholder="请输入用户名/邮箱/手机号">
						</div>
						<span id="un"></span>
					</div>
					<div class="form-group">
						<label class="control-label col-sm-2" for="password">密&nbsp;&nbsp;&nbsp;&nbsp;码:</label>
						<div class="col-sm-5">
							<input type="password" class="form-control" id="password"
								name="password" placeholder="密码">
						</div>
						<span id="pn"></span>
					</div>
					<div class="form-group" id="form_valicode">
						<label class="control-label col-sm-2" for="valicode">验证码:</label>
						<div class="col-sm-5">
							<input id="valicode" name="valicode" class="form-control"
								type="text" maxLength="5" placeholder="验证码">
							<div class="form-group">
								<div class="col-sm-6" style="padding-top: 10px;">
									<img id="refresh" src="/login/img">
								</div>
								<div class="col-sm-6" style="padding-top: 6px;">
									<a class="btn btn-info btn-sm" type="button"
										href="javascript:refresh('/login/img')">点击获取验证码</a>
								</div>
							</div>
						</div>
						<span id="cn"></span>
					</div>
					<div class="form-group">
						<div class="col-sm-offset-2 col-sm-3">
							<div class="checkbox">
								<label class="control-label"><input type="checkbox"
									id="flag">记住密码</label>
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-offset-2 col-sm-6">
							<button type="submit" class="btn btn-success" id="login">登录</button>
							<a type="button" href="/login/findpass.jsp"
								class="btn btn-warning">忘记密码？</a> <a type="button"
								class="btn btn-info" href="/user/toRegedit">注册</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- <div id="stopSubmit" class="modal fade" role="dialog">
		<div class="modal-dialog">

			Modal content
			<div class="modal-content">
				<div class="modal-body">失败次数太多，已锁定登陆，请稍后重试
				</div>
			</div>
		</div>
	</div> -->
	<div class="modal fade" id="myModal" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-body">
					<div id="sizecheck" class="alert alert-danger">
						提示：登录失败次数超过10，登录已被锁定，请在30分钟后尝试重新登录<span id="times"></span>
					</div>

				</div>
			</div>

		</div>
	</div>
	<div class="footer">本网站版权归copyright@csu-cyhua所有 <span class="date"></span></div>
</body>
<script type="text/javascript">
    /* var userInfo = getCookie("loginInfo"); */
    $(function(){
		var date = new Date();
		$("span.date").text("2016-"+date.getFullYear());
	    $("span.date").css("color","black");
	    var local = "${local}";
	    console.info(local);
	    var flag = "${flag}";
	    if (flag == "true") {
			var userInfo = "${loginInfo}";
			var userName ,password;
			if(userInfo){
			    userInfo = userInfo.split(":");
			    password = userInfo[0];
			    userName = userInfo[1];
			    userName = $.base64.decode(userName);
			}
			console.info("password:"+password);
			$("#username").val(userName);
			$("#password").val(password);
			$("#flag").attr("checked", true);
	    } else {
			$("#userName").val("");
			$("#password").val("");
			$("#flag").attr("checked", false);
	    }
    });
    
   	/*解决iframe子页面超时后的登录页被嵌在当前页*/
    function jumpToTop() {
		if(window !=top){
			top.location.href=location.href;
		}
	}
   	
    

</script>
</html>
