/* 公共提示信息 */
jQuery.extend(jQuery.validator.messages, {
        required: lang._vt_tip1_,
		remote: "请修正该字段",
		email: "请输入正确格式的电子邮件",
		url: "请输入合法的网址",
		date: "请输入合法的日期",
		dateISO: "请输入合法的日期 (ISO).",
		number: "请输入合法的数字",
		digits: "请输入整数",
		creditcard: "请输入合法的信用卡号",
		equalTo: lang._vt_tip2_,
		accept: "请输入拥有合法后缀名的字符串",
		maxlength: jQuery.validator.format(lang._vt_tip3_),
		minlength: jQuery.validator.format(lang._vt_tip4_),
		rangelength: jQuery.validator.format(lang._vt_tip5_),
		range: jQuery.validator.format(lang._vt_tip6_),
		max: jQuery.validator.format(lang._vt_tip7_),
		min: jQuery.validator.format(lang._vt_tip8_)
});