/**
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2016年11月16日 上午11:03:16
 *@description
 */

define(['require'],function(require){
	return {
		send : function(url,data,dataType,method,successHandler,errorHandler){
			require(['lib/jquery/jquery-3.1.0.min']);
			var ajaxOption = {
					type:method?method:'get',
					url:url,
					data:(data!=null||data!="")?data:null,
					async:true,
					dataType:dataType,
					success : function(response){
						if(successHandler){
							successHandler(response);
						}
						
					},
					errorHandler : function(errorMsg){
						if(errorHandler){
							errorHandler(errorMsg);
						}
					}
		
			};
			
			if(dataType=="text"){
				ajaxOption.dataType="text";
				ajaxOption.contentType="application/text";
			}else{
				ajaxOption.dataType="json";
				ajaxOption.contentType="application/json";
			}
			
			$.ajax(ajaxOption);
			
		}
	}
});
