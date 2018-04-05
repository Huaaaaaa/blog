/**
 * 
 */

$(document).ready(function(){
	var myw;
	var myh;
	if(window.screen){
		myw = screen.availWith;
		myh = screen.availHeight;
		window.moveTo(0,0);
		window.resizeTo(myw,myh);
	}else{
		myw = self.innerWidth;
		myh = self.innerHeight;
	}
	
});