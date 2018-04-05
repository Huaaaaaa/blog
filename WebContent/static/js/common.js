//页面跳转公共方法   2017-05-11 jiangjuan

 //页面为操作 ----超时
var noDoTimeout = 1800000; //单位：毫秒 
//密码强度验证
var valiTypeReset = {
    num: /\d/,                                //数字
    valsCh: /[a-z]+/,						  //小写字母
    valbCh: /[A-Z]+/,                         //大写字母
    valSpe: /[^a-zA-Z0-9]/                    //特殊字符
};

/**
 * 二级菜单跳转功能实现
 * @param tpl
 * @param divId
 * @param secDivId
 */
function toSecMenu(divId, secDivId) {
	
    $("#" + divId).find("li").on("click", function () {
    	
        //点击菜单，页面跳转，隐藏子页面
    	$("#toOnePanel").html("");
        $("#toOnePanel").hide();
        var _this = $(this);
        var url = _this.attr("url");
        _this.addClass("on").siblings().removeClass("on");
        _this.addClass("on").siblings().removeClass("current");

        _this.addClass("current"); 
        //用于测试---非空不能跳转
        if (url) ajaxToUrl(url, "", secDivId);
        secMenu = url;//记录二级菜单数据
        
		
    });
    $("#" + divId).find("li").eq(0).trigger("click");

}


//页面方法跳转
function ajaxToUrl(url, dataParams, secDivId, bodyHtml,optUrl,callback) {
	//添加加载loading 页面；
	shadeDiv("show");
    $.ajax({
        url: url ,
        data: dataParams,
        type :"post", 
        async : true,
        success: function (data, textStatus, xhr) {
        	//响应结束后，关闭隐藏窗口
        	if(data) shadeDiv("hide");
        	if(optUrl){//判断是否操作后端url 交互，不做页面跳转
        		callback();
        	}else{// 页面功能跳转
        		if(xhr.getResponseHeader('Session-Status')=='timeout'){
            		window.location.reload();
            	}else{
            		if (bodyHtml) $(bodyHtml).html(data);
                    else{
                    	$("#" + secDivId).html(data);
                        oneMenu  = url;
                    }
            	}	
        	}
        }
    })
}

//返回按钮加载
$(document).on("click", ".icon-back", function () {
    if ($("#toOnePanel").is(":visible")) {
        $("#toOnePanel").html("");
        $("#toOnePanel").hide();
    } else if ($("#goToJsp").is(":visible")) {
    	$("#goToJsp").html("");
    	$("#goToJsp").hide();
    }

});

//动态加载js/css文件
function loadExtentFile(url, fileType) {

    if (fileType == "js") {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        document.body.appendChild(script);

    } else if (fileType == "css") {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);

    }

}


function isEmpty(obj) {
    for (var name in obj) {
        return false;
    }

    return true;
}

//检测data-tables选中
function checkGridChoose(tableId, name, len, max) {
    var len = len || 1;
    var ckb = [];
    $("input[name='ckb_" + tableId + "']:checked", $("#" + tableId)).each(function () {
        ckb.push($("#" + tableId).dataTable().fnGetData(this.parentNode.parentNode));
    });
    var oT = $("#" + tableId).dataTable();
    var oSet = oT.fnSettings();
    var chooseData = oSet.chooseData;

    if (chooseData && !isEmpty(chooseData)) {
        for (var page in chooseData) {
            var length = chooseData[page].length;
        }
    }

    if (ckb.length == 0) {
        return $.i18n.prop("_js_select_" ) + name;
    }
    if (len != -1) {
        if (ckb.length == len) {
            return ckb;
        } else if (ckb.length != len) {
            return $.i18n.prop("_js_select1_") + name;
        }
    } else {
        if (max) {
            if (ckb.length > max) {
                return $.i18n.prop("_js_select_" )+ name;
            }
        }
        return ckb;
    }
}


//阻止冒泡
function preventBubble(e) {
    if (window.event) {
        e.cancelBubble = true; // ie
    } else {
        e.preventDefault();
        e.stopPropagation(); // 其它浏览器下阻止冒泡
    }
}
// in_array
function isExistInArr(_array, _element) {
    if (!_array || !_element) return false;

    if (!_array.length) {
        return (_array == _element);
    }

    for (var i = 0; i < _array.length; i++) {
        if (_element == _array[i]) return true;
    }

    return false;
}

//数组去重
function distinct(_array) {
    if (!_array || !_array.length) return _array;

    var newArray = new Array();

    for (var i = 0; i < _array.length; i++) {
        var oEl = _array[i];

        // 强制成小写
        oEl = oEl.toLowerCase();

        if (!oEl || this.isExistInArr(newArray, oEl)) continue;

        newArray[newArray.length] = oEl;
    }

    return newArray;
}

//弹出框
//弹出框  Dialog
function showDialog(dialogId,fromId, title,newConfig,callback) {
 
	/*var w = $(window).width();
	var h = $(window).height();*/
	var dlgOption = {
		        modal: true, //蒙层（弹出会影响页面大小） 
		        title:title,
		        width:500,
		        height:300,
		        resizable:false,//弹出框大小不可编辑
		        buttons:{
		        	"确定":function(){
		            	$("#"+fromId).submit();
		            	$("#"+dialogId).dialog("close");
		            },  
		            "cancel": function() {  
		                $("#"+dialogId).dialog("close");
		            }  
		        }  
		    
	}
	dlgOption = $.extend( dlgOption,newConfig );
	$("#"+dialogId).dialog(dlgOption); 

}

//弹出框  Dialog
function showPHPDialog(action, dialogId, dialogAjax, actionClick, dialogSize, dialogPercent, cancelAction) {
    //
    if (dialogId != "dialogModifyHostname") {
        $(".ui-dialog").each(function () {
            if ($(this).is(":hidden")) {
                $(this).remove();
            }
        });
    }

    $("#" + dialogId).remove();

    var w = $(window).width();
    var h = $(window).height();

    // 弹出框标题
    if (dialogAjax.title && dialogAjax.title != undefined) {
        var dialogTitle = dialogAjax.title;
        dialogAjax.title = null;
        delete dialogAjax.title;
    } else {
        var dialogTitle = $(this).html();
    }

    var settings = {
        width: w > 520 ? 520 : w - 20,
        title: dialogTitle,
        resizable: false,
        modal: true,
        buttons: {},
        close: function () {
            cancelAction && cancelAction();
        }
    }

    // 弹出框宽高自定义
    if (typeof dialogSize == 'object') {
        if (dialogSize.width) {
            settings.width = dialogSize.width;
        }

        if (dialogSize.height) {
            settings.height = dialogSize.height;
        }
    } else if (typeof dialogSize == 'number') {
        settings.width = dialogSize;
    }

    // 弹出框宽百分百，特殊定制
    if (dialogId == "dialogCreateDevice"
        || dialogId == "dialogCreateRp"
        || dialogId == "dialogModifyRecordplan"
        || dialogId == "dialogFormat"
        || dialogId == "dialogEditBucket") {

        if (dialogPercent) {
            settings.width = w > (150 * dialogPercent + 120) ? (150 * dialogPercent + 120) : (w - 20);
        }
    }

    // 弹出框操作配置
    if (action) {
        settings.buttons[action] = actionClick;
        settings.buttons[$.i18n.prop("_btn_cancle_")] = function () {
            cancelAction && cancelAction();
            $(this).dialog("close");
        }
    } else {
        settings.buttons[$.i18n.prop("_btn_close_")] = actionClick;
    }

    dialogAjax.type = 'POST';
    dialogAjax.success = function (m) {

        if (!m) {
            return;
        }

        if ($('#' + dialogId).length > 0) {
            $('#' + dialogId).html(m).dialog(settings).css("min-height", "");
        } else {
            $('<div id="' + dialogId + '" class="dialog-div"></div>').html(m).dialog(settings).css("min-height", "");
        }

        // 重置弹出框配置
        delete settings;

        if (dialogAjax.formId) {
            var v = dialogAjax.validate || function () {
                };
            var vv = $("#" + dialogAjax.formId).validate({
                submitHandler: function () {
                    var check = v(vv);
                    if (!!check || check == undefined) dialogAjax.validateSuccess()
                }
            });
        }

        if (dialogAjax.afterAjax && typeof dialogAjax.afterAjax == "function") {
            dialogAjax.afterAjax();
        }

        if (!action) {

        } else {
            $("#" + dialogId).nextAll("div.ui-widget-content").children("div").children("button:eq(0)").addClass("buttonRed");
        }
    }

    $.ajax(dialogAjax);
}

//提示框
function showAlert(m, alertType, action,callback,cancelAction) {
	if (typeof m == "undefined") {
		m = $.i18n.prop("_undefined_");	
	}
	
	var ml = m.replace(/[^\x00-\xff]/g, "aa").length;
	var w = $(window).width();
	var h = $(window).height();
	var btnText = $.i18n.prop("_btn_close_");
	var alertTitle = $.i18n.prop("_com_prompting_");
	var dialogId = 'alertid';
	
	var settings = {
		title : alertTitle,
		resizable : false,
		modal : true,
		width:500,
		buttons : {},
		close: function () {
            cancelAction && cancelAction();
        }
	}
	var at = 'alert';
	if (alertType == 'next') {
		btnText = $.i18n.prop("_btn_deploy_next_")+"(10s)";
		at = 'info';
	} else if (alertType == 'next_manual') {
		btnText = $.i18n.prop("_btn_deploy_next_");
		at = 'info';
	} else if (alertType == 'relogin') {
		btnText = $.i18n.prop("_btn_relogin_");
		at = 'alert';
	} else if (alertType == '_btn_confirm_') {
		btnText = $.i18n.prop("_btn_confirm_");
		at = 'info';
	} else {
		at = !!alertType ? alertType : "info";
	}

	m = '<i class="bgImages icon-large-info "></i><div class="alert alert-' + at + '">' + m + '</div>';
	settings.buttons[btnText] = function () {
		//用户点击按钮后的操作
		if(callback) callback&&callback();
		
		$(this).dialog("close");
		if (action) {
			action.apply($('#' + dialogId));
		}
	}
	
	if ($('#' + dialogId).length > 0) {
		$('#' + dialogId).html(m).dialog(settings).css("min-height", "");
	} else {
		$('<div id="' + dialogId + '" class="dialog-div"></div>').html(m).dialog(settings).css("min-height", "");
	}
	
	$('#' + dialogId + " .text-alert").width($('#' + dialogId).width() - 70).css({
		"display" : "inline-block",
		"margin-top" : "3px"
	});
	if (alertType == 'next') {
		$('#' + dialogId).attr("type","next").attr("time","11");
		alertLoop();
	}

	delete settings;
}

//信息显示框自动消失
function alertLoop(){
	if($("#alertid").length>0 && $("#alertid").is(':visible') && $("#alertid").attr("type")=="next"){
		$("#alertid").nextAll("div.ui-widget-content").find("button").addClass("buttonRed");
		var time = $("#alertid").attr("time");
		if(time>0){
			$("#alertid").attr("time",(parseInt(time)-1));
			$("#alertid").nextAll("div.ui-widget-content").find("span").text($.i18n.prop("_btn_deploy_next_")+"("+(parseInt(time)-1)+")");
		}else if(time==0){
			$("#alertid").nextAll("div.ui-widget-content").find("button").trigger("click");
		}
		window.setTimeout("alertLoop()",1000);
	}
}




//确定框
function showConfirm(m, ok, confirmSize, cancel,tips) {
	var ml = m.replace(/[^\x00-\xff]/g,"aa").length;
	var w = $(window).width();
	var h = $(window).height();
	var tipsText = '';//确定是否存在提示语
	if(tips)
		tipsText ='<span style="float: left;width: 100%;height: 35px;line-height: 35px; background-color: #EFD6D7;padding-left: 10px;color: #F75556;">'+tips+'</span>'; 
	m = '<div>'+tipsText+'<i class="icon-large-ask bgImages"></i><div class="alert  alert-info">'+m+'</div></div>';
	var confirmTitle = $.i18n.prop("_com_confirm_");
	var dialogId = 'confirmid';
	var settings = {
		title: confirmTitle,
		resizable: false,
		modal: true,
		buttons: {}
	}
	//alert(ml)
	settings.width = w > ml*7 + 70 ? ml*7 + 170 : w-20;
	if(settings.width >= 550) {
		settings.width = w > 550 ? 550 : w-20;
	} else if(settings.width < 380) {
		settings.width = w > 380 ? 380 : w-20;
	}
	var cancel = cancel;
	if(!cancel) {
     cancel = function() {
			$( this ).dialog( "close" );
		}
	}
	settings.buttons[$.i18n.prop("_com_yes_")] = ok;
	settings.buttons[$.i18n.prop("_com_no_")] = cancel;
	if ($('#'+dialogId).length > 0) {
		$('#'+dialogId).html(m).dialog(settings).css("min-height", "");;
	} else {
		$('<div id="'+dialogId+'" class="dialog-div"></div>').html(m).dialog(settings).css("min-height", "");;
	}
	$("#"+dialogId).nextAll("div.ui-widget-content").children("div").children("button:eq(0)").addClass("buttonRed").blur();
	
	$( "#"+dialogId ).prev("div").children("a.ui-dialog-titlebar-close").unbind("click").bind("click", function() {
		cancel.apply($( "#"+dialogId ));
	});
	$( "#"+dialogId ).parent().unbind("keydown").bind("keydown", function(e) {
		if(e.keyCode == 27) {
			cancel.apply($( "#"+dialogId ));
		}
	});
	delete settings;
}


// 隐藏遮罩
function shadeDiv(act,title) {
	var _showMes = $.i18n.prop("_is_loading_");
	if(title){
		_showMes = title;
	}
     if ($("#shadeDiv").length <= 0) {
         var div = '<div id="shadeDiv" style="top:0px;width:100%;height: 100%;position:absolute; z-index: 1011;opacity:.3;    background-color: #FFFFFF;filter:Alpha(Opacity=0);"></div>'
        	 	  +'<div id="loadingFullDiv" class="loading-full"><span class="loading-img bgImages"></span><font>' + _showMes + '</font></div>';
         $("body").append(div);       
     }
	  if (act == "show") {
          $("#loadingFullDiv").show();
          $("#shadeDiv").show();
      } else {
          $("#loadingFullDiv").fadeOut(200);
          $("#shadeDiv").hide();
      }
}

//提示框显示
function tipsShow(dom,tag){
	//获取初始化验证框，用于提示相关信息；用户class 中校验代码进行控制
	if(tag){
		//初始化相关验证码信息；------------------start---------------
		$.each($(dom), function(key, value) {		 
		    var _classTxt =$(dom).eq(key).attr("class");
		    if(_classTxt.indexOf("{") > -1){//如果校验存在
		    	 var _start = _classTxt.indexOf("{") +1;
		 		var _end = _classTxt.indexOf("}");
		 		var	_subtxt = _classTxt.substring(_start,_end);
		 		var reg = new RegExp(":true","g");//g,表示全部替换。：true 全部替换为""
		 		var valiMap = _subtxt.replace(reg,"");
		 		 
		 		var tipsTxt = "";
		 		 $.each(valiMap.split(","), function(key, value) { 
		 		      tipsTxt +=$.validator.messages[value]+",";
		 		 });
		 		
		 		 $(dom).eq(key).attr("title",tipsTxt.substring(0,tipsTxt.length-1)); 	
		    }
		   	 
		});
		//初始化相关验证码信息；------------------end---------------
	}
	
	
	//提示语样式  document 可写成 class 及id 的值 ；
    $(dom).tooltip({
      position: {
        my: "center bottom-12",
        at: "center top",
        using: function( position, feedback ) {
        	//判断浏览器
        	 var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        	 if (!(userAgent.indexOf("Firefox") > -1)) {////非Firefox浏览器
        		 var bodySleft =$("body").scrollLeft(); 
            	 if(bodySleft>0){//出现滚动条时，应该算出滚动条的宽度
            		 position.left =position.left-bodySleft; 
            	 }
        	  } 
        	
          $( this ).css( position );
          $( "<div >" )
            .addClass( "arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      }
    });
    
}

//用于与后端交互处理
function ajaxPost(url,data,callback,errorback){
    //查询当前节点
    $.ajax({
        url : url,
        type : 'POST',
        dataType : 'json',
        traditional :true,
        data : data,
        async : true,
        success : function(m) {
            callback(m);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            if(errorback){
                errorback(XMLHttpRequest, textStatus, errorThrown);
            }
        }
    });
}

//点击退出系统事件
function logout(){
	$(".logout").unbind("click").bind("click",function(){
		window.location.href = cxt+"/platform/login/logout";
		//window.location.href =cxt+"/platform/index/home";
	}); 
	//判断是中文，还是英文样式
	if(i18n=="en_US"){
		$("body").addClass("en");
	}else{
		$("body").removeClass("en");
	}

	//页面超时业务 加载
	timeoutByall();	
}

//操时处理
function timedCount() {
	var closeTips = function(){
		$.cookie('timeout',"0");
    	window.location.href = cxt+"/platform/login/logout";	  
	};
	//登录超时提示语
	showAlert($.i18n.prop("prompt.loginOut"),"_btn_confirm_","",closeTips,closeTips);
    //cookie中存储超时标识
    $.cookie('timeout',"1");
};

//页面超时业务逻辑处理；
function timeoutByall(){
	var myTime = setTimeout(function(){ timedCount();},noDoTimeout);
	function resetTime() {  
	    clearTimeout(myTime);   
	    myTime = setTimeout(function(){timedCount();},noDoTimeout);
	};
	
	//cookie标记为超时
	if ( $.cookie('timeout') === "1"){
		window.location.href = cxt+"/platform/login/logout";			
	}
	
	$(document).keydown(function(){ 
		resetTime();
	});
	$(document).click(function(){ 
		resetTime();
	});
}

//二级菜单点击
function clickSecondMenu(){
    $(".ul-secMenu-nav").find("li.on").trigger("click");
}


function passStrenth(passobj/*密码输入框*/, strObj/*强度验证对象*/, UserNameObj/*用户名*/, wrap) {
    //密码强度验证
    passobj.keyup(function (event) {
        var strength = strObj;
        var value = $(this).val();
        var num = getNum(value);  // 获取当前密码强度值 密码强度 =1风险密码 =2弱密码 =3中密码 =4强密码

        if (wrap)
            wrap.show();
        else
            strength.show();

        if (value.length < 8) {
            num = 1;    //长度小于8  风险密码
        }

        var UserName = UserNameObj && UserNameObj.val();
        var riskPass = getRiskPassVali(value, UserName, valiTypeReset);
        if (!riskPass) {
            num = 1;   // 只有一类字符，或者密码与用户名一样，或者密码是用户名的倒写  风险密码
        }

        // 判断两两组合
        if (num == 2) {
            // 包含两类字符，且组合为（数字+小写字母）或（数字+大写字母），为弱密码
            if (valiTypeReset["num"].test(value) && !valiTypeReset["valSpe"].test(value)) {
                num = 2;
            } else {
                num = 3;
            }
        } else if (num == 3) {
            num = 4;
        }

        // 强度样式
        if (num <= 1) {
            strength.find(".veryweak").show();
            strength.find(".veryweak").nextAll().hide();
        } else if (num == 2) {
            strength.find(".weak").show().prevAll().show();
            strength.find(".weak").nextAll().hide();
        } else if (num == 3) {
            strength.find(".medium").show().prevAll().show();
            strength.find(".strong").hide();
        } else {
            strength.find(".strong").show().prevAll().show();
        }
    });
}
function getNum(value) {
    var num = 0;
    for (var p in valiTypeReset) {
        if (valiTypeReset[p].test(value))
            num++;
    }
    return num;
}