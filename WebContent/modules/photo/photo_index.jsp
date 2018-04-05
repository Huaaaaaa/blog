<%@ page pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> --%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/static/js/lib/bootstrap/bootstrap-3.3.7-dist/css/bootstrap.min.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/static/js/lib/jquery/jquery-3.1.0.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/static/js/lib/bootstrap/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
<title>photo index</title>
<style>
/* .carousel-inner>.item>img, .carousel-inner>.item>a>img {
	width: 70%;
	margin: auto;
} */
.carousel-inner>.item>img, .carousel-inner>.item>a>img {
	width: 80%;
	margin: auto;
}

#myCarousel {
	margin-top: 6%;
}
</style>

</head>
<body>
	<div class="container">
		<h2>Activate Carousel with JavaScript</h2>
		<div id="myCarousel" class="carousel slide">
			<!-- Indicators -->
			<ol class="carousel-indicators">
				<li class="item1 active"></li>
				<li class="item2"></li>
				<li class="item3"></li>
				<li class="item4"></li>
			</ol>

			<!-- Wrapper for slides -->
			<div class="carousel-inner" role="listbox">

				<div class="item active">
					<img
						src="${pageContext.request.contextPath}/modules/blog/images/key.png"
						alt="Chania" width="460" height="345">
					<div class="carousel-caption">
						<h3>编程</h3>
						<p>Hello World!</p>
					</div>
				</div>

				<div class="item">
					<img
						src="${pageContext.request.contextPath}/modules/blog/images/run1.jpg"
						alt="Chania" width="460" height="345">
					<div class="carousel-caption">
						<h3>跑步</h3>
						<p>跑步是一种态度！</p>
					</div>
				</div>

				<div class="item">
					<img
						src="${pageContext.request.contextPath}/modules/blog/images/fit.jpg"
						alt="Flower" width="460" height="345">
					<div class="carousel-caption">
						<h3>健身</h3>
						<p>自律给你自由！</p>
					</div>
				</div>

				<div class="item">
					<img
						src="${pageContext.request.contextPath}/modules/blog/images/outdoor.jpg"
						alt="Flower" width="460" height="345">
					<div class="carousel-caption">
						<h3>户外</h3>
						<p>徒步、爬山、骑行！</p>
					</div>
				</div>
				<div class="item">
					<img
						src="${pageContext.request.contextPath}/modules/blog/images/travel.jpg"
						alt="Flower" width="460" height="345">
					<div class="carousel-caption">
						<h3>旅行</h3>
						<p>千里之行，始于足下！</p>
					</div>
				</div>
				<div class="item">
					<img
						src="${pageContext.request.contextPath}/modules/blog/images/read.jpg"
						alt="Flower" width="460" height="345">
					<div class="carousel-caption">
						<h3>阅读</h3>
						<p>灵魂在路上!</p>
					</div>
				</div>
				<div class="item">
					<img
						src="${pageContext.request.contextPath}/modules/blog/images/photo.jpg"
						alt="Flower" width="460" height="345">
					<div class="carousel-caption">
						<h3>摄影</h3>
						<p>留住美好瞬间！</p>
					</div>
				</div>
				<div class="item">
					<img
						src="${pageContext.request.contextPath}/modules/blog/images/coffeeshop1.jpg"
						alt="Flower" width="460" height="345">
					<div class="carousel-caption">
						<h3>咖啡</h3>
						<p>hiphop</p>
					</div>
				</div>
				<div class="item">
					<img
						src="${pageContext.request.contextPath}/modules/blog/images/dance.jpg"
						alt="Flower" width="460" height="345">
					<div class="carousel-caption">
						<h3>娱乐</h3>
						<p>唱歌跳舞！</p>
					</div>
				</div>

			</div>

			<!-- Left and right controls -->
			<a class="left carousel-control" href="#myCarousel" role="button">
				<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
				<span class="sr-only">Previous</span>
			</a> <a class="right carousel-control" href="#myCarousel" role="button">
				<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
				<span class="sr-only">Next</span>
			</a>
		</div>
	</div>

</body>
<script type="text/javascript">
	$(function() {
		// Activate Carousel
		$("#myCarousel").carousel({
			interval:1000,//配置滑动的时间间隔，默认值为5000（单位：毫秒）属性方式为： data-interval="500"
			pause:hover,//配置停止滑动的动作，默认是hover，鼠标悬停在图片上时停止轮询 属性方式为：data-pause="hover"
			wrap:true,//配置是否循环滑动，true为循环，false为不循环，即在最后一张图片停止滑动，默认为true 属性方式为：data-wrap="true"
		});

		// Enable Carousel Indicators
		$(".item1").click(function() {
			$("#myCarousel").carousel(0);
		});
		$(".item2").click(function() {
			$("#myCarousel").carousel(1);
		});
		$(".item3").click(function() {
			$("#myCarousel").carousel(2);
		});
		$(".item4").click(function() {
			$("#myCarousel").carousel(3);
		});
		$(".item5").click(function() {
			$("#myCarousel").carousel(4);
		});
		$(".item6").click(function() {
			$("#myCarousel").carousel(5);
		});
		$(".item7").click(function() {
			$("#myCarousel").carousel(6);
		});
		$(".item8").click(function() {
			$("#myCarousel").carousel(7);
		});
		$(".item9").click(function() {
			$("#myCarousel").carousel(8);
		});

		// Enable Carousel Controls
		$(".left").click(function() {
			$("#myCarousel").carousel("prev");
		});
		$(".right").click(function() {
			$("#myCarousel").carousel("next");
		});

	});
</script>
</html>
