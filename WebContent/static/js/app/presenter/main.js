/**
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2016年11月9日 下午5:49:46
 *@description
 */

define(["app/manage/appManage","app/manage/requestManage"],function(appManage,requestManage){
	
	var _self = {
			/*获取页面ID*/
			getContainerId : function(){
				return null;
			},
			execute : function(params){
				requestManage.send("/blog/getBlogList",null,"post",function(data){
					appManage.jump("#welcome",data);
				});
			},
			repaint : function(isInit){
				
			},
			destroy : function(){
				
			}
	}
	
	return _self;
});