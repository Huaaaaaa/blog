/**
 * 登录验证的函数
 */

/**
 * 去掉字符串中的空格
 * 
 * @param str
 */
function strTrim(str) {
    // \s：查找空白字符 g查找所有
    return str.replace(/\s+/g, "");

}
/**
 * 设置cookie
 * 
 * @param cName
 * @param cValue
 * @param exTimes
 */
function setCookies(cName, cValue, exTimes) {
    var d = new Date();
    d.setTime(d.getTime() + exTimes * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cName + "=" + cValue + ";" + expires;
}

/**
 * 获取cookie
 * 
 * @param cName
 */
function getCookie(cName) {
    var name = cName;
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
	var cookie = cookies[i];
	while (cookie.charAt(0) == " ")
	    cookie = cookie.substring(1);
	if (cookie.indexOf(name) != -1) {
	    return cookie.substring(name.length + 1, cookie.length);
	} else {
	    continue;
	}
    }
}

/**
 * 删除
 * 
 * @param cName
 */
function clearCookie(cName) {
    setCookies(cName, "", -1);
}

function checkValicode() {
    if (strTrim($("#valicode").val()) == "") {
	$("#cn").css("visibility", "visible");
	$("#cn").html("请输入验证码");
	return false;
    } else {
	$("#cn").css("visibility", "hidden");
	return true;
    }

}

/**
 * 输入框失去焦点事件
 */
function inputBlur() {
    $("#username").blur(function() {
	if (strTrim($("#username").val()) != "") {
	    $("#un").css("visibility", "hidden");
	}
    });
    $("#password").blur(function() {
	if (strTrim($("#password").val()) != "") {
	    $("#pn").css("visibility", "hidden");
	}
    });
    $("#valicode").blur(function() {
	if (strTrim($("#valicode").val()) != "") {
	    $("#cn").css("visibility", "hidden");
	}
    });
}

/**
 * 检查验证码是否正确
 */
function checkCode() {
    var valicode = $("#valicode").val();
    var issuccess;
    $.ajax({
	url : JSU("/login/validateImg"),
	type : "POST",
	dataType : "text",
	async : false,
	data : "valicode=" + valicode,
	success : function(m) {
	    if (m == "fail") {
		issuccess = false;
	    } else {
		isuccess = true;
	    }
	},
	error : function() {
	    alert("error");
	}
    });
    return issuccess;
}

function refresh(url) {
    document.getElementById("refresh").src = url + "?id=" + Math.random();
}

var error = 0;
var status;
var t = 10;

function refer() {
    if (t == 0) {
	$("#myModal").modal("hide");
	window.location.href = "/login";
    } else {
	setInterval(refer(), 1000);
	t--;
    }

}

function loginFormValidate() {
    $("#login_form").bootstrapValidator({
	fields : {
	    username : {
		validators : {
		    notEmpty : {
			message : '用户名不能为空'
		    },
		    regexp : {
			regexp : /^[0-9a-zA-Z]+$/,
			message : '只允许数字和英文字母'
		    },
		    remote : {
			url : JSU("/user/checkUser"),
			cache : false,
			async : false,
			dataType : JSON,
			data : function(validator) {
			    return {
				password : $("#password").val()
			    }
			},
			type : "POST",
			message : "用户名错误或用户不存在"
		    }
		}
	    },
	    password : {
		validators : {
		    notEmpty : {
			message : '密码不能为空'
		    },
		    regexp : {
			regexp : /^[0-9a-zA-Z]+$/,
			message : '只允许数字和英文字母'
		    },
		    remote : {
			url : JSU("/user/checkUser"),
			cache : false,
			async : false,
			threshold : 6,// 6个字符以上才开始验证
			dataType : JSON,
			data : function(validator) {
			    return {
				username : $("#username").val(),
			    }
			},
			type : "POST",
			message : "密码错误"
		    }
		}
	    },
	    valicode : {
		validators : {
		    notEmpty : {
			message : '验证码不能为空'
		    },
		    remote : {
			url : JSU("/login/validateImg"),
			cache : false,
			async : false,
			type : "POST",
			message : "验证码错误"
		    }
		}
	    }

	}
    });
}

function login() {
    // 每次重定向到登录页面时都刷新验证码，无需用户手动刷新，手动刷新只在用户输入验证码错误的情况下使用
    // 连续登陆失败5次时，引入验证码机制
    /* alert($("#login_form").find("#username").val()); */
    loginFormValidate();
    var bootstrapValidator = $("#login_form").data('bootstrapValidator');
    bootstrapValidator.validate();
    var flag1 = bootstrapValidator.isValid();
    if (!flag1) {
	error++;
	return;
    }

    if (error >= 2) {// 登录失败两次显示验证码
	$("#form_valicode").show();
	refresh('/login/img');
	if (error > 9) {// 连续登陆失败超过10次，则锁定目标用户访问的IP地址，并在30分钟后解锁
	    $("#myModal").modal();
	    $("#myModal").modal({
		"backdrop" : "static",
		"keyboard" : false
	    });
	    $("#times").html(t + "秒后请重新登录");
	    refer();
	    return;
	}
    }
    
    window.location.href = JSU("/blog");
    /*
     * setTimeout(function() { var flag2 =
     * $("#login_form").data('bootstrapValidator').isValid(); }, 500);
     */

}

/* 检查用户名是否已经存在 */

function checkExist() {
    var result;
    $.ajax({
	url : JSU("/user/checkExist"),
	data : {
	    "userName" : strTrim($("#username").val())
	},
	async : false,
	success : function(data) {
	    if (data == "exist") {
		$("#un").css("visibility", "visible");
		$("#un").html("该用户已存在，请重新输入");
		$("#username").focus();
		result = false;
	    } else {
		$("#un").css("visibility", "hidden");
		result = true;
	    }
	}
    });

    return result;
}

/**
 * 检查两次输入的密码是否一致
 */
function checkTwoPass() {
    var pass1 = strTrim($("#password").val());
    var pass2 = strTrim($("#password1").val());
    if (pass2 == "") {
	$("#pn1").css("visibility", "visible");
	$("#pn1").html("请确认密码");
	$("#password1").focus();
	return false;
    } else {
	$("#pn1").css("visibility", "hidden");
	if (pass2 != pass1) {
	    $("#pn1").css("visibility", "visible");
	    $("#pn1").html("两次输入的密码不一致，请重新输入");
	    $("#password1").focus();
	    return false;
	} else {
	    $("#pn1").css("visibility", "hidden");
	    return true;
	}
    }

}

/**
 * 用户注册
 */
function regedit() {
    if (checkName() == false) {
	return false;
    }

    if (checkExist() == false) {
	return false;
    }

    if (checkPwd() == false) {
	return false;
    }

    if (checkTwoPass() == false) {
	return false;
    }

    var form = $("#regedit_form");
    var formData = form.serialize();

    $.ajax({
	url : JSU("/user/regedit"),
	type : "post",
	async : false,
	data : formData,
	success : function(data) {
	    if (data == "success") {
		setTimeout(function() {
		    window.location.href = "/jsp/login.jsp";
		}, 3000)
	    } else {
		$("input").val("");
	    }
	}
    });
}
$(function() {

    /* 浏览器设置 */
    var myw;
    var myh;
    if (window.screen) {
	myw = screen.availWidth;
	myh = screen.availHeight;
    } else {
	myw = self.innerWidth;
	myh = self.innerHeight;
    }
    window.moveTo(0, 0);
    window.resizeTo(myw, myh);

    /*
     * var cookieName = getCookie("username");
     * if(cookieName==""||typeof(cookieName)=="undefined"){
     * $("#username").focus(); }else{ $("#username").val(cookieName);
     * $("#password").focus(); }
     */

    $("span").css("color", "red");
    /* inputBlur(); */
    $("#login_form").bootstrapValidator({
	fields : {
	    username : {
		validators : {
		    notEmpty : {
			message : '用户名不能为空'
		    },
		    regexp : {
			regexp : /^[0-9a-zA-Z]+$/,
			message : '只允许数字和英文字母'
		    },
		    remote : {
			url : JSU("/user/checkUser"),
			cache : false,
			async : false,
			threshold : 6,// 6个字符以上才开始验证
			type : "POST",
			data : function(validator) {
			    return {
				password : $("#password").val()
			    }
			},
			message : "用户不存在或用户名错误"
		    }
		}
	    },
	    password : {
		validators : {
		    notEmpty : {
			message : '密码不能为空'
		    },
		    remote : {
			url : JSU("/user/checkUser"),
			cache : false,
			async : false,
			threshold : 6,// 6个字符以上才开始验证
			dataType : JSON,
			data : function(validator) {
			    return {
				username : $("#username").val(),
			    }
			},
			type : "POST",
			message : "密码错误"
		    }
		}
	    },
	    valicode : {
		validators : {
		    notEmpty : {
			message : '验证码不能为空'
		    },
		    remote : {
			url : JSU("/login/validateImg"),
			cache : false,
			async : false,
			threshold : 6,// 6个字符以上才开始验证
			type : "POST",
			message : "验证码错误"
		    }
		}
	    }

	}
    }).on('success.form.bv', function(e) {// 点击提交之后
	// Prevent form submission
	e.preventDefault();
	// Get the form instance
	var $form = $(e.target);
	// Get the BootstrapValidator instance
	var bv = $form.data('bootstrapValidator');
	$.post(JSU("/login/login"), {
	    "username" : $("#username").val(),
	    "password" : $("#password").val(),
	    "flag" : $("input[type=checkbox]").is(":checked")
	}, function(data) {
	    /*
	     * var testdata = $("#testdate"); if(testdata){ alert(testdata);
	     * }else{ alert("沒有"); }
	     */

	    if (data) {
		window.location.href = "/blog";
	    }
	});
	/*
	 * $.ajax({ url:JSU("/login/login"), dataType:"json", type:"post",
	 * async:false, data:{ "username":$("#username").val(),
	 * "password":$("#password").val(),
	 * "flag":$("input[type=checkbox]").is(":checked") } });
	 */
    });
    // 按回车键==确定
    /*
     * $("#login").keydown(function(event){ if(event.which==13){
     * $("#login_form").submit(function(e){ e.preventDefault(); }); } });
     */

});
