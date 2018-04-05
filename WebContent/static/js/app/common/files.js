/**
 *@time 创建时间：2017年2月20日 下午4:42:21
 *@description
 */

$(function(){
	$.ajax({
		url:"/blog/getUploadList",
		type:"post",
		dataType:"json",
		async:false,
		success:function(data){
			if(data){
				var fileList = data.upFiles;
				for(var i=0;i<fileList.length;i++){
					var fileName = fileList[i].substr(fileList[i].lastIndexOf("\\")+1);
					var filePath = fileList[i].substr(fileList[i].lastIndexOf("upload"));
					$("#fileList").append("<li><div class='list-group' ><a href='../../static/"+filePath+"' id='href_"+i+"'>"+fileName+"</a><a class='btn btn-sm btn-warning' id='btn_"+i+"'onclick='downFile(this)'>下载</a></div></li>");
/*					$("#fileList").append("<li><div class='list-group' ><a href='#' id='href_"+i+"'>"+fileList[i]+"</a><button class='btn btn-sm btn-warning' id='btn_"+i+"' onclick='downFile(this)'>下载</button></div></li>");
*/				}
			}else{
			}
		}
	});
	
	/*var btn_id = obj.id;
	var href_id = $("#"+btn_id).prev().attr("id");
	$("#"+btn_id).click(function(){
		$(this).attr("href","/blog/downloadFile?fileName="+$("#"+href_id).text());
	});*/
	
});

function downFile(obj){
	var btn_id = obj.id;
	var href_id = $("#"+btn_id).prev().attr("id");
	$("#"+btn_id).attr("href","/blog/downloadFile?fileName="+$("#"+href_id).text());
	/*$.ajax({
		url:"/blog/downloadFile",
		type:"POST",
		dataType:"json",
		async:false,
		data:{
			"fileName":$("#"+href_id).text()
		},
		success:function(data){
			if(data=="fail"){
				alert("文件下载失败！！！");
			}else{
				alert("下载成功");
			}
		},
		error:function(){
			
		}
	});*/
}

