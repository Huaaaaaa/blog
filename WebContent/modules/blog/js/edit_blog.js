/**
 * data:2017年12月4日 下午2:10:18 
 * user:cyhua 
 * name:add_blog.js d
 * escription:
 */

/**
 * 重置富文本编辑器的样式
 */
function resetStyle() {
    $(".dropdown-fontname").css("min-width", "120px");
    $(".dropdown-fontname").find("a").css("display", "block");
    $(".note-image-popover").hide();
    $(".note-popover.bottom").hide();
}

/**
 * 校验blog表单
 */
function validateBlogForm(operateType) {
    if (operateType == "add") {
	formId = "createBlogForm";
    } else {
	formId = "editBlogForm";
    }
    $("#" + formId).bootstrapValidator({
	feedbackIcons : {// 输入框不同状态显示不同样式
	    valid : "glyphicon glyphicon-ok",
	    invalid : "glyphicon glyphicon-remove",
	    validating : "glyphicon glyphicon-refresh"
	},
	fields : {
	    blogTitle : {
		validators : {
		    notEmpty : {
			message : "标题不能为空"
		    },
		    regexp : {
			regexp : "^[a-zA-Z0-9_\u4e00-\u9fa5]+$",
			message : "只支持字母、数字、中文和下划线"
		    }
		}
	    },
	    blogKey : {
		validators : {
		    notEmpty : {
			message : "关键字不能为空"
		    },
		    regexp : {
			regexp : "^[a-zA-Z0-9_\u4e00-\u9fa5]+$",
			message : "只支持字母、数字、中文和下划线"
		    }
		}
	    }
	}
    });
}

/**
 * 修改blog
 * @param blogId
 */
function editMyBlog(blogId) {
    $("#editBlogBtn").unbind("click").bind("click",function() {
	var date = new Date();
	var detailDate = date.getFullYear() + "-"
		+ (date.getMonth() + 1) + "-" + date.getDate() + " "
		+ date.getHours() + ":" + date.getMinutes() + ":"
		+ date.getSeconds();
	var type_prelanguage = "pre:";
	var type_backlanguage = "back:";
	var type_database = "db:";
	$("input[name='type_prelanguage']:checked").each(function() {
	    type_prelanguage += $(this).val() + ","
	});
	$("input[name='type_backlanguage']:checked").each(function() {
	    type_backlanguage += $(this).val() + ","
	});
	$("input[name='type_database']:checked").each(function() {
	    type_database += $(this).val() + ","
	});
	var languageType = type_prelanguage.substr(0, type_prelanguage
		.lastIndexOf(","))
		+ ";"
		+ type_backlanguage.substr(0, type_backlanguage
			.lastIndexOf(","))
		+ ";"
		+ type_database.substr(0, type_database
			.lastIndexOf(","));
	
	var data = {
	    "blog_title" : $("#blog_title_edit").val(),
	    "blog_key" : $("input[name='blogKey']").val(),
	    "blog_htmlcontent" : $("#blogContentEdit").summernote('code'),
	    "blog_type" : $("input[name='blogType']:checked").val(),
	    "blog_create_time" : detailDate,
	    "languageType" : languageType,
	    "blogId" : blogId
	};
	if (data) {
	    $.ajax({
		url :"/blog/editBlog",
		type : "POST",
		data : data,
		async:false,
		success : function(msg) {
		    if (msg == "success") {
			showAlert($("body"), "blog修改成功");
			$(".btn-yes").click(function() {
			    window.history.back(-3);// 创建成功后回退到blog列表页
			});
		    } else {
			showAlert($("body"), "blog修改失败");
			return;
		    }
		},
		error:function(){
		    showAlert($("body"), "blog修改失败");
		    return;
		}
	    });
	}
    });
}

/**
 * 回显languageType
 * @param languageType
 */
function selectLanguageType(languageType) {
    if (languageType) {
	if (languageType.indexOf(",") != -1) {
	    languageType = languageType.split(",");
	    for (var i = 0; i < languageType.length; i++) {
		$("input[value='" + languageType[i] + "']:checkbox").attr(
			"checked", "checked");
	    }
	} else {
	    $("input[value='" + languageType + "']:checkbox").attr("checked",
		    "checked");
	}
    }
}
