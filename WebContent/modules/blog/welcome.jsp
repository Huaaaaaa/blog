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
<title>blog首页</title>
<style type="text/css">
.navbar-inverse{
 background-color: #363636;
 font-size: large;
}
</style>
</head>
<body style="background-color: #E6E6FA">
<div>
		<nav class="navbar navbar-inverse">
			<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand"><span class="glyphicon glyphicon-home"></span></a>
				</div>
				<ul class="nav navbar-nav">
					<li><a href="#left">HTML</a></li>
					<li><a href="#left">CSS</a></li>
					<li><a href="#">JavaScript</a></li>
					<li><a href="#php">PHP</a></li>
					<li><a href="#">SQL</a></li>
					<li><a href="#">Java</a></li>
					<li><a href="#">C++</a></li>
					<li><a href="#">Python</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li><a href="#"><span class="glyphicon glyphicon-user"></span>当前用户</a></li>
					<li><a href="/login/logout"><span
							class="glyphicon glyphicon-log-out"></span>注销</a></li>
				</ul>
			</div>
		</nav>
</div>
<div class="container-fluid">
  <div class="row">
    <div class="col-sm-2" style="background-color:#CCCCFF;">
		<div class="box" id="block">
			<!-- 时钟数 -->
			<div class="dot_box">
				<div class="dot">6</div>
				<div class="dot">5</div>
				<div class="dot">4</div>
				<div class="dot">3</div>
				<div class="dot">2</div>
				<div class="dot">1</div>
				<div class="dot">12</div>
				<div class="dot">11</div>
				<div class="dot">10</div>
				<div class="dot">9</div>
				<div class="dot">8</div>
				<div class="dot">7</div>
			</div>
			<!-- 时分秒针 -->
			<div class="clock_line hour_line" id="hour_line"></div>
			<div class="clock_line minute_line" id="minute_line"></div>
			<div class="clock_line second_line" id="second_line"></div>
			<!-- 日期 -->
			<div class="date_info" id="date_info"></div>
			<!-- 时间 -->
			<div class="time_info">
				<div class="time" id="hour_time"></div>
				<div class="time" id="minute_time"></div>
				<div class="time" id="second_time"></div>
			</div>
		</div>
    </div>
    <div class="col-sm-10" style="background-color:#CCFFCC;">
    	<div id="blogList">gggggggg</div>
    </div>
  </div>
</div>

	
	
	


</body>
<script type="text/javascript">
$(function(){
	setTimeout(function(){
		window.location.href="/jsp/login.jsp";
		alert("登录过期，请重新登录");
	}, 24*60*60*1000);
	
});

</script>
</html>