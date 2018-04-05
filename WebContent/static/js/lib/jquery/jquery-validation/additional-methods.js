/**
 * validate校验扩展
 */

// 获取风险验证的方法
function getRiskPassVali( value , UserName/*用户名的值*/ ){
	/*风险密码的判断*/
	var flag = false;
	var username = UserName || username;
	
	//只包含4类字符中的任意一类
	var num = 0;
	for ( var p in valiType ){
		if ( valiType[p].test(value) )
			num++;
	}

	if ( num <= 1 )
		flag = false;
	else
		flag = true;
		
	//密码和用户名一样
	if ( value == username)
		flag = false;
		
	//密码是用户名的倒写
	if ( value ==  (username && username.split("").reverse().join("")))
		flag = false;
		
	return flag;	
}

//"当前密码为风险密码"
jQuery.validator.addMethod("riskpass", function(value, element) {
	return this.optional(element) || getRiskPassVali(value);
}, lang._init_tip2_);

//"guest用户与管理员密码不能一样"
jQuery.validator.addMethod("repeatPass", function(value, element) {
	return value != $("#admin_pwd").val()
}, lang._init_tip4_);

jQuery.validator.addMethod("integer", function(value, element) {
	return this.optional(element) || /^[1-9]\d*$/.test(value);
}, lang._vt_tip9_);

jQuery.validator.addMethod("integer2", function(value, element) {
	return this.optional(element) || /^-?\d+$/.test(value);
}, lang._vt_tip10_);

jQuery.validator.addMethod("integer3", function(value, element) {
	return this.optional(element) || /^-?\d+(\.{0,1}\d+)?$/.test(value);
}, lang._vt_tip23_);

jQuery.validator.addMethod("integer4", function(value, element) {
	return this.optional(element) || /^[1-9]\d*$/.test(value);
}, lang._vt_tip9_);

jQuery.validator.addMethod("integer7", function(value, element) {
	return this.optional(element) || /^[0-9]\d*$/.test(value);
}, lang._vt_tip24_);

jQuery.validator.addMethod("integer9", function(value, element) {
	var regExp = /^[0-9]\d*(\.{0,1}\d+)?$/;
	if (value > 100 || value < 14) return false;
	return this.optional(element) || regExp.test(value);
}, lang._vt_tip25_);

jQuery.validator.addMethod("dir", function(value, element){
	return this.optional(element) || /^\/{1}[0-9a-zA-Z\[\]\{\}\(\)\u4e00-\u9fa5\._\/]+$/.test(value);
}, lang._vt_tip11_);
	
jQuery.validator.addMethod("url", function(value, element) {
	return this.optional(element) || /^[0-9a-zA-Z_\-.,#+!;:?&=\/%@]+$/.test(value);
}, lang._vt_tip12_);

jQuery.validator.addMethod("stream_url", function(value, element) {
	if (value.indexOf("rtsp://") != 0) {
		return false;	
	} 
	
	return this.optional(element) || /^[0-9a-zA-Z_\-.,#+!;:?&=\/%@]+$/.test(value);
}, lang._vt_tip34_);

jQuery.validator.addMethod("ipv4", function(value, element, param) {
		return this.optional(element) || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(value);
}, lang._vt_tip13_);

jQuery.validator.addMethod("segmentNet", function(value, element, param) {
	var addr1 = window.location.hostname,
		addr2 = value,
		mask = "255.255.255.0";
    if(value == ""){
    	return true;
    }
    var 
    res1 = [],
    res2 = [];
    addr1 = addr1.split(".");
    addr2 = addr2.split(".");
    mask  = mask.split(".");
    for(var i = 0,ilen = addr1.length; i < ilen ; i += 1){
        res1.push(parseInt(addr1[i]) & parseInt(mask[i]));
        res2.push(parseInt(addr2[i]) & parseInt(mask[i]));
    }
    if(res1.join(".") == res2.join(".")){
        return true;
    }else{
        return false;
    }
    
}, lang._vt_tip39_);

jQuery.validator.addMethod("ipv4port", function(value, element, param) {
		return this.optional(element) || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)((:)(\d{1,5})){1}$/i.test(value);
}, lang._vt_tip14_);

jQuery.validator.addMethod("subnet", function(value, element, param) {
    return this.optional(element) || /^(254|252|248|240|224|192|128|0)\.0\.0\.0$|^(255\.(254|252|248|240|224|192|128|0)\.0\.0)$|^(255\.255\.(254|252|248|240|224|192|128|0)\.0)$|^(255\.255\.255\.(254|252|248|240|224|192|128|0|255))$/i.test(value);
}, lang._vt_tip15_);

jQuery.validator.addMethod("gateway", function(value, element, param) {
		return this.optional(element) || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(value);
}, lang._vt_tip16_);

jQuery.validator.addMethod("isEqual", function(value, element, param) {
	var target = $(param);
	var tpwd = target.val();
	var pwd = value;
	if (tpwd != pwd) {
		return false;
	}else {
		return true;
	}
}, lang._vt_tip17_);

jQuery.validator.addMethod("utils_string", function(value, element) {
	return this.optional(element) || /^[0-9a-zA-Z\u4e00-\u9fa5\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\;\|\<\>\,\.\?\/\:]+$/.test(value);
}, lang._vt_tip26_);

jQuery.validator.addMethod("utils_string1", function(value, element) {
    return this.optional(element) || /^[0-9a-zA-Z_-]+$/.test(value);
}, lang._vt_tip19_);

jQuery.validator.addMethod("utils_string2", function(value, element) {
    return this.optional(element) || /^[0-9a-zA-Z\u4e00-\u9fa5\_\-]+$/.test(value);
}, lang._vt_tip27_);

jQuery.validator.addMethod("cva_name", function(value, element) {
	var $Value = value.toLowerCase();
	if ($Value.indexOf("-") == 0) {
		return false;	
	} else {
		return true;
	}
}, lang._vt_tip36_);

jQuery.validator.addMethod("bucket_name1", function(value, element) {
    return this.optional(element) || /^[0-9a-z]{1}[0-9a-z_]*$/.test(value);
}, lang._vt_tip28_);

jQuery.validator.addMethod("bucket_name2", function(value, element) {
	var $Value = value.toLowerCase();
	if ($Value.indexOf("hikcstor") == 0) {
		return false;	
	} else {
		return true;
	}
}, lang._vt_tip29_);

jQuery.validator.addMethod("bucket_cycle", function(value, element) {
	return this.optional(element) || /^(-?[1-9]\d*|0)$/.test(value);
}, lang._vt_tip30_);

jQuery.validator.addMethod("nameValid", function(value, element) {
	return this.optional(element) || /^[^-].*$/.test(value);
}, lang._vt_tip31_);

jQuery.validator.addMethod("port", function(value, element){
	return this.optional(element) || /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value);
}, lang._vt_tip20_);

// /^[0-9a-zA-Z\`\[\]\{\}\(\)\._!@#\$%^&~\+\=\/\?\*-]+$/
jQuery.validator.addMethod("username", function(value, element){
	return this.optional(element) || /^[0-9a-zA-Z\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\;\|\<\>\,\.\?\/]+$/.test(value);
}, lang._vt_tip21_);

jQuery.validator.addMethod("password", function(value, element){
	return this.optional(element) || /^[0-9a-zA-Z\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\;\|\<\>\,\.\?\/\\\:]+$/.test(value);
}, lang._vt_tip21_);

jQuery.validator.addMethod("vmhostname", function(value, element) {
	return this.optional(element) || /^[a-z]{1}[a-z0-9\-]{1,13}[a-z0-9]{1}$/.test(value);
}, lang._vt_tip32_);

jQuery.validator.addMethod("channel_num", function(value, element) {
	if (value > 64 || value < 1) {
		return false;	
	}
	return this.optional(element) || /^[1-9]\d*$/.test(value);
}, lang._vt_tip33_);

jQuery.validator.addMethod("domain_name", function(value, element) {
	return this.optional(element) || /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/.test(value);
}, lang._vt_tip37_);

jQuery.validator.addMethod("access_key", function(value, element) {
	var _length = value.length;
	
	return this.optional(element) || /^[0-9a-zA-Z]{63}$/.test(value);
}, lang._vt_tip38_);
