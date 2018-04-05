/**
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@author 作者：huayingcao
 *@time 创建时间：2016年11月9日 下午4:05:09
 *@description  窗口管理模块
 */

/**
 * 窗口
 */
define(function(){
	var windowArray = new Array();
	var _self = {
		openWindow : function(p1,p2,p3){
			windowArray.push(window.open(p1,p2,p3));
		},
		closeWindow : function(){
			for(var i= 0 ;i< windowArray.length;i++){
				windowArray[i].close();
			}
		}
	}
	return _self;
});