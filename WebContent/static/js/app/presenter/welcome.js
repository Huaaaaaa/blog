/**
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2016年11月10日 下午8:23:02
 *@description
 */

define(["app/manage/appManage","app/manage/requestManage"],function(appManage,requestManage){
	
	var app = {
			initPage : function(data){
			},
	}
	
	return {
		getContainerId : function(){
		},
		
		getData : function(){
			
		},
		
		execute : function(data){
			if(data!==undefined){
				blogInfo = data;
				requestManage.send("/blog",data,"get","text");
			}
		},
		repaint : function(isInit){
			
		},
		destroy : function(){
			
		}
	}
	
	
});