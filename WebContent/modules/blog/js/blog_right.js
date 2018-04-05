/**
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2016年11月25日 上午11:08:12
 *@description
 */


$(function(){
	
	
	
	/*$("#create_blog").click(function(){
		var blog = $(".nicEdit-main").text();
		$("#blog_list").attr("hidden","hidden");
		$("#read_blog").removeAttr("hidden");
		$("#write_blog").attr("hidden","hidden");
		getContent();
		showConfirm("确定保存？");*/
		/*$.ajax({
			url:'blog/createBlog',
			data:$("#createBlogForm").serialize(),
			type:'POST',
			async:false,
			success:function(){
				
			}
		});*/
		
/*	});
	*/
})

function getContent(){
	var c = ndinstance.getContent();
	//var start_ptn = /(<.[^>]+>)*/gmi;		//过滤标签开头	
	//var end_ptn = /<\/?\w+>$/;			//过滤标签结束
	//var space_ptn = /(&nbsp;)*/;	   //过滤空格
	var end_content = c.replace("<","&lt;").replace(">","&gt;");
	$("#read_blog").text(end_content);
}

