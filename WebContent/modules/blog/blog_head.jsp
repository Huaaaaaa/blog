<%@page import="java.util.Locale"%>
<%@page import="java.util.ResourceBundle"%>
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
.navbar-nav>li>a {
	cursor: hand;
}

#head {
	cursor: hand;
}

.container-fluid {
	margin-bottom: 20px;
	margin-left: 300px;
}

.head_img {
	float: left;
	/* -webkit-transform: rotate(-30deg);
	-ms-transform: rotate(-30deg);
	-moz-transform: rotate(-30deg);
	box-shadow: 0px 5px 50px #333; */
}

/* 背景色修改-开始 */
.navbar-inverse {
	background-color: #000000;
	border-color: #000000;
}

body {
	background-color: #000000;
}

/* 背景色修改-结束 */
.head_title {
	/* 设置字体名称 */
	font-family: "楷体";
	/* 设置文本的样式 */
	font-style: oblique;
	/* 设置文本是否大小写 */
	font-variant: small-caps;
	/* 设置文本粗细 */
	font-weight: 2px;
	/* 设置文本是否横向的拉伸变形 */
	font-stretch: expanded;
	/* 设置字体大小和颜色*/
	font-size: 40px;
	color: #CCFFCC;
	margin-left: 20px;
	display: inline;
}

.dropdown, .dropup {
	margin-top: 10px;
	background-color: #000;
}

.btn-primary.active, .btn-primary:active, .open>.dropdown-toggle.btn-primary
	{
	background-color: #000;
	border-color: #000;
}

.btn-primary {
	background-color: #000;
	border-color: #000;
}

.btn-primary:hover {
	background-color: #000;
	border-color: #000;
}

</style>
<%
	/* ResourceBundle rb = ResourceBundle.getBundle("i18n", new Locale(
			"en", "US")); */
	 ResourceBundle rb = ResourceBundle.getBundle("i18n",Locale.getDefault());
	 String lan = rb.getLocale().toString();
%>
</head>
<body>
	<nav class="navbar navbar-inverse" style="margin-bottom: 0px;">
		<!-- <div class="head_img">
			<img src="../../static/images/office/3.jpg" width="200px"
				height="100px;">
		</div> -->
		<div class="container-fluid header-nav">
			<div class="navbar-header">
				<a class="navbar-brand" id="head"><span
					class="glyphicon glyphicon-home"><%=rb.getString("menu.firstpage")%></span></a>
			</div>
			<ul class="nav navbar-nav">
				<li><a id="coding"><%=rb.getString("menu.coding")%></a></li>
				<li><a id="running"><%=rb.getString("menu.running")%></a></li>
				<li><a id="fit"><%=rb.getString("menu.fit")%></a></li>
				<li><a id="outdoors"><%=rb.getString("menu.outdoor")%></a></li>
				<li><a id="travel"><%=rb.getString("menu.travel")%></a></li>
				<li><a id="read"><%=rb.getString("menu.read")%></a></li>
				<li><a id="photo"><%=rb.getString("menu.photo")%></a></li>
				<li><a id="coffee"><%=rb.getString("menu.coffee")%></a></li>
				<li><a id="funny"><%=rb.getString("menu.entertainment")%></a></li>
			</ul>

			<div class="head_title" hidden="hidden">                                         
				<!-- <label>生活，除了工作，还有诗和远方......</label> -->
			</div>


			<ul class="nav navbar-nav navbar-right">
				<li><a href="javascript:" id="changeLanguage" lan="<%=lan %>"><span
						class="glyphicon glyphicon-retweet"></span><span id="lan"><%if(lan.equals("zh_CN"))%><%=rb.getString("menu.language_cn") %><%else%><%=rb.getString("menu.language_en") %></pan></span></a></li>
				<li><a href="javascript:" id="userMsgs"><span
						class="glyphicon glyphicon-user"></span>${nickName}</a></li>
				<li><a id="logout" href="javascript:void"><span
						class="glyphicon glyphicon-log-out"></span><%=rb.getString("menu.logout") %></a></li>
			</ul>
		</div>
	</nav>
</body>
<script type="text/javascript">
    $(function() {
	
	var userName = "${userName}";
	$("#head").click(function() {
	    top.location.reload();//刷新最顶端对象，用于多开窗口
	});

	//导航的跳转控制
	$(".header-nav ").find(".navbar-nav >li >a").bind(
		"click",
		function() {
		    var menuId = $(this).attr("id");
		    if (menuId && menuId != "userMsgs") {
			$(getRightFrame()).attr("src", "/" + menuId);
		    } else {
			$(getRightFrame()).attr("src",
				"/user/" + menuId + "?userName=" + userName);
		    }

		});

	$("#h5")
		.click(
			function() {
			    /* $(getLeftFrame()).attr("src","/language/navLeft?dir=h5"); */
			    var leftWindow = getLeftFrame().contentWindow;
			    var text = $(
				    leftWindow.document
					    .getElementById("article_type"))
				    .find("a:eq(0)").text("html");
			    $(getRightFrame()).attr("src",
				    "/language/navRight?dir=h5");
			});

	$("#css").click(
		function() {
		    /* $(getLeftFrame()).attr("src","/language/navLeft?dir=css"); */
		    var leftWindow = getLeftFrame().contentWindow;
		    var text = $(
			    leftWindow.document.getElementById("article_type"))
			    .find("a:eq(0)").text("css");
		    $(getRightFrame())
			    .attr("src", "/language/navRight?dir=css");
		});

	$("#js")
		.click(
			function() {
			    /* $(getLeftFrame()).attr("src","/language/navLeft?dir=js"); */
			    var leftWindow = getLeftFrame().contentWindow;
			    var text = $(
				    leftWindow.document
					    .getElementById("article_type"))
				    .find("a:eq(0)").text("js");
			    $(getRightFrame()).attr("src",
				    "/language/navRight?dir=js");
			});

	$("#php").click(
		function() {
		    /* $(getLeftFrame()).attr("src","/language/navLeft?dir=php"); */
		    var leftWindow = getLeftFrame().contentWindow;
		    var text = $(
			    leftWindow.document.getElementById("article_type"))
			    .find("a:eq(0)").text("php");
		    $(getRightFrame())
			    .attr("src", "/language/navRight?dir=php");
		});

	$("#sql").click(
		function() {
		    /* $(getLeftFrame()).attr("src","/language/navLeft?dir=sql"); */
		    var leftWindow = getLeftFrame().contentWindow;
		    var text = $(
			    leftWindow.document.getElementById("article_type"))
			    .find("a:eq(0)").text("sql");
		    $(getRightFrame())
			    .attr("src", "/language/navRight?dir=sql");
		});

	$("#java").click(
		function() {
		    /* $(getLeftFrame()).attr("src","/language/navLeft?dir=java"); */
		    var leftWindow = getLeftFrame().contentWindow;
		    var text = $(
			    leftWindow.document.getElementById("article_type"))
			    .find("a:eq(0)").text("java");
		    $(getRightFrame()).attr("src",
			    "/language/navRight?dir=java");
		});

	$("#c").click(
		function() {
		    /* $(getLeftFrame()).attr("src","/language/navLeft?dir=c"); */
		    var leftWindow = getLeftFrame().contentWindow;
		    var text = $(
			    leftWindow.document.getElementById("article_type"))
			    .find("a:eq(0)").text("c");
		    $(getRightFrame()).attr("src", "/language/navRight?dir=c");
		});

	$("#python")
		.click(
			function() {
			    /* $(getLeftFrame()).attr("src","/language/navLeft?dir=python") */;
			    var leftWindow = getLeftFrame().contentWindow;
			    var text = $(
				    leftWindow.document
					    .getElementById("article_type"))
				    .find("a:eq(0)").text("python");
			    $(getRightFrame()).attr("src",
				    "/language/navRight?dir=python");
			});

	
	//语言切换
	$("#changeLanguage").hover(
		function(){
		    var lan = $(this).attr("lan");
		    if(lan=="zh_CN"){
				$("#lan").text('<%=rb.getString("menu.language_en")%>');
		    }else{
				$("#lan").text('<%=rb.getString("menu.language_cn")%>');
		    }
	    },
	    function(){
			var lan = $(this).attr("lan");
		    if(lan=="en_US"){
				$("#lan").text('<%=rb.getString("menu.language_en")%>');
		    }else{
				$("#lan").text('<%=rb.getString("menu.language_cn")%>');
		    }
	    }
	).click(function(){
	    var lan = $("#lan").text();
	    //切换成英文
	    if(lan=="zh_CN"){
			
	    }else{
		
	    }
	});
	
	//注销
	$("#logout").click(function() {
	    window.parent.window.location.href = "/login/logout";
	});
    });
</script>
</html>