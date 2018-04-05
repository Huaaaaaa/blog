/**
 *  关于浏览器的判断及设置
 */

/**
 * 判断浏览器的类型
 */
function judgeBrowser(){
	var useragent = navigator.userAgent;
	if(useragent.indexOf("Opera")>-1){
		return "Opera";
	}
	
	if(useragent.indexOf("Firefox")>-1){
		return "Firefox";
	}
	if(useragent.indexOf("Chrome")>-1){
		return "Chrome";
	}
	if(useragent.indexOf("Safari")>-1){
		return "Safari";
	}
	if(useragent.indexOf("Firefox")>-1){
		return "Firefox";
	}
	if(!!window.ActiveXObject||"ActiveXObject" in window){
		return "IE";
	}
}

/**
 * 通过IE自带的ActiveXObject组建创建文件
 * @param fileName
 * @param fileContent
 * @returns {Boolean}
 */
function createFileByActive(fileName,fileContent){
	if(!!window.ActiveXObject || "ActiveXObject" in window){
		var fso  = new ActiveXObject("Scripting.FileSystemObject");
		var file = fso.CreateTextFile(fileName,true);
		file.write(fileContent);
		file.Close();
		return true;
	}else{
		return false;
	}
}