/**
 * 密码强度验证
 */

var valiType = {
	num : /\d/, // 数字
	valsCh : /[a-z]+/, // 小写字母
	valbCh : /[A-Z]+/, // 大写字母
	valSpe : /[^a-zA-Z0-9]/
// 特殊字符
};

/* 隐藏密码强度条 */
function hideStrength(formId) {
	$("#"+formId).find(".form-group:eq(2)").hide();
	$(".veryweak").hide();
	$(".weak").hide();
	$(".middle").hide();
	$(".strong").hide();
}

/* 不包含特殊字符 */
function weak(passVal) {
	return (valiType["num"].test(passVal) || valiType["valsCh"].test(passVal) || valiType["valbCh"]
			.test(passVal))
			&& !valiType["valSpe"].test(passVal);
}
/* 密码强度验证 */
function passwordStrength(passId,formId,sNum) {
	debugger;
	var num = 0;
	$("#"+passId).keyup(function() {
		console.info("jhhh");
		var passVal = $(this).val().replace('/\s/g', '').trim();
		if (passVal) {
			var num = getNum(passVal);
			var strength = $("#strength_user_password");
			strength.show();
			$("#"+formId+ ".form-group:eq("+sNum+")").show();
			if (num == 0) {
				$(".veryweak").show();
				$(".veryweak").nextAll().hide();
			} else if (num == 1) {
				$(".veryweak").show();
				$(".weak").show();
				$(".weak").nextAll().hide();
			} else if (num == 2) {
				$(".veryweak").show();
				$(".weak").show();
				$(".medium").show();
				$(".medium").nextAll().hide();
			} else {
				$(".veryweak").show();
				$(".weak").show();
				$(".medium").show();
				$(".strong").show();
			}
		} else {
			hideStrength(formId);
		}

	});

	return num;
}

/* 获取密码级别 */
function getNum(passVal) {
	if (weak(passVal)) {
		if (passVal.length < 6) {
			num = 0;// 风险
		} else if (passVal.length >= 6 && passVal.length <= 8) {
			num = 1;// 弱
		} else if (passVal.length > 8) {
			num = 2;// 中
		}
	} else {
		if (passVal.length > 8) {
			num = 3;// 强
		}
	}
	return num;
}