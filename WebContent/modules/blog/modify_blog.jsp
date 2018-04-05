<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="../common.jsp"></jsp:include>
<title>新建日志</title>
</head>
<body>

	<div class="blog_btn">
		<button id="edit_blog" type="button" class="btn btn-info btn-lg">
			<span class="glyphicon glyphicon-edit">修改</span>
		</button>
		<button id="upload_blog" type="button" class="btn btn-info btn-lg">
			<span class="glyphicon glyphicon-upload">上传</span>
		</button>
		<button id="preview_blog" type="button" class="btn btn-info btn-lg">
			<span class="glyphicon glyphicon-eye-open">预览</span>
		</button>
	</div>
	<!-- 日志富文本编辑器 -->
	<div id="write_blog" class="write_blog">
		<form action="" id="createBlogForm">
			<label>文章标题：</label> <input type="text" class="form-control"
				name="blog_title" id="blog_title_edit" style="width: 200px;" value="${blog.blog_title}"> <input
				type="text" hidden="hidden" name="blog_content" > 
			<label>博客地址：</label><input type="text" class="form-control" 
			    name="blog_url" id="blog_url_edit"
				style="width: 200px;" value="${blog.blog_url}" > 
		   <label>文章内容：</label>
			<textarea rows="25" cols="" placeholder="这里输入正文（不超过3000字）"
				name="text" style="width: 98%" id="nicContent"></textarea>
			<div class="panel-group" id="accordion">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion"
								href="#blog_type">个人分类</a>
						</h4>
					</div>
					<div id="blog_type_edit" class="panel-collapse collapse in">
						<label>请输入文章中的关键字：</label> <input type="text" class="form-control"
							name="blog_key" style="width: 200px;" id="blog_key"> <label
							class="checkbox-inline"> <input type="radio" value="1"
							name="blog_key">Option 1
						</label> <label class="checkbox-inline"> <input type="radio"
							value="2" name="blog_key">Option 2
						</label> <label class="checkbox-inline"> <input type="radio"
							value="3" name="blog_key">Option 3
						</label>
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion"
								href="#blog_options">发布选项</a>
						</h4>
					</div>
					<div id="blog_options_edit" class="panel-collapse collapse">
						<label class="checkbox-inline"> <input type="radio"
							value="0" name="blog_option">发布至首页候选区
						</label> <label class="checkbox-inline"> <input type="radio"
							value="1" name="blog_option">发布至博客社区首页
						</label><br> <strong>【发文说明】<br>博客园是面向开发者的知识分享社区，不允许发布任何推广、广告、政治方面的内容。<br>
							博客园首页（即网站首页）只能发布原创的、高质量的、能让读者从中学到东西的内容。<br>
							如果博文质量不符合首页要求，会被工作人员移出首页，望理解。如有疑问，请联系contact@cnblogs.com。
						</strong>
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#accordion"
								href="#language_type">语言分类</a>
						</h4>
					</div>
					<div id="language_type_edit" class="panel-collapse collapse">
						<div id="type_prelanguage_edit">
							<label>前端：</label> <label class="checkbox-inline"> <input
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
							<label>后端：</label> <label class="checkbox-inline"> <input
								type="checkbox" value="Java" name="type_backlanguage">Java
							</label> <label class="checkbox-inline"> <input type="checkbox"
								value="PHP" name="type_backlanguage">PHP
							</label> <label class="checkbox-inline"> <input type="checkbox"
								value="C++" name="type_backlanguage">C++
							</label>
						</div>
						<div id="type_database_edit">
							<label>数据库：</label> <label class="checkbox-inline"> <input
								type="checkbox" value="MySQL" name="type_database">MySQL
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
				<span class="glyphicon glyphicon-plus">保存</span>
			</button>
		</form>
	</div>
	
	<div class="modal fade mydialog" id="myModal" role="dialog">
		<div class="modal-dialog  modal-sm">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-body">
					<p>确定保存？</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-success" data-dismiss="modal"
						id="confirmCreateBlog">确定</button>
				</div>
			</div>

		</div>
	</div>
</body>
<script type="text/javascript">

bkLib.onDomLoaded(function(){
	bkLib.onDomLoaded(function() { 
		//第一种方法：将所有的textarea转化成富文本编辑器
		//nicEditors.allTextAreas()
		//第二种方法，只将通过id指定的textArea转化成富文本编辑器
		new nicEditor({ fullPanel: true }).panelInstance('nicContent');
		
	});
});

$(function(){
	
	console.info(blog);
	$("#save_blog").click(function(){
		$("#myModal").modal({
			backdrop:false
		});
	});
	$("#confirmCreateBlog").click(function(){
		var date = new Date();
		var detailDate = date.getFullYear()+"-"+date.getMonth()+1+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
		var type_prelanguage = [];
		var type_backlanguage = [];
		var type_database = [];
		$("input[name='type_prelanguage']:checked").each(function(){
			type_prelanguage.push($(this).val());
		});
		$("input[name='type_backlanguage']:checked").each(function(){
			type_backlanguage.push($(this).val());
		});
		$("input[name='type_database']:checked").each(function(){
			type_database.push($(this).val());
		});
		var data = {
				"blog_title":$("#blog_title").val(),
				"blog_url":$("#blog_url").val(),
				"blog_key":$("input[name='blog_key']:checked").val(),
				"blog_htmlcontent":$(".nicEdit-main").html(),
				"blog_text":$(".nicEdit-main").text(),
				"blog_option":$("input[name='blog_option']:checked").val(),
				"blog_create_time":detailDate,
				"type_prelanguage":type_prelanguage,
				"type_backlanguage":type_backlanguage,
				"type_database":type_database
		};
		$.ajax({
			url:"/blog/createBlog",
			type:"POST",
			dataType:"json",
			async:false,
			data:data,
			success:function(msg){
				alert(msg);
				if(msg=="success"){
					alert("success");
					window.history.back(-1); 
				}else{
					alert("添加失败");
				}
			}
		});
		/* $("#createBlogForm").submit(function(){
			
		}); */
		/* var blog = $(".nicEdit-main").html();
		var blog_title = $("#blog_name").val();
		var type_language = $("#blog_type input[name='blog_tagname']").val();
		$("#blog_list").removeAttr("hidden");
	    $("#blog_list").append($("#default_panel").html());
		$("#read_blog").removeAttr("hidden").html(blog);
		$("#write_blog").attr("hidden","hidden"); */
		
		
	});
});

</script>
</html>