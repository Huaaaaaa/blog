/**
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2017年3月2日 下午3:54:08
 *@description
 */


$(function(){
	
	$("#preview_blog").css("display","none");
	
	$("#write_blog").attr("hidden","hidden");
	

	
	/* 点击表格显示博客内容 */
	/* var listId = $("#blog_table").find("tbody tr");
	console.info("tr的个数是："+listId.length);
	for(var j = 0;j<listId.length;j++){
		var listIdVal = $(listId[j]).find("td:eq(0)").find(".list-group").attr("id");
		var modifyBtn = $(listId[j]).find("td:eq(1)").find("button:eq(1)").attr("id");
		var blog_id =$(listId[j]).find("td:eq(0)").find("a.list-group-item").attr("id");
		$("#"+listIdVal).click(function(){
			$("#content").html($(this).find("span:eq(0)").html());
		});
		$("#"+modifyBtn).click(function(){
			window.location = "/blog/toModify?blog_id="+blog_id; 
		});
	} */
	
	//获取blog并以列表显示
	$.ajax({
		url:"/blog/getBlogList?isPage=no",
		dataType:"json",
		type:"POST",
		async:false,//只有获取列表成功之后才能进行其他操作
		success:function(data){
			if(data){
				var blogList = data.blogList;
				for(var i = 0 ;i < blogList.length;i++){
					var blogId = blogList[i].id;
					var blogTitle = blogList[i].blog_title;
					var blogHtmlConent = blogList[i].blog_htmlcontent;
					var blogtext = blogList[i].blog_text;
					var createTime =  blogList[i].blog_create_time;
					var groupId ;
					var appendHtml = '<a href="#" class="list-group-item" id="'+blogId+'">'+
					'<h4 class="list-group-item-heading"></h4>'+
					'<p class="list-group-item-text"></p>'+
					'<span class="list-group-item-text" hidden="hidden"></span></a>';
					
					/* if(i==0){
						 $("#blog0").html(appendHtml); 
						groupId = "blog0";
					}else{
						groupId = "blog"+i;
					 $("#blog"+(i-1)).after('<div class="list-group" id="'+groupId+'">'+appendHtml+'</div>');  
					} */
					groupId = "blog"+i;
					$("#blog_table").find("tbody").append('<tr><td><div class="list-group" id="'+groupId+'">'+appendHtml+'</div></td><td>'+
							'<button class="ui-button ui-widget ui-corner-all" id="del_blog'+i+'">删除</button>'+
					        '<button class="ui-button ui-widget ui-corner-all" id="modify_blog'+i+'">修改</button>');
					/* $("#blog_table").find("tbody tr:eq(i)").find("td:eq:(0)").html('<div class="list-group" id="'+groupId+'">'+appendHtml+'</div>'); */
					if(i%2!=0){
						$("#"+groupId).find("a").addClass("list-group-item-success");
					}else{
						$("#"+groupId).find("a").addClass("list-group-item-info");
					}
					
					$("#"+blogId).find("h4:eq(0)").html(blogTitle+"&nbsp;&nbsp;"+createTime);
					$("#"+blogId).find("p:eq(0)").text(blogtext.substr(0,30)+"......");
					$("#"+blogId).find("span:eq(0)").html(blogHtmlConent);
				}
			}
			
			/*点击列表显示博客内容  */
			/* var listId = $("#blog_list").children();
			for(var j = 0;j<listId.length;j++){
				var listIdVal = $(listId[j]).attr("id");
				$("#"+listIdVal).click(function(){
					$("#content").html($(this).find("span:eq(0)").html());
				});
			} */
			
		}
	});
	
	$("#blog_table").find("tbody tr").each(function(){
		var listIdVal = $(this).find("td:eq(0)").find(".list-group").attr("id");
		var modifyBtn = $(this).find("td:eq(1)").find("button:eq(1)").attr("id");
		var blog_id =$(this).find("td:eq(0)").find("a.list-group-item").attr("id");
		$("#"+listIdVal).click(function(){
			$("#content").html($(this).find("span:eq(0)").html());
		});
		$("#"+modifyBtn).click(function(){
			window.location = "/blog/toModify?blog_id="+blog_id;
		});
	});
	
	$("#blog_page").click(function(){
		location.href="/blog/right?isPage=yes";
	});
	
	//创建日志
	$("#add_blog").click(function(){
		 window.location = "/blog/toAdd"; 
	});
	
	/*返回列表页*/
	$("#backto_blog").click(function(){
		top.location.reload();
	});
	
	
	$("#upload_blog").click(function(){
		$("#myModal").modal();
		$("#filecheck").attr("hidden","hidden");
		$("#sizecheck").attr("hidden","hidden");
		$("#yes_blog").click(function(){
			$("#upload_file_form").ajaxSubmit({
				url:"/blog/uploadFile",
				type:"POST",
				dataType:"json",
				async:false,
				data:{},
				beforeSubmit:function(){
					//先判断文件类型--只能上传word、pdf或txt等文本类型的文件
					var fileName = $("#file1").val();
					var extension = fileName.substr(fileName.lastIndexOf("."));
					if(extension==".pdf" || extension==".doc" || extension==".docx"){
						$("#filecheck").attr("hidden","hidden");
					}else{
						$("#filecheck").removeAttr("hidden");
						return false;
					}
					
					//判断上传文件的大小
					var fileSize =  $("#file1")[0].files[0].size;
					//获取的文件大小单位是比特byte
					if((fileSize/(1024*1024))>50){
						$("#sizecheck").removeAttr("hidden");
						return false;
					}else{
						$("#sizecheck").attr("hidden","hidden");
					}
				},
				success:function(m){
					if(m.error=="1"){
						alert(m.message);
						clearFile();
						return false;
					}else{
						$("#close").trigger("click");
						toastr.success("文件上传成功！");
						clearFile();
						return true; 
					}
				}
			});
		});
	});
	
	//查看上传文件的列表
	$("#upload_blog_list").click(function(){
		location.href="/blog/upblog_list";
	});
	
});

/**
 * 清除控件中的文件，以免重复上传
 */
function clearFile(){
	var file = $("#file1");
	file.after(file.clone().val(""));
	file.remove();
}