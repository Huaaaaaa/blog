/*
JS扩展
*/

/**
 * 日期格式化
 * @param format="YYYY-MM-dd hh:mm:ss"
 */
Date.prototype.format = function(format) {
	var o = {
		"M+" :  this.getMonth()+1,
		"d+" :  this.getDate(),
		"h+" :  this.getHours(),
		"m+" :  this.getMinutes(),
		"s+" :  this.getSeconds(),
		"q+" :  Math.floor((this.getMonth()+3)/3),
		"S"  :  this.getMilliseconds()
	};
	
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	
	for (var k in o) {
		if (new RegExp("("+ k +")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
		}
	}
	
	return format;
}

/**
 * 对象转字符串
 * @param o 对象
 */
function Obj2str(o) {
	if (o == undefined) return "";
	
	var r = [];
	
	if (typeof o == "string") return "\"" + o.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
	
	if (typeof o == "object") {
		if (!o.sort) {
			for (var i in o)
				r.push("\"" + i + "\":" + Obj2str(o[i]));
			if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
				r.push("toString:" + o.toString.toString());
			}
			
			r = "{" + r.join() + "}"
		} else {
			for (var i = 0; i < o.length; i++)
				r.push(Obj2str(o[i]))
			r = "[" + r.join() + "]";
		}
		
		return r;
	}
	
	return o.toString().replace(/\"\:/g, '":""');
}