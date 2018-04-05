<%@ page pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="../common.jsp"></jsp:include>
<title>coding</title>
<link rel="stylesheet" style="text/css"
	href="${pageContext.request.contextPath}/modules/coding/css/coding.css">
</head>
<body>
	<input hidden="hidden" id="uId" value="${uId}">
	<div class="coding">
		<ul class="inner-wrapper">
			<li class="act act_css">
				<div class="language language_css3">
					<div class="img">
						<img
							src="${pageContext.request.contextPath}/modules/coding/images/css.png">
					</div>
				</div>
				<div class="des">
					<img class="font_img"
						src="${pageContext.request.contextPath}/modules/coding/images/font_css.png">
					<div class="toDes">
						<ul>
							<li>CSS 指层叠样式表 (Cascading Style Sheets)</li>
							<li>样式定义如何显示 HTML元素</li>
							<!-- <li>样式通常存储在样式表中</li> -->
							<li>......</li>
						</ul>
					</div>
				</div>
			</li>
			<li class="act act_h5">
				<div class="language language_h5">
					<div class="img">
						<img
							src="${pageContext.request.contextPath}/modules/coding/images/h5.png">
					</div>
				</div>
				<div class="des">
					<img class="font_img"
						src="${pageContext.request.contextPath}/modules/coding/images/font_h5.png">
					<div class="toDes">
						<ul>
							<li>HTML 指的是超文本标记语言: HyperText Markup Language</li>
							<li>HTML 不是一种编程语言，而是一种标记语言</li>
							<!-- <li>HTML 使用标记标签来描述网页</li> -->
							<li>......</li>
						</ul>
					</div>
				</div>
			</li>
			<li class="act act_js">
				<div class="language language_js">
					<div class="img">
						<img
							src="${pageContext.request.contextPath}/modules/coding/images/js.png">
					</div>
				</div>
				<div class="des">
					<img class="font_img"
						src="${pageContext.request.contextPath}/modules/coding/images/font_js.png">
					<div class="toDes">
						<ul>
							<li>JavaScript 是一种轻量级的编程语言</li>
							<li>JavaScript 是可插入 HTML 页面的编程代码</li>
							<!-- <li>JavaScript 插入 HTML 页面后，可由所有的现代浏览器执行</li> -->
							<li>......</li>
						</ul>
					</div>
				</div>
			</li>
			<li class="act act_php">
				<div class="language language_php">
					<div class="img">
						<img
							src="${pageContext.request.contextPath}/modules/coding/images/php.png">
					</div>
				</div>
				<div class="des">
					<img class="font_img"
						src="${pageContext.request.contextPath}/modules/coding/images/font_php.png">
					<div class="toDes">
						<ul>
							<li>PHP：Hypertext Preprocessor，即"PHP：超文本预处理器",是一种通用开源脚本语言</li>
							<li>PHP 脚本在服务器上执行</li>
							<!-- <li>PHP 可免费下载使用</li> -->
							<li>......</li>
						</ul>
					</div>
				</div>
			</li>
		</ul>
		<ul class="inner-wrapper">
			<li class="act act_java">
				<div class="language language_java">
					<div class="img">
						<img
							src="${pageContext.request.contextPath}/modules/coding/images/java.png">
					</div>
				</div>
				<div class="des">
					<img class="font_img"
						src="${pageContext.request.contextPath}/modules/coding/images/font_java.png">
					<div class="toDes">
						<ul>
							<li>Java语言是面向对象的</li>
							<li>Java语言是分布式的</li>
							<!-- <li>Java语言是可移植的</li> -->
							<li>......</li>
						</ul>
					</div>
				</div>
			</li>
			<li class="act act_c">
				<div class="language language_c">
					<div class="img">
						<img
							src="${pageContext.request.contextPath}/modules/coding/images/c.png">
					</div>
				</div>
				<div class="des">
					<img class="font_img"
						src="${pageContext.request.contextPath}/modules/coding/images/font_c+.png">
					<div class="toDes">
						<ul>
							<li>C++ 完全支持面向对象的程序设计</li>
							<li>C++ 被认为是一种中级语言，它综合了高级语言和低级语言的特点</li>
							<!-- <li>C++ 是 C 的一个超集，事实上，任何合法的 C 程序都是合法的 C++ 程序</li> -->
							<li>......</li>
						</ul>
					</div>
				</div>
			</li>
			<li class="act act_python">
				<div class="language language_python">
					<div class="img">
						<img
							src="${pageContext.request.contextPath}/modules/coding/images/python.png">
					</div>
				</div>
				<div class="des">
					<img class="font_img"
						src="${pageContext.request.contextPath}/modules/coding/images/font_p.png">
					<div class="toDes">
						<ul>
							<li>Python 是一种解释型语言</li>
							<li>Python 是交互式语言</li>
							<!-- <li>Python 是面向对象语言</li> -->
							<li>......</li>
						</ul>
					</div>
				</div>
			</li>
			<li class="act act_sql">
				<div class="language language_sql">
					<div class="img">
						<img
							src="${pageContext.request.contextPath}/modules/coding/images/sql.png">
					</div>
				</div>
				<div class="des">
					<img class="font_img"
						src="${pageContext.request.contextPath}/modules/coding/images/font_sql.png">
					<div class="toDes">
						<ul>
							<li>SQL，指结构化查询语言，全称是 Structured Query Language</li>
							<li>SQL 让您可以访问和处理数据库</li>
							<!-- <li>SQL 是一种 ANSI（American National Standards Institute 美国国家标准化组织）标准的计算机语言</li> -->
							<li>......</li>
						</ul>
					</div>
				</div>
			</li>
		</ul>
	</div>
</body>
<script type="text/javascript">
	$(function() {
		var uId = $("#uId").val();
		var languageLi = $("ul li.act");
		languageLi.each(function() {
			var classes = $(this).attr("class").split(" ");
			var suffix = classes[1].substr(classes[1].indexOf("_") + 1);//获取后缀
			$(this).click(function() {
				$(getRightFrame()).attr("src", "/coding/toBlogList?uId="+uId+"&language_type="+suffix);
			});
		});
	});
</script>
</html>