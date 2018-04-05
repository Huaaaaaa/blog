/**
 * 
 */

$(function() {

    /* hideStrength("editPassForm"); */
    // 验证密码强度
    passwordStrength("password", "editPassForm", 1);
    setup();
    $("#userBirth").datetimepicker({
	format : 'yyyy-mm-dd'
    });
    /*
     * $('#homeTown_province').multiselect(); $('#homeTown_city').multiselect();
     * $('#homeTown_country').multiselect();
     */
    /*
     * $('#nowLoc_province').multiselect(); $('#nowLoc_city').multiselect();
     * $('#nowLoc_country').multiselect();
     */
    // $('#marriage').multiselect();
    // $('#job_status').multiselect();
    // 修改基本信息
    $("#saveBasicInfo").click(
	    function() {
		var formId = "basicInfoFrom";
		$.ajax({
		    url : JSU("/user/saveBasicInfo?userId="
			    + $("input[name='userId']").val()),
		    type : "POST",
		    data : $("#" + formId).serializeArray(),
		    success : function(msg) {
			if (msg == "1") {
			    showAlert($("body"), "用户基本信息设置成功");
			} else {
			    showAlert($("body"), "用户基本信息设置失败");
			}

		    },
		    error : function() {
			showAlert($("body"), "用户基本信息设置失败");
		    }
		});
	    });

    // 修改个人资料
    $("#savePersonalInfo").click(
	    function() {
		var formId = "personalInfoForm";
		$.ajax({
		    url : JSU("/user/savePersonalInfo?userId="
			    + $("input[name='userId']").val()),
		    type : "POST",
		    data : $("#" + formId).serializeArray(),
		    success : function(msg) {
			if (msg == "1") {
			    showAlert($("body"), "用户个人资料设置成功");
			} else {
			    showAlert($("body"), "用户个人资料设置失败");
			}

		    },
		    error : function() {
			showAlert($("body"), "用户个人资料设置失败");
		    }
		});
	    });

    /**
     * 上传头像
     */

    judgeFigure();
    $("#uploadFigure").click(
	    function() {
		$("#uploadFigureForm").ajaxSubmit(
			{
			    url : JSU("/user/saveUserFigure?userId="
				    + $("input[name='userId']").val()),
			    type : "POST",
			    async : false,
			    data : {},
			    beforeSubmit : function() {
				var formId = "uploadFigureForm";
				validateFigureForm();
				var bootstrapValidtor = $("#" + formId).data(
					"bootstrapValidator");
				bootstrapValidtor.validate();
				if (!bootstrapValidtor.isValid()) {
				    return false;
				}
			    },
			    success : function(msg) {
				if (msg == "1") {
				    showAlert($("body"), "用户头像修改成功");
				    // 上传成功之后刷新左侧的头像
				    setTimeout(function() {
					$(getLeftFrame()).attr("src",
						"/blog/left");
				    }, 100);

				} else {
				    showAlert($("body"), "用户头像修改失败");
				}
				return;
			    },
			    error : function() {
				showAlert($("body"), "用户头像修改失败");
			    }
			});
		/*
		 * return false;
		 */});

});

/**
 * 刷新页面
 */
function refreshPage() {
    location.reload();
}

/**
 * 判断新头像和旧头像是否相同
 */
function judgeFigure() {
    var oldFigure = $("#hidden_figure_old").val();
    var newFigure = $("#hidden_figure").val();
    if (oldFigure === newFigure) {
	$("#uploadFigure").attr("disabled", "disabled");
    } else {
	$("#uploadFigure").removeAttr("disabled");
    }
}

var imgURL = "";
function getPhoto(node) {
    try {
	var file = null;
	if (node.files && node.files[0]) {
	    file = node.files[0];
	} else if (node.files && node.files.item(0)) {
	    file = node.files.item(0);
	}
	// Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
	try {
	    imgURL = file.getAsDataURL();// firefox7.0
	} catch (e) {
	    imgURL = window.URL.createObjectURL(file);// firefox8.0以上
	}
    } catch (e) {
	if (node.files && node.files[0]) {
	    var reader = new FileReader();
	    reader.onload = function(e) {
		imgURL = e.target.result;
	    };
	    reader.readAsDataURL(node.files[0]);
	}
    }
    creatImg(imgURL);
    $("#hidden_figure").val($("#figure").val());
    judgeFigure();
    return imgURL;
}

function creatImg(imgURL) {
    var textHtml = "<img src='" + imgURL
	    + "'width='100px' height='100px' style='border-radius:10px'/>";
    $(".ge_pic_icon_Infor").html("").html(textHtml);
}

/*
 * 验证上传头像表单
 */
function validateFigureForm() {
    var formId = "uploadFigureForm";
    $("#" + formId).bootstrapValidator({
	feedbackIcons : {// 输入框不同状态显示不同样式
	    valid : "glyphicon glyphicon-ok",
	    invalid : "glyphicon glyphicon-remove",
	    validating : "glyphicon glyphicon-refresh"
	},
	fields : {
	    figure1 : {
		validators : {
		    notEmpty : {
			message : "文件不能为空"
		    },
		    bePicture : {
			message : "只能上传png、jpg、jpeg格式的文件"
		    }
		}
	    }
	}
    });
}

/**
 * 修改密码表单验证
 */
function validatePassForm() {
    debugger;
    var formId = "editPassForm";
    $("#" + formId).bootstrapValidator({
	feedbackIcons : {// 输入框不同状态显示不同样式
	    valid : "glyphicon glyphicon-ok",
	    invalid : "glyphicon glyphicon-remove",
	    validating : "glyphicon glyphicon-refresh"
	},
	fields : {
	    oldpass : {
		validators : {
		    notEmpty : {
			message : "原密码不能为空"
		    },
		    stringLength : {
			min : 1,
			max : 64,
			message : "长度必须在【1-64】之间"
		    },
		    regexp : {
			/*
			 * regexp :
			 * "^[a-zA-Z0-9\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\;\|\<\>\,\.\?\/\:]+$",
			 */
			regexp : "[^\"\'\ \u4e00-\u9fa5]+$",
			message : "不支持单引号、双引号、中文和空格"
		    },
		    remote : {
			url : JSU("/user/validateOldPass"),
			message : "用户原密码不正确",
			type : "POST",
			data : function(validator) {
			    return {
				userId : $("input[name='userId']").val(),
				oldPass : $("#oldpass").val()
			    }
			}
		    }
		}
	    },
	    newpass : {
		validators : {
		    notEmpty : {
			message : "新密码不能为空"
		    },
		    stringLength : {
			min : 1,
			max : 64,
			message : "长度必须在【1-64】之间"
		    },
		    regexp : {
			regexp : "[^\"\'\ \u4e00-\u9fa5]+$",
			message : "不支持单引号、双引号、中文和空格"
		    },
		    notEqual : {
			message : "新密码与旧密码不能相同"
		    }
		}
	    },
	    newpassconfirm : {
		validators : {
		    notEmpty : {
			message : "请确认密码"
		    },
		    stringLength : {
			min : 1,
			max : 64,
			message : "长度必须在【1-64】之间"
		    },
		    regexp : {
			regexp : "[^\"\'\ \u4e00-\u9fa5]+$",
			message : "不支持单引号、双引号、中文和空格"
		    },
		    toEqual : {
			message : "请输入相同的密码"
		    }
		}
	    },
	    accountEmail : {
		validators : {
		    notEmpty : {
			message : "邮箱不能为空"
		    },
		    remote : {
			url : JSU("/user/checkEmail"),
			type : "POST",
			data : function(validator) {
			    return {
				"userId" : $("input[name='userId']").val()
			    }
			},
			message : "邮箱不正确"
		    },
		    emailAddress : {
			message : "邮箱格式不正确"
		    }
		}
	    },
	    randomCode : {
		validators : {
		    notEmpty : {
			message : "验证码不能为空（请输入邮箱接受到的验证码）"
		    },
		    remote : {
			url : JSU("/user/checkRandomCode"),
			type : "POST",
			message : "验证码不正确"
		    }
		}
	    }
	}
    });
}

/* 设置密码 */
function setPassword() {
    $("#editPassBtn").click(
	    function() {
		var formId = "editPassForm";
		$("#" + formId).ajaxSubmit(
			{
			    url : JSU("/user/editUserPassword"),
			    type : "POST",
			    async : false,
			    data : {
				"newpass" : $("#newpass").val(),
				"userId" : $("input[name='userId']").val()
			    },
			    beforeSubmit : function() {
				sendEmailValicode();
				validatePassForm();// 该校验中不包括验证码是否为空的校验
				var bootstrapValidtor = $("#" + formId).data(
					"bootstrapValidator");
				bootstrapValidtor.validate();
				if (!bootstrapValidtor.isValid()) {
				    return false;
				}
			    },
			    success : function(msg) {
				if (msg == "1") {
				    showAlert($("body"), "用户密码修改失败");
				} else {
				    showAlert($("body"), "用户密码修改失败");
				}
				refreshPage();
				return;
			    },
			    error : function() {
				showAlert($("body"), "用户密码修改失败");
			    }
			});
	    });
}

/**
 * 发送邮箱验证码
 */
function sendEmailValicode() {
    $("#getValicodeBtn").click(function() {
	var emailVal = $("#accountEmail").val();
	if (emailVal) {
	    $.ajax({
		url : JSU("/user/sendEmailValicode"),
		type : "POST",
		async : false,
		data : {
		    "email" : emailVal
		},
		success : function(msg) {
		    if (msg) {
			showAlert($("body"), "验证码发送失败，原因如下：" + msg);
		    }
		}
	    });
	} else {
	    return false;
	}

    });
}

/**
 * 设置账号表单验证
 */
function validateAccountForm() {
    var formId = "setAccountForm";
    $("#" + formId).bootstrapValidator({
	message : 'This value is not valid',
	feedbackIcons : {
	    valid : 'glyphicon glyphicon-ok',
	    invalid : 'glyphicon glyphicon-remove',
	    validating : 'glyphicon glyphicon-refresh'
	},
	fields : {
	    "blogUser.accountSina" : {
		validators : {
		    notEmpty : {
			message : "微博账号不能为空"
		    }
		}
	    },
	    "blogUser.accountZhihu" : {
		validators : {
		    notEmpty : {
			message : "知乎账号不能为空"
		    }
		}
	    },
	    "blogUser.accountEmail" : {
		validators : {
		    notEmpty : {
			message : "邮箱不能为空"
		    },
		    emailAddress : {
			message : "邮箱格式不正确"
		    }
		}
	    },
	    "blogUser.accountBlog" : {
		validators : {
		    notEmpty : {
			message : "博客地址不能为空"
		    }
		}
	    }
	}

    });
}

/* 设置用户账户信息 */
function setAccountInfo() {
    $("#setAccountBtn").click(
	    function() {
		validateAccountForm();
		var $form = $("#setAccountForm");
		$form.data('bootstrapValidator').validate();
		var flag1 = $form.data('bootstrapValidator').isValid();
		setTimeout(function() {
		    var flag2 = $form.data('bootstrapValidator').isValid();
		    if (!flag2) {
			return;
		    }
		    $.ajax({
			url : JSU("/user/setAccountInfo?userId="
				+ $("input[name='userId']").val()),
			data : $("#setAccountForm").serializeArray(),
			type : "POST",
			async : false,
			success : function(msg) {
			    if (msg) {
				if (msg == "1") {
				    console.info($("body"));
				    showAlert($("body"), "账户信息设置成功");
				} else {
				    showAlert($("body"), "账户信息设置失败");
				}
			    }
			},
			error : function() {
			    showAlert($("body"), "账户信息设置失败");
			}
		    });
		}, 500);
	    });
}
