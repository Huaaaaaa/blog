<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="../common.jsp"></jsp:include>
<link rel="stylesheet" href="${pageContext.request.contextPath}/modules/blog/css/blog.css">
<script type="text/javascript"src="${pageContext.request.contextPath}/modules/blog/js/edit_blog.js"></script>
<title>edit blog</title>
</head>
<body>
	<!-- 日志富文本编辑器 -->
	<div id="edit_blog" class="edit_blog">
		<form action="" id="editBlogForm">
			<label>文章标题：</label> <input type="text" class="form-control"
				name="blogTitle" id="blog_title_edit" style="width: 100%;"
				value="${blog.blogTitle}"> <label>文章内容：</label>
			<div rows="25" cols="" placeholder="这里输入正文（不超过3000字）" name="blogHtmlcontent"
				style="width: 98%" id="blogContentEdit"></div>
			<div class="panel-group" id="accordion">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion"
								href="#blog_type_edit">个人分类</a>
						</h4>
					</div>
					<div id="blog_type_edit" class="panel-collapse collapse in">
						<label class="checkbox-inline"> <input type="radio"
							value="h5" name="blogType">HTML
						</label> <label class="checkbox-inline"> <input type="radio"
							value="css" name="blogType">CSS
						</label> <label class="checkbox-inline"> <input type="radio"
							value="js" name="blogType">JavaScript
						</label> <label class="checkbox-inline"> <input type="radio"
							value="php" name="blogType">PHP
						</label> <label class="checkbox-inline"> <input type="radio"
							value="sql" name="blogType">SQL
						</label> <label class="checkbox-inline"> <input type="radio"
							value="java" name="blogType">Java
						</label> <label class="checkbox-inline"> <input type="radio"
							value="c" name="blogType">C/C++
						</label> <label class="checkbox-inline"> <input type="radio"
							value="python" name="blogType">Python
						</label>
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion"
								href="#blog_key_edit">可选关键字</a>
						</h4>
					</div>
					<div id="blog_key_edit" class="panel-collapse collapse">
						<input type="text" class="form-control" name="blogKey"
							style="width: 100%" placeholder="请输入文章中的关键字，用逗号隔开">
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion"
								href="#language_type_edit">语言类型</a>
						</h4>
					</div>
					<div id="language_type_edit" class="panel-collapse collapse">
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
						<div id="type_backlanguage_edit">
							<label>服务端：</label> <label class="checkbox-inline"> <input
								type="checkbox" value="Java" name="type_backlanguage">Java
							</label> <label class="checkbox-inline"> <input type="checkbox"
								value="PHP" name="type_backlanguage">PHP
							</label> <label class="checkbox-inline"> <input type="checkbox"
								value="C++" name="type_backlanguage">C++
							</label>
						</div>
						<div id="type_database_edit">
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

			<button id="editBlogBtn" type="button" class="btn btn-success btn-md">
				<span>保存</span>
			</button>
		</form>
	</div>
</body>
<script type="text/javascript">
$(function(){
    $("#blogContentEdit").summernote({
	heigth : 800,
	minHeight : 800,
	maxHeight : 800,
	focus : true,
	lang : 'zh-CN',
	callbacks : {}
    });
    resetStyle();
    
    /*blog内容回显  */
    $("#blogContentEdit").summernote("code", '${blog.blogHtmlcontent}');
    $("input[name='blogKey']").val('${blog.blogKey}');
    var blogType = '${blog.blogType}';
    var languageType = '${blog.blogLanguageType}';
    $("input[type='radio'][name='blogType'][value='" + blogType + "']").attr(
	    "checked", true);
    languageType = languageType.split(";");
    var pre = languageType[0].split(":")[1];
    selectLanguageType(pre);
    var back = languageType[1].split(":")[1];
    selectLanguageType(back);
    var db = languageType[2].split(":")[1];
    selectLanguageType(db);
    
    /* 修改blog*/
    editMyBlog('${blog.id}');
});

    
</script>
</html>