<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="../common.jsp"></jsp:include>
<link rel="stylesheet" href="${pageContext.request.contextPath}/modules/blog/css/blog.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/modules/blog/js/add_blog.js"></script>
<title>新建日志</title>
</head>
<body>
    <input type="text" hidden="hidden" name="blog_content" id="blogContentHidden"> 
	<!-- 日志富文本编辑器 -->
	<div id="write_blog" class="write_blog">
		<form action="" id="createBlogForm">
			<label>文章标题：</label> <input type="text" class="form-control" name="blogTitle" id="blog_title" style="width: 100%;"> 
			<label>文章内容：</label>
			<div rows="25" cols="" placeholder="这里输入正文（不超过3000字）"
				name="blogText" style="width: 98%" id="blogContent"></div>
			<div class="panel-group" id="accordion">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion"
								href="#blog_type">个人分类</a>
						</h4>
					</div>
					<div id="blog_type" class="panel-collapse collapse in">
						<label class="checkbox-inline"> <input type="radio" value="h5" name="blogType">HTML</label> 
						<label class="checkbox-inline"> <input type="radio" value="css" name="blogType">CSS</label> 
						<label class="checkbox-inline"> <input type="radio" value="js" name="blogType">JavaScript</label>
						<label class="checkbox-inline"> <input type="radio" value="php" name="blogType">PHP</label>
						<label class="checkbox-inline"> <input type="radio" value="sql" name="blogType">SQL</label>
						<label class="checkbox-inline"> <input type="radio" value="java" name="blogType">Java</label>
						<label class="checkbox-inline"> <input type="radio" value="c" name="blogType">C/C++</label>
						<label class="checkbox-inline"> <input type="radio" value="python" name="blogType">Python</label>
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion"
								href="#blog_key">可选关键字</a>
						</h4>
					</div>
					<div id="blog_key" class="panel-collapse collapse">
						<input type="text" class="form-control"	name="blogKey" style="width:100%" placeholder="请输入文章中的关键字，用逗号隔开">
						<!-- <label class="checkbox-inline"> <input type="radio"
							value="0" name="blog_option">发布至首页候选区
						</label> <label class="checkbox-inline"> <input type="radio"
							value="1" name="blog_option">发布至博客社区首页
						</label><br> <strong>【发文说明】<br>博客园是面向开发者的知识分享社区，不允许发布任何推广、广告、政治方面的内容。<br>
							博客园首页（即网站首页）只能发布原创的、高质量的、能让读者从中学到东西的内容。<br>
							如果博文质量不符合首页要求，会被工作人员移出首页，望理解。如有疑问，请联系contact@cnblogs.com。
						</strong> -->
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion"
								href="#language_type">语言类型</a>
						</h4>
					</div>
					<div id="language_type" class="panel-collapse collapse">
						<div id="type_prelanguage">
							<label>前端：</label> <label class="checkbox-inline"><input
								type="checkbox" value="JavaScript" name="type_prelanguage">JavaScript
							</label> <label class="checkbox-inline"> <input type="checkbox"
								value="JQuery" name="type_prelanguage">JQuery
							</label> <label class="checkbox-inline"> <input type="checkbox"
								value="Bootstrap" name="type_prelanguage">Bootstrap
							</label><label class="checkbox-inline"> <input type="checkbox"
								value="HTML" name="type_prelanguage">HTML
							</label><label class="checkbox-inline"> <input type="checkbox"
								value="CSS" name="type_prelanguage">CSS
							</label>
						</div>
						<div id="type_backlanguage">
							<label>服务端：</label> <label class="checkbox-inline"> <input
								type="checkbox" value="Java" name="type_backlanguage">Java
							</label> <label class="checkbox-inline"> <input type="checkbox"
								value="PHP" name="type_backlanguage">PHP
							</label> <label class="checkbox-inline"> <input type="checkbox"
								value="C++" name="type_backlanguage">C++
							</label>
						</div>
						<div id="type_database">
							<label>数据库：</label> <label class="checkbox-inline"> <input
								type="checkbox" value="MySql" name="type_database">MySQL
							</label> <label class="checkbox-inline"> <input type="checkbox"
								value="Oracle" name="type_database">Oracle
							</label> <label class="checkbox-inline"> <input type="checkbox"
								value="Postgresql" name="type_database">Postgresql
							</label>
						</div>
					</div>
				</div>
			</div>

			<button id="save_blog" type="button" class="btn btn-success btn-md">
				<span>保存</span>
			</button>
		</form>
	</div>

</body>
<script type="text/javascript">
    $(function() {
		$("#blogContent").summernote({
		    heigth:800,
		    minHeight:800,
		    maxHeight:800,
		    focus:true,
		    lang:'zh-CN',
		    callbacks:{
			
		    }
		});
		
		resetStyle();
		toSaveBlog('${uid}');
    });
</script>
</html>