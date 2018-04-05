/**
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@author 作者：huayingcao
 *@time 创建时间：2016年11月9日 下午4:32:38
 *@description 请求处理模块
 */

define([ "app/manage/appManage", "app/manage/timeManage", "app/manage/windowManage"],function(appManage,timeManage,windowManage){
	var requestTable = new HashMap();//请求标示数据表
	var requestArray = new Array();//请求标示数组
	
	var _self ={
			
			send : function(url,data,method,successHandler,errorHandler,ajaxId,dataType,time,timeHandler){
				var timeout;
				if(time===0){
					timeout = 0;
				}else if(time){
					timeout = time;
				}
				ajaxOption={
					type : method ? method : "get",
					url : url + (url.indexOf("?") > -1 ? "&" : "?") + 's=' + Math.random(),
					async : true,
					data:data,
					dataType:'json',
					timeout:timeout,
					/*过滤请求的数据*/
					datafilter:function(data,type){
						if(data=="overtime"){
							location.reload();
						}else{
							return data;
						}
					},
					/*请求成功后执行的函数*/
					success : function(response){
						console.info("/blog返回的数据类型是："+ (typeof response));
						var responseObj = typeof response =="object"?response:$.parseJSON(response);
						if(successHandler){
							successHandler(responseObj);
						}
						/*if(response.toString().indexof(".jsp")!=-1){
							if(successHandler){
								successHandler(responseObj);
							}
						}*/
					},
					complete : function(XMLHttpRequest,data){
						if(data=="overtime"){
							_self.abortAll();//取消当前所有请求
						}
						
						/*if(timeHandler){
							timeHandler();
						}else{
							$.messager.alert("提示","您的请求已超时，请检查网络");
						}*/
						
					},
					error : function(errorMsg){
						if(errorHandler){
							errorHandler(errorMsg);
						}
					}
				}
				
				if(dataType&&dataType=="text"){
					ajaxOption.dataType="text";
					ajaxOption.contentType="application/text";
				}else{
					ajaxOption.dataType="json";
					ajaxOption.contentType="application/json";
				}
				
				/*var _ajax = $.ajax(ajaxOption);*/
				$.ajax(ajaxOption);
				/*requestArray.push(_ajax);
				if(ajaxId){
					requestTable.put(ajaxId,_ajax);
				}*/
			},
			/*取消所有请求*/
			abortAll : function(){
				for(var i = 0;i<requestArray.length;i++){
					requestArray[i].abort();
				}
				requestArray = new Array();
			}
	}
	
	return _self;
});