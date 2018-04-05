
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