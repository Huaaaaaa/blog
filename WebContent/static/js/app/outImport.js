/**
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2017年3月1日 下午5:14:41
 *@description
 */


var cacheFiles = [];
function $import(_files,success){
	var fileArray = [];
	if(typeof _files === "object"){
		fileArray = _files;
	}else if(typeof _files === "string"){
		fileArray = _files.split(",");
	}

	if(fileArray!=null && fileArray.length>0){
		var count = 0;
		for(var i = 0;i<fileArray.length;i++){
			loadFile(fileArray[i], function(){
				count++;
				if(count==fileArray.length){
					return true;
				}
			});
		}
	}
}

var files_url = ["../../static/js/lib/bootstrap/css/bootstrap.min.css",
	             	"../../static/js/lib/bootstrap/css/message/messenger.css",
	            		"../../static/js/lib/bootstrap/css/message/toastr.min.css",
	            		"../../static/js/lib/bootstrap/css/message/messenger-theme-future.css",
	            		"../../static/js/lib/data-tables/DT_bootstrap.css",
	            		"../../static/js/lib/jquery/jquery-ui-1.12.1.custom-overcast/jquery-ui.min.css",
	            		"../../static/js/lib/jquery/jquery-ui-1.12.1.custom-overcast/jquery-ui.structure.css",
	            		"../../static/css/common.css",
	            		"../../static/css/block.css",
	            		"../../static/js/lib/jquery/jquery-3.1.0.min.js",
	            		"../../static/js/lib/bootstrap/js/bootstrap.js",
	            		"../../static/js/lib/bootstrap/js/message/messenger.min.js",
	            		"../../static/js/lib/bootstrap/js/message/toastr.min.js",
	            		"../../static/js/lib/bootstrap/js/message/messenger-theme-future.js",
	            		"../../static/js/lib/jquery/jquery-easyui-1.3.6/jquery.easyui.min.js",
	            		"../../static/js/lib/data-tables/jquery.dataTables.js",
	            		"../../static/js/lib/jquery/jquery-ui-1.12.1.custom-overcast/jquery-ui.js",
	            		"../../static/js/lib/jquery/jquery-easyui-1.3.6/jquery.easyui.min.js",
	            		"../../static/js/lib/jquery/jquery.form.js",
	            		"../../static/js/app/common/browser.js",
	            		"../../static/js/config.js",
	            		"../../static/js/lib/nicEdit.js",
	            		"../../static/js/app/common/block.js",
	            		"../../static/js/app/common/files.js",
	            		"../../static/js/lib/jquery/jquery.media.js",
	            		"../../static/js/lib/jquery/jquery-validation/jquery.validate.js",
	            		"../../static/js/lib/bootstrapvalidator/js/bootstrapValidator.js"
	            		];
/**
 * 加载文件的函数
 * @param file_url：文件路径
 * @param success：加载成功后的回调函数
 */
function loadFile(file_url){
	if(!fileIsLoaded(cacheFiles,file_url)){
		var file_type = getFileType(file_url);
		var file_obj = null;
		if(file_type == ".js"){
			file_obj = document.createElement("script");
			file_obj.src = file_url;
		}else if(file_type == ".css"){
			file_obj = document.createElement("link");
			file_obj.href=file_url;
			file_obj.rel="stylesheet";
			file_obj.type="text/css";
		}else if(file_type == ".less"){
			file_obj = document.createElement("link");
			file_obj.href=file_url;
			file_obj.rel="stylesheet";
			file_obj.type="text/less";
		}
		
		file_obj.onload = file_obj.onreadystatechange = function(){
			if(!this.readyState || this.readyState==="loaded" || this.readyState==="complete"){
				cacheFiles.push(file_url);
				return true;
			}
		}
		
	 document.getElementsByTagName("html")[0].appendChild(file_obj);
	}else{
		return true;
	}
}

/**
 * 判断文件是否已经加载
 * @param filesCache:加载过的文件列表
 * @param file_url：要加载的文件
 */
function fileIsLoaded(filesCache,file_url){
	var files_length = filesCache.length;
	if(filesCache!=null && files_length>0){
		for(var i = 0;i < files_length;i++){
			//如果已加载的列表中有要加载的文件，则说明不用重复加载该文件
			if(filesCache[i]==file_url){
				return true;
			}
		}
	}
	return false;
}

/**
 * 获取文件的类型
 * @param file_url
 */
function getFileType(file_url){
	if(file_url!=null && file_url.length>0){
		return file_url.substr(file_url.lastIndexOf(".")).toLowerCase();
	}
	return "";
}


//异步导入公共的外部包
$import(files_url,function(msg){
	//外部文件加载成功之后配置一些基础信息
	if(msg){
		//配置信息提示框
		toastr.options = {
				 closeButton:false,//是否配置关闭按钮
				debug:false,//是否开启debug模式
				neweastOnTop:false,//新消息是否排在最上面
				progressBar:false,//是否显示进度条
				preventDuplicates:false,//是否阻止弹出多个消息框
				onclick:null,//点击回调函数
				showDuration:"300",//显示动作时间
				hideDuration:"300",//隐藏动作时间 
				positionClass: "toast-center",//消息框的显示的位置
				timeOut:"1000",//自动关闭的超时时间，即1秒后关闭
				 extentedTimeOut:"1000",
				showEasing:"swing",
				hideEasing:"liner",
				showMethod:"fadeIn",//显示的方式
				hideMethod: "fadeOut",//关闭的方式 
		}
	}
})

