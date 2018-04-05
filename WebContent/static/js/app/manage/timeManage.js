/**
 * 时间管理模块
 */

define(function(){
	var timeHandlers = new HashMap();
	var _self = {
			clear : function(){
				var values = timeHandlers.value();
				for(var i =0 ; values & values.length>0 & i<values.length ; i++){
					window.clearInterval(values[i]);
				}
				timeHandlers.clear();
			}
	}
	
	return _self;
});