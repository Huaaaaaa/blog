/**
 * 用户注册
 */

$(function() {
	
	/*hideStrength("regedit_form");*/
	// 验证密码强度
	passwordStrength("password","regedit_form",2);
	$("#btn_reg").on("click", function() {
		validateUserInfo();
		var bootstrapValidtor = $("#regedit_form").data("bootstrapValidator");
		bootstrapValidtor.validate();
		if (bootstrapValidtor.isValid()) {
			var userName = $("#username").val(),userEmail = $("#email").val(),userPhone = $("#phone").val();
			$.ajax({
				url:JSU("/user/checkUserUnique"),
				type:"post",
				async:false,
				data:{
					"userName" :userName ,
					"accountEmail" : userEmail,
					"accountPhone" : userPhone,
				},
				dataType:"json",
				success:function(data){
					var resName = data["userName"];
					var resEmail = data["userEmail"];
					var resPhone= data["userPhone"];
					if(resName=="false"){
						showAlert("用户名",userName);
//						$("#alertModal").modal();
//						$("#alertModal .modal-body p").html("当前用户名<span class='regMsg'>"+userName+"</span>已被抢注");
					}else if(resEmail=="false"){
						showAlert("邮箱",userEmail);
//						$("#alertModal").modal();
//						$("#alertModal .modal-body p").html("当前邮箱<span class='regMsg'>"+userEmail+"</span>已被抢注");
					}else if(resPhone=="false"){
						showAlert("手机号",userPhone);
//						$("#alertModal").modal();
//						$("#alertModal .modal-body p").html("当前手机号<span class='regMsg'>"+userPhone+"</span>已被抢注");
					}else{
						$.ajax({
							url : JSU("/user/regedit"),
							type : "post",
							async : false,
							data : {
								"userName" :userName,
								"nickName" : $("#nickname").val(),
								"password" : $("#password").val(),
								"accountEmail" : userEmail,
								"accountPhone" : userPhone,

							},
							dataType : "json",
							success : function(data) {
								if (data == true) {
									alert("注册成功");
									setTimeout(function(){
										window.location.href="/jsp"
									},500);
								} else {
									alert("注册失败！<br/>服务器内部错误");
								}
							},
							error : function() {
								alert("注册失败");
							}

						});
					}
				}
			});
			
		}
	});
});

function showAlert(msg,val){
	$("#alertModal").modal({
		keyboard:false,
		backdrop:'static'
	});
	$("#alertModal .modal-body p").html("当前"+msg+"<span class='regMsg'>"+val+"</span>已被抢注");
}

/*修改校验成功和失败时的样式*/
function repaint(){
	$(".form-horizontal .form-group").each(function(){
		var _this = $(this);
		var successObj =_this.hasClass("has-success");
		var errorObj = _this.hasClass("has-error");
		if(errorObj){
			$(".has-error").css("margin-top","-15px");
		}
		if(successObj){
			_this.css("margin-top","10px");
		}
	});
}

function validateUserInfo() {
	var formId = "regedit_form";
	$("#" + formId).bootstrapValidator({
		feedbackIcons : {// 输入框不同状态显示不同样式
			valid : "glyphicon glyphicon-ok",
			invalid : "glyphicon glyphicon-remove",
			validating : "glyphicon glyphicon-refresh"
		},
		fields : {
			userName : {
				validators : {
					notEmpty : {
						message : "用户名不能为空"
					},
					stringLength : {
						min : 1,
						max : 64,
						message : "长度必须在【1-64】之间"
					},
					regexp : {
						regexp : "^[a-zA-Z0-9_\u4e00-\u9fa5]+$",
						message : "只支持字母、数字、中文和下划线"
					}
				}
			},
			nickName : {
				validators : {
					notEmpty : {
						message : "昵称不能为空"
					},
					stringLength : {
						min : 1,
						max : 64,
						message : "长度必须在【1-64】之间"
					},
					regexp : {
						regexp : "^[a-zA-Z0-9_\u4e00-\u9fa5]+$",
						message : "只支持字母、数字、中文和下划线"
					}
				}
			},
			password : {
				validators : {
					notEmpty : {
						message : "密码不能为空"
					},
					stringLength : {
						min : 1,
						max : 64,
						message : "长度必须在【1-64】之间"
					},
					regexp : {
						regexp : "[^\"\'\ \u4e00-\u9fa5]+$",
						message : "不支持单引号、双引号、中文和空格"
					}
				}
			},
			password1 : {
				validators : {
					notEmpty : {
						message : "密码不能为空"
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
						message : "两次输入相同的密码"
					}
				}
			},
			accountEmail : {
				validators : {
					notEmpty : {
						message : "邮箱不能为空"
					}
				}
			},
			accountPhone : {
				validators : {
					notEmpty : {
						message : "手机号不能为空"
					},
					stringLength : {
						min : 8,
						max : 11,
						message : "长度必须在【8-11】之间"
					},
					regexp : {
						regexp : "^[0-9]+$",
						message : "只支持数字"
					}
				}
			}
		}
	});
}

