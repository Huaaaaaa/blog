/**
 *@Copyright:Copyright(c) 2012-2016 Company:
 *@company  Hikvision(http://www.hikvision.com)
 *@author 作者：huayingcao
 *@time 创建时间：2016年11月10日 下午5:29:30
 *@description
 */

String.prototype.replaceAll = function(s1,s2){
	return this.replace(new RegExp(s1,"gm"),s2);
}