<%@ page pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<meta http-equiv="Expires" content="-1" />
<jsp:include page="../common.jsp"></jsp:include>
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/modules/blog/css/blog.css">
<style type="text/css">
</style>
</head>
<body style="background-color: #CCCCCC">
	<!-- <div class="modal" id="myModal" role="dialog">
		<div class="modal-dialog">
			Modal content
			<div class="modal-content" >
				<div class="modal-body">
					<span>欢迎来到我的小站，这里既有眼前的苟且，还有诗和远方，下面就进入我的小世界去参观吧......</span>
				</div>
				<div class="modal-footer">
					<button id="yes_blog" type="button" class="btn btn-info" data-dismiss="modal">确定</button>
				</div>
			</div>
		</div>
	</div> -->
	<div class="i1">
		<iframe id="head"></iframe>
	</div>
	<div class="i2">
		<iframe id="left" height="100%" class="ileft"></iframe>
		<iframe id="right" name="main" height="100%"></iframe>
	</div>
	<div class="i3">
		<iframe id="foot"></iframe>
	</div>
</body>
<script type="text/javascript">
	$(function() {
		repaintHeight();
		//浏览器窗口设置
		var myw, myh;
		if (window.screen) {
			myw = screen.availWidth;
			myh = screen.availHeight;
			window.moveTo(0, 0);
			window.resizeTo(myw, myh);
		} else {
			if (window.innerWidth) {
				myw = window.innerWidth;
			} else if (document.body && document.body.clientWidth) {
				myw = document.body.clientWidth;
			}

			if (window.innerHeight) {
				myh = self.innerHeight;
			} else if (document.body && document.body.clientHeight) {
				myh = document.body.clientHeight;
			}
		}
		var leftWidth = 0.15 * myw;
		var rightWidth = 0.8286 * myw;

		$("iframe").css({
			"border" : "1",
			"border-color" : "#B2DFEE",
			"border" : "none",
		});

		$("#head").attr({
			"src" : "/blog/head",
			"width" : "100%",
			"min-width" : "1300px",
			"height" : 75,
			"z-index":-1
		});

		$("#left").attr({
			"src" : "/blog/left",
			"width" : "16%",
			"min-width" : "310px",
			"scrolling" : "no",
		});

		$("#right").attr({
			"src" : "/blog/right?isPage=no",
			"width" : "83.5%",
			"min-width" : "800px",
			"scrolling" : "auto",
		});
		
		$("#foot").attr({
			"src" : "/blog/foot",
			"width" : "100%",
			"height" : 30
		});
		/* ar x=document.getElementById("left");
		var y=(x.contentWindow || x.contentDocument);
		if (y.document)y=y.document;
		y.html.style.backgroundColor="pink";
		y.body.style.backgroundColor="pink"; */

		/**
		 * iframe高度自适应
		 */
	});
/* 设置内容超过iframe高度时显示滚动条 */
	function repaintHeight() {
		var iframe = document.getElementById("right");
		var bHeight = iframe.contentWindow.document.body.scrollHeight;
		iframe.height = bHeight;
	}
</script>
</html>